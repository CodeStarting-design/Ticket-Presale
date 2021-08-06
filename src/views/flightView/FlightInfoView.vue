<template>
<div class="login-page">
  <el-card class="login-form-wrapper" v-show="showCard">
      <template #header>
        <span class="login-title">航班查询</span>
      </template>
      <el-form :model="checkForm"   :status-icon="true">
        <el-form-item class="place">
          <el-select v-model="checkForm.flightFromPlace" filterable placeholder="请选择出发地">
            <el-option v-for="item ,index in cities" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
           <el-button type="primary" icon="el-icon-s-promotion" circle class="beIcon"></el-button>
          <el-select   v-model="checkForm.flightToPlace" filterable placeholder="请选择到达地">
            <el-option v-for="item ,index in cities" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="dateTime">
          <el-date-picker v-model="checkForm.flightDepartureTime" type="datetime" 
          value-format="yyyy-MM-dd HH:mm:ss" style="width:100%"
          placeholder="选择出发时间"></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button class="button-login" @click="searchFlight">查询</el-button>
        </el-form-item>

      </el-form>
  </el-card>
  <div class="container" v-show="!showCard">
      <div style="margin-top: 8px; margin-bottom:20px;   text-align: left;">
         <el-button type="primary" icon="el-icon-back" circle  @click="goBack" ></el-button>   
      </div>
    <el-table  :data="flightInfo" stripe height="542" class="tableList" :row-style="{height: '65.5px'}">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="航班编号">
              <span>{{ props.row.flightId }}</span>
            </el-form-item>
            <el-form-item label="飞机编号">
              <span>{{ props.row.airplaneId }}</span>
            </el-form-item>
            <el-form-item label="出发地">
              <span>{{ props.row.flightFromPlace }}</span>
            </el-form-item>
            <el-form-item label="到达地">
              <span>{{ props.row.flightToPlace}}</span>
            </el-form-item>
            <el-form-item label="出发时间">
              <span>{{ props.row.flightDepartureTime }}</span>
            </el-form-item>
            <el-form-item label="到达时间">
              <span>{{ props.row.flightArriveTime }}</span>
            </el-form-item>
            <el-form-item label="航班公司">
              <span>{{ props.row.flightCompany }}</span>
            </el-form-item>
            <el-form-item label="航班价格">
              <span>{{ props.row.flightPrice }}</span>
            </el-form-item>
            <el-form-item label="座位总数">
              <span>{{ props.row.flightSeatNum }}</span>
            </el-form-item>
            <el-form-item label="剩余座位数">
              <span>{{ props.row.flightSeatRestNum }}</span>
            </el-form-item>
         </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="flightId" label="航班编号" width="180"></el-table-column>
      <el-table-column prop="airplaneId" label="飞机编号" width="180"></el-table-column>
      <el-table-column  prop="flightFromPlace" label="出发地" width="180"> </el-table-column>
      <el-table-column prop="flightToPlace" label="到达地" width="180"></el-table-column>
      <el-table-column prop="flightSeatRestNum" label="剩余座位数" width="180"> </el-table-column>
      <el-table-column prop="flightPrice" label="航班价格" width="180"> </el-table-column>
      <el-table-column prop="flightCompany"  label="航班公司"  width="100" ></el-table-column>
    </el-table>
  </div>
</div>
</template>
<script>
import {GetFlightByPlace,GetAllCities} from '../../network/requuest.js'
export default {
  name:'flightInfo',
  data(){
    return {
    cities:null,
    showCard:true,
    currentPage:null,
    checkForm:{
      flightFromPlace:'',
      flightToPlace:'',
      flightDepartureTime:'',
    },
    flightInfo: [{
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
        }, ],
    }
  },
  created(){
    let that=this
    GetAllCities().then(function(res){
       that.cities=res.data
    }).catch((err)=> {
        that.$alert('获取城市列表失败，请联系服务器管理员', '提示', {
          confirmButtonText: '确定',
        });
    })

  },
  methods:{
    searchFlight(){
      let that=this
      if(this.checkForm.flightFromPlace==''||this.checkForm.flightToPlace==''||this.checkForm.flightDepartureTime==''){
         that.$alert('请输入完整的航班信息', '提示', {
          confirmButtonText: '确定',
        });
      }else{
     GetFlightByPlace(this.checkForm).then(function(res){
       if(res.data.length){
         that.showCard=false
         that.flightInfo=res.data
       }else{
         that.$alert('未查询到符合条件的航班', '提示', {
           confirmButtonText: '确定',
         });
       }
     }).catch((err)=>{
        console.log(err)
        that.$alert('请求失败，请联系服务器管理人员', '提示', {
           confirmButtonText: '确定',
        });
     })
    }
    },
    goBack(){
      this.showCard=true
      this.flightInfo=null
    }
  }

}
</script>
<style scoped>
.login-page {
  background:url('../../img/userBk.jpg');
  background-repeat: no-repeat;
  background-size:100% 100%;
  width: 100%;
  height: 100%;
  text-align: center;
}

.login-form-wrapper {
  margin: auto;
  position: absolute;
  top: 25%;
  left: 10%;
  right: 0;
  width: 670px;
  height: 400px;
}

.login-title {
  position: absolute;
  left: 40%;
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
  margin-top: 20px;
  background-color: #53A8FF;
  color: #fff;
  width: 80%;
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
.beIcon{
  margin-left: 10px;
  margin-right: 10px;
}
.place{
  margin-top: 60px;
}
.dateTime{
   margin-top: 20px;
   width: 80%;
   margin-left: 10%;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>