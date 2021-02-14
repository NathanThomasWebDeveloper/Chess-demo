import React from 'react';
import PieceButton from './PieceButton';
import {shallow} from 'enzyme';
import {findByTestAttr} from "../testing/utils";

interface Props {
    click: any
}

export interface pieceButton {
    (props: Props): JSX.Element
}

const defaultProps = {
    click: () => {
    }
}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props}
    return shallow(<PieceButton {...setupProps} />)
};

test('renders without error', () => {
    const wrapper = setup()
    const component = findByTestAttr(wrapper, 'component-pieceButton')
    expect(component.length).toBe(1)
})