<script lang="coffee">
  import '@/components/context-menu/context-menu.styl'
  import Vue from 'vue'
  import Menu from '@/components/context-menu/menu.vue'
  import { projPrefix, px } from '@/components/common/css-utils'
  import { getViewportPosition, loadSelector } from '@/components/common/dom-utils'
  import { isAssigned, resolve } from '@/components/common/lang'
  import { MouseButton, Position } from '@/components/common/types'
  import { createDeactivator, Deactivator } from '@/components/common/vue-utils'
  
  export default
    targetElem: undefined
    targetData: undefined
    deactivator: undefined

    components: { Menu }

    props:
      selector:
        type: String
        default: projPrefix('.context-menu-target')
      items: Array

    data: ->
      show: false
      position: []

    mounted: ->
      @register()

    methods:
      register: ->
        @targetElem = loadSelector(@selector)
        return if not @targetElemAvailable
        @targetElem.addEventListener('click', @onClick)
        @targetElem.addEventListener('contextmenu', @onClick)

      onClick: (event) ->
          if (event.button == MouseButton.Secondary)
              @onContext(event)

      onContext: (event) ->
          event.preventDefault()
          event.stopImmediatePropagation()
          @deactivationListener()
          @open(getViewportPosition(event))

      open: (position) ->
          @setPosition(position)
          @show = true

      close: ->
          @show = false

      deactivationListener: ->
          @deactivator = @deactivator || createDeactivator(@, @close)
          document.addEventListener('click', @deactivator)

      setPosition: (position) ->
          Vue.set(@position, 0, position[0])
          Vue.set(@position, 1, position[1])

    computed:
      targetElemAvailable: ->
        isAssigned(@targetElem)

      inline: ->
        left: px(@position[0])
        top: px(@position[1])

      styles: ->
        'glimpse-context-menu--active': @show

</script>

<template lang="pug">
.glimpse-context-menu(:style="inline" :class="styles")
  Menu(:def="items" :level="0")
</template>

<style lang="stylus">
.glimpse-context-menu
  position absolute
  display none

  &--active
    display block
</style>
