<script lang="ts">
import '@/components/context-menu/context-menu.styl'
import { projPrefix, px } from '@/components/common/css-utils'
import { getViewportPosition, loadSelector } from '@/components/common/dom-utils'
import { isAssigned, resolve } from '@/components/common/lang'
import { MouseButton, Position } from '@/components/common/types'
import { createDeactivator, Deactivator } from '@/components/common/vue-utils'
import { MenuItem, MenuItemData } from '@/components/context-menu/context-menu-types';
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ContextMenu extends Vue {
  @Prop({ default: projPrefix('.context-menu-target') }) selector!: string
  @Prop() items!: MenuItem[]

  show: boolean = false
  position: Position = [NaN, NaN]

  targetElem: Element | null | undefined = undefined
  deactivator: Deactivator | undefined = undefined
  targetData: any = undefined;

  mounted() {
    this.register()
  }

  private register() {
    this.targetElem = loadSelector(this.selector)

    if (!this.targetElemAvailable) return

    const triggerFn = (e: Event) => this.onClick(<MouseEvent>e)
    this.targetElem!.addEventListener('click', triggerFn)
    this.targetElem!.addEventListener('contextmenu', triggerFn)
  }

  get targetElemAvailable() {
    return isAssigned(this.targetElem)
  }

  private onClick(event: MouseEvent) {
    if (event.button === MouseButton.Secondary) {
      this.onContext(event)
    }
  }

  private onContext(event: MouseEvent) {
    event.preventDefault()
    event.stopImmediatePropagation()
    this.deactivationListener()
    this.open(getViewportPosition(event))
  }

  private open(position: Position) {
    this.setPosition(position)
    this.show = true
  }

  private deactivationListener() {
    this.deactivator = this.deactivator || createDeactivator(this, this.close)
    document.addEventListener('click', this.deactivator)
  }

  private close() {
    this.show = false
  }

  private setPosition(position: Position) {
    Vue.set(this.position, 0, position[0])
    Vue.set(this.position, 1, position[1])
  }

  get inline() {
    return {
      left: px(this.position[0]),
      top: px(this.position[1])
    }
  }

  get styles() {
    return {
      'glimpse-context-menu--active': this.show
    }
  }

  get menuItems(): MenuItemData[] {
    const data: MenuItemData[] = [];

    this.items.forEach(item => {
      data.push({
        label: resolve(item.label, this.targetData)
      })
    })

    return data;
  }
}
</script>

<template lang="pug">
.glimpse-context-menu(:style="inline" :class="styles")
  .glimpse-context-menu__level-0
    .glimpse-context-menu


</template>

<style lang="stylus">
.glimpse-context-menu
  position absolute
  display none

  &--active
    display block

  [class*='__level-']
    border 1px solid orange
    background-color white
    padding 2px
</style>
