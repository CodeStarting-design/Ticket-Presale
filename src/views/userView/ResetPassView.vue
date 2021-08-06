<template>
<div class="container">
  <div style="margin-top: 8px; margin-bottom:20px;   text-align: right;"> 
      <el-select v-model="value" clearable placeholder="请选择查询项" size="medium" class="select-in">
         <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
         </el-option>
      </el-select> 
      <el-input placeholder="请输入需要查找选项值" v-model="searchInput" style="width:400px;margin-right: 15px;">
      </el-input>
      <el-button type="primary" icon="el-icon-search"  @click="searchUser" autofocus style="margin-right: 15px;">查 找</el-button>
  </div>
<el-table :data="userInfo" stripe height="542" class="tableList" v-show="showList" >  
    <el-table-column prop="userAccountNumber" label="用户账号" width="220"> </el-table-column>
    <el-table-column prop="userName"  label="用户姓名"  width="220">  </el-table-column>
    <el-table-column prop="userId"  label="身份证号"  width="260">  </el-table-column>
    <el-table-column prop="userPhone"  label="手机号码"  width="220">  </el-table-column>
    <el-table-column fixed="right"  label="操作"  width="180">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-refresh-right" circle 
        @click="resetPass(scope.row)"></el-button>
      </template>
    </el-table-column>
</el-table>

</div>
</template>

<script>
import {GetUsersById,GetUsersByAccountNumber,GetUsersByName,
GetUsersByPhone,UpdateUser} from '../../network/requuest.js'
export default {
  name:'ResetPass',
  data(){
    return {
      userInfo:[{
          userAccountNumber:'',
          userId:'',
          userPhone:'',
          userZfbNumber:'',
          userName:'',
          userPassword:'',
      }],
      value:null,
      showList:false,
      searchInput:'',
      options:[
         {
          value: 1,
          label: '身份证号',
         },
         {
          value: 2,
          label: '手机号',
         },
         {
          value: 3,
          label: '账号',
         },
         {
          value: 4,
          label: '用户姓名',
         }
       ],
    }
  },
  methods:{
    resetPass(row){
       let that=this
       row.userPassword='12345'
       UpdateUser(row).then(function(res){
          if(res.data){
             that.$alert('用户密码已重置，重置密码为12345', '提示', {
             confirmButtonText: '确定',
           });
            let num = that.userInfo.findIndex(item => item.userId==row.userId)
            that.userInfo[num]=row  
          }else{
            that.$alert('重置用户密码失败，请重试', '提示', {
             confirmButtonText: '确定',
            }); 
          }
       }).catch((err)=>{
         that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
          confirmButtonText: '确定',
        });
       })
    },
    searchUsersById(userId){
      let that=this
      GetUsersById(userId).then(function(res){
          if(res.data.length==0){
            that.$alert('未查询到符合条件的用户', '提示', {
             confirmButtonText: '确定',
            });                
          }        
        that.userInfo=res.data
        that.showList=true
      }).catch((ree)=>{
          that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
          confirmButtonText: '确定',
        });
      })        
    },
    searchUsersByAccountNumber(userAccountNumber){
      let that=this
      GetUsersByAccountNumber(userAccountNumber).then(function(res){
          if(res.data.length==0){
            that.$alert('未查询到符合条件的用户', '提示', {
             confirmButtonText: '确定',
            });                
          }
        that.userInfo=res.data
        that.showList=true
      }).catch((err)=>{
           that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
           confirmButtonText: '确定',
          });
        })
    },
    searchUsersByName(userName){
        let that=this
         GetUsersByName(userName).then(function(res){
          if(res.data.length==0){
            that.$alert('未查询到符合条件的用户', '提示', {
             confirmButtonText: '确定',
            });                
          }
          that.userInfo=res.data
          that.showList=true
         }).catch((err)=>{
            that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
            confirmButtonText: '确定',
            });
          })
      },
    searchUsersByPhone(userPhone){
        let that=this
         GetUsersByPhone(userPhone).then(function(res){
          if(res.data.length==0){
            that.$alert('未查询到符合条件的用户', '提示', {
             confirmButtonText: '确定',
            });                
          }
          that.userInfo=res.data
          that.showList=true
         }).catch((err)=>{
            that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
            confirmButtonText: '确定',
            });
         })

      },    
      searchUser(){//查找
        let that=this
        if(this.searchInput==''){
          this.$alert('请先输入查询值', '待确认', {
                confirmButtonText: '确定',
          });
        }else{
        switch(this.value){
          case 1:this.searchUsersById(this.searchInput);break;
          case 2:this.searchUsersByPhone(this.searchInput);break;
          case 3:this.searchUsersByAccountNumber(this.searchInput);break;
          case 4:this.searchUsersByName(this.searchInput);break;
          default:
            this.$alert('请先选择查询项', '待确认', {
              confirmButtonText: '确定',
            });
          }
        }
      },
  }
  
}
</script>
<style scoped>
.select-in{
  margin-right: 15px;
  width: 150px;
}
.tableList{
  width: 100%;
}
.container{
  background:url('../../img/userBk.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  background-attachment:fixed;
  height: 100%;

}
</style>