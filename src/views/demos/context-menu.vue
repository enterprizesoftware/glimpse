<template>
  <div class="context-menu">
    <h1>Context Menu</h1>
    <div class="glimpse-context-menu-target"></div>
    <context-menu :items="items"></context-menu>
  </div>
</template>

<script lang="coffee">
import ContextMenu from '@/components/context-menu/context-menu.vue';

export default
  components: { ContextMenu }

  data: ->
    items: [
        label: 'File'
      ,
        label: 'Edit'
      ,
        label: 'Save'
      ,
        label: ->
          'Delete'
    ]
</script>

<style lang="stylus">
  [class^='glimpse-context-menu-target']
    width 100px
    height 100px
    background-color #487c5f
</style>
