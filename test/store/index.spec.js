import { store, persistor } from 'app-store';

describe('store', () => {
  it('should have a store', () => {
    expect(store.getState()).toEqual({
      _persist: { rehydrated: true, version: -1 },
      app: {
        alerts: [],
        app: {
          data: {
            product: {
              description: '',
              hours: {},
              images: [],
              name: '',
            },
            products: [
              {
                id: '',
                images: [{
                  id: 0,
                  image_urls: {
                    thumb: '',
                  },
                }],
                name: '',
                website: '',
              },
            ],
          },
          message: '',
          pagenum: '',
          query: '',
          status: 'idle',
        },
      },
      router: { location: null },
      user: {
        isAuthenticated: false,
        status: 'idle',
      },
    });
  });

  it('should have a persistor', () => {
    expect(persistor.getState()).toEqual({
      bootstrapped: true,
      registry: [],
    });
  });
});
