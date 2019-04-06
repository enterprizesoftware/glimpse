<script lang="ts">
  import Vue from 'vue'

  enum Direction {
    DOWN,
    UP
  }

  export interface SelectData {
    open: boolean
    text: string | null
    cursor: number
    active: boolean[]
    scroll: number
  }

  export default Vue.extend({
    props: {
      items: { type: String, default: [] },
      placeholder: { type: String, default: '' }
    },

    data(): SelectData {
      return {
        open: false,
        text: '',
        cursor: -1,
        active: [],
        scroll: 0
      }
    },

    computed: {
      isOpen(): boolean {
        return this.open && this.items.length > 0
      },

      item(): any {
        return this.$refs.item[this.cursor]
      }
    },

    methods: {
      performAction(item) {

      },

      openOptions(): void {
        if (this.open) return
        this.open = true
      },

      closeOptions(): void {
        if (!this.open) return
        this.open = false
      },

      scrollItem(prev: number, cur: number): void {
        const change = prev - cur
        const dir = change > 0 && prev !== -1 ? Direction.DOWN : Direction.UP

        const items = this.$refs.items
        const itemsRect = items.getBoundingClientRect()

        const item = this.$refs.item[cur]
        const itemRect = item.getBoundingClientRect()

        const atNull = () => cur === -1
        const fromNullToBottom = () => dir === Direction.UP && prev === -1

        if (atNull()) items.scrollTop = 0
        if (fromNullToBottom()) item.scrollIntoView()
        if (item === undefined) return
        if (dir === Direction.UP && itemRect.top < itemsRect.top)
          item.scrollIntoView({ block: 'start', inline: 'start' })
        if (dir === Direction.DOWN && itemRect.bottom > itemsRect.bottom)
          item.scrollIntoView({ block: 'end', inline: 'end' })
      },

      near(index: number): boolean {
        return index >= this.cursor - 1 && index <= this.cursor + 1
      },

      topItem(): number {
        const items = this.$refs.items
        const itemsRect = items.getBoundingClientRect()
        const partiallyHidden = index => {
          const item = this.$refs.item[index]
          const itemRect = item.getBoundingClientRect()
          return itemRect.top < itemsRect.top
        }
        let index = Math.max(0, this.cursor)
        while (index >= 0) {
          if (partiallyHidden(index)) return index
          index--
        }
        return Math.max(index, 0)
      },

      bottomItem(): number {
        const items = this.$refs.items
        const itemsRect = items.getBoundingClientRect()
        const partiallyHidden = index => {
          const item = this.$refs.item[index]
          const itemRect = item.getBoundingClientRect()
          return itemRect.bottom > itemsRect.bottom
        }
        let index = Math.max(0, this.cursor)
        while (index < this.items.length) {
          if (partiallyHidden(index)) return index
          index++
        }
        return index - 1
      },

      onChange(): void {
        this.openOptions()
      },

      onClickInput(): void {
        this.openOptions()
      },

      onDownArrow(): void {
        this.openOptions()
        const prev = this.cursor
        if (this.cursor === -1) this.cursor = this.items.length - 1
        if (this.cursor === this.items.length) this.cursor = -1
        this.scrollItem(prev, this.cursor)
      },

      onUpArrow(): void {
        this.openOptions()
        const prev = this.cursor
        if (this.cursor === -1) this.cursor = this.items.length - 1
        else if (this.cursor >= 0) this.cursor = this.cursor - 1
        this.scrollItem(prev, this.cursor)
      },

      onPageDown(): void {
        if (this.cursor === this.items.length - 1) return

        const prev = Math.max(this.cursor, 0)
        const bottomIndex = this.bottomItem()

        if (this.near(bottomIndex)) {
          const items = this.$refs.items
          const itemsRect = items.getBoundingClientRect()
          items.scrollTop += itemsRect.height
          this.cursor = this.bottomIndex
        } else {
          this.cursor = bottomIndex
        }

        this.scrollItem(prev, this.cursor)
      },

      onPageUp(): void {
        if (this.cursor <= 0) return

        const prev = Math.max(this.cursor, 0)
        const topIndex = this.topItem()

        if (this.near(topIndex)) {
          const items = this.$refs.items
          const itemsRect = items.getBoundingClientRect()
          items.scrollTop -= itemsRect.height
          this.cursor = this.topItem()
        } else {
          this.cursor = topIndex
        }

        this.scrollItem(prev, this.cursor)
      },

      onHome() {
        this.cursor = 0
        this.scrollItem(1, this.cursor)
      },

      onEnd() {
        this.cursor = this.items.length - 1
        this.scrollItem(0, this.cursor)
      },

      onEsc() {
        (<HTMLElement>this.$refs.input).blur()
        this.closeOptions()
      },

      onEnterDown() {
        const entered = this.cursor
        if (entered < 0) return
        Vue.set(this.active, entered, true)
      },

      onEnterUp() {
        const entered = this.cursor
        if (entered < 0) return
        Vue.set(this.active, entered, false)
        this.closeOptions()
        this.performAction(this.items[entered])
      },

      onClickOutside(event) {
        if (!this.$el.contains(event.target)) this.closeOptions()
      },

      onFocus() {
        this.openOptions()
      },

      onClick(index) {
        this.cursor = index
        this.closeOptions()
        this.performAction(this.items[index])
      },

      itemClasses(i) {
        return {
          selected: this.isSelected(i),
          active: this.active[i]
        }
      },

      isSelected(i) {
        return i === this.cursor
      },

      containerStyle() {
      }

    }
  })
</script>

<template lang="pug"></template>

<style lang="stylus"></style>
