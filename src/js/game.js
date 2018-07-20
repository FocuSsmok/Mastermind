const MYAPP = {};

MYAPP.colors = {
    red: "#C30101",
    green: "#36802D",
    blue: "#107DAC",
    yellow: "#E9D700",
    orange: "#FF4D00",
    purple: "#660066",
    mediumSpringGreen: "#00FA9A",
    sandyBrown: "#F4A460"
};
MYAPP.colorsNames = ["red", "green", "blue", "yellow", "orange", "purple", "mediumSpringGreen", "sandyBrown"];
MYAPP.properly = [];
MYAPP.answearColors = [];
MYAPP.buttons = {};
MYAPP.bullets = {};
MYAPP.bullets.node = document.querySelector(".choice__colors");
MYAPP.chances = {};
MYAPP.chances.activeBullet = {};
MYAPP.chances.activeRow = {};
MYAPP.chances.indexOfRow = 0;
MYAPP.chances.node = [];
MYAPP.dialogWindow = document.querySelector(".dialog-window");

(function() {
    const buttons = document.querySelectorAll('.btn');
    const chances = document.querySelectorAll('.chance__row');
    MYAPP.properly = document.querySelectorAll('.properly__bullet');
    for (let i = 0; i < buttons.length; i++) {
        MYAPP.buttons[buttons[i].id] = buttons[i];
    }
    for (let i = chances.length - 1, j = 0; i >= 0; i--) {
        MYAPP.chances.node[i] = chances[j];
        j++;
    }
})(); 


const chooseColor = function(e) {
    // console.log(e.target);
    if(e.target.dataset.index) {
        MYAPP.bullets.activeBullet = e.target;
    } else {
        return;
    }
};

const changeColor = function(e) {
    if (e.target.dataset.click) {
        // console.log(e.target);
        const el = e.target;
        if (MYAPP.bullets.activeBullet) {
            // console.log("click");
            el.style.backgroundColor = MYAPP.colors[MYAPP.bullets.activeBullet.dataset.color];
            el.dataset.color = MYAPP.bullets.activeBullet.dataset.color;
        }
    } else {
        return;
    }
};

const randomColors = function() {
    const colors = [];
    for (let i = 0; i < 4 ; i++) {
        colors[i] = MYAPP.colorsNames[Math.floor(Math.random() * 8)];
    }
    return colors;
};

const finish = function(e) {
    window.location.reload();
};

const checkWinOrLose = function(result) {
    for (let i  = 0; i < MYAPP.properly.length; i++) {
        MYAPP.properly[i].style.backgroundColor = MYAPP.colors[MYAPP.answearColors[i]];
    }
    const dialogWindowChild = MYAPP.dialogWindow.firstElementChild;
    dialogWindowChild.parentElement.classList.remove("dialog-window--hidden");
    if (result === "win") {
        dialogWindowChild.firstElementChild.textContent = `You ${result}`;
    } else if(result === "lose") {
        dialogWindowChild.firstElementChild.textContent = `You ${result}`;
    }
    dialogWindowChild.firstElementChild.nextElementSibling.addEventListener("click", finish);
};

const updateHints = function(node, hints) {
    // console.log(node);
    let hittedHints = 0;
    for (let i = 0; i < hints.length; i++) {
        if (hints[i] === 1) {
            node.children[i].classList.add("chance__hint--hitted");
            hittedHints += 1;
        } else if (hints[i] === 2) {
            node.children[i].classList.add("chance__hint--almost");
        }
    }
    if (hittedHints === 4) {
        //win
        checkWinOrLose("win");
    } else if(hittedHints < 4 && MYAPP.chances.indexOfRow === 8) {
        //Lose
        checkWinOrLose("lose");
    }
};

const checkResult = function(activeNode) {
    // console.dir(activeNode);
    // console.log(MYAPP.answearColors);
    const properlyAnwears = [...MYAPP.answearColors];
    const yourAnswer = [];
    for (let i = 0; i < activeNode.children.length; i++) {
        const child = activeNode.children[i];
        yourAnswer[i] = child.dataset.color || "";
    }
    const result = [];

    for (let i = 0; i < yourAnswer.length; i++) {
        if (properlyAnwears[i] === yourAnswer[i]) {
            result.push(1);
            properlyAnwears[i] = "removed";
        } else {
            result.push(3);
        }
    }
    for (let i = 0; i < yourAnswer.length; i++) {
        if (result[i] !== 1 && result[i] !== 2) {
            for (let j = 0; j < yourAnswer.length; j++) {
                if (yourAnswer[i] === properlyAnwears[j]) {
                    result[i] = 2;
                    properlyAnwears[j] = "removed";
                    break;
                } 
            }
        }
    }
    result.sort(function(a, b) {
        return a - b;
    });
    updateHints(activeNode.nextElementSibling, result);
};

const testAnswear = function(e) {
    e.preventDefault();
    const node = MYAPP.chances.activeRow.firstElementChild;
    checkResult(node);
    let index = 0;
    MYAPP.chances.activeRow.firstElementChild.removeEventListener("click", changeColor);
    if (index < 9) {
        index = ++MYAPP.chances.indexOfRow;
    }

    MYAPP.chances.activeRow = MYAPP.chances.node[index];
    MYAPP.chances.activeRow.firstElementChild.addEventListener("click", changeColor);

};

const init = function(e) {
    e.preventDefault();
    this.disabled = true;
    let colors = randomColors();
    for (let i = 0; i < colors.length; i++) {
        MYAPP.answearColors[i] = colors[i];
    }
    MYAPP.bullets.node.addEventListener("click", chooseColor);
    MYAPP.buttons.check.disabled = false;
    MYAPP.buttons.check.classList.remove("btn__check--disabled");
    MYAPP.chances.activeRow = MYAPP.chances.node[0];
    // console.log(MYAPP.chances.activeRow.firstElementChild);
    MYAPP.chances.activeRow.firstElementChild.addEventListener('click', changeColor);
    MYAPP.buttons.check.addEventListener('click', testAnswear);
};

MYAPP.buttons.start.addEventListener('click', init);
MYAPP.buttons.finish.addEventListener("click", finish);