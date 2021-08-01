<template>
  <div class="manage-container">
    <AsideMenu :isOpen="isOpen" @modifyIsOpen="setIsOpen" />
  </div>
</template>

<script lang="ts">
import AsideMenu from '../components/aside/AsideMenu.vue'


export default {

  setup() {
    let isOpen = true
    const setIsOpen = (val: boolean) => {
      isOpen = val
      console.log(val);
    };
    return {
      isOpen,
      setIsOpen
    }
  },
  name: 'Index',
  components: {
    AsideMenu
  },
}

</script>

<style lang="less" scoped>
.manage-container{
  height: 100%;
  display: flex;
  background: #f0f2f5;
  .manage-main{
    width: 100%;
    height: 100%;
    .manage-content{
      height: calc(~'100% - 64px');
      .common-part{
        padding: 16px 24px;
        background: #fff;
        .module-title{
          color: rgba(0,0,0,.85);
          font-size: 16px;
          font-weight: 700;
          margin: 12px 0 0;
        }
        .module-desc{
          color: rgba(0,0,0,.65);
          font-size: 14px;
          margin: 12px 0 16px;
        }
      }
    }
  }
}
</style>
