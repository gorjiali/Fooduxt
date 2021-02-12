<template>
  <nav>
    <ul>
      <li><nuxt-link to="/"><app-logo /></nuxt-link></li>
      <li><nuxt-link to="/restaurants">Restaurants</nuxt-link></li>
    </ul>
    <nuxt-link to="/cart">
    <div class="smallnum" v-if="ordersCount > 0">{{ ordersCount }}</div>
    Cart
    </nuxt-link>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'ordersCount',
    ])
  },
};
</script>

<style lang="scss" scoped>

</style>