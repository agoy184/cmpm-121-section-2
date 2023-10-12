//purposely bad code so students can fix it - can make it worse

import './style.css'

const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreText = document.getElementById("scoreText");
let score = 0;
setText("click to start!");


let isJumping = false;
let gameOver = true;

// Fixes charging jump bug
//document.addEventListener('click', () => jump());
document.addEventListener('mousedown', () => jump());

requestAnimationFrame(main);
//setInterval(function () { main()}, 10)

function main()
{
    checkGameOver();
    if(gameOver == false)
    {
        score += 1;
        setText("Score: " + score);
        
    }
    requestAnimationFrame(main);

}


function jump()
{
    if(gameOver === false)
    {
        if(isJumping == false)
        {
            isJumping = true;
            dino?.classList.add("jump");
            setTimeout(removeJump, 500);
        }
    }
    else
    {
        startGame();
    }
    
}

function removeJump()
{
    dino?.classList.remove("jump");
    isJumping = false;
    //mainLoop = mainLoop //bug fix?
}

function removeObstacles()
{
    cactus?.classList.remove("cactusMove");
    bird?.classList.remove("birdMove");
}

function getChecker(elem: HTMLElement, value: string)
{
    return parseInt(window.getComputedStyle(elem).getPropertyValue(value));
}

function checkGameOver()
{
    if(gameOver == false && dino != null && cactus != null && bird != null)
    {
        //get is dinosaur jumping
        //const dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));
        const dinoTop = getChecker(dino, "top");

        //get cactus position
        //let cactusleft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));
        const cactusleft = getChecker(cactus, "left");

        //get bird position
        //let birdleft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"));
        const birdleft = getChecker(bird, "left");

        //detect cactus collision
        if(dinoTop >= 150 && Math.abs(cactusleft) < 7 || dinoTop <= 55 && Math.abs(birdleft) < 11)
        {
            //end game
            console.log("player died!");
            setText("Final Score: " + score + "! Click To Play Again!");
            gameOver = true;

            //reset player
            removeJump();
            
            //reset cactus
            removeObstacles();
        }

        // old implementation where we check bird collision seperately, now it's an or statement
        /*if(dinoTop <= 55 && Math.abs(birdleft) < 11)
        {
            //end game
            console.log("player died!");
            setText("Final Score: " + score + "! Click To Play Again!");
            gameOver = true;

            //reset player
            removeJump();
            
            //reset cactus
            removeObstacles();
        }*/
    }
}


function startGame()
{
    console.log("Game started!")
    gameOver = false
    score = 0
    cactus?.classList.add("cactusMove")
    bird?.classList.add("birdMove")
}

function setText(s: string)
{
    if(scoreText)
    {
        scoreText.textContent = s
    }
}
