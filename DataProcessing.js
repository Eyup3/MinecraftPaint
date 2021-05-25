module.exports = (data) => {
    val = JSON.parse(data)


    const output = []


    val.forEach(element => {

        output.push({
            x: Math.round(element.x / element.width),
            y: Math.round(element.y / element.height),
            color: mapColorToBlock(element.color)

        })
    });




    //TODO: Aus dem Array einen Code machen den der Comp verstehen kann
    //TODO: Eine Block = Farbpalette erstellen
    return output

}


const mapColorToBlock = (color) => {
    switch (color) {
        case "red":
            return "1"
            break;
        case "blue":
            return "2"
            break;
        case "white":
            return "3"
            break;
    }
}