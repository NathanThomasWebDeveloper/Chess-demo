export type PieceName = "KING" | "QUEEN" | "ROOK" | "BISHOP" | "KNIGHT" | "PAWN"
export type Color = "BLACK" | "WHITE"

export interface pieceToRender {
    name: PieceName,
    position: [number, number],
    color: Color
}