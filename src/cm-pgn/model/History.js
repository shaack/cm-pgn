/**
 * Author: shaack
 * Date: 07.03.2018
 */
export class History {
    read(historyString) {
        const parsed = parser.parse(historyString);
        console.log("parsed", parsed);
    }
}