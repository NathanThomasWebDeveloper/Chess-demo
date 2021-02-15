export const boardSpecs = (() => {
    let color: "#7d8796" | "#e8ebef" = "#e8ebef"
    let x = 1
    let y = 9
    return Array(64).fill("").map((square, index) => {

        const switchColor = () => {
            if (color === "#7d8796") {
                color = "#e8ebef"
            } else {
                color = "#7d8796"
            }
        }
        switchColor()
        if (index % 8 === 0) {
            switchColor()
            y--
            x = 1
        }
        const obj = {
            color,
            position: ([x, y] as [number, number])
        }
        x++
        return obj
    })
})()

type PlacementContraints = {
    [key: string]: number[][];
};

export const placementContraints: PlacementContraints = {
    // not 1st nor 8th row
    PAWN: [...Array(8).fill(null).map((position, index) => [1 + index, 8]),
        ...Array(8).fill(null).map((position, index) => [1 + index, 1])]
}