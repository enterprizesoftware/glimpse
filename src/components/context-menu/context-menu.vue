<script lang="ts">
import { projPrefix, px } from '@/components/common/css-utils';
import {
  getViewportPosition,
  loadSelector
} from '@/components/common/dom-utils';
import { isAssigned } from '@/components/common/lang';
import { MouseButton, Position } from '@/components/common/types';
import { createDeactivator, Deactivator } from '@/components/common/vue-utils';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContextMenu extends Vue {
  @Prop({ default: projPrefix('.context-menu') }) selector!: string;

  show: boolean = false;
  position: Position = [NaN, NaN];

  target: Element | null | undefined = undefined;
  deactivator: Deactivator | undefined = undefined;

  mounted() {
    this.register();
  }

  private register() {
    this.target = loadSelector(this.selector);

    if (!this.targetFound) return;

    const triggerFn = (e: Event) => this.onClick(<MouseEvent>e);
    this.target!.addEventListener('click', triggerFn);
    this.target!.addEventListener('contextmenu', triggerFn);
  }

  get targetFound() {
    return isAssigned(this.target);
  }

  private onClick(event: MouseEvent) {
    if (event.button === MouseButton.Secondary) {
      this.onContext(event);
    }
  }

  private onContext(event: MouseEvent) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.turnOnDeactivationListener();
    this.open(getViewportPosition(event));
  }

  private open(position: Position) {
    this.setPosition(position);
    this.show = true;
  }

  private turnOnDeactivationListener() {
    this.deactivator = this.deactivator || createDeactivator(this, this.close);
    document.addEventListener('click', this.deactivator);
  }

  private close() {
    this.show = false;
  }

  private setPosition(position: Position) {
    Vue.set(this.position, 0, position[0]);
    Vue.set(this.position, 1, position[1]);
  }

  get inline() {
    return {
      left: px(this.position[0]),
      top: px(this.position[1])
    };
  }

  get styles() {
    return {
      active: this.show
    };
  }
}
</script>

<template lang="pug">
  .context-menu(:style="inline" :class="styles")
    .context-menu-0
      i context-menu-place-holder


</template>

<style scoped lang="stylus">

.context-menu
  position absolute
  display none

.active
  display block

[attr^='.context-menu-']
  border 1px solid orange
</style>
