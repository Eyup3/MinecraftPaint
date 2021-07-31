module.exports = (data) => {
    val = JSON.parse(data)


    const output = []


    val.forEach(element => {
        const x = Math.round(element.x / element.width);
        const y = Math.round(element.y / element.height);
        const found = output.find(item => item.x === x && item.y === y);

        if (found) {
            found.color = mapColorToBlock(element.color);
        } else {
            output.push({
                x: x,
                y: y,
                color: mapColorToBlock(element.color)
            })
        }
    });



    //TODO: Aus dem Array einen Code machen den der Comp verstehen kann
    //TODO: Eine Block = Farbpalette erstellen
    return output

}

const LISTOFCOLORS = {
    white: 1,
    orange: 2,
    magenta: 3,
    dodgerblue: 4,
    yellow: 5,
    lime: 6,
    pink: 7,
    gray: 8,
    lightgray: 9,
    cyan: 10,
    purple: 11,
    blue: 12,
    SaddleBrown: 13,
    green: 14,
    red: 15,
    black: 16
}

const mapColorToBlock = (color) => {
    for (var key in LISTOFCOLORS) {
        if (key == color) {

            console.log("retunri " + key)
            return LISTOFCOLORS[key]
        }
    }
}