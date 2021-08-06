<template>
<div class="addUser">
  <el-card class="login-form-wrapper">
    <template #header>
      <span class="login-title">新增用户</span>
    </template>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
						<el-form-item prop="userName">
							<el-input type="text" placeholder="用户名" required="required" clearable v-model="ruleForm.userName" prefix-icon="el-icon-user-solid">
                <template slot="prepend">&nbsp;用户姓名&nbsp;&nbsp;</template>
              </el-input>
						</el-form-item>
						<el-form-item prop="userZfbNumber">
							<el-input class="phone-input" placeholder="支付宝账号" clearable v-model="ruleForm.userZfbNumber" prefix-icon="el-icon-message">
                 <template slot="prepend">支付宝账号</template>
              </el-input>
						</el-form-item>
						<el-form-item prop="userPassword">
							<el-input type="password" placeholder="请输入密码" show-password clearable  v-model="ruleForm.userPassword" prefix-icon="el-icon-lock">
                <template slot="prepend">&nbsp;用户密码&nbsp;&nbsp;</template>
              </el-input>
						</el-form-item>
						<el-form-item prop="checkPass">
							<el-input type="password" placeholder="请再次输入密码" show-password clearable  v-model="ruleForm.checkPass" prefix-icon="el-icon-lock">
                <template slot="prepend">&nbsp;确认密码&nbsp;&nbsp;</template>
              </el-input>
						</el-form-item>
            <el-form-item  prop="userPhone">
               <el-input placeholder="请输入手机号" v-model.number="ruleForm.userPhone"  prefix-icon="el-icon-mobile-phone" clearable>
                   <template slot="prepend">&nbsp;手机号码&nbsp;&nbsp;</template>
               </el-input>
            </el-form-item>
            <el-form-item  prop="userId">
               <el-input placeholder="请输入身份证号" v-model.number="ruleForm.userId"  prefix-icon="el-icon-s-finance" clearable>
                   <template slot="prepend">&nbsp;身份证号&nbsp;&nbsp;</template>
               </el-input>
            </el-form-item>            
						<el-form-item class="btn-form">
							<el-button type="primary" @click="submitForm('ruleForm')">新增</el-button>
							<el-button @click="cancelAdd()">取消</el-button>
						</el-form-item>
				</el-form>
    </el-card>
</div>
</template>
<script>
import { AddUser} from '../../network/requuest.js'
export default {
  name:"AddUserView",
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
      var validateZhf = async (rule, value, callback) => {
				if (value === '') {
					callback(new Error('支付宝账号不能为空'))
				} else {
					const reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
					if (reg.test(value)) {
						callback()
					} else {
						callback(new Error('请输入正确的支付宝帐号'))
					}
				}
			}
      var validatePhone = async (rule,value,callback) =>{
        if(value===''){
          callback(new Error('手机号不能为空'))
        }else{
          const phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
          if(phonereg.test(value)){
             callback()
          }else{
             callback(new Error('请输入正确的手机号'))
          }
        }
      } 
      var validateId = async (rule,value,callback)=>{
        if(value===''){
          callback(new Error('身份证号不能为空'))
        }else{
          const idReg=
		        /(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)/
          if(idReg.test(value)){
            callback()
          }else{
            callback(new Error('身份证号不合法'))
          }
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
					userZfbNumber: '',
					userPassword: '',
          userPhone:'',
          userId:''
				},
				rules: {
					
					userName: [{
						required: true,
						validator: validateUser1,
						trigger: 'blur'
					}],
					userZfbNumber: [{
						required: true,
            validator: validateZhf,
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
					],
          userPhone:[{
            required:true,
            validator:validatePhone,
            trigger:'blur'
          }],
          userId:[{
            required:true,
            validator:validateId,
            trigger:'blur'
          }]
				}
			}
		},
    methods:{
      cancelAdd(){
        this.ruleForm=null
        this.$router.push('/echartsview')
      },
       submitForm(formName) {
         let that=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let user={}
            user.userName=this.ruleForm.userName
            user.userPassword=this.ruleForm.userPassword
            user.userZfbNumber=this.ruleForm.userZfbNumber
            user.userId=this.ruleForm.userId
            user.userPhone=this.ruleForm.userPhone
            AddUser(user).then(function(res){
              if(res.data){
                  that.$alert('新增用户成功，登录账号:'+
                  res.data.userAccountNumber+'请使用该账号进行登录', '提示', {
                     confirmButtonText: '确定',
                  });
                 that.$router.push('/userlistview')
               }else{
                 that.$alert('新增失败，请重试', '提示', {
                    confirmButtonText: '确定',
                 });
               }
            }).catch((err)=>{
               that.$alert('请求异常，请联系服务器管理员', '提示', {
                    confirmButtonText: '确定',
                });
            })
          } else {
           this.$alert('用户信息不合法，请检查', '提示', {
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
.addUser {
  background:url('../../img/userBk.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  width: 100%;
  height: 100%;
  text-align: center;
}

.login-form-wrapper {
  /* margin: auto; */
  margin-top:1%;
  margin-left: 40%;
  position: absolute;
  top: 18%;
  left: 0;
  right: 0;
  width: 470px;
  text-align: center;
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

</style>
