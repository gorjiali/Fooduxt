<template>
  <main class="cart container">
    <h2>Your Cart</h2>
    <section v-if="!cart.length" class="emptycart">
      <app-hungry-man />
      <h2>Your cart is empty!</h2>
      <nuxt-link exact to="/">
        <button class="primary">Fill it up!</button>
      </nuxt-link>
    </section>
    <section v-else>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Add Ons</th>
            <th>Amount</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>
              {{ item.item }}
              <span v-if="item.options">- {{ item.options }}</span>
            </td>
            <td>
              <span v-for="addon in item.addOns" :key="addon" class="comma">{{ addon }}</span>
            </td>
            <td>{{ item.count }}</td>
            <td>{{ item.combinedPrice }}</td>
          </tr>
          <tr>
            <td colspan="3"></td>
            <td class="total">Total: ${{totalPrice}}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['cart']),
    ...mapGetters(['totalPrice'])
  },
};
</script>
