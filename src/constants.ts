export const boardColors = (() => {
    let color: "#7d8796" | "#e8ebef" = "#e8ebef"
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
        }
        return color

    })
})()