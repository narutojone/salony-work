
import React from 'react';
import { shallow } from 'enzyme';
import { ProductContainer } from 'containers/Product';

const mockDispatch = jest.fn();

const props = {
  app: {
    alerts: [],
    app: {
      data: {
        product: {
          images: [],
        },
      },
    },
  },
  dispatch: mockDispatch,
  user: {
    isAuthenticated: false,
  },
};

function setup(ownProps = props) {
  return shallow(
    <ProductContainer {...ownProps} />,
    { attachTo: document.getElementById('react') }
  );
}

describe('ProductContainer', () => {
  const wrapper = setup();

  it('should be a Component', () => {
    expect(wrapper.instance() instanceof React.Component).toBe(true);
  });

  it('should render properly for anonymous users', () => {
    expect(wrapper.find('ImageGallery')).toBePresent();
    expect(wrapper.find('HourTable')).toBePresent();
    expect(wrapper.find('BootstrapTable')).toBePresent();
    expect(wrapper.find('TableHeaderColumn')).toBePresent();
  });

  it('should render properly', () => {
    expect(wrapper.find('.container')).toBePresent();
    expect(wrapper.find('.slider')).toBePresent();
    expect(wrapper.find('.margintop')).toBePresent();
    expect(wrapper.find('.table')).toBePresent();
    expect(wrapper.find('.description')).toBePresent();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch.mock.calls[0][0]).toEqual({
      payload: { query: undefined },
      type: 'GET_PRODUCTBYID',
    });
  });

  it('should render some items when data arrives', () => {
    wrapper.setProps({
      app: {
        app: {
          data: {
            product: {
              images: [],
            },
          },
        },
      },
    });
    expect(wrapper.find('.container')).toMatchSnapshot();
  });

  it('should have dispatched an action on mount', () => {
    expect(mockDispatch.mock.calls[1][0]).toEqual({
      payload: { query: undefined },
      type: 'GET_SERVICESBYID',
    });
  });
});
