<script lang="coffee">
import Menu from '@/components/context-menu/menu.vue'
import { resolve } from  '@/components/common/lang'

export default
  components: { Menu }

  props:
    def: Object
    level: Number

  mounted: ->
    console.log(@def)

  computed:
    label: -> 
      resolve(@def.label)
      
</script>

<template lang="pug">
.glimpse-context-menu__menu-item
  p {{ label }}
  menu(v-if="def.menu" :def="def.menu" :level="level + 1")
</template>

<style lang="stylus">
.glimpse-context-menu__menu-item
  border 1px solid lavender
  background-color white
  padding 15px
</style>
