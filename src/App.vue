<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex2"
          class="el-menu-header"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="spterp">商品砼ERP</el-menu-item>
          <!-- <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu> -->
          <el-menu-item class="right-menu-item" index="3">我的</el-menu-item>
          <el-menu-item class="right-menu-item" index="4">消息</el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            @select="selectItem"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <!-- <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>进销存</span>
              </template>
              <el-menu-item-group title="库存" index='stock'>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-1-1">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="销售" index='sell'>
                <el-menu-item index="1-2">选项3</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="生产" index='produce'>
                <el-submenu index="1-3">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-3-1">选项1</el-menu-item>
                </el-submenu>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-menu-item-group>
              
            </el-submenu> -->
            <el-submenu v-for="(menuItem, index) in leftMenu" :index="menuItem.menuIndex">
                <template slot="title" :tabindex="menuItem.menuIndex">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menuItem.menuName }}</span>
                </template>
                <el-menu-item v-for="(item, i) in menuItem.menuItems" :data-key="item.itemName" :index="item.itemIndex">{{ item.itemName }}</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item> -->
          </el-menu>
        </el-aside>
        <el-container>
          <el-main>
            <el-tabs v-model="editableTabsValue2" type="border-card" closable @tab-remove="removeTab" @tab-click="tabClick">
                <el-tab-pane
                        v-for="item in editableTabs2"
                        :key="item.name"
                        :label="item.title"
                        :name="item.name">
                    <keep-alive>
                        <div class="tab-content" :is="item.name" @eleven="eleven"></div>
                    </keep-alive>
                </el-tab-pane>

            </el-tabs>

          </el-main>
          <el-footer>Copyright © 2018, Content By 河南砼鑫软件科技有限公司 保留所有权利.</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Home from "./components/Home";
import UserList from './components/user/List'
import UserInfo from './components/user/Info'
import UserEdit from './components/user/Edit'

import EnterpriseList from './components/enterprise/List'
export default {
    components: {Home, UserList, EnterpriseList, UserInfo, UserEdit},
    data() {
        return {
            leftMenu: [
                {
                    menuIndex: 'enterprise',
                    menuName:'企业管理',
                    menuItems:[
                    {
                      itemIndex: '/enterprise/list',
                      itemName: '企业列表'
                    }
                    ]
                },
                {
                    menuIndex: 'user',
                    menuName:'用户管理',
                    menuItems:[
                        {
                            itemIndex: '/user/list',
                            itemName: '用户列表'
                        }
                    ]
                }
            ],
            activeIndex: 'Home',
            activeIndex2: 'Home',
            editableTabsValue2: 'Home',
            editableTabs2: [
              {
                title: '首页',
                name: 'Home',
              },
            // {
            //   title: 'Tab 2',
            //   name: '2',
            // }
            ],
            tabIndex: 2
        };
  },
  methods: {
    startHacking () {
      this.$notify({
        title: 'It works!',
        type: 'success',
        message: 'We\'ve laid the ground work for you. It\'s time for you to build something epic!',
        duration: 5000
      })
    },
    tabClick(e){
        console.log(e)
    },
    addTab(targetName) {
        console.log('add')

        let newTabName = ++this.$data.tabIndex + '';
        const tabs = this.$data.editableTabs2;
        // 判断是否存在

        for (let i = 0; i<tabs.length; i++){
            console.log(tabs[i])
            console.log(this.$menu)
            if (tabs[i]['title'] === targetName) {
                this.$set(this.$data, 'editableTabsValue2', this.$menu[targetName].componentName);
                this.$router.push(this.$menu[targetName].path)
                return;
            }
        }
        tabs.push({
          title: targetName,
          name: this.$menu[targetName].componentName
        });
        this.$set(this.$data, 'editableTabs2', tabs);
        this.$set(this.$data, 'editableTabsValue2', this.$menu[targetName].componentName);
    },
    removeTab(targetName) {
      let tabs = this.$data.editableTabs2;
      let activeName = this.$data.editableTabsValue2;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.$set(this.$data, 'editableTabsValue2', activeName);
      this.$set(this.$data, 'editableTabs2', tabs.filter(tab => tab.name !== targetName));
    },
    eleven(key){
        console.log(key)
        this.selectItem(key,'')
    },
    handleOpen(key, keyPath) {
      // this.addTab(key)
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    selectItem(key, keyPath){
        // Vue.router.push({path: key})
        console.log('APP ==> selectItem ==> key={'+ key +'}')
        //判断是否存在
        if (key === '/user/list'){
            this.addTab('用户列表');
            // router.push('/user/list')
        }
        else if (key === '/enterprise/list'){
            this.addTab('企业列表');
        }else if (key.substring(0, '/user/info'.length) === '/user/info'){
            this.addTab('用户详情');
        }else if (key.substring(0, '/user/edit'.length) === '/user/edit'){
            this.addTab('编辑用户');
        }
        this.$router.push(key)

    }
  }
}
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  height: 100%;
}
.el-header{
  background-color: rgb(84, 92, 100);
}
.el-container{
  height: 100%;
}
.el-aside{
  background-color: rgb(84, 92, 100);
}
.el-menu{
  border-right: solid 0;
}
html, body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.el-header{
  /* margin: 0; */
  /* padding: 0; */
}
.el-pagination, .el-footer{
  text-align: center;
}
.right-menu-item{
  float: right !important; 
}
</style>
