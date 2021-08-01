module.exports = (data) => {
    val = JSON.parse(data)


    const output = []

    let HighestNumber = 0

    val.forEach(element => {
        const x = Math.round(element.x / element.width);
        const y = Math.round(element.y / element.height);


        //Stop Duplicates
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


        //Calculate dimensions
        if (x > HighestNumber) {
            HighestNumber = x;
        }
        if (y > HighestNumber) {
            HighestNumber = y;
        }
        console.log("Highest Number " + HighestNumber)

    });
    //End of foreach


    //sorting
    const all = []

    for (let i = 0; i < HighestNumber + 1; i++) {
        let array = []

        for (let j = 0; j < output.length; j++) {
            if (i == output[j].y) {
                array.push(output[j])
            }

        }

        all.push(i % 2 === 0 ?
            array.sort(function (a, b) {
                return a.x - b.x;
            }) : array.sort(function (a, b) {
                return b.x - a.x;
            }))

    }


    return all.flat()

}


const mapColorToBlock = (color) => {
    for (var key in LISTOFCOLORS) {
        if (key == color) {
            return LISTOFCOLORS[key]
        }
    }
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