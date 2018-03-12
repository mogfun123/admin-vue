<template>
  <div class="regisinfoquery-wrapper" v-on:keyup.enter="queryGameUserList"> 
      <zs-tip :tiptext='tipName'></zs-tip>          
    <nav>    
        <div class="nav-item">
               <el-button size="small" class='btn-search-s' type="primary"  @click="setRuls">添加规则</el-button>  
        </div>
          <div class="nav-item">
            <el-button size="small" class='btn-search-s' type="primary"  @click="queryGameUserList">查询</el-button>
            </div>
    </nav>
<!-- 上导航栏 -->
<!--   //监控设置 -->
    <el-dialog title="锦标赛配置" v-model="dialogVisible" :rules="rules"  size="tiny" :modal-append-to-body = false :close-on-click-modal= false>
        <el-form :model="form" ref='form' :rules="rules" label-width="100px">
                <el-form-item label="时间段" prop="rolename">
                  <el-time-picker
                      is-range
                      :editable = false
                      v-model="form.timerange"
                      placeholder="选择时间范围">
                    </el-time-picker>
                </el-form-item>
                 <el-form-item label="在线人数范围" prop="rolename">
                  <el-select v-model="form.count" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="投放比例" prop="rolename">
                  <el-input v-model="form.rolename"   type="number"  auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="投放上限" prop="rolename">
                  <el-input v-model="form.rolename"   type="number"  auto-complete="off"></el-input>
                </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button  @click="resetForm('form')">取消</el-button>
      </div>
    </el-dialog>
<!--     监控设置 -->
<!-- table -->
   <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 100%">
      <!--   <el-table-column type=index label="序号" width="40">
        </el-table-column> -->
        <el-table-column  prop="playerId" label="时间段" >
        </el-table-column>
         <el-table-column  prop="channel" label="在线人数范围" >
        </el-table-column>
         <el-table-column  prop="nickname" label="投放比率" >
        </el-table-column>
         <el-table-column  prop="account" label="投放上限" min-width="150">
        </el-table-column>
         <el-table-column  prop="chip" label="创建时间" min-width="120">
        </el-table-column>
         <el-table-column  prop="diamond" label="修改时间" min-width="120">
        </el-table-column>
         <el-table-column  prop="createTime" label="操作者" min-width="120">
        </el-table-column>
          <el-table-column  prop="devid" label="操作" min-width="150">
              <template scope="scope">
              <el-button size="small"   type="primary" >启用</el-button>
              <el-button size="small"   type="primary" >修改</el-button>
              <el-button size="small"   type="primary" >删除</el-button>
            </template>
        </el-table-column>

      </el-table>

       <zspagination :total = total :pagesize="10" @click="handleCurrentChange"></zspagination>
   

  </div>
</template>

<script>
import {hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          //vm.queryGameUserList()
        })
      },
    beforeRouteUpdate (to, from, next) {
        next()
      },
    beforeRouteLeave (to, from, next) {
      next()
      },
      data(){

        return {
         
            total:0,   
          pageNo:1,//查询页码
          tipName:'锦标赛配置',
           tableData:null,//列表table
           dialogVisible:false,
          allstartTime:'',
          channels:[],
           options:[
          {
            value:'',
            label:'所有',
          },{
            value:'1',
            label:'支付宝',
          },{
            value:'2',
            label:'微信',
          },
          {
            value:'3',
            label:'苹果支付',
          },{
            value:'4',
            label:'阿里体育',
          },
         ],//登陆状态
          serachform:{
          },
            form:{
            rolename:'',
            timerange:'',
            count:'',
          },
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
      // mixins: [myMixin],
      methods:{
          
        setRuls(){
          this.dialogVisible = true
        },
         queryGameUserList(){//查询用户列表
          let option = {};
              Object.assign(option,this.serachform)
              this.API.ApiqueryGameUserList(option).then((res)=>{
             let data = res.data.data
                     data.createTime = hsdateUtil(data.createTime)
                 this.tableData =  [data]
              },(res)=>{})
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
      ensureAtion(){

      },
       resetForm(formName) {//表单重置
            this.$refs[formName].resetFields();
            this.dialogVisible=false
            Object.assign(this.form,this.$options.data().form)
      },
        
         handleCurrentChange(val){

            this.pageNo = val
            this.queryGameUserList()
            this.pageNo = 1
         }
        
         
      },
      


} 
</script>

<style lang="scss" scoped>
@import "~style/common.scss";
.regisinfoquery-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    
  .nav-item{
    label{
      width: 52px;
    }
    .el-input__inner{
      width: 160px;
    }
    .el-date-editor--datetimerange{
        .el-input__inner{
        width: 350px;
      }
    }
  }

}
</style>

