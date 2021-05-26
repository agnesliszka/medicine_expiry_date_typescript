import Vue from 'vue';
import Vuex from 'vuex';
import MedicineModel from '../models/MedicineModel';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    medicineList: Array<MedicineModel>() 
  },

  mutations: {
    addMedicine(state, medicineModel: MedicineModel) {
      state.medicineList.push(medicineModel);
    }
  },

  actions: {
    addMedicine(context, medicineModel: MedicineModel) {
      context.commit('addMedicine', medicineModel);
    }
  }

});