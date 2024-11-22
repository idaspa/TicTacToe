//#region
import * as readlinePromises from "node:readline/promises";
const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout
});
//#endregion
/*
let brett = [
    [1, -1, 1],
    [-1, -1, -1],
    [1, 1, 0],
];*/

import ANSI from "./ANSI.mjs"

let brett = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

//#region Logikken for spillet tre på rad. --------------------------------------------------------

const spiller1 = 1;
const spiller2 = -1;

let resultatAvSpill = "";
let spiller = spiller1;
let isGameOver = false

while (isGameOver == false) {

    console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    visBrett(brett);
    console.log(`Det er spiller ${spillerNavn()} sin tur`)

    let rad = -1;
    let kolone = -1;

    do {
        let pos = await rl.question("Hvor setter du merket ditt? ");
        [rad, kolone] = pos.split(",")
        rad = rad - 1;
        kolone = kolone - 1;
    } while (brett[rad][kolone] != 0)

    brett[rad][kolone] = spiller;

    vinner = harNoenVunnet(brett);
    if (vinner != 0) {
        isGameOver = true;
        resultatAvSpill = `Vinneren er ${spillerNavn(vinner)}`;
    } else if (erSpilletUavgjort(brett)) {
        resultatAvSpill = "Det ble uavgjort";
        isGameOver = true;
    }

    byttAktivSpiller();
}

console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
visBrett(brett);
console.log(resultatAvSpill);
console.log("Game Over");
process.exit();

//#endregion---------------------------------------------------------------------------------------

function harNoenVunnet(brett) {

    for (let rad = 0; rad < brett.length; rad++) {
        let sum = 0;
        for (let kolone = 0; kolone < brett.length; kolone++) {
            sum += brett[rad][kolone];
        }

        if (Math.abs(sum) == 3) {
            return sum / 3;
        }
    }

    for (let kolone = 0; kolone < brett.length; kolone++) {
        let sum = 0;
        for (let rad = 0; rad < brett.length; rad++) {
            sum += brett[rad][kolone];
        }

        if (Math.abs(sum) == 3) {
            return sum / 3;
        }
    }

    return 0;
}

function erSpilletUavgjort(brett) {

    // Dersom alle felter er fylt så er spillet over. 
    for (let rad = 0; rad < brett.length; rad++) {
        for (let kolone = 0; kolone < brett[rad].length; kolone++) {
            if (brett[rad][kolone] == 0) { // Dersom vi finner 0 på rad,kolonne så er ikke brettet fylt.
                return false;
            }
        }
    }

    return true;

}

function visBrett(brett) {

    let visningAvBrett = "";
    for (let i = 0; i < brett.length; i++) {
        const rad = brett[i];
        let visningAvRad = "";
        for (let j = 0; j < rad.length; j++) {
            let verdi = rad[j];
            if (verdi == 0) {
                visningAvRad += "_ ";
            } else if (verdi == spiller1) {
                visningAvRad += ANSI.COLOR.GREEN + "X " + ANSI.COLOR_RESET;
            } else {
                visningAvRad += ANSI.COLOR.RED + "O " + ANSI.COLOR_RESET;
            }
        }
        visningAvRad += "\n";
        visningAvBrett += visningAvRad;
    }

    console.log(visningAvBrett);

}

function spillerNavn(sp = spiller) {
    if (sp == spiller1) {
        return "Spiller 1(X)";
    } else {
        return "Spiller 2(O)";
    }
}

function byttAktivSpiller() {
    spiller = spiller * -1;
    /* if (spiller == spiller1) {
         spiller = spiller2
     } else {
         spiller = spiller1;
     }*/
}
