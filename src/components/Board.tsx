import React, {useEffect, useState} from 'react';
import styles from './Board.module.scss'
import {boardColors} from '../constants';
import Square from "./Square";
import {useMeasure} from "react-use";

const Board = () => {
    const [ref, {width, height}] = useMeasure();
    const [boardSize, setBoardSize] = useState(300);
    useEffect(() => {
        setBoardSize((width > height) ? height : width)
    }, [width, height])
    // @ts-ignore fixme
    return (<div ref={ref} data-test={"component-container"} className={styles.Container}>
        <div data-test={"component-board"}  style={{height: boardSize, width: boardSize}} className={styles.Board}>
        {boardColors.map((color, index) => (<Square key={color + index} color={color}/>))}
    </div></div>)
}
export default Board