<template>
  <main class="restaurant container">
    <div class="restaurantheading">
      <h1>Restaurant</h1>
      <app-select
        :items="filterItems"
        name="cuisine"
        uniqeId="cuisine"
        v-model="filterVal"
        label="Choose a cuisine:"
      ></app-select>
    </div>
    <app-restaurant-info :filterVal="filterVal"></app-restaurant-info>
  </main>
</template>

<script>
export default {
  data() {
    return {
      filterVal: "",
      filterItems: [
        { value: "", text: "--Please choose--" },
        { value: "tacos", text: "tacos" },
        { value: "pizza", text: "pizza" },
        { value: "dim sum", text: "dim sum" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>