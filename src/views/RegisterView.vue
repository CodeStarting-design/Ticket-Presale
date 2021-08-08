<template>
<div class="login-page">
  <el-card class="login-form-wrapper">
    <template #header>
      <span class="login-title">管理员注册</span>
    </template>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="userNumber">
							<el-input type="text" placeholder="管理员账号" required="required" clearable v-model="ruleForm.userNumber" prefix-icon="el-icon-user-solid">
                 <template slot="prepend">&nbsp;&nbsp;&nbsp;账号&nbsp;&nbsp;&nbsp;&nbsp;</template>
              </el-input>
						</el-form-item>
						<el-form-item prop="userName" >
							<el-input type="text" placeholder="管理员名称" required="required" clearable v-model="ruleForm.userName" prefix-icon="el-icon-s-comment"><template slot="prepend">&nbsp;&nbsp;&nbsp;名称&nbsp;&nbsp;&nbsp;&nbsp;</template></el-input>
						</el-form-item>
						<el-form-item prop="userPassword">
							<el-input type="password" placeholder="请输入密码" show-password clearable  v-model="ruleForm.userPassword" prefix-icon="el-icon-lock"><template slot="prepend">&nbsp;&nbsp;&nbsp;密码&nbsp;&nbsp;&nbsp;&nbsp;</template></el-input>
						</el-form-item>
						<el-form-item prop="checkPass">
							<el-input type="password" placeholder="请再次输入密码" show-password clearable  v-model="ruleForm.checkPass" prefix-icon="el-icon-lock"><template slot="prepend">确认密码</template></el-input>
						</el-form-item>
            <el-form-item prop="adminKey">
              <el-input type="password" placeholder="请输入管理员邀请码" show-password clearable v-model="ruleForm.adminKey" prefix-icon="el-icon-paperclip"><template slot="prepend">&nbsp;邀请码&nbsp;&nbsp;</template></el-input>
            </el-form-item>
						<el-form-item class="btn-form">
							<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
							<el-button @click="backLogin">取消</el-button>
						</el-form-item>
				</el-form>
    </el-card>
</div>
</template>
<script>
import {RegisterQequest} from '../network/requuest.js'
export default {
  name:"RegisterView",
  data() {
			var validateUser1 = async (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'))
				} else {
          	callback()
				}
			}
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'))
				} else {
					if (this.checkPass !== '') {
						this.$refs.ruleForm.validateField('checkPass')
					}
					callback()
				}
			}
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请再次输入密码'))
				} else if (value !== this.ruleForm.userPassword) {
					callback(new Error('两次输入密码不一致!'))
				} else {
					callback()
				}

			}
      var valiadateNumber=(rule,value,callback)=>{
        let reg = /^[A-Za-z0-9]{3,18}$/; 
      if (value === '') {
					callback(new Error('请输入注册账号'))
				} else if(!reg.test(value)){
					callback(new Error('注册账号必须是3-18位字母加数字的组合'))
				} else {
          callback()
        }
      }

			return {
				show: true,
				count: '',
				timer: null,
        checkPass: '',
				ruleForm: {
          checkPass: '',
					userName: '',
					userPassword: '',
          userNumber:'',
          adminKey:''
				},
				rules: {
					userNumber:[{
           required:true,
           validator:valiadateNumber,
           trigger:'blur'
          },
          {
         	    min: 3,
							max: 18, 
              message: '长度在 3到 18 个字符',
							trigger: 'blur'
          }],
					userName: [{
						required: true,
						validator: validateUser1,
						trigger: 'blur'
					}],
					// 密码
					userPassword: [{
							required: true,
							validator: validatePass,
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15, 
              message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					],
					// 校验密码
					checkPass: [{
							required: true,
							validator: validatePass2,
							trigger: 'blur'
						},
						{
							min: 3,
							max: 15, 
              message: '长度在 3 到 15 个字符',
							trigger: 'blur'
						}
					]
				}
			}
		},
    methods:{
      backLogin(){
        this.ruleForm=null
        this.$router.push('/loginview')
      },
       submitForm(formName) {
         let that=this
         this.$refs[formName].validate((valid) => {
          if (valid) {
            let admin={}
            admin.adminNumber=this.ruleForm.userNumber
            admin.adminPassword=this.ruleForm.userPassword
            admin.adminName=this.ruleForm.userName
            if(this.ruleForm.adminKey==''){
               that.$alert('请输入管理员邀请码', '提示', {
                  confirmButtonText: '确定',
               });
            }else if(this.ruleForm.adminKey!='44796'){
               that.$alert('管理员邀请码错误，请重试', '提示', {
                  confirmButtonText: '确定',
               });
            }else{
            RegisterQequest(admin).then(function(res){
             if(res.data){
                that.$alert('注册成功，您的登录账号是'+that.ruleForm.userNumber+'请使用该账号进行登录', '提示', {
                  confirmButtonText: '确定',
                });
                that.$router.push('/loginview')                
             }else{
                  that.$alert('注册失败，帐号重复，请修改', '提示', {
                  confirmButtonText: '确定',
              });
             }
            }
            ).catch((err)=>{
              that.$alert('请求失败，请联系服务器管理人员', '提示', {
              confirmButtonText: '确定',
              });              
            })
            }
          } else {
           this.$alert('注册信息不合法，请检查', '提示', {
            confirmButtonText: '确定',
            callback: action => {
             }
           });
            return false;
          }
        });


      },
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
</style>
