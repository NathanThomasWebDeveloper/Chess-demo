import styles from './PieceButton.module.scss'
import {pieceButton} from "./PieceButton.test";
import Pawn from '../assets/images/pawn.svg';

const PieceButton: pieceButton = ({click}) => {
    return (<div data-test={"component-pieceButton"} className={styles.PieceButton}>
        <h1>Select a Piece to Add</h1>
        <p>The piece will appear in a valid random square on the board.</p>
        <div className={styles.ButtonContainer}>
            <button onClick={() => click("PAWN")}>
                <img src={Pawn} alt={"Create Pawn"}/>
            </button>
            <h3>Pawn</h3>
        </div>
    </div>)
}
export default PieceButton