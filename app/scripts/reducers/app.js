import immutable from 'immutability-helper';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { createReducer } from 'modules/helpers';

import { ActionTypes } from 'constants/index';

export const appState = {
  alerts: [],
  app: {
    data: {
      product: {
        name: '',
        images: [],
        description: '',
        hours: {},
      },
      products: [
        {
          name: '',
          website: '',
          images: [{id:0, image_urls: {thumb: ''}}],
          id: '',
        }
      ]
    },
    status: 'idle',
    message: '',
    query: '',
    pagenum: '',
  }
};

export default {
  app: createReducer(appState, {
    [REHYDRATE](state) {
      return immutable(state, {
        alerts: { $set: [] },
      });
    },
    [ActionTypes.HIDE_ALERT](state, { payload: { id } }) {
      const alerts = state.alerts.filter(d => d.id !== id);

      return immutable(state, {
        alerts: { $set: alerts },
      });
    },
    [ActionTypes.SHOW_ALERT](state, { payload }) {
      return immutable(state, {
        alerts: { $push: [payload] },
      });
    },
    [ActionTypes.GET_PRODUCTBYID](state, { payload }) {
      const data = state.app.data[payload.query] ? state.app.data[payload.query] : [];

      return immutable(state, {
        app: {
          data: {
            [payload.query]: { $set: data },
          },
          message: { $set: '' },
          query: { $set: payload.query },
          status: { $set: 'running' },
        },
      });
    },
    [ActionTypes.GET_PRODUCTBYID_SUCCESS](state, { payload }) {
      return immutable(state, {
        app: {
          data: {
            product: { $set: payload.data || {} },
          },
          status: { $set: 'loaded' },
        },
      });
    },

    [ActionTypes.GET_PRODUCT](state, { payload }) {
      const data = state.app.data[payload.query] ? state.app.data[payload.query] : [];

      return immutable(state, {
        app: {
          data: {
            [payload.query]: { $set: data },
          },
          message: { $set: '' },
          pagenum: { $set: payload.query },
          status: { $set: 'running' },
        },
      });
    },
    [ActionTypes.GET_PRODUCT_SUCCESS](state, { payload }) {
      return immutable(state, {
        app: {
          data: {
            products: { $set: payload.data || {} },
          },
          status: { $set: 'loaded' },
        },
      });
    },

    [ActionTypes.GET_SERVICESBYID](state, { payload }) {
      const data = state.app.data[payload.query] ? state.app.data[payload.query] : [];

      return immutable(state, {
        app: {
          data: {
            [payload.query]: { $set: data },
          },
          message: { $set: '' },
          pagenum: { $set: payload.query },
          status: { $set: 'running' },
        },
      });
    },
    [ActionTypes.GET_SERVICESBYID_SUCCESS](state, { payload }) {
      return immutable(state, {
        app: {
          data: {
            services: { $set: payload.data || {} },
          },
          status: { $set: 'loaded' },
        },
      });
    },
  }),
};
