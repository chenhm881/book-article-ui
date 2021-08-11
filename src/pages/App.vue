<template>
  <a-locale-provider :locale="locale" id="app">
    <router-view/>
  </a-locale-provider>
</template>

<script>

import { LocaleProvider } from 'ant-design-vue'
export default {
  name: 'App',
  components: {
    'a-locale-provider': LocaleProvider
  }
}

</script>

<style lang="less">
*{
  padding: 0;
  margin: 0;
}
html,
body,
#app{
  height: 100%;
}
</style>
