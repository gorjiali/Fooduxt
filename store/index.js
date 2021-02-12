export const state = () => ({
  foodData: []
})

// export const getters = {
//     getterValue: state => {
//         return state.value
//     }
// }

export const mutations = {
  setFoodData: (state, foodData) => {
    state.foodData = foodData
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
  }
}