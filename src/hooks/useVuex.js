import {mapGetters, mapMutations, mapActions, mapState, useStore} from 'vuex';

export const useVuex = () => {
  const store = useStore();
  const withStore = {
    $store: store
  };

  const advancedBind = (obj) => {
    for (const objKey in obj) {
      obj[objKey].bind(withStore);
    }
    return obj;
  };

  return {
    store,
    mapGetters: mapGetters.bind(withStore),
    mapActions: mapActions.bind(withStore),
    mapMutations: mapMutations.bind(withStore),
    mapState: mapState.bind(withStore),
    bind: (cb, ...args) => cb.bind(withStore, args),
    call: (cb, ...args) => cb.call(withStore, ...args),
    advancedBind
  };
};