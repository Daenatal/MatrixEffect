const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height); left to right
let gradient = ctx.createRadialGradient(canvas.width/2,canvas.height/2, 100, canvas.width/2, canvas.height/2, canvas.height/2); // 6 arguments let gradient = ctx.createRadialGradient(x1,y1, r1, x2, y2, r2);
gradient.addColorStop(0, 'red'); //(offset, color);
gradient.addColorStop(0.2, 'yellow');
gradient.addColorStop(0.4, 'green');
gradient.addColorStop(0.6, 'cyan');
gradient.addColorStop(0.8, 'blue');
gradient.addColorStop(1, 'magenta'); //add this code inside of the window resize event listener to make it responsive

//procedural programming step by step
//object oriented programming wrap functions and variables in objects
//class special function, introduced in 2015 built on native javascript functionality
//encapsulation wrap variables and functions in objects, helps keep organized and protect data

class Symbol {
    constructor(x, y, fontSize, canvasHeight){
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text ='';
        this.canvasHeight = canvasHeight;
    }
    draw(context){
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length)); //called on string data type, returns string
        //context.fillStyle = '#0aff0a'; reduce number of calls for global methods
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98){
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight){
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize(); //call private method from inside constructor
        console.log(this.symbols);
    }
    #initialize(){ //private methods cannot be called directly from the outside, abstraction inheritance and polymorphism
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, Math.floor(Math.random()* this.symbols.length * 10), this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.columns = this.canvasWidth/this.fontSize;
        this.symbols = [];
        this.#initialize();
        //console.log(this.symbols);
    }
}

const effect = new Effect(canvas.width, canvas.height);
let lastTime = 0;
const fps = 15;
const nextFrame = 1000/fps;
let timer = 0;

function animate(timeStamp){
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame){
        ctx.fillStyle = 'rgba(0,0,0,0.05)'; //cause old paint to slowly fade step by step
        ctx.textAlign = 'center'; //global properties once assigned they will apply to all canvas generated elements specifies current text alignment used when drawing text
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = gradient; //'#0aff0a';
        ctx.font = effect.fontSize + 'px monospace'; //monospace fonts have characters that occupy the same amount of horizontal space
        effect.symbols.forEach(symbol => symbol.draw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate); //automatically passes a timestamp argument to the function tha calls it, deltaTime is the difference in ms between the previous animation frame and the current one
}

animate(0);

window.addEventListener('resize', function(){
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 effect.resize(canvas.width, canvas.height);
});
//abstraction is about hiding internal functionality and implementation details of our objects and only exposing essential information 
//to the user.