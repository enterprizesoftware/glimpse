<script lang="coffee">
import MenuItem from '@/components/context-menu/menu-item.vue'

export default
  components: { MenuItem }

  props:
    def: Array
    level: Number
</script>

<template lang="pug">
.glimpse-context-menu__menu
  menu-item(v-for="item in def" :def="item" :level="level")
</template>

<style lang="stylus">
.glimpse-context-menu__menu
    border 1px solid orange
    background-color white
    padding 15px
</style>
