

const arr = [
    { x: 0, y: 0, color: 12 },
    { x: 0, y: 1, color: 12 },
    { x: 1, y: 1, color: 12 },
    { x: 1, y: 0, color: 12 }
]

const ArrayOfArrays = []
const dimension = 1

for (let i = 0; i < dimension; i++) {

    let array = []


    for (let j = 0; j < arr.length; j++) {
        if (i == arr[j].y) {
            array.push(arr[j])
        }
    }

    ArrayOfArrays.push(i % 2 === 0 ?
        array.sort(function (a, b) {
            return a.x - b.x;
        }) : array.sort(function (a, b) {
            return b.x - a.x;
        }))

}





console.log(ArrayOfArrays)
