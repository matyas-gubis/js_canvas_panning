import { Game } from './game.js';
import { io } from 'https://cdn.socket.io/4.7.5/socket.io.esm.min.js';

const socket = io('http://localhost:3000');
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const hudCanvas = document.getElementById('hud');
hudCanvas.width = window.innerWidth;
hudCanvas.height = window.innerHeight;
/**
 * @type {HTMLDivElement}
 */
const logField = document.getElementById('log');
/**
 * @type { CanvasRenderingContext2D}
 */
const ctx = canvas.getContext('2d');
const hudCtx = hudCanvas.getContext('2d');

const game = new Game(canvas.width, canvas.height, canvas, hudCanvas);

game.init();

socket.on('log', (msg) => {
    console.log(logField);
    const newMessage = document.createElement('p');
    newMessage.innerHTML = msg.message;
    newMessage.style.color = msg.color;
    logField.appendChild(newMessage);
    logField.scrollTo(0, logField.scrollHeight);
});
