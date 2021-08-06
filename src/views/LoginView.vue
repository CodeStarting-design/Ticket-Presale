<template>
  <div class="login-page">
    <el-card class="login-form-wrapper">
      <template #header>
        <span class="login-title">管理员登录</span>
      </template>

      <el-form :model="loginForm" :rules="rules"  :status-icon="true">

        <el-form-item prop="username">
          <el-input placeholder="账号" clearable v-model="loginForm.username" prefix-icon="el-icon-user-solid">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="密码" show-password clearable v-model="loginForm.password"
                    @keyup.enter.native="login" prefix-icon="el-icon-lock">
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="button-login" @click="login">登录</el-button>
        </el-form-item>

        <span class="user-register" @click="register">管理员注册</span>

      </el-form>
    </el-card>
  </div>
</template>
<script>
import { LoginRequest } from '../network/requuest.js'
export default {
  name: "LoginView",
  data() {
      var valiadateNumber=(rule,value,callback)=>{
        let reg = /^[A-Za-z0-9]{3,18}$/; 
      if (value === '') {
					callback(new Error('请输入账号'))
				} else if(!reg.test(value)){
					callback(new Error('账号必须是3-18位字母加数字的组合'))
				} else {
          callback()
        }
      }    
    return {
      loginForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true,  trigger: 'blur',validator:valiadateNumber},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    login() {
      let that=this;
      LoginRequest(that.loginForm.username).then(
        function(res){
          if(res.data==""){
            that.$alert('账号不存在，请先注册', '提示', {
            confirmButtonText: '确定',
            callback: action => {
          }
        });
          }else{
          if(res.data.adminPassword==that.loginForm.password){
            let adminData=res.data
            function userObj(adminData){                
              this.adminName=adminData.adminName
              this.adminNumber=adminData.adminNumber
              this.adminPassword=adminData.adminPassword
            }
            let admin=new userObj(adminData)
            that.$store.commit({
              type:'adminLogin',
              admin:admin
            }) 
            that.$message({
              showClose: true,
              message: '登录成功',
              type: 'success'
            });           
            that.$router.push('/echartsview')
          }else{
            that.$alert('账号密码错误', '提示', {
            confirmButtonText: '确定',
            callback: action => {
             }
           });
          }
          }
     }
     ).catch((err)=>{
        that.$alert('请求失败，请联系服务器管理人员', '提示', {
        confirmButtonText: '确定',
      });       
     })
    },
    register() {
       this.$router.push('/registerview')
    }
  }
}
</script>

<style scoped>
.login-page {
  /* background:url('../assets/loginBK.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  background-attachment:fixed; */
  height: 100vh;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.login-form-wrapper {
  margin: auto;
  position: absolute;
  top: 18%;
  left: 0;
  right: 0;
  width: 370px;
}

.login-title {
  position: absolute;
  left: 37%;
  line-height: 3px;
  font-size: 19px;
  font-family: PingFang SC, Helvetica Neue, Helvetica, microsoft yahei, arial, STHeiTi, sans-serif;
  letter-spacing: 10px;
  color: #409EFF;
}

.el-icon-user {
  margin-left: 5px;
  transform: scale(1.4)
}

.icon-password {
  margin-left: -11px;
}

.button-login {
  background-color: #53A8FF;
  color: #fff;
  width: 100%;
}

.user-register {
  font-size: 13px;
  color: #909399;
  cursor: pointer;
}
.router_item{
  line-height: 36px;
  text-decoration:none;
  color: black;
}
</style>
