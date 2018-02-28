import { all, fork } from 'redux-saga/effects';

import user from './user';
import app from './app';

/**
 * rootSaga
 */
export default function* root() {
  yield all([
    fork(user),
    fork(app),
  ]);
}
