import * as React from 'react';
import chai, { expect } from 'chai';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

import Field from './Field';
import Cell from "./Cell";

Enzyme.configure({ adapter: new Adapter() });

describe('Field', () => {
  it('renders correct number of cells', () => {
    const wrapper = shallow(
      <Field
        rows={[[1, 2, 3], [4, 5, 6]]}
        onCellClick={(row, col) => {}}
        selectedCells={[]}
      />
    )
    expect(wrapper.find(Cell)).to.have.lengthOf(6)
  })

  it('renders and works correctly when `onCellClick` is not specified', () => {
    const wrapper = shallow(
      <Field
        rows={[[1, 2, 3], [4, 5, 6]]}
        selectedCells={[]}
      />
    )
    wrapper.find(Cell).first().simulate('click')
  })

  it('renders correctly when `selectedCells` array is empty', () => {
    const wrapper = shallow(
      <Field
        rows={[[1, 2, 3], [4, 5, 6]]}
        selectedCells={[]}
      />
    )
    expect(wrapper.find('.selected')).to.have.lengthOf(0)
  })

  it('renders the right selected cell when `selectedCells` array consists of one value', () => {
    const wrapper = mount(
      <Field
        rows={[[1, 2, 3], [4, 5, 6]]}
        selectedCells={[{row: 0, col: 0}]}
      />
    )
    expect(wrapper.find('.selected'))
      .to.have.lengthOf(1)
      .and
      .to.have.text('1')
  })
})
