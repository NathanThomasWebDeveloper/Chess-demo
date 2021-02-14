import {pieceToRender, PieceToRenderWithEmitters} from "../typescript/types";
import {useEffect, useState} from "react";
import usePrevious from "./usePrevious";

interface UsePieceActions {
    (piecesToRender: pieceToRender[]): [
            null | PieceToRenderWithEmitters[],
        number[][]
    ]
}

const usePieceActions: UsePieceActions = (piecesToRender) => {

    const [piecesToRenderWithEmitters, setPiecesToRenderWithEmitters] = useState<null | PieceToRenderWithEmitters[]>(null)
    const prev = usePrevious({piecesToRender})
    useEffect(() => {
        let piecesToAdd = 0
        if (prev !== undefined) {
            piecesToAdd = piecesToRender.length - prev.piecesToRender.length
        }

        setPiecesToRenderWithEmitters(prevState => {
            let iStart = 0
            let newState: any
            if (prevState !== null) {
                newState = [...prevState]
                iStart = piecesToRender.length - piecesToAdd
            } else {
                newState = []
            }
            for (let i = iStart; i < piecesToRender.length; i++) {
                const id = '_' + Math.random().toString(36).substr(2, 9)
                newState.push(
                    {
                        ...piecesToRender[i],
                        id,
                        emitMove: (to: [number, number]) => {
                            return {
                                id,
                                to,
                                from: piecesToRender[i].position
                            }
                        },
                        emitSelect: () => id,
                        inPlay: true
                    }
                )
            }
            return newState
        })

    }, [piecesToRender])

    const mock_highlightedSquares = [
        [1, 3], [5, 3], [8, 8], [3, 8]
    ]
    return [piecesToRenderWithEmitters, mock_highlightedSquares]
}
export default usePieceActions