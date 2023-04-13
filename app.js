const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let x = 100;
let y = 100;

function DrawBall(x,y,r) {   
    ctx.beginPath()
    ctx.arc(x,y,r,0,2*Math.PI);
    ctx.stroke()
    ctx.fill()
}

canvas.addEventListener('keydown',(e)=>{
    if(e.keyCode == 37){
        console.log("Left");
        x--;
    }else if(e.keyCode == 38){
        console.log("Up");
        y--;
    }else if(e.keyCode == 39){
        console.log("Right");
        x++;
    }else if(e.keyCode == 40){
        console.log("Down");
        y++;
    }
})

setInterval(()=>{
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
    DrawBall(x,y,20);
},1000/60)    

// step1 : converting this into the function so that we can create other balls as well
// step2 : 