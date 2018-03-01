import React from 'react';
import { shallow } from 'enzyme';
import HourTable from 'components/HourTable';

function setup() {
  return shallow(
    <HourTable />,
    { attachTo: document.getElementById('react') }
  );
}

describe('HourTable', () => {
  const wrapper = setup();

  it('should be a React Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly for anonymous users', () => {   
  });
});
