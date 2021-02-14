import {piece} from "./Piece.test";
import styles from "./Piece.module.scss";
import Pawn from '../assets/images/pawn.svg';

const Piece: piece = ({color, squareSize, name = "PAWN", position}) => {
    let img
    switch (name) {
        // fixme to be expanded with other pieces
        default:
            img = Pawn
    }
    const sty = {
        left: (position[0] - 1) * squareSize,
        top: squareSize * 8 - ((position[1]) * squareSize),
    }
    const styImg = {
        filter: color === 'BLACK' ? 'brightness(0%)' : 'unset'
    }

    return (<div style={sty} data-test={"component-piece"} className={styles.Piece}>
        <img data-test={"piece-img"} height={Math.floor(squareSize)} width="unset" style={styImg} src={img} alt={name}/>
    </div>)
}
export default Piece