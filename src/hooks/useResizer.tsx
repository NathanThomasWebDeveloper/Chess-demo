import {useMeasure} from "react-use";
import {useEffect, useState} from "react";
import {UseMeasureRef} from "react-use/lib/useMeasure";

interface UseResizer {
    (minBoardSize?: number) : [
        UseMeasureRef,
        number,
        number | null
    ]
}
const useResizer: UseResizer = (minBoardSize = 300) => {

    const [ref, {width, height}] = useMeasure();
    const [boardSize, setBoardSize] = useState<number>(minBoardSize);
    const [squareSize, setSquareSize] = useState<null | number>(null);

    useEffect(() => {
        const max = (width > height) ? height : width
        setBoardSize(max)
        setSquareSize(max / 8)
    }, [width, height])

    return [ref, boardSize, squareSize]
}
export default useResizer