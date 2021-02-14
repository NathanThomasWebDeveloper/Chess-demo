import React, {RefObject, useEffect, useState} from 'react';
import styles from './Board.module.scss'
import {boardColors} from '../constants';
import Square from "./Square";
import Piece from "./Piece";
import {useMeasure} from "react-use";
import {board} from "./Board.test";

const Board: board = ({piecesToRender}) => {
    const [ref, {width, height}] = useMeasure();
    const [boardSize, setBoardSize] = useState<number>(300);
    const [squareSize, setSquareSize] = useState<null | number>(null);

    console.log(squareSize, piecesToRender)
    useEffect(() => {
        const max = (width > height) ? height : width
        setBoardSize(max)
        setSquareSize(max / 8)
    }, [width, height])

    const pieceElements = squareSize && piecesToRender.map(({color, name, position}) => <Piece squareSize={squareSize}
                                                                                               color={color} name={name}
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