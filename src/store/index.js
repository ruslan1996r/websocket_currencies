import Vue from 'vue'
import Vuex from 'vuex'
import { Fetch } from "./api"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    instruments: [],
    quotesHistory: [],
    ordersHistory: []
  },
  mutations: {
    mutateInstruments(state, instruments) {
      state.instruments = instruments
    },
    mutateQuotesHistory(state, quotesHistory) {
      state.quotesHistory = quotesHistory
    },
    mutateOrdersHisrory(state, orders) {
      state.ordersHistory = orders
    },
    updateInstruments(state, instrument) {
      if (instrument.data) {
        state.instruments = state.instruments.map(i => {
          const updatedInst = instrument.data[0]
          if (i.symbol === updatedInst.symbol) {
            console.log(updatedInst.lastPrice, i.lastPrice);
            return {
              symbol: updatedInst.symbol,
              lastPrice: updatedInst.lastPrice ? updatedInst.lastPrice : i.lastPrice
            }
          } else {
            return i
          }
        })
      }
    },
    updateHistory(state, history) {
      console.log(state, history);
    }
  },
  actions: {
    async getInstruments({ commit }) {
      commit('mutateInstruments', await Fetch.allInstruments())
    },
    async getQuoteHistory({ commit }, symbol) {
      commit('mutateQuotesHistory', await Fetch.quotesHistory(symbol))
    },
    async createNewOrder({ commit }, order) {
      console.log(commit, "COMMIT?");
      await Fetch.createOrder(order)
    },
    async getOrdersHistory({ commit }) {
      commit("mutateOrdersHisrory", await Fetch.ordersHistory())
    }
  },
  getters: {
    instrumentsGetter: state => state.instruments,
    quotesHistoryGetter: state => state.quotesHistory,
    ordersHistoryGetter: state => state.ordersHistory
  }
})
