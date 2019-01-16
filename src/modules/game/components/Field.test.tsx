import * as React from 'react';
import { expect } from 'chai';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

import Field from './Field';
import Cell from "./Cell";

Enzyme.configure({ adapter: new Adapter() });

describe('Field', () => {
  it('renders correct number of cells', () => {
    const wrapper = shallow(
      <Field rows={[[1, 2, 3], [4, 5, 6]]} onCellClick={(row, col) => {}}/>
    )
    expect(wrapper.find(Cell)).to.have.lengthOf(6)
  })

  it('renders and works correctly when `onCellClick` is not specified', () => {
    const wrapper = shallow(
      <Field rows={[[1, 2, 3], [4, 5, 6]]}/>
    )
    wrapper.find(Cell).first().simulate('click')
  })

  it('does not render previous selected cell when it is not specified in props', () => {
    const wrapper = shallow(
      <Field rows={[[1, 2, 3], [4, 5, 6]]}/>
    )
    expect(wrapper.find('.selected')).to.have.lengthOf(0)
  })
})
