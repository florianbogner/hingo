import { jsPDF } from "jspdf"
import { Heuristic } from "./Heuristic";
import { Languages } from "./components/Toggle";

export function renderPdf(heuristicList: Heuristic[], language: Languages) {
    const doc = new jsPDF()

    doc.setFontSize(14);
    let textBuffer = ""

    heuristicList.forEach((heuristic) => {
        switch (language) {
            case "german": {
                textBuffer = doc.splitTextToSize(`${heuristic.nameDe}\n\n${heuristic.subtitleDe}\n\n${heuristic.bodyDe}\n\nBrainstorming:`, 160)
                doc.text(textBuffer, 20, 25)
                doc.addPage()
                break
            }
            default: {
                textBuffer = doc.splitTextToSize(`${heuristic.nameEn}\n\n${heuristic.subtitleEn}\n\n${heuristic.bodyEn}\n\nBrainstorming:`, 160)
                doc.text(textBuffer, 20, 25)
                doc.addPage()
                break
            }
        }
    })

    doc.deletePage(heuristicList.length + 1)

    doc.save("hingo-output.pdf")
}