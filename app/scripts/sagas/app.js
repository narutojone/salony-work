/**
 * @module Sagas/GitHub
 * @desc GitHub
 */

import { all, call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'modules/client';

import { ActionTypes } from 'constants/index';
import { getServiceByID } from '../actions/app';

/**
 * Login
 *
 * @param {Object} action
 *
 */
export function* getProductByID({ payload }) {
  try {
    const response = yield call(request, `http://staging.salony.com/v5/salons/${payload.query}`);
    yield put({
      type: ActionTypes.GET_PRODUCTBYID_SUCCESS,
      payload: { data: response.salon },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    
  }
}

export function* getProduct({ payload }) {
  try {
    const response = yield call(request, `http://staging.salony.com/v5/salons?per_page=24&page=${payload.query}`);
    yield put({
      type: ActionTypes.GET_PRODUCT_SUCCESS,
      payload: { data: response.salons },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    
  }
}

export function* getServicesByID({ payload }) {
  try {
    const response = yield call(request, `http://staging.salony.com/v5/salons/${payload.query}/services`);
    yield put({
      type: ActionTypes.GET_SERVICESBYID_SUCCESS,
      payload: { data: response.services },
    });
  }
  catch (err) {
    /* istanbul ignore next */
    
  }
}

export default function* root() {
  yield all([
    takeLatest(ActionTypes.GET_PRODUCTBYID, getProductByID),
    takeLatest(ActionTypes.GET_PRODUCT, getProduct),
    takeLatest(ActionTypes.GET_SERVICESBYID, getServicesByID),
  ]);
}

