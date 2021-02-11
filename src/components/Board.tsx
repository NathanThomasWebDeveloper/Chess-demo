import React from 'react';
import styles from './Board.module.scss'
import {boardColors} from '../constants';
import Square from "./Square";

const Board = () => {
    return (<div data-test={"component-board"} className={styles.Board}>
        {boardColors.map((color, index) => (<Square key={color + index} color={color}/>))}
    </div>)
}
export default Board