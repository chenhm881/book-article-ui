<template>
  <div class="aside-menu" :class="isOpen?'':'small'">
    <h1 class="title">
      <img class="title-img" :src="isOpen?logoComplete:logoHalf" alt="logo">
    </h1>
    <Menu
        :defaultSelectedKeys="current"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        :inlineCollapsed="!isOpen"
    >
      <sub-menu v-for="item in menu" :key="item.key">
        <template v-slot:title>
            <a-icon v-if="item.icon" :type="item.icon" />
            <span>{{item.title}}</span>
        </template>
        <template v-if="item.children&&item.children.length">
          <template v-for="subItem in item.children">
            <sub-menu v-if="(subItem.children&&subItem.children.length)" :key="subItem.key">
                <template v-slot:title>
                    <a-icon v-if="subItem.icon" :type="subItem.icon" />
                    <span>{{subItem.title}}</span>
                </template>
              <menu-item v-for="lastItem in subItem.children" @click="selectMenu(lastItem)" :key="lastItem.key">
                <a-icon v-if="lastItem.icon" :type="lastItem.icon" />
                {{lastItem.title}}
              </menu-item>
            </sub-menu>
            <menu-item v-else @click="selectMenu(subItem)" :key="subItem.key">
              <a-icon v-if="subItem.icon" :type="subItem.icon" />
              {{subItem.title}}
            </menu-item>
          </template>
        </template>
      </sub-menu>
      <!-- <MenuGroup v-for="item in menu" :key="item.key" :menuInfo="item"></MenuGroup> -->
    </Menu>
  </div>
</template>

<script lang="ts">
import  { Menu} from 'ant-design-vue';
import {debounce, getArrByActive} from '../../utils'
import  {onMounted, ref } from 'vue';
import 'ant-design-vue/dist/antd.css';
import { PlusOutlined } from "@ant-design/icons-vue";
import { toRef } from 'vue';
import { useRouter } from 'vue-router'



interface MenuObj {
  title:string;
  key:string;
  icon?:string;
  children?:MenuObj[];
}

export default {
  setup(props: any, context: any) {
    const router = useRouter()
    const menu = [
      {
        title: '文件管理',
        key: 'file',
        icon: 'file',
        children: [
          {
            title: '手动扫描',
            key: 'manual-scan',
            icon: ''
          },
          {
            title: '定时扫描',
            key: 'schedule-scan',
            icon: ''
          }
        ]
      },
      {
        title: '待定',
        key: 'list',
        icon: 'bars',
      }
    ]

    const value = ref('');
    const isOpen = toRef(props, 'isOpen')
    console.log(isOpen.value);
    onMounted(() => {
      setCollapse();
      window.onresize = debounce(setCollapse, 50)
    })


    const setCollapse = () => {
      context.emit('modifyIsOpen', (false));
    };

    const selectMenu = (item:MenuObj):void => {
      let arr = getArrByActive(menu, item.key, 'key')

      if (arr && arr.length) {
        router.push('/' + arr.join('/'))
      } else {
        // 特殊情况的处理
      }
    };

    return {
      value,
      checked: ref(false),
      setCollapse,
      selectMenu,
      menu
    };
  },
  name: 'AsideMenu',
  components: {
    Menu,
    // MenuGroup
    'a-icon': PlusOutlined,
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu
  },
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      logoComplete: 'http://www.lishiots.com/_nuxt/img/logo.321c26b.png',
      logoHalf: "",
      current: [],
      openKeys:[],
    }
  },

  emits: {
    'modifyIsOpen': (val:boolean): boolean => {
      if(val==true) {
        return true;
      } else {
        return true;
      }
    }
  },

  methods: {

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.aside-menu{
  z-index: 9;
  flex: 0 0 256px;
  background: #001529;
  transition: all 0.5s ease;
  box-shadow: rgba(0, 21, 41, 0.35) 2px 0px 6px;
  .title{
    text-align: center;
    .title-img{
      width: 150px;
      height: 43px;
      margin: 10px 0;
      transition: all 0.5s ease;
    }
  }
  &.small{
    flex: 0 0 80px;
    width: 80px;
    .title-img{
      width: 40px!important;
      height: 40px!important;
      border-radius: 50%;
    }
    .ant-menu-submenu-title .anticon{
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
