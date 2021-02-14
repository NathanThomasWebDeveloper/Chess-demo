import Board from "./components/Board";
import {PieceName, pieceToRender} from "./typescript/types";
import PieceButton from "./components/PieceButton";
import styles from './App.module.scss'
import {useState} from "react";
import {placementContraints} from "./constants";


function App() {

    const [pieces, setPieces] = useState<null | pieceToRender[]>([{
        name: "PAWN",
        position: ([3, 7] as [number, number]),
        color: "BLACK"
    }]);

    interface ClickHandler {
        (pieceName: PieceName): void
    }

    const clickHandler: ClickHandler = (pieceName) => {

        setPieces((prevPieces: pieceToRender[] | null): pieceToRender[] => {

                interface FindLocation {
                    (notIn: false | [number, number][]): [number, number]
                }

                const findLocation: FindLocation = (notIn) => {

                    const location: [number, number] = [
                        Math.floor(Math.random() * 8) + 1
                        , Math.floor(Math.random() * 8) + 1
                    ]
                    if (!notIn) {
                        return location
                    }

                    // if in list of excluded, create another location
                    if (notIn.find(forbiddenLocation => forbiddenLocation[0] === location[0] && forbiddenLocation[1] === location[1]) !== undefined) {
                        return findLocation(notIn)
                    }

                    if (prevPieces !== null) {
                        // if occupied, create another location
                        const occupiedPositions = prevPieces.reduce((acc: [number, number][], prevPiece: pieceToRender): typeof acc => {
                            acc.push(prevPiece.position)
                            return acc
                        }, [])
                        if (occupiedPositions.find(forbiddenLocation => forbiddenLocation[0] === location[0] && forbiddenLocation[1] === location[1]) !== undefined) {
                            return findLocation(notIn)
                        }
                    }
                    return location

                }

                let placementContraint: false | [number, number][] = false;

                if (placementContraints.hasOwnProperty(pieceName)) {
                    placementContraint = (placementContraints[pieceName] as [number, number][])
                }

                const newPiece: pieceToRender = {
                    name: "PAWN",
                    position: findLocation(placementContraint),
                    color: "WHITE"
                }

                if (prevPieces) {
                    return [...prevPieces,
                        newPiece
                    ]
                } else {
                    return [newPiece]
                }


            }
        )
    }

    const props = {click: (pieceName: PieceName) => clickHandler(pieceName)}
    return (
        <div data-test={"App"} className={styles.App}>
            {pieces && (<Board piecesToRender={pieces}/>)}
            <PieceButton {...props} />
        </div>
    );
}

export default App;
