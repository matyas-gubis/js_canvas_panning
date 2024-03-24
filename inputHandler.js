import { Game } from './game.js';
import { clamp } from './util.js';

export class InputHandler {
    /**
     * @param {Game} game
     */
    constructor(game) {
        /**@type {Game} */
        this.game = game;
        this.panning = {
            isPanning: false,
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 },
            pannedDistance: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            decay: 0.97, // Adjust as needed for desired momentum effect
        };

        window.addEventListener('click', (e) => {
            const mousePos = this.game.screenToWorld(e.clientX, e.clientY);
            console.log(this.game.grid.getCellByCoordinates(mousePos.x, mousePos.y));
        });

        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        window.addEventListener('mousedown', (e) => {
            if (e.button == 2) {
                this.panning.isPanning = true;
                this.setPanningStart(e.clientX, e.clientY);
                document.body.style.cursor = 'grabbing';
            }
        });

        window.addEventListener('mousemove', (e) => {
            if (this.panning.isPanning) {
                this.setPanningEnd(e.clientX, e.clientY);
                this.calculatePanningDistance();
                this.game.offset.x += this.panning.pannedDistance.x;
                this.game.offset.y += this.panning.pannedDistance.y;

                // Update velocity based on distance moved
                this.panning.velocity.x = this.panning.pannedDistance.x;
                this.panning.velocity.y = this.panning.pannedDistance.y;

                this.setPanningStart(e.clientX, e.clientY);
                this.game.render();
            }
        });

        window.addEventListener('mouseup', (e) => {
            if (e.button == 2) {
                this.panning.isPanning = false;
                document.body.style.cursor = 'default';

                // Apply momentum on release
                this.applyMomentum(this.panning.decay);
            }
        });

        window.addEventListener('wheel', (e) => {
            const wordMouseBefore = this.game.screenToWorld(e.clientX, e.clientY);
            let zoomValue = Math.floor((this.game.scale - e.deltaY / 1000) * 100) / 100;
            this.game.scale = clamp(zoomValue, 0.1, 5);
            const wordMouseAfter = this.game.screenToWorld(e.clientX, e.clientY);
            this.game.offset.x += Math.floor((wordMouseAfter.x - wordMouseBefore.x) * this.game.scale);
            this.game.offset.y += Math.floor((wordMouseAfter.y - wordMouseBefore.y) * this.game.scale);
            this.game.render();
        });

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.game.centerScreenToWordCenter();
                // TODO: center screen to player
            }
        });
    }
    calculatePanningDistance() {
        this.panning.pannedDistance = {
            x: Math.floor(this.panning.end.x - this.panning.start.x),
            y: Math.floor(this.panning.end.y - this.panning.start.y),
        };
    }
    setPanningStart(x, y) {
        this.panning.start.x = x;
        this.panning.start.y = y;
    }
    setPanningEnd(x, y) {
        this.panning.end.x = x;
        this.panning.end.y = y;
    }

    applyMomentum() {
        // Continuously update position based on velocity until it's negligible
        const decayThreshold = 0.1; // Adjust as needed
        const updatePosition = () => {
            if (
                Math.abs(this.panning.velocity.x) < decayThreshold &&
                Math.abs(this.panning.velocity.y) < decayThreshold
            ) {
                return; // Stop when velocity becomes negligible
            }

            // Update position based on velocity
            this.game.offset.x += this.panning.velocity.x;
            this.game.offset.y += this.panning.velocity.y;

            // Decay velocity
            this.panning.velocity.x *= this.panning.decay;
            this.panning.velocity.y *= this.panning.decay;

            // Render and continue updating position
            this.game.render();
            requestAnimationFrame(updatePosition);
        };

        // Start updating position
        updatePosition();
    }
}
