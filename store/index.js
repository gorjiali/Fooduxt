import { v4 as uuidv4 } from 'uuid';

export const state = () => ({
  foodData: [],
  cardItems: []
})

export const mutations = {
  setFoodData: (state, foodData) => {
    state.foodData = foodData
  },

  setCardItem: (state, cardItem) => {
    state.cardItems.push(cardItem);
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

  addToCard({ commit }, item) {
    commit('setCardItem', { ...item, id: uuidv4() })
  }
}