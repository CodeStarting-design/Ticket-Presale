<template>
  <div class="container">
    <div style="margin-top: 8px; margin-bottom:20px;   text-align: right;">
      <el-button type="primary" icon="el-icon-back" circle  @click="goBack" v-show="!showPage" class="back"></el-button>   
      <el-select v-model="value" @change="selectChange"  placeholder="请选择查询项" size="medium" class="select-in">
         <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
         </el-option>
      </el-select> 
      <el-input placeholder="请输入需要查找选项值" v-model="searchInput" 
      style="width:400px;margin-right: 15px;" v-show="!showdate" ></el-input>
      <el-date-picker v-model="dateTime" type="date" v-show="showdate" value-format="yyyy-MM-dd"
      placeholder="选择订单日期" style="width:400px;margin-right: 15px;"> </el-date-picker>
      <el-button type="primary" icon="el-icon-search"  @click="searchUser" autofocus style="margin-right: 15px;">查 找</el-button>
    </div>
     <el-table
    :data="billInfo"
    stripe
    height="442"
    class="tableList"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户姓名">
            <span>{{ props.row.user.userName }}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span>{{ props.row.userId }}</span>
          </el-form-item>
          <el-form-item label="用户账号">
            <span>{{ props.row.user.userAccountNumber }}</span>
          </el-form-item>
          <el-form-item label="预留手机号">
            <span>{{ props.row.user.userPhone }}</span>
          </el-form-item>
          <el-form-item label="支付宝账号">
            <span>{{ props.row.billZfbNumber }}</span>
          </el-form-item>
          <el-form-item label="下单时间">
            <span>{{ props.row.billTime}}</span>
          </el-form-item>
          <el-form-item label="订单状态">
            <span>{{ props.row.billState}}</span>
          </el-form-item>
          <el-form-item label="航班编号">
            <span>{{ props.row.flightId}}</span>
          </el-form-item>
          <el-form-item label="出发地">
            <span>{{ props.row.flight.flightFromPlace}}</span>
          </el-form-item>
          <el-form-item label="目的地">
            <span>{{ props.row.flight.flightToPlace}}</span>
          </el-form-item>
          <el-form-item label="出发时间">
            <span>{{ props.row.flight.flightDepartureTime}}</span>
          </el-form-item>
          <el-form-item label="到达时间">
            <span>{{ props.row.flight.flightArriveTime}}</span>
          </el-form-item>
          <el-form-item label="付款金额">
            <span>{{ props.row.flight.flightPrice}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="billId"
      label="订单编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="seatNumber"
      label="座位号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="flightId"
      label="航班编号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="身份证号"
      width="200">
    </el-table-column>
    <el-table-column
      prop="billTime"
      label="下单时间"
      width="200">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="160">
      <template slot-scope="scope">
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteBillById(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next"
  :page-size="6"
  :total="allConut"
  @current-change="page"
  class="elPage" v-show="showPage"
  :current-page.sync="currentPage">
  </el-pagination>
</div>
</template>
<script>
import {GetBillList,GetBillById,GetBillByDate,GetBillByUserName,DeleteBillByBillId} from '../../network/requuest.js'
export default {
   name:"BillInfo",
   data(){
     return {
       options:[
         {
          value: 1,
          label: '订单号',
          disable:false
         },
         {
          value: 2,
          label: '下单时间',
          disable:false
         },
         {
          value: 3,
          label: '用户名',
          disable:false
         },
       ],
      value: '',//接收下拉框的选择
      searchInput:'',//搜索的输入值
      allConut:null,//总数
      showPage:true,//分页
      currentPage:1,
      showdate:false,
      dateTime:'',
      billInfo: [{
        billId:null,
        billState:null,
        flightId:null,
        userId:null,
        billZfbNumber:null,
        billTime:null,
        seatNumber:null,
        user:{
          userId:null,
          userName:null,
          userPassword:null,
          userAccountNumber:null,
          userPhone:null,
          serZfbNumber:null,
          },
        flight:{
          airplaneId:null,
          flightId:null,
          flightFromPlace:null,
          flightToPlace:null,
          flightDepartureTime:null,
          flightArriveTime:null,
          flightCompany:null,
          flightPrice:null,
          flightSeatNum:null,
          flightSeatRestNum:null
          }  
        }, ],
     }
   },
   created(){
     let that=this
     GetBillList(1,6).then(function(res){
       if(res.data){
        that.allConut=res.data.total
        that.changeState(res.data.list)
        that.billInfo=res.data.list
       }else{
        that.$notify({
          title: 'warning',
          message: '订单列表为空',
           type: 'warning'
        });
       }
     }).catch((err)=>{
          that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
          confirmButtonText: '确定',
        });
     })
   },
    methods: {
      changeState(list){
       for(let i=0;i<list.length;i++){
         if(list[i].billState==0){
           list[i].billState='未出行'
         }else if(list[i].billState==1){
           list[i].billState='已乘坐'
         }else if(list[i].billState==2){
           list[i].billState='已退票'
         }else if(list[i].billState==3){
           list[i].billState='已改签'
         }else{
           list[i].billState='错误状态'
         }
       }
      },
      changeObj(obj){
         if(obj.billState==0){
           obj.billState='未出行'
         }else if(obj.billState==1){
            obj.billState='已出行'
         }else if(obj.billState==2){
           obj.billState='已退票'
         }else if(obj.billState==3){
           obj.billState='已改签'
         }
      },
      selectChange(value){
        if(value==2){
          this.showdate=true
        }else{
          this.showdate=false
        }
      },
      deleteBillById(row){
         let that=this
         this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(row.billState=='未出行'||row.billState=='已改签'){
            that.$alert('当前订单不可删除', '提示', {
            confirmButtonText: '确定',
        });
          }else{
          DeleteBillByBillId(row.billId).then(function(res){
            if(res.data){
              that.$message({
                 type: 'success',
                 message: '订单'+row.billId+'删除成功!'
              });
              GetBillList(that.currentPage,6).then(function(reRes){
                if(reRes.data.list.length){
                  that.allConut=reRes.data.total
                  that.changeState(reRes.data.list)
                  that.billInfo=reRes.data.list
                }else{
                  GetBillList(--that.currentPage,6).then(function(seRes){
                      that.allConut=seRes.data.total
                      that.changeState(seRes.data.list)
                      that.billInfo=seRes.data.list
                  })
                }
              })
            }else{
              that.$message({
                 type: 'warning',
                 message: '用户'+row.userName+'删除失败!'
              });
            }
          })
        }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         
      },
      page(currentPage){//换页
        let that=this
        GetBillList(currentPage,6).then(function(res){
          that.allConut=res.data.total
          that.changeState(res.data.list)
          that.billInfo=res.data.list
        }).catch((err)=>{
            that.$alert('请求失败，请联系服务器管理人员', '提示', {
             confirmButtonText: '确定',
            });                
        })
      },
      searchBillById(billId){
        let that=this
        GetBillById(billId).then(function(res){
          if(res.data){
          that.showPage=false
          that.billInfo.splice(0)
          that.changeObj(res.data)
          that.billInfo.push(res.data)
          }else{
            that.$alert('未查询到相应订单', '提示', {
             confirmButtonText: '确定',
          }); 
           that.showPage=false
          that.billInfo.splice(0)
          }
        }).catch((err)=>{
          that.$alert('请求失败，请联系服务器管理人员', '提示', {
             confirmButtonText: '确定',
          });                
        })
      
      },
      searchBillByDate(billDate){
         let that=this
         GetBillByDate(billDate).then(function(res){
           if(res.data.length){
          that.showPage=false
          that.changeState(res.data)
          that.billInfo=res.data
           }else{
             that.$alert('未查询到相应订单', '提示', {
             confirmButtonText: '确定',
          }); 
           that.showPage=false
          that.billInfo.splice(0)
           }
         }).catch((err)=>{
            that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
            confirmButtonText: '确定',
        });
         })
      },
      searchBillByUserName(userName){
        let that=this
        GetBillByUserName(userName).then(function(res){
          if(res.data.length){
          that.showPage=false
          that.changeState(res.data)
          that.billInfo=res.data
          }else{
            that.$alert('未查询到相应订单', '提示', {
             confirmButtonText: '确定',
          }); 
           that.showPage=false
           that.billInfo.splice(0)
          }
         }).catch((err)=>{
            that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
            confirmButtonText: '确定',
            });
          })
      },

      searchUser(){//查找
        let that=this
        if(this.showdate){//按时间查询
          if(this.dateTime==''){
           this.$alert('请先选择查询日期', '提示', {
            confirmButtonText: '确定',
            });
          }else{
          this.searchBillByDate(this.dateTime)
          }
        }else if(this.value==1){
          if(this.searchInput==''){
            this.$alert('请先输入查询值', '提示', {
            confirmButtonText: '确定',
            });
          }else {
          this.searchBillById(this.searchInput)
          }
        }else{
         if(this.searchInput==''){
            this.$alert('请先输入查询值', '提示', {
            confirmButtonText: '确定',
            });
          }else {
          this.searchBillByUserName(this.searchInput)
          }
        }
      },
      goBack(){
         let that=this
         this.showPage=true
         this.value=null
         this.searchInput=''
         this.showdate=false
         GetBillList(1,6).then(function(res){
           that.allConut=res.data.total
           that.changeState(res.data.list)
           that.billInfo=res.data.list
           that.currentPage=1
         }).catch((err)=>{
           this.$alert('请求失败，请联系服务器管理人员', '未知错误', {
            confirmButtonText: '确定',
          });
         })

      },
    },
}
</script>
<style scoped>
.elPage{
  margin-top:24px;
}
.back{
  float: left;
}
.tableList{
  width: 100%;
}
.select-in{
  margin-right: 15px;
  width: 150px;
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