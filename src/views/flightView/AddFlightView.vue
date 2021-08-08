<template>
<div class="addFlight">
  <el-card class="login-form-wrapper">
    <template #header>
      <span class="login-title">新增航班</span>
    </template>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
						<el-form-item prop="flightId">
							<el-input type="text" placeholder="航班编号" required="required" clearable v-model="ruleForm.flightId" prefix-icon="el-icon-cpu">
                <template slot="prepend">航班编号</template>
              </el-input>
						</el-form-item>
            <el-form-item prop="airplaneId">
							<el-input type="text" placeholder="飞机号"  required="required" clearable v-model="ruleForm.airplaneId" prefix-icon="el-icon-s-promotion">
                 <template slot="prepend">飞机编号</template>
              </el-input>
						</el-form-item>
            <el-form-item prop="flightFromPlace">
              <el-input placeholder="出发地"   type="text" required="required" prefix-icon="el-icon-location-outline"  clearable v-model="ruleForm.flightFromPlace">
                 <template slot="prepend">出发城市</template>
              </el-input>
            </el-form-item>
            <el-form-item prop="flightToPlace">
              <el-input placeholder="到达地" type="text" required="required" prefix-icon="el-icon-location-outline" clearable v-model="ruleForm.flightToPlace">
               <template slot="prepend">到达城市</template>
              </el-input>
						</el-form-item>
            <el-form-item>
							<el-date-picker v-model="dateTime" type="datetimerange" :picker-options="pickerOptions" 
                range-separator="至" start-placeholder="出发时间" value-format="yyyy-MM-dd HH:mm:ss"
                end-placeholder="到达时间" align="right" style="width:430px;">
              </el-date-picker>
						</el-form-item>
            <el-form-item prop="flightCompany">
              <el-input placeholder="航空公司" type="text" clearable required="required" 
              prefix-icon="el-icon-s-shop" v-model="ruleForm.flightCompany">
               <template slot="prepend">航空公司</template>
              </el-input>
						</el-form-item>
            <el-form-item prop="flightSeatNum">
              <el-input placeholder="座位数" type="text" clearable required="required" 
              prefix-icon="el-icon-s-marketing" v-model="ruleForm.flightSeatNum">
               <template slot="prepend">座位总数</template>
              </el-input>
						</el-form-item>
            <el-form-item prop="flightPrice">
              <el-input placeholder="航班价格" clearable type="text" required="required" 
              prefix-icon="el-icon-s-order" v-model="ruleForm.flightPrice">
                <template slot="prepend">航班价格</template>
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
import { AddFlight} from '../../network/requuest.js'
export default {
  name:"AddFlightView",
  data() {
			var validateFlightId = async (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入航班编号'))
				} else {
          const reg = /^[a-zA-Z]{2}\d{6}$/
          if(reg.test(value)){
          	callback()
          }else{
            callback(new Error('航班编号不合法,请输入两个字母开头+6个数字的组合'))
          }
				}
			}
      var validateAirplaneId = async (rule, value, callback) => {
				if (value === '') {
					callback(new Error('飞机号不能为空'))
				} else {
					const reg = /^\d{3}$/
					if (reg.test(value)) {
						callback()
					} else {
						callback(new Error('请输入正确的飞机号，飞机号三个数字的组合'))
					}
				}
			}
      var validatePlace = async (rule,value,callback) =>{
        if(value===''){
          callback(new Error('地点不能为空'))
        }else{
          const reg = /^[\u4E00-\u9FA5]{1,5}$/
          if(reg.test(value)){
             callback()
          }else{
             callback(new Error('请输入正确的地点'))
          }
        }
      } 
      var validateCompany = async (rule,value,callback) =>{
        if(value===''){
          callback(new Error('航空公司不能为空'))
        }else{
          const reg = /^[\u4E00-\u9FA5]{1,5}$/
          if(reg.test(value)){
             callback()
          }else{
             callback(new Error('请输入正确的航空公司'))
          }
        }
      }
      var validateNum = async (rule,value,callback)=>{
        if(value===''){
          callback(new Error('数值不能为空'))
        }else{
          const reg=/^\+?[1-9][0-9]*$/
          if(reg.test(value)){
            callback()
          }else{
            callback(new Error('数值不合法'))
          }
        }
      }
			return {
        dateTime:'',
				ruleForm: {
         airplaneId:'',
         flightId:'',
         flightFromPlace:'',
         flightToPlace:'',
         flightDepartureTime:'',
         flightArriveTime:'',
         flightCompany:'',
         flightPrice:'',
         flightSeatNum:'',
         flightSeatRestNum:''
				},        
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
				rules: {					
         flightId:[{
           required: true,
					 validator: validateFlightId,
					 trigger: 'blur'
         }],
         airplaneId:[{
           required: true,
					 validator: validateAirplaneId,
					 trigger: 'blur'
         }],
         flightFromPlace:[{
           required: true,
					 validator: validatePlace,
					 trigger: 'blur'
         }],
         flightToPlace:[{
           required: true,
					 validator: validatePlace,
					 trigger: 'blur'
         }],
         flightCompany:[{
           required: true,
					 validator: validateCompany,
					 trigger: 'blur'
         }],
         flightPrice:[{
           required: true,
					 validator: validateNum,
					 trigger: 'blur'
         }],
         flightSeatNum:[{
          required: true,
					validator: validateNum,
					trigger: 'blur'
         }],
				}
			}
		},
    methods:{
      cancelAdd(){
        this.ruleForm=null
        this.$router.push('/flightlistview')
      },
       submitForm(formName) {
         if(this.dateTime==''){
           this.$alert('请输入航班时间，请检查', '提示', {
            confirmButtonText: '确定',
            callback: action => {
             }
           });
         }else{
        let that=this
        this.ruleForm.flightDepartureTime=this.dateTime[0]
        this.ruleForm.flightArriveTime=this.dateTime[1]
        this.ruleForm.flightSeatRestNum=this.ruleForm.flightSeatNum
        console.log(this.ruleForm)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            AddFlight(this.ruleForm).then(function(res){
              if(res.data){
                  that.$alert('新增航班成功', '提示', {
                     confirmButtonText: '确定',
                  });
                 that.$router.push('/flightlistview')
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
           this.$alert('航班信息不合法，请检查', '提示', {
            confirmButtonText: '确定',
            callback: action => {
             }
           });
            return false;
          }
        });
      }
      },
    }
}
</script>
<style scoped>
.addFlight {
  background:url('../../img/userBk.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  width: 100%;
  height: 100%;
  text-align: center;
}

.login-form-wrapper {
  margin-top:1%;
  margin-left: 40%;
  position: absolute;
  top: 6%;
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
.dateClass{
  width: 90%;
}
</style>
