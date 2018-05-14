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
          <el-menu-item>商品砼ERP</el-menu-item>
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
            router
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
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menuItem.menuName }}</span>
              </template>
                <el-menu-item v-for="(item, i) in menuItem.menuItems" data-key="item.itemName" index="{{ item.itemIndex }}">{{ item.itemName }}</el-menu-item>
                <!--<el-menu-item index="2-2">选项2-2</el-menu-item>-->
                <!--<el-menu-item index="/user/list">用户列表</el-menu-item>-->
                <!--<el-menu-item index="3-1">选项3-1</el-menu-item>-->
                <!--<el-menu-item index="3-2">选项3-2</el-menu-item>-->
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
            <el-tabs v-model="editableTabsValue2" type="border-card" closable @tab-remove="removeTab">
              <el-tab-pane
                v-for="item in editableTabs2"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                <router-view></router-view>
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
    import Vue from 'vue'
export default {
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
      activeIndex: '1',
      activeIndex2: '1',
      editableTabsValue2: '2',
      editableTabs2: [{
        title: 'Tab 1',
        name: '1',
      }, {
        title: 'Tab 2',
        name: '2',
      }],
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
    addTab(targetName) {
        console.log('add')
        let newTabName = ++this.$data.tabIndex + '';
        var tabs = this.$data.editableTabs2;
        tabs.push({
          title: targetName,
          name: newTabName
        });
        this.$set(this.$data, 'editableTabs2', tabs);
        this.$set(this.$data, 'editableTabsValue2', newTabName);
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
    // selectItem(key, keyPath){
    //     // Vue.router.push({path: key})
    // }
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
  border-right: solid 0px;
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
