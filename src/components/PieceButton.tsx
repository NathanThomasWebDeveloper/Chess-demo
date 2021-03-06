import styles from './PieceButton.module.scss'
import {pieceButton} from "./PieceButton.test";
import Pawn from '../assets/images/pawn.svg';
import {useState} from "react";

const PieceButton: pieceButton = ({click}) => {
    const [pawnCount, setCount] = useState(0)
    return (<div data-test={"component-pieceButton"} className={styles.PieceButton}>
        <h1>Select a Piece to Add</h1>
        <p>The piece will appear in a valid random square on the board.</p>
        <div data-test={'piece-button-container'} className={styles.ButtonContainer}>
            <button data-test={"button-create button-create-pawn"} onClick={pawnCount < 8 ? () => {
                click("PAWN")
                setCount(pawnCount + 1)
            } : () => {
            }}>
                <img src={Pawn} alt={"Create Pawn"}/>
            </button>
            <h3>Pawn{pawnCount > 0 && ` (${pawnCount})`}</h3>
        </div>
    </div>)
}
export default PieceButton