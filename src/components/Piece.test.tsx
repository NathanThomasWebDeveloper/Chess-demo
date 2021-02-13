import React from 'react';
import Piece from './Piece';
import {shallow} from 'enzyme';
import {findByTestAttr} from "../testing/utils";

interface Props {
    color: "black" | "white",
    name: "KING" | "QUEEN" | "ROOK" | "BISHOP" | "KNIGHT" | "PAWN",
    maxPieceDimension: number
}

export interface piece {
    (props: Props): JSX.Element
}

const defaultProps: Props = {
    color: "white",
    maxPieceDimension: 0,
    name: "PAWN"
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