<script lang="coffee">
import '@/components/context-menu/context-menu.styl'
import { projPrefix, px } from '@/components/common/css-utils'
import { getViewportPosition, loadSelector } from '@/components/common/dom-utils'
import { isAssigned, resolve } from '@/components/common/lang'
import { MouseButton, Position } from '@/components/common/types'
import { createDeactivator, Deactivator } from '@/components/common/vue-utils'
import { MenuItem, MenuItemData } from '@/components/context-menu/context-menu-types';
import { Component, Prop, Vue } from 'vue-property-decorator'

export default {}
</script>

<template lang="pug">
.glimpse-context-menu-submenu
</template>

<style lang="stylus">
.glimpse-context-menu
</style>
