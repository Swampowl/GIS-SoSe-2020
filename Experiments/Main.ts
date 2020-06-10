namespace Experiments {
    window.addEventListener("load", init);
    let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;
    let xBall: number = 0;
    let yBall: number = 0;
    let xSpeed: number = 1;
    let ySpeed: number = 1;
    let radius: number = 40;
    let gravity: number = 0;
    let color: string = "";
    let ballColorAngle: number = 180 ;
    let colorAngle: number = 0;


    function init(_event: Event): void {
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        crc2.translate(canvas.width / 2, canvas.height / 2);
        drawBackground(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        animate();
        /*for (let index: number = 0; index <= 3; index++) {
            drawBall(Math.random() * canvas.width / 2, Math.random() * canvas.height / 2, 30);

        }*/
    }


    function drawBall(_x: number, _y: number, _radius: number): void {
        crc2.beginPath();
        crc2.strokeStyle = "HSLA(" + ballColorAngle + ",100%,50%, 0.6)";
        crc2.fillStyle = "HSLA(" + ballColorAngle + ",100%,50%, 0.6)";
        crc2.arc(_x, _y, _radius, 0 * Math.PI, 2 * Math.PI, false);
        crc2.stroke(); crc2.fill();

    }

    function drawBackground(_x: number, _y: number, _w: number, _h: number): void {
        crc2.beginPath();
        crc2.strokeStyle = color;
        crc2.fillStyle = color;
        crc2.rect(_x, _y, _w, _h);
        crc2.stroke();
        crc2.fill();
    }

    function checkCollision(): void {
        if (xBall <= -canvas.width / 2 + radius / 2 || xBall >= canvas.width / 2 - radius / 2) {
            xSpeed *= -1;
        }
        if (yBall <= -canvas.height / 2 + radius / 2 || yBall >= canvas.height / 2 - radius / 2) {
            ySpeed *= -1;
        }
    }
    function animate(): void {
        drawBackground(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        checkCollision();
        colorAngle++;
        ballColorAngle++;
        color = "HSLA(" + colorAngle + ",100%,50%, 0.6)";
        ySpeed += gravity;
        xBall += xSpeed;
        yBall += ySpeed;
        drawBall(xBall, yBall, radius);

        requestAnimationFrame(animate);
    }
}