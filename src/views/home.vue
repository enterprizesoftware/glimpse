<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="coffee">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/hello-world.vue';

export default
  components: {HelloWorld}
</script>
