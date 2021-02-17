import React from 'react';
import Square from './Square'
import {shallow} from 'enzyme';
import {findByTestAttr} from "../testing/utils.test";

const defaultProps = {
    color: "white",
    pieceSelected: false,
    highlighted: false

}

interface Props {
    color: string,
    position?: [number, number],
    pieceSelected?: boolean,
    highlighted?: boolean,
    key?: string
}

export interface square {
    (props: Props): JSX.Element
}


const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<Square {...setupProps} />)
};

test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'board-square')
    expect(component.length).toBe(1)
})

test('highlight possible moves of selected', () => {
    const wrapper = setup({highlighted: true})
    const component = findByTestAttr(wrapper, 'square-highlight')
    expect(component.length).toBe(1)
})