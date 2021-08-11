<template>
  <div class="manage-container">
    <AsideMenu :isOpen="isOpen" @modifyIsOpen="setIsOpen" />
    <div class="manage-main">
      <AsideHeader :isOpen="isOpen"></AsideHeader>
      <div class="manage-content">
        <div class="common-part">
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AsideMenu from '../components/aside/AsideMenu.vue';
import AsideHeader from "../components/aside/AsideHeader.vue";
import {onMounted} from "vue";
import instance from "../ajax/interceptors";


export default {

  setup() {
    let isOpen = true
    const setIsOpen = (val: boolean): void => {
      isOpen = val
      console.log(val);
    };
    onMounted(() => {
      instance
          .post('http://localhost:8183/api/hello',
              null,
              {timeout: 86400000, headers: {
                  'Content-type': "application/json",
                  "dataType": "json",
                }})
          .then((response: any) => {
            alert(JSON.stringify(response));
          }).catch((error) => {
        alert(error.response);
      })
    })

    return {
      isOpen,
      setIsOpen
    }
  },
  name: 'Index',
  components: {
    AsideMenu,
    AsideHeader,
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
