import {PieceName, pieceToRender, PieceToRenderWithEmitters} from "../typescript/types";
import {useEffect, useState} from "react";
import usePrevious from "./usePrevious";
import {validPiecePositions} from "../functions/PieceFuncs";


interface Selected {
    position: [number, number],
    name: PieceName
}

interface Moved {
    id: string,
    from: [number, number],
    to: [number, number]
}

interface UsePieceActions {
    (piecesToRender: pieceToRender[]): [
            PieceToRenderWithEmitters[] | null,
            [number, number][] | null]
}

const usePieceActions: UsePieceActions = (piecesToRender) => {

    const [piecesToRenderWithEmitters, setPiecesToRenderWithEmitters] = useState<null | PieceToRenderWithEmitters[]>(null)
    const [highlighted, setHighlighted] = useState<null | [number, number][]>(null)
    const prev = usePrevious({piecesToRender})
    const [selected, setSelected] = useState<null | Selected>(null)
    const [moved, setMoved] = useState<null | Moved>(null)

    useEffect(() => {
        if (selected !== null) {
            const potentialPiecePosition = validPiecePositions(selected.name, selected.position).flatMap((data: { positions: [number, number][]; type: string }) => data.positions)
            setHighlighted(potentialPiecePosition)
            // setHighlighted(validPiecePositions(selected.name, selected.position)[0].positions)
        } else {
            setHighlighted(null)
        }
    }, [selected])

    useEffect(() => {
        if (moved !== null) {
            // check valid position
            // update piece
            if (piecesToRenderWithEmitters !== null) {
                const index = piecesToRenderWithEmitters.findIndex(piece => piece.id === moved.id)
                if (index !== -1) {
                    const newPieces = [...piecesToRenderWithEmitters]
                    newPieces[index] = {...newPieces[index], position: moved.to}
                    setPiecesToRenderWithEmitters(newPieces)
                } else {
                    console.error(`piece with index ${moved.id} not found`)
                }
            } else {
                console.error("piecesToRenderWithEmitters is null")
            }
            // reset moved
            setMoved(null)
            // reset selected
            setSelected(null)
        }
    }, [moved, piecesToRenderWithEmitters])

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
                        emitMove: (obj: Moved) => setMoved(obj),
                        emitSelect: (obj: Selected) => setSelected(obj),
                        inPlay: true
                    }
                )
            }
            return newState
        })

    }, [piecesToRender])


    return [piecesToRenderWithEmitters, highlighted]
}
export default usePieceActions