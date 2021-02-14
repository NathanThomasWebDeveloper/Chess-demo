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
        (to: [number, number]): Move
    }
    emitSelect: {
        (): string
    }
}

export interface PiecesWithEmittersAndSize extends PieceToRenderWithEmitters {
    squareSize: number
}

export interface Move {
    id: string,
    from: [number, number],
    to: [number, number]
}
