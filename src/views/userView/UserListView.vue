<template>
  <div class="container">
    <div style="margin-top: 8px; margin-bottom:20px;   text-align: right;">
      <el-button type="primary" icon="el-icon-back" circle  @click="goBack" v-show="!showPage" class="back"></el-button>   
      <el-select v-model="value"  placeholder="请选择查询项" size="medium" class="select-in">
         <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          :disabled="item.disable">
         </el-option>
      </el-select> 
      <el-input placeholder="请输入需要查找选项值" v-model="searchInput" style="width:400px;margin-right: 15px;" class="">
      </el-input>
      <el-button type="primary" icon="el-icon-search"  @click="searchUser" autofocus style="margin-right: 15px;">查 找</el-button>
    <el-tooltip class="item" effect="dark" :content="(showDelete?'显示全部用户':'显示可删除用户')" placement="top-start">
        <el-checkbox v-model="showDelete" label="change" border @change="showDeleteUser" v-show="showPage"></el-checkbox>
    </el-tooltip>
    </div>
     <el-table
    :data="userInfo"
    stripe
    height="442"
    class="tableList"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="用户姓名">
            <span>{{ props.row.userName }}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <span>{{ props.row.userId }}</span>
          </el-form-item>
          <el-form-item label="用户账号">
            <span>{{ props.row.userAccountNumber }}</span>
          </el-form-item>
          <el-form-item label="预留手机号">
            <span>{{ props.row.userPhone }}</span>
          </el-form-item>
          <el-form-item label="支付宝账号">
            <span>{{ props.row.userZfbNumber }}</span>
          </el-form-item>
          <el-form-item label="用户密码">
            <span>{{ props.row.userPassword }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      prop="userAccountNumber"
      label="用户账号"
      width="220">
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户姓名"
      width="220">
    </el-table-column>
    <el-table-column
      prop="userId"
      label="身份证号"
      width="260">
    </el-table-column>
    <el-table-column
      prop="userPhone"
      label="手机号码"
      width="220">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="180">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle v-show="!showDelete"
        @click="changeUserById(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle v-show="showDelete"
        @click="deleteUserById(scope.row)"></el-button>
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
<el-dialog title="编辑用户信息" :visible.sync="dialogFormVisible" :before-close="dialogClose">
   <el-form :model="editUserInfo" status-icon :rules="rules" ref="editUserInfo" >
     <el-form-item  label="用户账号">
				<el-input type="text" v-model="editUserInfo.userAccountNumber"   prefix-icon="el-icon-user-solid" :readonly="true"></el-input>
		</el-form-item>
    <el-form-item  label="用户姓名" prop="userName" >
				<el-input type="text"   v-model="editUserInfo.userName" prefix-icon="el-icon-user-solid" clearable ></el-input>
		</el-form-item>
		<el-form-item  label="支付宝账号" prop="userZfbNumber">
			  <el-input class="phone-input" v-model="editUserInfo.userZfbNumber" prefix-icon="el-icon-message" ></el-input>
		</el-form-item>
    <el-form-item  label="手机号" prop="userPhone">
          <el-input  v-model="editUserInfo.userPhone"  
          prefix-icon="el-icon-s-finance"  ></el-input>            
    </el-form-item>
  </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button @click="editCommit('editUserInfo')">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>
<script>
import {GetUserList,GetUserByAccountNumber,GetDeleteUserList, DeleteUser,GetDeleteUser,
UpdateUser,GetUsersByAccountNumber,GetUsersByName,GetUsersById,GetUsersByPhone
 } from '../../network/requuest.js'
export default {
   name:"UserInfo",
   inject:['reload'],
   data(){
     var validateUser1 = async (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入用户名'))
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

     return {
       options:[
         {
          value: 1,
          label: '身份证号',
          disable:false
         },
         {
          value: 2,
          label: '手机号',
          disable:false
         },
         {
          value: 3,
          label: '账号',
          disable:false
         },
         {
          value: 4,
          label: '用户姓名',
          disable:false
         }
       ],
      showDelete:false, 
      value: '',//接收下拉框的选择
      searchInput:'',//搜索的输入值
      allConut:null,//总数
      showPage:true,//分页
      dialogFormVisible:false,
      currentPage:1,
      editUserInfo:{//修改的内容
          userAccountNumber:'',
          userId:'',
          userPhone:'',
          userZfbNumber:'',
          userName:'',
          userPassword:'',
      },
      userInfo: [{
          userAccountNumber:'',
          userId:'',
          userPhone:'',
          userZfbNumber:'',
          userName:'',
          userPassword:'',
        }, ],
      rules: {					
					userName: [{
						required: true,
						validator: validateUser1,
						trigger: 'blur'
					}],
          userZfbNumber:[{
            required:true,
            validator:validateZhf,
            trigger:'blur'
          }],
          userPhone:[{
            required:true,
            validator:validatePhone,
            trigger:'blur'
          }]
				}
     }
   },
   created(){
     let that=this
     GetUserList(1,6).then(function(res){
       if(res.data){
       that.allConut=res.data.total
       that.userInfo=res.data.list
       }else{
        that.$notify({
          title: 'warning',
          message: '用户列表为空',
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
      showDeleteUser(value){
         let that=this
         this.value=null
         if(value){
           GetDeleteUserList(1,6).then(function(res){
             that.allConut=res.data.total
             that.userInfo=res.data.list
             that.currentPage=1
             for(let i=1;i<that.options.length;i++)
                  that.options[i].disable=true
            })
         }else{
           GetUserList(1,6).then(function(res){
            that.allConut=res.data.total
            that.userInfo=res.data.list
            that.currentPage=1
            for(let i=1;i<that.options.length;i++)
              that.options[i].disable=false
           })
         }
      },
      changeUserById(row){
        let that=this
        GetUserByAccountNumber(row.userAccountNumber).then(function(res){
          that.editUserInfo=res.data
          that.dialogFormVisible=true
        })
      },
       deleteUserById(row){
         let that=this
         this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteUser(row.userId).then(function(res){
            if(res.data){
              that.$message({
                 type: 'success',
                 message: '用户'+row.userName+'删除成功!'
              });
              GetDeleteUserList(that.currentPage,6).then(function(reRes){
                if(reRes.data.list.length){
                   that.allConut=reRes.data.total
                   that.userInfo=reRes.data.list
                }else{
                  GetDeleteUserList(--that.currentPage,6).then(function(seRes){
                      that.allConut=seRes.data.total
                      that.userInfo=seRes.data.list
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
         
      },
      editCommit(formName){//更新用户信息
        this.$refs[formName].validate((valid) => {
        if (valid) {
        let that=this
        UpdateUser(this.editUserInfo).then(function(res){
          if(res.data){
            that.$alert('用户信息更新成功', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  that.dialogFormVisible=false   
                  let num = that.userInfo.findIndex(item => item.userId==that.editUserInfo.userId)
                  that.userInfo[num]=that.editUserInfo
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
        if(!this.showDelete){
          GetUserList(currentPage,6).then(function(res){
            that.userInfo=res.data.list
            that.allConut=res.data.total
          })
        }else{
          GetDeleteUserList(currentPage,6).then(function(res){
             that.allConut=res.data.total
             that.userInfo=res.data.list
          })
        }
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
          that.showPage=false;
        }).catch((err)=>{
          that.$alert('请求失败，请联系服务器管理人员', '提示', {
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
          that.showPage=false;
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
          that.showPage=false;
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
          that.showPage=false;
         }).catch((err)=>{
            that.$alert('请求失败，请联系服务器管理人员', '未知错误', {
            confirmButtonText: '确定',
            });
         })

      },
      searchDeleteUser(userId){
        let that=this
        GetDeleteUser(userId).then(function(res){
          if(res.data===''){
            that.$alert('未查询到符合条件的用户', '提示', {
             confirmButtonText: '确定',
            });
            that.userInfo=null                
          }else{
           that.userInfo=res.data
          }
           that.showPage=false;
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
        if(this.showDelete){
          if(this.value==1){
             this.searchDeleteUser(this.searchInput)
          }else{
            this.$alert('请先选择查询项', '待确认', {
                confirmButtonText: '确定',
            });
          }
        }
        else{
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
        }
      },
      goBack(){
         let that=this
         this.showPage=true
         this.value=null
         this.searchInput=''
         if(this.showDelete){
            GetDeleteUserList(1,6).then(function(res){
               that.allConut=res.data.total
               that.userInfo=res.data.list
               that.currentPage=1
               for(let i=1;i<that.options.length;i++)
                  that.options[i].disable=true
              })
         }else{
           GetUserList(1,6).then(function(res){
             that.allConut=res.data.total
             that.userInfo=res.data.list
             that.currentPage=1
             for(let i=1;i<that.options.length;i++)
               that.options[i].disable=false
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
</style>