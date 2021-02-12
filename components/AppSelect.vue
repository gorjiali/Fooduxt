<template>
  <label :for="uniqeId">
    {{ label }}
    <select v-model="selectValue" :name="name" :id="uniqeId">
      <option v-for="item in items" :key="item.value" :value="item.value">
        {{ item.text }}
      </option>
    </select>
  </label>
</template>

<script>
export default {
  props: ["name", "label", "uniqeId", "value", "items"],
  computed: {
    selectValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>