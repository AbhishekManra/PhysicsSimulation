const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 100;
let y = 100;

let frc = 0.1
var BallArr = []

class Vector{
    constructor(x,y){
        this.x = x
        this.y = y
    }
    add(v){
        return new Vector(this.x + v.x , this.y + v.y)
    }
    sub(v){
        return new Vector(this.x - v.x , this.y - v.y)
    }
    mag(){
        return new Vector(this.x**2 + this.y**2)
    }
    mult(n){
        return new Vector(this.x*n, this.y*n);
    }
    drawVec(start_x, start_y, n, color){
        ctx.beginPath();
        ctx.moveTo(start_x, start_y);
        ctx.lineTo(start_x + this.x * n, start_y + this.y * n);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
    }
}

class Ball{
    constructor(x,y,r){
        this.pos = new Vector(x,y)
        // this.x = x
        // this.y = y
        this.r = r
        this.acc = new Vector(0,0)
        this.vel = new Vector(0,0)
        this.player = false
        BallArr.push(this)
    }
    DrawBall() {   
        ctx.beginPath()
        ctx.arc(this.pos.x,this.pos.y,this.r,0,2*Math.PI);
        ctx.stroke()
        ctx.fillStyle = 'red'
        ctx.fill()
    }
    display(){
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y)
        ctx.lineTo(this.pos.x + this.acc.x*100, this.pos.y + this.acc.y*100);
        ctx.strokeStyle = "green";
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.vel.x*10, this.pos.y + this.vel.y*10);
        ctx.strokeStyle = "blue";
        ctx.stroke();
        ctx.closePath();
    }
}

let Left,Right,Up,Down;

function selectBall(b) {
    canvas.addEventListener('keydown',(e)=>{ // this launches the function till the key is pressed
        if(e.keyCode == 37){
            Left = true;
        }else if(e.keyCode == 38){
            Up = true;
        }else if(e.keyCode == 39){
            Right = true;
        }else if(e.keyCode == 40){
            Down = true
        }
    })
    canvas.addEventListener('keyup',(e)=>{ // this is the called when the key is released
        if(e.keyCode == 37){
            Left = false;
        }else if(e.keyCode == 38){
            Up = false;
        }else if(e.keyCode == 39){
            Right = false;
        }else if(e.keyCode == 40){
            Down = false;
        }
    })
    
    if (Left) {
        b.acc.x = -1;
    }if(Up){
        b.acc.y = -1
    }if (Right) {
        b.acc.x = 1
    }if(Down){
        b.acc.y = 1
    }
    if(!Right && !Left){
        b.acc.x = 0
    }if(!Up && !Down){
        b.acc.y = 0
    }
    // b.vel_x += b.acc_x
    // b.vel_y += b.acc_y
    b.vel = b.vel.add(b.acc) 
    b.vel = b.vel.mult(1 - frc)
    b.pos = b.pos.add(b.vel)
    // b.x += b.vel.x
    // b.y += b.vel.y
}

// let Ball1 = new Ball(200,200,30); 
let Ball1 = new Ball(200, 200, 30);
let Ball2 = new Ball(300, 250, 40);
Ball2.player=true

let distanceVec = new Vector(0,0)

function RoundOffMag(number,precision) {
    let factor = 10**precision
    return Math.round(number*factor)/factor;
}

function repeatOften(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    BallArr.forEach((b)=>{
        b.DrawBall();
        b.display()
        if(b.player){
            selectBall(b)
        }
    })
    distanceVec = Ball2.pos.sub(Ball1.pos)
    ctx.fillText("Distance Between the center is  : " + RoundOffMag(distanceVec.mag().x,1000),400,330)
    requestAnimationFrame(repeatOften) // this will repeat the loop once it started
}
requestAnimationFrame(repeatOften) // this will start the repeat often loop
// step1 : converting this into the function so that we can create other balls as well
// step2 : 