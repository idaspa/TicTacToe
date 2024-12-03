import ANSI from "./ANSI.mjs";
import dictionary from "./dictionary.mjs";




const SPILLER1 = 1;
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

export default visBrett 