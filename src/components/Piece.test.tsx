import React from 'react';
import Piece from './Piece';
import {shallow} from 'enzyme';
import {findByTestAttr} from "../testing/utils";
import {PieceName} from "../typescript/types";

interface Props {
    color: "BLACK" | "WHITE",
    name: PieceName
    squareSize: number,
    position: [number, number]
}

export interface piece {
    (props: Props): JSX.Element
}

const defaultProps: Props = {
    color: "WHITE",
    squareSize: 0,
    name: "PAWN",
    position: [2, 2]
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