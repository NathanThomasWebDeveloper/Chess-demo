import React, {useEffect, useRef, useState} from "react";
import useMeasure from "use-measure";

const useResizer: (defaultBoardSize?: number) => [React.RefObject<HTMLElement>, number, number | null, number | null, number | null] = (defaultBoardSize = 500) => {
    const ref = useRef<HTMLElement>(null)
    const {width, height} = useMeasure((ref));
    const [boardSize, setBoardSize] = useState<number>(defaultBoardSize);
    const [squareSize, setSquareSize] = useState<null | number>(null);

    useEffect(() => {
        const max = (width > height) ? height : width
        setBoardSize(max)
        setSquareSize(max / 8)

    }, [width, height])

    let top = null
    let left = null

    const bounds = ref?.current?.getBoundingClientRect()
    if (bounds !== undefined) {
        left = bounds.left
        top = bounds.top
    }
    return [ref, boardSize, squareSize, top, left]
}
export default useResizer