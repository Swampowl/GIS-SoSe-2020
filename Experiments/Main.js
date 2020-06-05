"use strict";
var Experiments;
(function (Experiments) {
    window.addEventListener("load", init);
    let crc2;
    let canvas;
    let xBall = 0;
    let yBall = 0;
    let xSpeed = 1;
    let ySpeed = 1;
    let radius = 40;
    let gravity = 0;
    let color = "";
    let colorAngle = 0;
    function init(_event) {
        canvas = document.querySelector("canvas");
        crc2 = canvas.getContext("2d");
        crc2.translate(canvas.width / 2, canvas.height / 2);
        drawBackground(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        animate();
        /*for (let index: number = 0; index <= 3; index++) {
            drawBall(Math.random() * canvas.width / 2, Math.random() * canvas.height / 2, 30);

        }*/
    }
    function drawBall(_x, _y, _radius) {
        crc2.beginPath();
        crc2.strokeStyle = color;
        crc2.fillStyle = color;
        crc2.arc(_x, _y, _radius, 0 * Math.PI, 2 * Math.PI, false);
        crc2.stroke();
        crc2.fill();
    }
    function drawBackground(_x, _y, _w, _h) {
        crc2.beginPath();
        crc2.strokeStyle = color;
        crc2.fillStyle = color;
        crc2.rect(_x, _y, _w, _h);
        crc2.stroke();
        crc2.fill();
    }
    function checkCollision() {
        if (xBall <= -canvas.width / 2 + radius / 2 || xBall >= canvas.width / 2 - radius / 2) {
            xSpeed *= -1;
        }
        if (yBall <= -canvas.height / 2 + radius / 2 || yBall >= canvas.height / 2 - radius / 2) {
            ySpeed *= -1;
        }
    }
    function animate() {
        drawBackground(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        checkCollision();
        colorAngle++;
        color = "HSLA(" + colorAngle + ",100%,50%, 0.6)";
        ySpeed += gravity;
        xBall += xSpeed;
        yBall += ySpeed;
        drawBall(xBall, yBall, radius);
        requestAnimationFrame(animate);
    }
})(Experiments || (Experiments = {}));
//# sourceMappingURL=Main.js.map