
//Add All Letters
let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ+#";

let arrayLeters = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

arrayLeters.forEach(letter=> {
    let span = document.createElement("span");
    let lett = document.createTextNode(letter);
    span.appendChild(lett);
    span.className = "letter-box"
    lettersContainer.appendChild(span);
})


// fetch data from json 
fetch("./data.json").then((res)=>{
    let myData = res.json();
    return myData;
}).then(words=>{
    let allKyes = Object.keys(words)
    //get random number depend array of keys length
let randomPropNUmber = Math.floor(Math.random() * allKyes.length);
//get random name depend random number 
let randomPropName = allKyes[randomPropNUmber];

//get array of category items from random name
let randomkeyValue = words[randomPropName];

// get random number from random value key 
let randomValueNumber = Math.floor(Math.random() * randomkeyValue.length);

//get chosen word
let randomArrayValue = randomkeyValue[randomValueNumber];


//set the category value
document.querySelector(".game-info .category span").innerHTML = randomPropName;

 
// create ketter guess
let lettersGuess = document.querySelector(".letters-guess");



// get status 
let getStatus = false;

let arrOfWord = Array.from(randomArrayValue);
console.log(arrOfWord)
arrOfWord.forEach(letter => {
    let emptySpan = document.createElement("span");
    if(letter === ` `) {
        emptySpan.className = "space"
    }
    lettersGuess.appendChild(emptySpan);
})

// select span guess letter 
let guessSpans = document.querySelectorAll(".letters-guess span");


// selct draw element 
let theDraw = document.querySelector(".hangman-draw .the-draw")


//select voices
let win = document.getElementById("win");
let lose = document.getElementById("lose");
let over = document.getElementById("over");
let cong = document.getElementById("cong");

// set count wron value 
let wrongCount = 0;
let winCount = 0;
//get clicked letter
document.addEventListener("click", (e)=> {
    getStatus = false;
    if(e.target.className == "letter-box") {
        e.target.classList.add("clicked");

        let clickedLetter = e.target.innerHTML.toLowerCase();
        let chosenWord = Array.from(randomArrayValue.toLowerCase());
        
        //compare chosen letters
        chosenWord.forEach((wordletter, indexWord)=> {
            if (wordletter == clickedLetter) {
                winCount++;
                getStatus = true;
                win.play()
                guessSpans.forEach((span, indexSpan)=>{
                if (indexSpan === indexWord) {
                    span.innerHTML = clickedLetter;
                }
            })
        }
    })
    if(getStatus != true) {
        wrongCount++;
        lose.play();
        theDraw.classList.add(`wrong-${wrongCount}`);
    }
    if(wrongCount >= 8) {
        over.play();
        createPopUp();
        setTimeout(_=> {
            document.querySelector(".popUp").remove();
            document.querySelector(".overLay").remove();
        } ,10000)
        lettersContainer.classList.add("loser")
    }


    if (winCount === chosenWord.length) {
        win.play();
        createPopUp2();
        setTimeout(_=> {
            document.querySelector(".popUp2").remove();
            document.querySelector(".overLay").remove();
        } ,10000);
        setTimeout(_=> {
            window.location.href = "http://127.0.0.1:5500/index.html"
        } ,3000);
    }
}

function createPopUp() {
    let letter = document.createElement("div");
    letter.className = 'popUp';
    letter.innerHTML = `Game over, The word is : <strong style="color:black">${randomArrayValue}</strong> `;
    let overLay = document.createElement("div");
    overLay.className = "overLay";
    let close = document.createElement("span");
    close.className = "close";
    close.addEventListener("click", _=> {
        letter.remove();
        overLay.remove();
    })
    let button = document.createElement("button");
    button.innerHTML = `<a href="https://instagram.com/abd_o_el_?igshid=MzMyNGUyNmU2YQ==">Follow Me</a>`;
    
    letter.appendChild(close);
    letter.appendChild(button);
    document.body.appendChild(overLay);
    document.body.appendChild(letter);
}


function createPopUp2() {
    let letter = document.createElement("div");
    letter.className = 'popUp2';
    letter.innerHTML = `Congratulation : <strong style="color:black">${randomArrayValue}</strong> `;
    let overLay = document.createElement("div");
    overLay.className = "overLay";
    let close = document.createElement("span");
    close.className = "close";
    close.addEventListener("click", _=> {
        letter.remove();
        overLay.remove();
    })
    let button = document.createElement("button");
    button.innerHTML = `<a href="https://instagram.com/abd_o_el_?igshid=MzMyNGUyNmU2YQ==">Follow Me</a>`;
    
    letter.appendChild(close);
    letter.appendChild(button);
    document.body.appendChild(overLay);
    document.body.appendChild(letter);
}
})
})


