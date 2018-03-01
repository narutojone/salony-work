import { expectSaga } from 'redux-saga-test-plan';

import user, { getProductByID, getProduct, getServicesByID } from 'sagas/app';
import { ActionTypes } from 'constants/index';

jest.mock('modules/client', () => ({
  request: () => ({ items: [] }),
}));

describe('app', () => {
  it('should have the expected watchers', done => {
    expectSaga(user)
      .run({ silenceTimeout: true })
      .then(saga => {
        expect(saga).toMatchSnapshot();
        done();
      });
  });

  it('should match the getProductByID saga', () =>
    expectSaga(getProductByID, { payload: { query: 1350 } })
      .put({
        type: ActionTypes.GET_PRODUCTBYID_SUCCESS,
        payload: {
          data: undefined,
        },
      })
      .run()
  );

  it('should match the getProduct saga', () =>
    expectSaga(getProduct, { payload: { query: 15 } })
      .put({
        type: ActionTypes.GET_PRODUCT_SUCCESS,
        payload: {
          data: undefined,
        },
      })
      .run()
  );

  it('should match the getServices saga', () =>
    expectSaga(getServicesByID, { payload: { query: 15 } })
      .put({
        type: ActionTypes.GET_SERVICESBYID_SUCCESS,
        payload: {
          data: undefined,
        },
      })
      .run()
  );
});
