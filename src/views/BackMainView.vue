<template>
<el-container style="height: 700px; border: 1px solid #eee">
  <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['2', '3','4']">
      <router-link to="echartsview" class="router_item">
      <el-menu-item index="1">
        <template slot="title"><i class="el-icon-s-home"></i>首页</template>
      </el-menu-item>
      </router-link>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
         <router-link to="" class="router_item">
         <el-menu-item index="2-1">用户列表</el-menu-item>
         </router-link>
         <router-link to="" class="router_item">
         <el-menu-item index="2-2">用户注销</el-menu-item>
         </router-link>
         <router-link to="" class="router_item">
         <el-menu-item index="2-3">新增用户</el-menu-item>
         </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-promotion"></i>航班管理</template>
         <router-link to="" class="router_item">
         <el-menu-item index="3-1">航班列表</el-menu-item>
         </router-link>
         <router-link to="" class="router_item">
         <el-menu-item index="3-2">航班信息查询</el-menu-item>
         </router-link>
         <router-link to="" class="router_item">
         <el-menu-item index="3-3">新增航班</el-menu-item>
         </router-link>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
          <router-link to="" class="router_item">
            <el-menu-item index="4-1">订单列表</el-menu-item>
          </router-link>
          <router-link to="" class="router_item">
            <el-menu-item index="4-2">订单信息查询</el-menu-item>
          </router-link>
   
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>王小虎</span>
    </el-header>
    
    <el-main>
     <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #f4f9ff;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: rgb(255, 255, 255);
    background-color: #333;
  }
  
::-webkit-scrollbar {
  width: 8px; 
 
}
::-webkit-scrollbar-thumb {
  background-color: #98c7fd;
  border-radius: 3px;
}
.router_item{
  line-height: 56px;
  text-decoration:none;
  color: black;
}
</style>

<script>
  export default {
    name:'backmainView',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>