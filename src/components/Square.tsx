import {square} from "./Square.test";
import styles from './Square.module.scss'

const Square: square = ({color, pieceSelected = false, highlighted = false, position}) => {
    const className = `${styles.Square} ${pieceSelected && styles.Selected}`
    return (
        <div data-test={"board-square"} data-position={position} style={{backgroundColor: color}} className={className}>
            {highlighted && (<div className={styles.Highlighted} data-test={"square-highlight"}/>)}
        </div>)
}
export default Square