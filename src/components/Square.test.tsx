import React from 'react';
import Square from './Square'
import {shallow} from 'enzyme';
import {findByTestAttr} from "../testing/utils";

const defaultProps = {
    color: "white"
}

interface Props {
    color: string,
    children?: any,
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