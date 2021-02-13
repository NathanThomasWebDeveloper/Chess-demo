import {piece} from "./Piece.test";
import styles from "./Piece.module.scss";
import Pawn from '../assets/images/pawn.svg';

const Piece: piece = ({color, maxPieceDimension, name = "PAWN"}) => {
    let img
    switch (name) {
        // fixme to be expanded with other pieces
        default:
            img = Pawn
    }

    const styImg = {
        filter: color === 'black' ? 'brightness(0%)' : 'unset'
    }

    return (<div data-test={"component-piece"} className={styles.Piece}>
        <img data-test={"piece-img"} height={maxPieceDimension} width="unset" style={styImg} src={img} alt={name}/>
    </div>)
}
export default Piece