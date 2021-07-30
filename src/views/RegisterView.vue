<template>
<div class="login-page">
  <el-card class="login-form-wrapper">
    <template #header>
      <span class="login-title">管理员注册</span>
    </template>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
						<el-form-item prop="userName">
							<el-input type="text" placeholder="管理员名称" required="required" clearable v-model="ruleForm.userName" prefix-icon="el-icon-user-solid"></el-input>
						</el-form-item>
						<el-form-item prop="userPassword">
							<el-input type="password" placeholder="请输入密码" show-password clearable  v-model="ruleForm.userPassword" prefix-icon="el-icon-lock"></el-input>
						</el-form-item>
						<el-form-item prop="checkPass">
							<el-input type="password" placeholder="请再次输入密码" show-password clearable  v-model="ruleForm.checkPass" prefix-icon="el-icon-lock"></el-input>
						</el-form-item>
            <el-form-item prop="adminKey">
              <el-input type="password" placeholder="请输入管理员邀请码" show-password clearable v-model="ruleForm.adminKey" prefix-icon="el-icon-paperclip"></el-input>
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

			return {
				show: true,
				count: '',
				timer: null,
        checkPass: '',
				ruleForm: {
          checkPass: '',
					userName: '',
					userPassword: '',
          adminKey:''
				},
				rules: {
					
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
