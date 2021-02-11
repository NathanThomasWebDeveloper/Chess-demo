import React from 'react';
import {shallow, mount} from 'enzyme';
import {findByTestAttr} from "../testing/utils";
import Board from './Board';

const defaultProps = {}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<Board {...setupProps} />)
}

test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-board')
    expect(component.length).toBe(1)
})

test('render 64 squares', () => {
    const wrapper = mount(<Board/>)
    const component = findByTestAttr(wrapper, 'board-square')
    expect(component.length).toBe(64)
})



