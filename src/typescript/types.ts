export type PieceName = "KING" | "QUEEN" | "ROOK" | "BISHOP" | "KNIGHT" | "PAWN"
export type Color = "BLACK" | "WHITE"

export interface pieceToRender {
    name: PieceName,
    position: [number, number],
    color: Color
}

export interface PieceToRenderWithEmitters extends pieceToRender {
    id: string,
    inPlay: boolean,
    emitMove: {
        (to: { from: [number, number]; to: [number, number]; id: string }): Move
    }
    emitSelect: {
        (p: { name: "KING" | "QUEEN" | "ROOK" | "BISHOP" | "KNIGHT" | "PAWN"; position: [number, number] }): Function
    }
}

export interface PiecesWithEmittersAndSize extends PieceToRenderWithEmitters {
    squareSize: number,
    topOffset: number,
    leftOffset: number
}

export interface Move {
    id: string,
    from: [number, number],
    to: [number, number]
}
