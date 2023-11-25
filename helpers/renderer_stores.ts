import Vue from "vue";
import { questionnaireResponseStore } from "@aehrc/smart-forms-renderer";
import { StoreApi } from "zustand/vanilla";

export const createVueStore = <T extends object>(store: StoreApi<T>) => {
  const state = store.getState();
  const observable = Vue.observable(state);

  store.subscribe((newState) => {
    Object.assign(observable, newState);
  });

  return observable;
};

export const questionnaireResponseStoreVue = createVueStore(
  questionnaireResponseStore
);
