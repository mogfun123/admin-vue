<template>
  <div class="anchor-wrapper">
    <zs-tip :tiptext='tipName'></zs-tip>
     <nav>  
    <el-row>
      <el-col>
        <div class="nav-item">    
         <el-button size="small"  type="primary" class='btn-search-s' @click='addAnchorRole'>添加</el-button>
         </div>
      </el-col>
    </el-row>
     
    </nav>
    <!-- 导航栏 -->
 
           

<!-- 上导航栏 -->
<div style='display:inline-block'>
  
     <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 800px">
         <el-table-column prop="id" label="角色id" width="150">
        </el-table-column>
        <el-table-column prop="rolename" label="用户名" width="200">
        </el-table-column>
         <el-table-column prop="roledesc" label="描述" width="200">
        </el-table-column>
      
    
    </el-table-column>
         <el-table-column prop="name" label="操作">
          <template scope="scope">
              <el-button size="small" :disabled="scope.row.rolename=='admin'" type="primary" @click="deleteAction(scope.$index, scope.row)">删除</el-button>
        <el-button size="small" :disabled="scope.row.rolename=='admin'" type="primary" @click="handlePowerAction(scope.$index, scope.row)">分配权限</el-button>
        
      </template>
       </el-table-column>
      </el-table>

         <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
   </div>
     <!-- 分页 -->
<!--   //添加用户 -->
    <el-dialog :title="isAddUser?'添加角色':'添加'" v-model="dialogVisible" :rules="rules"  size="tiny" :modal-append-to-body = false>
        <el-form :model="form" ref='form' label-width="100px">
            <el-form-item label="角色名" prop="rolename">
            <el-col :span="14">
              <el-input v-model="form.rolename" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>
             <el-form-item label="角色描述" prop="roledesc">
            <el-col :span="14">
              <el-input v-model="form.roledesc" auto-complete="off"></el-input>
              </el-col>
            </el-form-item>
            </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm('form')">确定</el-button>
    
        <el-button  @click="resetForm('form')">取消</el-button>
      </div>
    </el-dialog>
<!--   //添加用户 -->
<!-- //权限设置 -->
    <el-dialog title="权限设置" v-model="AuthorizationVisible" size="large" :modal-append-to-body = false>
              <el-tree
                  :data="allOper"
                  :indent= 50
                  show-checkbox
                  node-key="id"
                  ref="tree"
                :check-strictly = false
                  highlight-current
                  :props="defaultProps">
                </el-tree>


      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="authorizationConfirm">确定</el-button>
    
        <el-button  @click="authorizationcancel">取消</el-button>
      </div>
    </el-dialog>
<!-- //权限设置 -->
  </div>
</template>

<script>

import zsTip from 'components/tip-header'
import {setStore,getStore,trim} from '@/utils'



