import {square} from "./Square.test";

const Square: square = ({color, children}) => {
    return (<div data-test={"board-square"} style={{backgroundColor: color}} className={"Square"}>{children}</div>)
}
export default Square