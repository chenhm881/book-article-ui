<template>
  <a-config-provider :locale="locale" id="app">
    <router-view/>
  </a-config-provider>
</template>

<script>

import { ConfigProvider } from 'ant-design-vue'
export default {
  name: 'App',
  components: {
    'a-config-provider': ConfigProvider
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
