<template>
  <main class="container">
    <section
      class="image"
      :style="`background: url(/${currentItem.img}) center center no-repeat`"
    ></section>
    <section class="details">
      <h1>{{ currentItem.item }}</h1>
      <h3>Price: {{ `$${currentItem.price.toFixed(2)}` }}</h3>
      <div class="quantity">
        <input type="number" min="1" v-model="count" />
        <button class="primary" @click="add">
          Add to Cart - {{ `$${combinedPrice}` }}
        </button>
      </div>
      <fieldset v-if="currentItem.options">
        <legend><h3>Options</h3></legend>
        <div v-for="option in currentItem.options" :key="option">
          <input
            type="radio"
            name="option"
            :id="option"
            :value="option"
            v-model="selectedOption"
          />
          <label :for="option">{{ option }}</label>
        </div>
      </fieldset>
      <fieldset v-if="currentItem.addOns">
        <legend><h3>Add Ons</h3></legend>
        <div v-for="addOn in currentItem.addOns" :key="addOn">
          <input
            type="checkbox"
            name="addon"
            :id="addOn"
            :value="addOn"
            v-model="selectedAddons"
          />
          <label :for="addOn">{{ addOn }}</label>
        </div>
      </fieldset>
      <app-toast v-if="cardSubmitted">
        Order submitted <br />
        Checkout more <nuxt-link to="/restaurants">restaurants</nuxt-link>!
      </app-toast>
    </section>
    <section class="options">
      <h3>Description</h3>
      <p>{{ currentItem.description }}</p>
    </section>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      id: this.$route.params.id,
      count: 1,
      selectedAddons: [],
      selectedOption: "",
      cardSubmitted: false,
    };
  },
  computed: {
    ...mapState(["foodData"]),
    currentItem() {
      for (let i = 0; i < this.foodData.length; i++) {
        for (let j = 0; j < this.foodData[i].menu.length; j++) {
          if (this.foodData[i].menu[j].id === this.id)
            return this.foodData[i].menu[j];
        }
      }
    },
    combinedPrice() {
      let total = this.count * this.currentItem.price;
      return total.toFixed(2);
    },
  },

  methods: {
    ...mapActions([
      "addToCart",
    ]),
    add() {
      let formOutput = {
        item: this.currentItem.item,
        count: this.count,
        options: this.selectedOption,
        addOns: this.selectedAddons,
        combinedPrice: this.combinedPrice,
      };
      this.addToCart(formOutput);
      this.cardSubmitted = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
  margin: 100px auto;
  display: grid;
  grid-template-columns: 400px 1fr;
  grid-template-rows: 400px 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 60px;
  line-height: 2;
}

.image {
  grid-area: 1 / 1 / 2 / 2;
  background-size: cover;
}
.details {
  grid-area: 1 / 2 / 2 / 3;
  position: relative;
}
.options {
  grid-area: 2 / 1 / 3 / 2;
}
</style>