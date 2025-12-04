// Add a centered h1 element with the text "ENTETE" inside the header element
let entete = document.querySelector("header");
let h1_header = document.createElement("h1");

h1_header.style.textAlign = "center";
entete.appendChild(h1_header).textContent = "ENTETE";

// Add a centered h1 element with the text "PIED DE PAGE" inside the footer element
let pied_de_page = document.querySelector("footer");
let h1_footer = document.createElement("h1");

h1_footer.style.textAlign = "center";
pied_de_page.appendChild(h1_footer).textContent = "PIED DE PAGE";

// Style the nav element to have a width of 20% and the other elements to use flexbox layout
let main = document.querySelector("main");
main.style.display = "flex";

let nav = document.querySelector("nav");
nav.style.width = "20vw";

// Change the background color of each section element to a random RGB color
function getRandomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + "," + green + "," + blue + ")";
}

// Change color of all title
let h1_list = document.querySelectorAll("h1");
h1_list.forEach((h1) => {
    h1.addEventListener("mouseover", () => {
        h1.style.color = getRandomColor();
    });

    // Change background color of all the parent of the titles

    h1.parentNode.addEventListener("mouseleave", () => {
        h1.parentNode.style.backgroundColor = getRandomColor();
    });
});

// Function that returns a string composed of the word "auto" repeated nb times
function getChaineAuto(nb) {
    if (isNaN(nb)) return;
    nb = parseInt(nb);

    let chaine = "";
    for (let i = 0; i < nb - 1; i++) {
        chaine += "auto ";
    }
    return (chaine += "auto");
}

let nc = 100; // Number of columns
let nr = 100; // Number of rows

// Display the grid
let affichage_grille = document.querySelectorAll(".affichageGrille");
affichage_grille.forEach((element) => {
    element.style.display = "grid";
    element.style.flex = "1";
    element.style.gridTemplateColumns = getChaineAuto(nc);
    element.style.gridTemplateRows = getChaineAuto(nr);
});

// Create a case with a random background color and add it to the grid display
function createElement() {
    let aCaseClone = document.createElement("div");
    let caseColor = getRandomColor();

    affichage_grille.forEach((element) => {
        let aCase = document.createElement("div");
        element.appendChild(aCase);
        aCase.style.backgroundColor = caseColor;

        // Center the case in the grid
        aCase.style.gridColumnStart = nc / 2;
        aCase.style.gridRowStart = nr / 2;
        aCase.style.gridColumnEnd = nc / 2 + 1;
        aCase.style.gridRowEnd = nr / 2 + 1;
    });

    // Add the cloned case to the nav
    aCaseClone.style.backgroundColor = caseColor;

    aCaseClone.style.width = "30px";
    aCaseClone.style.height = "30px";
    aCaseClone.style.float = "left";
    nav.appendChild(aCaseClone);

    // Handle double click to remove the case from the grid and nav
    function removeElement() {
        affichage_grille.forEach((element) => {
            let aCase = element.lastChild;

            element.removeChild(aCase);
        });
        nav.removeChild(aCaseClone);
    }

    affichage_grille.forEach((element) => {
        let aCase = element.lastChild;
        aCase.addEventListener("dblclick", removeElement);
    });
    aCaseClone.addEventListener("dblclick", removeElement);
}

let button = document.querySelector("button");
button.addEventListener("click", createElement);

// Move the case in the grid
function getRandomMove(pos, dimension) {
    pos = parseInt(pos);
    let newPos = 0;
    do {
        let move = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
        newPos = pos + move;
    } while (newPos < 1 || newPos >= dimension);
    return newPos;
}

function randomMoves() {
    let cases = document.querySelectorAll(".affichageGrille div");
    let caseXposInitial = 0;
    let caseYposInitial = 0;

    cases.forEach((aCase) => {
        caseXposInitial = aCase.style.gridRowStart;
        caseYposInitial = aCase.style.gridColumnStart;

        newXpos = getRandomMove(caseXposInitial, nr);
        newYPos = getRandomMove(caseYposInitial, nc);

        aCase.style.gridRowStart = newXpos;
        aCase.style.gridColumnStart = newYPos;
        aCase.style.gridRowEnd = newXpos + 1;
        aCase.style.gridColumnEnd = newYPos + 1;
    });
}

setInterval(randomMoves, 100);
