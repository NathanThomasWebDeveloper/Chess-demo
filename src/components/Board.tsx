import React, {RefObject} from 'react';
import styles from './Board.module.scss'
import {boardSpecs} from '../constants';
import Square from "./Square";
import Piece from "./Piece";
import {board} from "./Board.test";
import useResizer from "../hooks/useResizer";
import usePieceActions from "../hooks/usePieceActions";

const Board: board = ({piecesToRender}) => {

    const [ref, boardSize, squareSize] = useResizer()
    const [piecesToRenderWithEmitters, highlightedPositions] = usePieceActions(piecesToRender)

    const pieceElements = squareSize && piecesToRenderWithEmitters && piecesToRenderWithEmitters.map(({...props}) =>
        <Piece key={props.name + props.position[0] + props.position[1]} {...props} squareSize={squareSize}/>)
    return (<>
            <div
                ref={ref as string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined}
                data-test={"component-container"} className={styles.Container}>
                <div data-test={"component-board"} style={{height: boardSize, width: boardSize}}
                     className={styles.Board}>
                    {boardSpecs.map((boardSpec, index) => {
                        const highlighted = Boolean(highlightedPositions.find(position => position[0] === boardSpec.position[0] && position[1] === boardSpec.position[1]))
                        return (
                            <Square key={boardSpec.color + index} color={boardSpec.color} highlighted={highlighted} position={boardSpec.position}/>
                        )
                    })}
                </div>
                {pieceElements}
            </div>
        </>
    )
}
export default Board