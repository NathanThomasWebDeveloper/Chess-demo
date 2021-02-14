import React, {RefObject} from 'react';
import styles from './Board.module.scss'
import {boardColors} from '../constants';
import Square from "./Square";
import Piece from "./Piece";
import {board} from "./Board.test";
import useResizer from "../hooks/useResizer";
import usePieceActions from "../hooks/usePieceActions";


const Board: board = ({piecesToRender}) => {

    const [ref, boardSize, squareSize] = useResizer()
    const [piecesToRenderWithEmitters] = usePieceActions(piecesToRender)
    const pieceElements = squareSize && piecesToRenderWithEmitters && piecesToRenderWithEmitters.map(({...props}) =>
        <Piece key={props.name + props.position[0] + props.position[1]} {...props} squareSize={squareSize}/>)
    return (<>
            <div
                ref={ref as string | ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined}
                data-test={"component-container"} className={styles.Container}>
                <div data-test={"component-board"} style={{height: boardSize, width: boardSize}}
                     className={styles.Board}>
                    {boardColors.map((color, index) => (
                        <Square key={color + index} color={color}/>
                    ))}
                </div>
                {pieceElements}
            </div>
        </>
    )
}
export default Board