//#region
import dictionary from "./dictionary.mjs";
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

const SPILLER1 = 1;
let resultatAvSpill = "";
let spiller = SPILLER1;
let isGameOver = false;
let spill1Navn = "Spiller 1";
let spill2Navn = "Spiller 2";

await restart();


while (isGameOver == false) {


    console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
    visBrett(brett);

    if (spiller == 1) {
        console.log(`${dictionary.no.spiller} ${spill1Navn} ${dictionary.no.tur}`);
    } else {
        console.log(`${dictionary.no.spiller} ${spill2Navn} ${dictionary.no.tur}`);
    }

    let rad = -1;
    let kolone = -1;

    do {
        let pos = await rl.question(dictionary.no.valgAvMerke);

        if (pos == dictionary.no.quit) {
            process.exit();
        }


        if (pos == dictionary.no.restartGame) {
            console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
            await restart()
        }
        if (pos == dictionary.no.help) {
            console.log(`${dictionary.no.help}`);
        }

        [rad, kolone] = pos.split(" ").map(Number)
        rad = rad - 1;
        kolone = kolone - 1;
        if (pos.match(/[^\d]/g)) {
            break;
        }
    } while (brett[rad][kolone] != 0);
    if (brett[rad] && brett[rad][kolone] !== false) {
        brett[rad][kolone] = spiller;

        let vinner = harNoenVunnet(brett);
        if (vinner != 0) {
            isGameOver = true;
            resultatAvSpill = (`${dictionary.no.vinneren} ${spillerNavn(vinner)}`);
        } else if (erSpilletUavgjort(brett)) {
            resultatAvSpill = dictionary.no.uavgjort;
            isGameOver = true;
        }

        byttAktivSpiller();
    }
}

console.log(ANSI.CLEAR_SCREEN, ANSI.CURSOR_HOME);
visBrett(brett);
console.log(resultatAvSpill);
console.log("Game Over");
process.exit();

//#endregion---------------------------------------------------------------------------------------

function harNoenVunnet(brett) {

    //vannrett
    for (let rad = 0; rad < brett.length; rad++) {
        let sum = 0;
        for (let kolone = 0; kolone < brett.length; kolone++) {
            sum += brett[rad][kolone];
        }

        if (Math.abs(sum) == 3) {
            return sum / 3;
        }
    }

    //loddrett
    for (let kolone = 0; kolone < brett.length; kolone++) {
        let sum = 0;
        for (let rad = 0; rad < brett.length; rad++) {
            sum += brett[rad][kolone];
        }

        if (Math.abs(sum) == 3) {
            return sum / 3;
        }
    }

    let sum = brett[0][0] + brett[1][1] + brett[2][2];
    if (Math.abs(sum) == 3) {
        return sum / 3;
    }
    sum = brett[0][2] + brett [1][2] + brett[2][0];
    if(Math.abs(sum) == 3) {
        return sum / 3;
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

    let visningAvBrett = `    1   2   3 ` + `\n`;
    visningAvBrett += "  ╔═══╦═══╦═══╗ \n";

    for (let i = 0; i < brett.length; i++) {
        visningAvBrett += (i + 1) + " ║";

        for (let j = 0; j < brett.length; j++) {
            let verdi = brett[i][j];
            if (verdi == 0) {
                visningAvBrett += "   ║"
            } else if (verdi == SPILLER1) {
                visningAvBrett += ANSI.COLOR.GREEN + dictionary.no.spillerMerke1 + ANSI.COLOR_RESET + `║`;
            } else {
                visningAvBrett += ANSI.COLOR.RED + dictionary.no.spillerMerke2 + ANSI.COLOR_RESET + `║`;
            }
        }
        visningAvBrett += "\n";

        if (i < brett.length - 1) {
            visningAvBrett += "  ╠═══╬═══╬═══╣\n";
        } else {
            visningAvBrett += "  ╚═══╩═══╩═══╝\n";
        }
    }
    console.log(visningAvBrett);
}

async function restart() {
    isGameOver = false;
    resultatAvSpill = "";
    spiller = SPILLER1;

    spill1Navn = await rl.question("Enter Navn...: ");
    spill2Navn = await rl.question("Enter Navn...: ");


    brett = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
    //visBrett(brett);
}

function spillerNavn(sp = spiller) {
    if (sp == SPILLER1) {
        return spill1Navn;
    } else {
        return spill2Navn;
    }
}

function byttAktivSpiller() {
    spiller = spiller * -1;
    // spiller = spiller2 *1;
    /* if (spiller == spiller1) {
         spiller = spiller2
     } else {
         spiller = spiller1;
     }*/
}
