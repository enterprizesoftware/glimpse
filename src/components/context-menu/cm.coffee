  import '@/components/context-menu/context-menu.styl'
  import { projPrefix, px } from '@/components/common/css-utils'
  import { getViewportPosition, loadSelector } from '@/components/common/dom-utils'
  import { isAssigned, resolve } from '@/components/common/lang'
  import { MouseButton, Position } from '@/components/common/types'
  import { createDeactivator, Deactivator } from '@/components/common/vue-utils'
  import { MenuItem, MenuItemData } from '@/components/context-menu/context-menu-types';
  import { Component, Prop, Vue } from 'vue-property-decorator'

  export default
    targetElem: undefined
    deactivator: undefined
    targetData: undefined

    props:
      selector:
        type: String
        default: projPrefix('.context-menu-target')
      items: Object

      data: ->
        show: false
        position: [NaN, NaN]

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
            event.stopImmediatePropogation()
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
