const gameBox = document.querySelector("#gameBox")
const bgMusic=new Audio('/sounds/bgmusic.mp3')
const eatingSound=new Audio('/sounds/eating sound.wav')
const gameEndSound=new Audio('/sounds/gameend.mp3')
let score=document.querySelector("#span2");
let points=0;

let snakeArr = [
    { x: 0, y: 0 }
]
let food = {
    x: 10,
    y: 10
}
 // function to continously run the game 
function gameloop() {
    setTimeout(() => {
        window.requestAnimationFrame(gameloop);
    }, 1000 / 5)

    main();
}
window.requestAnimationFrame(gameloop); // calling gameloop
input() // take input from the keyboard
function main() {
    //move snake
    moveSnakeAndFood(snakeArr)

    //make snake and food
    makeSnake();

}
function moveSnakeAndFood(snakeArr){
    appendBody(snakeArr)
    moveBody(snakeArr)
    moveHead(snakeArr)
    checkGameover(snakeArr)
}

//activate bg music when key is pressed.
window.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowUp' || e.key==='ArrowDown' || e.key==='ArrowRight' || e.key==='Arrowleft'){
        bgMusic.play().loop()
    }
    
})
//function to check gameover
function checkGameover(arr){
    let tempHead=arr[0];
    for (let i = 1; i < arr.length; i++) {
        if(arr[i].x===tempHead.x && arr[i].y===tempHead.y){
            bgMusic.pause();
            
            gameEndSound.play();
            alert(`gameOver... your score was ${points}`)
            points=0;
            score.innerText='Score:'
            snakeArr=[
                {x:0,y:0}
            ]
            flow={
                x:0,y:0
            }
            food = {
                x: 10,
                y: 10
            }

            

        }
        
    }
}
// function to move the rest of the body of the snake
function moveBody(snakeArr){
    
   for (let i = snakeArr.length-2; i >=0; i--){
   
      snakeArr[i+1].x=snakeArr[i].x
      snakeArr[i+1].y=snakeArr[i].y

   
   
   }
}

//function to append the snake body if it eats the food
function appendBody(){
    if((food.x===snakeArr[0].x) && (food.y===snakeArr[0].y)){
        points++;
        eatingSound.play();
        snakeArr.unshift({
            x:(snakeArr[0].x + flow.x),
            y:(snakeArr[0].y + flow.y)
        })
        console.log(snakeArr)
        let a=2;
        let b=18;
    food={ 
          x:Math.floor(a+(b-a)*Math.random()),
          y:Math.floor(a+(b-a)*Math.random())
         }
         score.innerText=`Score:${points}`
    }  
    
}
 
//function to move the head of the snake
function moveHead(snakeArr){
    if(snakeArr[0].x>20){
        snakeArr[0].x=0
  }
  else if(snakeArr[0].x<0){
      snakeArr[0].x=20
  } 
  if(snakeArr[0].y>20){
      snakeArr[0].y=0
  }
  else if(snakeArr[0].y<0){
      snakeArr[0].y=20
  }
  snakeArr[0].x+=flow.x;
   snakeArr[0].y+=flow.y;
}
// function to generate the body of the snake and generate food
function makeSnake() {
    gameBox.innerHTML = ""
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snakeBody');
        }
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        gameBox.appendChild(snakeElement)

    })
    // making food for snake
    let foodElement = document.createElement('div')
    foodElement.classList.add('food')
    
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    gameBox.appendChild(foodElement);
 }
 // function to take the key input to give direction to the snake
 let flow = {
    x: 0,
    y: 0
 }
 function input() {
    window.addEventListener('keydown', (e) => {

        switch (e.key) {
            case 'ArrowUp':
                flow.x = 0
                flow.y = -1
                break;

            case 'ArrowDown':
                flow.x = 0
                flow.y = 1
                break;

            case 'ArrowLeft':
                flow.x = -1
                flow.y = 0
                break;

            case 'ArrowRight':
                flow.x = 1
                flow.y = 0
                break;

            default:
                break;
        }
    })
}