import {PieceName} from "../typescript/types";

type ValidPieceMove = {
    type: string,
    positions: [number, number][]
}[]


interface ValidPieceMoves {
    [key: string]: ValidPieceMove
}

const validPieceMoves: ValidPieceMoves = {
    PAWN: [
        {
            type: 'DIAGONAL',
            positions: [[1, 1], [-1, 1]]
        },
        {
            type: 'FORWARD',
            positions: [[0, 1], [0, 2]]
        }
    ],
    KING: [],
    QUEEN: [],
    ROOK: [],
    BISHOP: [],
    KNIGHT: []
}

export const validPiecePositions = (piece: PieceName, currentPosition: [number, number]): { positions: [number, number][]; type: string }[] => {
    return validPieceMoves[piece].flatMap(rule => {
        const res = {...rule}
        res.positions = res.positions.reduce((acc: [number, number][], pos: [number, number]) => {
            const x = currentPosition[0] + pos[0]
            const y = currentPosition[1] + pos[1]
            if (x <= 8 && y <= 8) {
                acc.push([x, y])
            }
            return acc
        }, [])
        return res
    })
}

export const ClientXYtoBoardSquare = (squareSize: number, [x, y]: [number, number]) => [Math.ceil(x/squareSize), 8-Math.floor(y/squareSize)]






