import React from 'react';
import Piece from './Piece';
import {shallow} from 'enzyme';
import {findByTestAttr} from "../testing/utils";
import {PiecesWithEmittersAndSize} from "../typescript/types";

export interface piece {
    (props: PiecesWithEmittersAndSize): JSX.Element
}

const defaultProps: PiecesWithEmittersAndSize = {
    color: "WHITE",
    name: "PAWN",
    position: [2, 2],
    squareSize: 100,
    id: "_324234242344",
    inPlay: true,
    topOffset: 20,
    leftOffset: 20,
    emitSelect: () => () => {
    },
    emitMove: () => ({
        id: "_324234242344",
        from: [1, 2],
        to: [1, 3]
    })

}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<Piece {...setupProps} />)
}

test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-piece')
    expect(component.length).toBe(1)
})
test('every piece contains one image only', () => {
    const wrapper = setup()
    const component = wrapper.find('img')
    expect(component.length).toBe(1)
})