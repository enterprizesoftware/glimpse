<template>
  <div class="context-menu">
    <h1>Context Menu</h1>
    <div class="glimpse-context-menu"></div>
    <context-menu></context-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContextMenu from '@/components/context-menu/context-menu.vue'; // @ is an alias to /src

@Component({
  components: {
    ContextMenu
  }
})
export default class extends Vue {}
</script>

<style lang="stylus">
  .glimpse-context-menu
    width 100px
    height 100px
    background-color #487c5f
</style>
