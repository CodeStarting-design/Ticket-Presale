<template>
  <div class="container">
    <div style="margin-top: 8px; margin-bottom:20px;   text-align: right;">
      <el-button type="primary" icon="el-icon-back" circle  @click="goBack" v-show="!showPage" class="back"></el-button>   
      <el-input placeholder="请输入需要查找的航班编号" v-model="searchInput" style="width:400px;margin-right: 15px;" class="">
      </el-input>
      <el-button type="primary" icon="el-icon-search"  @click="searchFlight" autofocus style="margin-right: 15px;">查 找</el-button>
    <el-tooltip class="item" effect="dark" :content="(showTravled?'显示全部航班':'显示未出行航班')" placement="top-start">
        <el-checkbox v-model="showTravled" label="change" border @change="showTravledFlight" v-show="showPage"></el-checkbox>
    </el-tooltip>
    </div>
     <el-table
    :data="flightInfo"
    stripe
    height="442"
    class="tableList"
    :row-style="{height: '65.5px'}"
    >
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
    <el-table-column
      prop="flightId"
      label="航班编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="airplaneId"
      label="飞机编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="flightFromPlace"
      label="出发地"
      width="180">
    </el-table-column>
    <el-table-column
      prop="flightToPlace"
      label="到达地"
      width="180">
    </el-table-column>
    <el-table-column
      prop="flightSeatRestNum"
      label="剩余座位数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="flightPrice"
      label="航班价格"
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100" v-show="showTravled">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle v-show="showTravled"
        @click="changeFlightrById(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination background layout="prev, pager, next" :page-size="6" :total="allConut"
      @current-change="page" class="elPage" v-show="showPage" :current-page.sync="currentPage">
    </el-pagination>
  <el-dialog title="编辑航班信息" :visible.sync="dialogFormVisible" :before-close="dialogClose">
    <el-form :model="editFlightInfo" status-icon  ref="editFlightInfo" >
      <div class="block">
        <div class="selDate">请选择出发和到达日期</div>
        <el-date-picker v-model="dateTime" type="datetimerange" :picker-options="pickerOptions" 
        range-separator="至" start-placeholder="出发时间" value-format="yyyy-MM-dd HH:mm:ss"
        end-placeholder="到达时间" align="right">
        </el-date-picker>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button @click="editCommit('editFlightInfo')">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import {GetFlightList,GetTravleFlightList,GetFlightById,UpdateFlight} from '../../network/requuest.js'
export default {
   name:"UserInfo",
   data(){
     return {
      dateTime:'',
      showTravled:false, 
      value: '',//接收下拉框的选择
      searchInput:'',//搜索的输入值
      allConut:null,//总数
      showPage:true,//分页
      dialogFormVisible:false,
      currentPage:1,
      editFlightInfo:{//修改的内容
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
     }
   },
   created(){
     let that=this
     GetFlightList(1,6).then(function(res){
       if(res.data){
       that.allConut=res.data.total
       that.flightInfo=res.data.list
       }else{
        that.$notify({
          title: 'warning',
          message: '航班列表为空',
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
      showTravledFlight(value){
         let that=this
         console.log(value)
         if(!value){
           GetFlightList(1,6).then(function(res){
             that.allConut=res.data.total
             that.flightInfo=res.data.list
             that.currentPage=1
            })
         }else{
           GetTravleFlightList(1,6).then(function(res){
             that.allConut=res.data.total
             that.flightInfo=res.data.list
             that.currentPage=1
           })
         }
      },
      changeFlightrById(row){
        let that=this
        GetFlightById(row.flightId).then(function(res){
          that.editFlightInfo=res.data
          that.dialogFormVisible=true
        })
      },
      editCommit(formName){//更新用户信息
        this.$refs[formName].validate((valid) => {
        if (valid) {
        let that=this
        let flight=this.editFlightInfo
        flight.flightDepartureTime=this.dateTime[0]
        flight.flightArriveTime=this.dateTime[1]
        UpdateFlight(flight).then(function(res){
          if(res.data){
            that.$alert('航班信息更新成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  that.dialogFormVisible=false   
                  let num = that.flightInfo.findIndex(item => item.flightId==that.editFlightInfo.flightId)
                  that.flightInfo[num]=flight
                  }
              });
          }else{
            that.$alert('修改失败，请重试', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              that.dialogFormVisible=false
            }
          });
        }
        })
        }else {
           this.$alert('信息不合法，请检查', '提示', {
            confirmButtonText: '确定',
            callback: action => {
             }
           });
            return false;
          }
      });
      },
      page(currentPage){//换页
        let that=this
        this.currentPage=currentPage
        if(!this.showTravled){
          GetFlightList(currentPage,6).then(function(res){
            that.flightInfo=res.data.list
            that.allConut=res.data.total
          })
        }else{
          GetTravleFlightList(currentPage,6).then(function(res){
             that.flightInfo=res.data.list
             that.allConut=res.data.total
          })
        }
      },
      searchFlightById(flightId){
        let that=this
        GetFlightById(flightId).then(function(res){
          if(res.data.length==0){
            that.$alert('未查询到符合条件的航班', '提示', {
             confirmButtonText: '确定',
            });                
          }
          that.flightInfo.splice(0);
          that.flightInfo.push(res.data)
          that.showPage=false;
        }).catch((err)=>{
          that.$alert('请求失败，请联系服务器管理人员', '提示', {
             confirmButtonText: '确定',
          });                
        })
      
      },
      searchTravleFlight(flightId){
        let that=this
        GetFlightById(flightId).then(function(res){
          if(res.data===''){
            that.$alert('未查询到符合条件的航班', '提示', {
             confirmButtonText: '确定',
            });
            that.flightInfo=null                
          }else{
          that.flightInfo.splice(0);
          that.flightInfo.push(res.data)
          }
           that.showPage=false;
        }).catch((err)=>{
          that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
            confirmButtonText: '确定',
          });
        })
      },
      searchFlight(){//查找
      if(this.searchInput==''){
        this.$alert('请先输入查询值', '待确认', {
            confirmButtonText: '确定',
        });
      }else{
        if(this.showTravled){
           this.searchTravleFlight(this.searchInput)
        }
        else{
           this.searchFlightById(this.searchInput)
        }
      }
      },
      goBack(){
         let that=this
         this.showPage=true
         this.value=null
         this.searchInput=''
         if(this.showTravled){
            GetTravleFlightList(1,6).then(function(res){
              that.flightInfo=res.data.list
              that.allConut=res.data.total
              that.currentPage=1
              })
         }else{
          GetTravleFlightList(1,6).then(function(res){
            that.flightInfo=res.data.list
            that.allConut=res.data.total
            that.currentPage=1
           })
         }
      },
      dialogClose(done) {
        this.$confirm('取消修改操作？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
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
.selDate{
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}
</style>