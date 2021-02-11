interface Props {
    color: string
}

interface square {
    (props: Props): JSX.Element
}

const Square: square = ({color}) => {
    return (<div data-test={"board-square"} style={{backgroundColor: color}} className={"Square"}></div>)
}
export default Square