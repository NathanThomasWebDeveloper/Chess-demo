import {piece} from "./Piece.test";
import styles from "./Piece.module.scss";
import Pawn from '../assets/images/pawn.svg';
import React, {useContext, useState} from "react";
import {ClientXYtoBoardSquare} from "../functions/PieceFuncs";
import context from "../context";

const Piece: piece = ({
                          color,
                          squareSize,
                          name = "PAWN",
                          id,
                          topOffset,
                          leftOffset,
                          position,
                          emitMove,
                          emitSelect
                      }) => {
    const [isDragging, setIsDragging] = useState(false)
    const playingColor = useContext(context)
    const dragEndHandler = (e: React.DragEvent<HTMLImageElement>) => {
        e.dataTransfer.effectAllowed = "copyMove";
        emitMove({
            to: (ClientXYtoBoardSquare(squareSize, [e.clientX - leftOffset, e.clientY - topOffset]) as [number, number]),
            from: position,
            id
        })
    }

    // () => emitMove({from: position, to: [8, 8], id})

    let img
    if (name === "KING") {
    } else if (name === "QUEEN") {
    } else if (name === "ROOK") {
    } else if (name === "BISHOP") {
    } else if (name === "KNIGHT") {
    } else if (name === "PAWN") {
        img = Pawn
    } else {
        console.error(`${name} not recognised as a chess piece`)
    }

    let sty: { top: number; left: number } = {
        left: (position[0] - 1) * squareSize,
        top: squareSize * 8 - ((position[1]) * squareSize),
    };

    let styImg: { filter: string } = {
        filter: color !== playingColor ? 'brightness(0%)' : 'unset'
    };

    return (<div style={sty} data-test={"component-piece"} className={styles.Piece}>
        <img draggable={color === playingColor} data-test={"piece-img"}
             onClick={color === playingColor ? () => emitSelect({position, name}) : () => {
             }}
             onDragStart={color === playingColor ? () => {
                 setIsDragging(true);
                 emitSelect({position, name})
             } : () => {
             }}
             onDragEnd={color === playingColor ? (e) => {
                 setIsDragging(false);
                 dragEndHandler(e)
             } : () => {
             }}
             height={Math.floor(squareSize)} width="unset" style={styImg} src={img} alt={name}/>
    </div>)
}
export default Piece