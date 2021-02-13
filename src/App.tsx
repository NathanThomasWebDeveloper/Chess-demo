import Board from "./components/Board";
import {Color, PieceName} from "./typescript/types";
import PieceButton from "./components/PieceButton";
import styles from './App.module.scss'

function App() {

    interface pieceToRender {
        name: PieceName,
        position: [number, number],
        color: Color
    }

    interface Props {
        piecesToRender: pieceToRender[]
    }
    const defaultProps: Props = { // fixme delete export
        piecesToRender: [{
            name: "PAWN",
            position: ([3, 7] as [number, number]),
            color: "BLACK"
        }
        ]
    }

    return (
        <div data-test={"App"} className={styles.App}>
            <Board {...defaultProps} />
            <PieceButton />
        </div>
    );
}

export default App;
