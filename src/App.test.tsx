import React from 'react';
import App from './App';
import {shallow} from 'enzyme';
import {findByTestAttr} from "./testing/utils";

const defaultProps = {}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<App {...setupProps} />)
}

test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'App')
    expect(component.length).toBe(1)
})