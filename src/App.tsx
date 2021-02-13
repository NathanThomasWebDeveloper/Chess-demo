import Board from "./components/Board";
import {Color, PieceName} from "./typescript/types";

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
        <div data-test={"App"} className="App">
            <Board {...defaultProps} />
        </div>
    );
}

export default App;
