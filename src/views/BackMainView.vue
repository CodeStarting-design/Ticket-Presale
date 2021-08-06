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
         <router-link to="userlistview" class="router_item">
         <el-menu-item index="2-1">用户列表</el-menu-item>
         </router-link>
         <router-link to="resetpassview" class="router_item">
         <el-menu-item index="2-2">重置密码</el-menu-item>
         </router-link>
         <router-link to="adduserview" class="router_item">
         <el-menu-item index="2-3">新增用户</el-menu-item>
         </router-link>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-s-promotion"></i>航班管理</template>
         <router-link to="flightlistview" class="router_item">
         <el-menu-item index="3-1">航班列表</el-menu-item>
         </router-link>
         <router-link to="flightinfoview" class="router_item">
         <el-menu-item index="3-2">航班信息查询</el-menu-item>
         </router-link>
         <router-link to="addflightview" class="router_item">
         <el-menu-item index="3-3">新增航班</el-menu-item>
         </router-link>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
          <router-link to="billlistview" class="router_item">
            <el-menu-item index="4-1">订单列表</el-menu-item>
          </router-link>
   
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="margin-right:14px;font-size:17px;font-family:'niceFont'">Welcome</span>
      <span style="margin-right:14px;font-size:14px;">{{$store.state.adminInfo.adminName}}</span>
      <el-dropdown trigger="click"  @command="handleCommand">
        <el-button type="primary" icon="el-icon-setting" circle></el-button>
        <!-- <i class="el-icon-setting" style="margin-right: 15px"></i> -->
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command='a'>首页</el-dropdown-item>
          <el-dropdown-item command='b'>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
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
        adminName:"user",
        tableData: Array(20).fill(item)
      }
    },
    methods:{
      handleCommand(command){
       if(command==='a'){
         this.$router.push('/echartsview')
       }else{
         this.$store.commit('adminLogout')
        this.$router.push('/loginview')
       }
      }
    }
  };
</script>