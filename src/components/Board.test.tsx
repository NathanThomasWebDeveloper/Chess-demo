import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from "../testing/utils.test";
import Board from './Board';
import {PieceName, Color} from "../typescript/types";

interface pieceToRender {
    name: PieceName,
    position: [number, number],
    color: Color
}

interface Props {
    piecesToRender: pieceToRender[],
    playingColor?: Color
}

export interface board {
    (props: Props): JSX.Element
}

export const defaultProps: Props = { // fixme delete export
    piecesToRender: [{
        name: "PAWN",
        position: ([1, 1] as [number, number]),
        color: "BLACK"
    }],
    playingColor: "WHITE"
}

const setup = (props = {}, deep?: boolean) => {
    const setupProps = {...defaultProps, ...props}
    if (deep) {
        return mount(<Board {...setupProps} />)
    }
    return shallow(<Board {...setupProps} />)
}

test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-board')
    expect(component.length).toBe(1)
})

test('render 64 squares', () => {
    const wrapper = setup(undefined, true)
    const components = findByTestAttr(wrapper, 'board-square')
    expect(components.length).toBe(64)
})


