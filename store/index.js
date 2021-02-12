import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
  foodData: [],
  cart: []
})

export const getters = {
  totalPrice(state) {
    if (!state.cart.length) return 0;
    return state.cart.reduce((acc, currentVal) => acc + +currentVal.combinedPrice, 0).toFixed(2);
  },

  ordersCount(state) {
    return state.cart.length;
  }
}

export const mutations = {
  setFoodData: (state, foodData) => {
    state.foodData = foodData
  },

  setCartItem: (state, cartItem) => {
    state.cart.push(cartItem);
  }
}

export const actions = {
  async fetchFoodData({ commit, state }) {
    if (state.foodData.length) return;
    try {
      await fetch('https://dva9vm8f1h.execute-api.us-east-2.amazonaws.com/production/restaurants', {
        headers: {
          'content-type': 'application/json',
          'x-api-key': process.env.AWS_API_KEY
        }
      })
        .then(response => response.json())
        .then(data => {
          commit('setFoodData', data);
        })
    }
    catch (err) {
      console.log(err);
    }
  },

  addToCart({ commit }, item) {
    commit('setCartItem', { ...item, id: uuidv4() })
  }
}