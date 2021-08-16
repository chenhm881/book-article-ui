<template>
    <header class="manage-header">
        <a-icon class="toggle-icon" :type="isOpen?'menu-fold':'menu-unfold'" />

        <div class="right">

            <a-dropdown>
                <span class="avadar-box">
                    <span>{{userName}}</span>
                </span>
                <template v-slot:overlay>
                <a-menu-item key="0">
                    <a-icon type="user" />
                    个人中心
                </a-menu-item>
                <a-menu-item key="1">
                    <a-icon type="setting" />
                    个人设置
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3">
                    <a-icon type="logout" />
                    退出登录
                </a-menu-item>
                </template>
            </a-dropdown>
        </div>
    </header>
</template>

<script lang="ts">
import {Dropdown, Menu } from 'ant-design-vue'
import {ref} from "vue";
import {PlusOutlined} from "@ant-design/icons-vue";

export default {
  setup() {
    const toggleInput = (status: boolean): void => {
      console.log(status);
    };
    const isOpenInput = true;
    const newsNum = 1;
    const userName = ref("chenhm881");
    return {
      toggleInput,
      isOpenInput,
      newsNum,
      userName,
    };
  },
  name: 'AsideHeader',
  components: {
    'a-icon': PlusOutlined,
    'a-dropdown': Dropdown,
    'a-menu-item': Menu.Item,
    'a-menu-divider': Menu.Divider
  },
  props: {
    isOpen: Boolean
  },
}
</script>

<style lang="less" scoped>
@height:64px;
@fontSize:16px;
@backColor:rgba(0, 0, 0, 0.024);
.common-style(){
  font-size: @fontSize;
  padding: 0 12px;
  cursor: pointer;
  &:hover{
    background: @backColor;
  }
};
.manage-header{
  position: relative;
  height: @height;
  line-height: @height;
  box-shadow: rgba(0, 21, 41, 0.08) 0px 1px 4px;
  background: #fff;
  /deep/.toggle-icon{ //作用域没有冠上父类的作用域，导致样式失效
    font-size: 20px;
    margin-left: 25px;
    cursor: pointer;
    transition: transform 0.5s ease;
  }
  .right{
    position: absolute;
    top: 0;
    right: 25px;
    display: flex;
    .search-box{
      /deep/.search-icon{
        cursor: pointer;
        padding: 0 12px;
        font-size: @fontSize;
      }
      .search-input{
        width: 210px;
        height: 32px;
        border: none;
        border-bottom: 1px solid #d9d9d9;
        outline: none;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) 0s, height 0s ease 0s;
        &.close{
          width: 0;
        }
      }
    }
    .help-icon{
      .common-style();
      line-height: @height;
      font-size: 15px;

    }
    .notice-box{
      position: relative;
      .common-style();
      .notice-nums{
        position: absolute;
        top: 11px;
        right: -1px;
        min-width: 20px;
        height: 20px;
        text-align: center;
        padding: 0 6px;
        line-height: 20px;
        background: red;
        color: #fff;
        border-radius: 10px;
        font-style: unset;
        font-size: 12px;
      }
      .notice-icon{
        position: relative;
        top: -2px;
      }
    }
    .avadar-box{
      .common-style();
      .avadar{
        position: relative;
        top: -3px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-right: 10px;
        font-size: 14px;
      }
    }
  }
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #d9d9d9;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #d9d9d9;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #d9d9d9;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #d9d9d9;
  }
}
</style>
