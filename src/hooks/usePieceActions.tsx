import {PieceName, pieceToRender, PieceToRenderWithEmitters} from "../typescript/types";
import {useContext, useEffect, useState} from "react";
import usePrevious from "./usePrevious";
import {validPiecePositions} from "../functions/PieceFuncs";
// @ts-ignore
import CaptureSound from "../assets/sounds/capture";
// @ts-ignore
import MoveSound from "../assets/sounds/move";

import context from "../context";


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
    const [captureSound] = useState<HTMLAudioElement>(new Audio(CaptureSound))
    const [moveSound] = useState<HTMLAudioElement>(new Audio(MoveSound))
    const playingColor = useContext(context)
    const [piecesToRenderWithEmitters, setPiecesToRenderWithEmitters] = useState<null | PieceToRenderWithEmitters[]>(null)
    const [highlighted, setHighlighted] = useState<null | [number, number][]>(null)
    const prev = usePrevious({piecesToRender})
    const [selected, setSelected] = useState<null | Selected>(null)
    const [moved, setMoved] = useState<null | Moved>(null)

    useEffect(() => {
        if (piecesToRenderWithEmitters !== null && selected !== null) {
            const validPiecePositionsByType: { [key: string]: [number, number][] } = {}
            validPiecePositions(selected.name, selected.position).forEach(data => {
                validPiecePositionsByType[data.type] = data.positions
            })
            let arr: [number, number][] = []

            if (selected.name === 'PAWN') {
                for (const type in validPiecePositionsByType) {
                    let obstructed = false
                    let shouldAdd = true
                    validPiecePositionsByType[type].forEach(validPiecePositionsByType => {
                        if (!obstructed) {
                            if (type === 'DIAGONAL') {
                                shouldAdd = false
                            }
                            const occupied = piecesToRenderWithEmitters.find(piece => {
                                return validPiecePositionsByType[0] === piece.position[0] &&
                                    validPiecePositionsByType[1] === piece.position[1]
                            })

                            if (occupied) {
                                shouldAdd = false
                                if (type !== 'DIAGONAL') {
                                    obstructed = true
                                }
                                if (occupied.color !== playingColor) {
                                    if (type === 'DIAGONAL') {
                                        shouldAdd = true
                                    }
                                }
                            }
                            if (shouldAdd) {
                                (arr as [number, number][]).push(validPiecePositionsByType)
                            }
                        }
                    })
                }
            }
            setHighlighted(arr)
        }
        if (selected === null) {
            setHighlighted(null)
        }
    }, [selected, piecesToRenderWithEmitters, playingColor])

    useEffect(() => {
        if (moved !== null) {
            // check valid position
            if (Boolean(highlighted?.find(validSquare => validSquare[0] === moved.to[0] && validSquare[1] === moved.to[1]))) {
                // update piece
                if (piecesToRenderWithEmitters !== null) {
                    const newPieces = [...piecesToRenderWithEmitters]
                    const toTakeIndex = newPieces.findIndex(piece => piece.position[0] === moved.to[0] && piece.position[1] === moved.to[1])
                    if (toTakeIndex !== -1) {
                        captureSound.play()
                        newPieces.splice(toTakeIndex, 1);
                    } else {
                        moveSound.play()
                    }
                    const index = newPieces.findIndex(piece => piece.id === moved.id)
                    if (index !== -1) {
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
            } else {
                console.warn("invalid move")
            }
        }
    }, [moved, piecesToRenderWithEmitters, highlighted, captureSound, moveSound])

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