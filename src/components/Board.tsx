import React, {RefObject, useEffect, useState} from 'react';
import styles from './Board.module.scss'
import {boardColors} from '../constants';
import Square from "./Square";
import Piece from "./Piece";
import {board} from "./Board.test";
import useResizer from "../hooks/useResizer";

const Board: board = ({piecesToRender}) => {

    const [ref, boardSize, squareSize] = useResizer()
    const pieceElements = squareSize && piecesToRender.map(({color, name, position}) => <Piece squareSize={squareSize} color={color} name={name}
                                                                                               position={position}/>)
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