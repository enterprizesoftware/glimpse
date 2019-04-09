<script lang="ts">
import { MouseButton } from '@/components/context-menu/context-menu-config';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ContextMenu extends Vue {
  @Prop({ default: '.glimpse-context-menu' }) selector!: string;
  @Prop({ default: 'context' }) private trigger!: MouseButton;

  show: boolean = false;

  mounted() {
    this.register();
  }

  private register() {
    let selected = document.querySelector(this.selector);
    if (!selected) return;
    selected.addEventListener('click', this.showFn);
    selected.addEventListener('contextmenu', this.showFn);
    document.addEventListener('click', this.hideFn);
  }

  showFn: EventListener = function(event) {
    // event.stopImmediatePropagation();
    event.stopPropagation();
    event.preventDefault();
    this.show = true;
  };

  hideFn: EventListener = () => {
    // this.show = false;
  };

  get style() {
    return {
      display: this.show ? 'block' : 'none'
    };
  }
}
</script>

<template lang="pug">
  .root(:style="style")
    .context-menu-0
      i context-menu-place-holder

</template>

<style scoped lang="stylus">
.root
  position absolute
[attr^='.context-menu-']
  border 1px solid orange
</style>