export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
             
              vm.getAllAdmin()
             
             
           next()
        })
      },
    beforeRouteUpdate (to, from, next) {

        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
      name:"admin",
      data(){

        return {
          allOper:[],
           userOper:[],
        defaultProps: {
          children: 'childMap',
          label: 'opname'
        },
          //tree
        
            total:0,
            user:{
              id:'',
             
            },
        pageNo:1,
          tipName:"角色管理",
         isAddUser:false,
          form:{
            roledesc:"",
            rolename:'',
          },
         
          dialogVisible:false,
          selectlrow:null,
        
          AuthorizationVisible:false,//权限设置dialog
          tablepower:[],
         
           tableData:null,
          
 //表单验证
          rules: {
          rolename: [
            { required: true, message: '请输入角色名', trigger: 'blur' },
            
          ],
          roledesc: [
            { required: true, message: '请输入角色描述', trigger: 'change' }
          ],
        
        
          
        },
          //表单验证
        
        }
      },
      methods:{
          handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
     
      _mapAction:function _mapAction(val){
        let arr = []

        if (!val) {
          return 
        }
         arr = Object.values(val).map((function(item){

            if (item.childMap) {
               item.childMap =_mapAction(item.childMap)
             }
            return item
          }))
        return arr 

      },
      _mapAddParent:function _mapAddParent(val,parent){
        if (!val) {
          return 
        }
          val.map((item)=>{
              item.parent = parent||''
              if (item.childMap) {
                      _mapAddParent(item.childMap,item)
               
              }
              return item 
          })


      },
      _mapChose:function(val){
         
         var that = this ;
         if (!val) {
          return 
        }

        function  _mapChoseContent(val){
              val.forEach((item)=>{
                
                  if (item.childMap) {
                          _mapChoseContent(item.childMap)
                   
                  }else{

                    that.userOper.push(item)
                  }
                
              })
        }

       _mapChoseContent(val)
         

           

      },
        queryAllOperation(){
          let option = {},
          userArr = [],
           that = this;
          option.roleId = this.user.id
          this.API.APIAdminQueryAllOperation(option).then((res)=>{
              this.allOper = that._mapAction(res.data.data.allOper)
              that._mapAddParent(this.allOper)

               userArr = that._mapAction(res.data.data.userOper||[])
              that._mapChose( userArr||[])
                  
              
          })

        },
          
        
        addAnchorRole(){
          this.dialogVisible = true

        },
        authorizationConfirm(){
          let option = {
            roleId:'',
            noOperationIds:[],
          },alloper=[];
          option.roleId = this.user.id
          alloper = this.$refs.tree.getCheckedNodes();
         alloper.forEach((function(item){

                let _mapPush = function _mapPush(val){

                      if (val.parent) {
                        _mapPush(val.parent)
                      }
                   option.noOperationIds.push(val.id)
                      
                }
                _mapPush(item)
            
              
         }))
       option.noOperationIds = [...new Set(option.noOperationIds)]
       console.log(option.noOperationIds)
          
         this.API.APIAdminAddNoOperation(option).then((res)=>{
            this.$message(`${res.data.retmsg}`)
            this.authorizationcancel()

          },(res)=>{

          })


           
         
        },

          authorizationcancel(){
          this.AuthorizationVisible = false
            this.allOper = []
           this.userOper = []
        },

          getAllAdmin(){//获取管理员所有用户
            let vm = this,
              option = {} ;
            
          this.API.APIAdminRoleAll(option).then((res)=>{
            if (res.data.rows.length>0) {
              vm.tableData = res.data.rows
              vm.total = res.data.total
            
              // vm.tableData.forEach((item)=>{
                 
              // })
            }
               

          },(res)=>{

          })

         

          },
       
          handleCurrentChange(val) {

            this.pageNo = val
            this.getAllAdmin()
            this.pageNo = 1
           
          },
          ensureAtion(index,row){//表单确认
            let option = {};
            Object.assign(option,this.form)
           
            this.API.APIAdminARole(option).then((res)=>{
                this.$message(`${res.data.retmsg}`)
                this.resetForm('form')
                this.getAllAdmin()
            })
           
          },
         
          editAction(){
                this.dialogVisible = true
          },
         deleteAction(index,row){
              let vm = this
             
              this.$confirm(`确定要删除该角色?`, '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  let option = {
                    rid :row.id,
                    
                  }
                vm.API.APIAdmindelRole(option).then((res)=>{
                   this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {
                           this.getAllAdmin()
                          

                         }
                },(res)=>{})   
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消操作'
                });          
              });
         },
     
         
          handlePowerAction(index,row){//权限设置
            let vm = this ,option = {};
            this.user.id = row.id
            
             vm.queryAllOperation()
             this.AuthorizationVisible = true
            
            
            this.$nextTick(function(){
              setTimeout((function(){
               
                 this.$refs.tree.setCheckedNodes(this.userOper);
              }).bind(this),1000);
              
            })
            
          
          },
           submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
               this.ensureAtion()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
         
          resetForm(formName) {//表单重置
            this.$refs[formName].resetFields();
            this.dialogVisible=false
      },
      },
      components: {
          zsTip
  },


} 
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
@import "~style/common.scss";
.anchor-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;

  .block{
    margin-top: 80px;
    text-align:center;
  }
.el-dialog__footer{
  text-align: center;
}


}
</style>

