const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let balls = [];
let ballRadius = 50;
let speed = 5;
let maxDx = 10;
let maxDy = 10;

let audio = new Audio;
audio.src = "sfx/ball_hit.wav"
audio.playbackRate = 2;

function generateBall(x,y) {
    let dx = Math.floor(Math.random() * (maxDx)) + 1;
    let dy = Math.floor(Math.random() * (maxDy)) + 1;
    
    let audio = new Audio;
    audio.src = "sfx/ball_hit.wav"
    audio.playbackRate = 2;

    balls.push({
        x,
        y,
        dx,
        dy,
        color: 'white',
        audio
    });
}

function draw() {
    balls.forEach(ball => {
        ctx.beginPath()
        ctx.fillStyle = ball.color;
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2)
        ctx.fill();
        ctx.closePath();
    })
}
function update() {
    balls.forEach((ball,index) => {
        for(var i = 1; i<=speed; i++){
            ball.x += ball.dx;
            ball.y += ball.dy;
        }

        if(ball.x - ballRadius < 0 ||
            ball.x + ballRadius > canvas.width)  {
                ball.dx *= -1;
                ball.audio.play()
            }
        if(ball.y - ballRadius < 0 ||
            ball.y + ballRadius > canvas.height)  {
                ball.dy *= -1;
                ball.audio.play()
            }


        // Check if the ball touch another ball
        balls.forEach((ballAgain,indexAgain) => {
            if(index == indexAgain) return;
            else {
                if(ball.x + ballRadius > ballAgain.x - ballRadius &&
                    ball.x - ballRadius < ballAgain.x + ballRadius &&
                    ball.y + ballRadius > ballAgain.y - ballRadius &&
                    ball.y - ballRadius < ballAgain.y + ballRadius) {
                        ball.color = "rgba(235, 47, 6,1)"
                        ballAgain.color = "rgba(235, 47, 6,1)"
                }
                else {
                        ball.color = "#fff"
                        ballAgain.color = "#fff"
                }
            }
        })
    })
}
function render() {
    ctx.clearRect(0,0,canvas.width,canvas.height)
    draw();
    update();
    requestAnimationFrame(render);
}

canvas.addEventListener('click', function(e) {
    let rect = canvas.getBoundingClientRect();
    let clickLocation = {
        x: e.clientX -rect.left ,
        y: e.clientY - rect.top,
    }
    console.log(clickLocation)
    generateBall(clickLocation.x, clickLocation.y)
});
window.onresize = function(e) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
generateBall(canvas.width/2, canvas.height/2);
requestAnimationFrame(render)