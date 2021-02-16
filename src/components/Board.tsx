import React, {MutableRefObject} from 'react';
import styles from './Board.module.scss'
import {boardSpecs} from '../constants';
import Square from "./Square";
import Piece from "./Piece";
import {board} from "./Board.test";
import useResizer from "../hooks/useResizer";
import usePieceActions from "../hooks/usePieceActions";

const Board: board = ({piecesToRender}) => {

    const [ref, boardSize, squareSize, top, left] = useResizer()
    const [piecesToRenderWithEmitters, highlightedPositions] = usePieceActions(piecesToRender)

    const pieceElements = squareSize && top && left && piecesToRenderWithEmitters && piecesToRenderWithEmitters.map(({...props}) =>
        <Piece key={props.name + props.position[0] + props.position[1]} {...props} topOffset={top} leftOffset={left} squareSize={squareSize}/>)
    return (<>
            <div
                ref={(ref as MutableRefObject<any>)}
                data-test={"component-container"} className={styles.Container}>
                <div data-test={"component-board"} style={{height: boardSize, width: boardSize}}
                     className={styles.Board}>
                    {boardSpecs.map((boardSpec, index) => {
                        const highlighted = highlightedPositions ? Boolean(highlightedPositions.find(position => position[0] === boardSpec.position[0] && position[1] === boardSpec.position[1])) : false
                        return (
                            <Square key={boardSpec.color + index} color={boardSpec.color} highlighted={highlighted}
                                    position={boardSpec.position}/>
                        )
                    })}
                </div>
                {pieceElements}
            </div>
        </>
    )
}
export default Board