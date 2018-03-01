
import React from 'react';
import { shallow } from 'enzyme';
import { Salons } from 'containers/Salons';

const mockDispatch = jest.fn();

const props = {
  app: {
    alerts: [],
  },
  dispatch: mockDispatch,
  user: {
    isAuthenticated: false,
  },
};

function setup(ownProps = props) {
  return shallow(
    <Salons {...ownProps} />,
    { attachTo: document.getElementById('react') }
  );
}

describe('Salons', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      payload: { query: 1 },
      type: 'GET_PRODUCT',
    });
  });

  it('should render some items when data arrives', () => {
    wrapper.setProps({
      app: {
        app: {
          data: {
            products: {
              images: [],
            },
          },
        },
      },
    });
    expect(wrapper.find('.container')).toMatchSnapshot();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      payload: { query: 1 },
      type: 'GET_PRODUCT',
    });
  });
});
