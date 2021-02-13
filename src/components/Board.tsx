import React, {RefObject, useEffect, useState} from 'react';
import styles from './Board.module.scss'
import {boardColors} from '../constants';
import Square from "./Square";
import Piece from "./Piece";
import {useMeasure} from "react-use";

const Board = () => {
    const [ref, {width, height}] = useMeasure();
    const [boardSize, setBoardSize] = useState<number>(300);
    const [maxPieceDimension, setMaxPieceDimension] = useState<null | number>(null);

    useEffect(() => {
        const max = (width > height) ? height : width
        setBoardSize(max)
        setMaxPieceDimension(Math.floor(max / 8))
    }, [width, height])

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
            </div>
            {maxPieceDimension && (<Piece maxPieceDimension={maxPieceDimension} color={'black'} name={'PAWN'}/>)}
        </>
    )
}
export default Board