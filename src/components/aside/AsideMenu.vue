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



interface MenuObj {
  title:string;
  key:string;
  icon?:string;
  children?:MenuObj[];
}

export default {
  setup(props: any, context: any) {

    const menu = [
      {
        title: '表单页',
        key: 'form',
        icon: 'form',
        children: [
          {
            title: '基础表单',
            key: 'form-base',
            icon: ''
          },
          {
            title: '分步表单',
            key: 'form-step',
            icon: ''
          },
          {
            title: '高级表单',
            key: 'form-senior',
            icon: ''
          }
        ]
      },
      {
        title: '列表页',
        key: 'list',
        icon: 'bars',
        children: [
          {
            title: '搜索列表',
            key: 'list-search',
            icon: '',
            children: [
              {
                title: '搜索列表(文章)',
                key: 'list-search-article',
                icon: ''
              },
              {
                title: '搜索列表(项目)',
                key: 'list-search-project',
                icon: ''
              },
              {
                title: '搜索列表(应用)',
                key: 'list-search-application',
                icon: ''
              }
            ]
          },
          {
            title: '查询表格',
            key: 'list-table',
            icon: ''
          },
          {
            title: '标准列表',
            key: 'list-standard',
            icon: ''
          },
          {
            title: '卡片列表',
            key: 'list-card',
            icon: ''
          }
        ]
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
        //this.$router.push('/' + arr.join('/'))
      } else {
        // 特殊情况的处理
      }
    };

    return {
      value,
      checked: ref(false),
      setCollapse,
      selectMenu
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
      menu: [
        {
          title: '表单页',
          key: 'form',
          icon: 'form',
          children: [
            {
              title: '基础表单',
              key: 'form-base',
              icon: ''
            },
            {
              title: '分步表单',
              key: 'form-step',
              icon: ''
            },
            {
              title: '高级表单',
              key: 'form-senior',
              icon: ''
            }
          ]
        },
        {
          title: '列表页',
          key: 'list',
          icon: 'bars',
          children: [
            {
              title: '搜索列表',
              key: 'list-search',
              icon: '',
              children: [
                {
                  title: '搜索列表(文章)',
                  key: 'list-search-article',
                  icon: ''
                },
                {
                  title: '搜索列表(项目)',
                  key: 'list-search-project',
                  icon: ''
                },
                {
                  title: '搜索列表(应用)',
                  key: 'list-search-application',
                  icon: ''
                }
              ]
            },
            {
              title: '查询表格',
              key: 'list-table',
              icon: ''
            },
            {
              title: '标准列表',
              key: 'list-standard',
              icon: ''
            },
            {
              title: '卡片列表',
              key: 'list-card',
              icon: ''
            }
          ]
        }
      ]
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
