<template>
  <div class="activityMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
     
      <el-button type="primary" size="small"  @click="dialogAddInfo = true,form.rewardId=''">添加奖励</el-button>
    
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%" >
           <el-table-column prop="xdanId" label="段位" width="100">
              </el-table-column>
            <el-table-column prop="reward1PropId" label="奖励1" width="100">
              </el-table-column>
               <el-table-column prop="reward1Size" label="数量1" width="100">
              </el-table-column>
               <el-table-column prop="reward2PropId" label="奖励2" width="100">
              </el-table-column>
               <el-table-column prop="reward2Size" label="数量2" width="100">
              </el-table-column>
                 <el-table-column prop="reward3PropId" label="奖励3" width="100">
              </el-table-column>
               <el-table-column prop="reward3Size" label="数量3" width="100">
              </el-table-column>
                <el-table-column prop="reward4PropId" label="奖励4" width="100">
              </el-table-column>
               <el-table-column prop="reward4Size" label="数量4" width="100">
              </el-table-column>
                <el-table-column prop="reward5PropId" label="奖励5" width="100">
              </el-table-column>
               <el-table-column prop="reward5Size" label="数量5" width="100">
              </el-table-column>
               <el-table-column prop="xaddTime" label="创建时间" width="160">
              </el-table-column>
               <el-table-column prop="xupdTime" label="修改时间" width="160">
              </el-table-column>
              <el-table-column prop="adminId" label="操作人" width="120" >
                </el-table-column>
         <el-table-column label="操作" width="150"  >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">修改</el-button>
          <el-button size="small"  type="primary"  @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
      </el-table>

       
<!-- table -->
<!--   //添加房间 -->
    <el-dialog title="添加头衔" v-model="dialogAddInfo" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
              <el-form-item label="段位">
              <el-select v-model="form.danId" placeholder="请选择段位">
                  <el-option
                          v-for="item in danIds"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="奖励1">
                     <el-col :span="14">
                      <el-input v-model="form.reward1PropId" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="数量1">
                     <el-col :span="14">
                      <el-input v-model="form.reward1Size" type="number" min="1" ></el-input>
                      </el-col>
                </el-form-item>
                   <el-form-item label="奖励2">
                     <el-col :span="14">
                      <el-input v-model="form.reward2PropId" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="数量2">
                     <el-col :span="14">
                      <el-input v-model="form.reward2Size" type="number" min="1" ></el-input>
                      </el-col>
                </el-form-item>
                      <el-form-item label="奖励3">
                     <el-col :span="14">
                      <el-input v-model="form.reward3PropId" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="数量3">
                     <el-col :span="14">
                      <el-input v-model="form.reward3Size" type="number" min="1" ></el-input>
                      </el-col>
                </el-form-item>
                      <el-form-item label="奖励4">
                     <el-col :span="14">
                      <el-input v-model="form.reward4PropId" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="数量4">
                     <el-col :span="14">
                      <el-input v-model="form.reward4Size" type="number" min="1" ></el-input>
                      </el-col>
                </el-form-item>
                      <el-form-item label="奖励5">
                     <el-col :span="14">
                      <el-input v-model="form.reward5PropId" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="数量5">
                     <el-col :span="14">
                      <el-input v-model="form.reward5Size" type="number" min="1" ></el-input>
                      </el-col>
                </el-form-item>
            
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      <!--   <el-button type="primary" @click="resetForm('form')">重置</el-button> -->
        <el-button type="primary" @click="resetForm('form')" >返回</el-button>
      </span>
    </el-dialog>
<!--   //添加房间 -->

 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @current-change="handleCurrentChange"   
            layout="total, prev, pager, next, jumper"
            :total="pagtotal">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>
import {dateUtil} from '@/utils'

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
           vm.queryLists()
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
          pagtotal:1,
          pagNo:1,
         tableData: null,
          multipleSelection: [],//多选
          dialogAddInfo:false,
                        
    
          userName:'',//用户名
          nickName:"",//昵   value:"",

      danIds:[
        {
          value:'1',
          label:'青铜'
        },
         {
          value:'2',
          label:'白银'
        },
         {
          value:'3',
          label:'黄金'
        },
         {
          value:'4',
          label:'白金'
        },
         {
          value:'5',
          label:'钻石'
        },
         {
          value:'6',
          label:'大师'
        },
         {
          value:'7',
          label:'王者'
        },
      ],
       
      
           //表单
          form: {
           
            rewardId: '',
            rewardType:2,//奖励类型(0:头像 1:排名 2:周头衔 3:日头衔)
            danId: '',
          reward1PropId:'',
          reward1Size:'',
          reward2PropId:'',
          reward2Size:'',
          reward3PropId:'',
          reward3Size:'',
          reward4PropId:'',
          reward4Size:'',
          reward5PropId:'',
          reward5Size:'',
        
          },
          //表单
          //表单验证
          rules: {
          danId: [
            { required: true, message: '请选择的段位', trigger: 'blur' },
           
          ],
            reward1PropId: [
            { required: true, message: '请输入奖励', trigger: 'blur' },
           
          ],
            reward1Size: [
            { required: true, message: '请输入数量', trigger: 'blur' },
           
          ],
         
        },
          //表单验证
        }
      },
      methods:{
       
      editorActionFist(index,row){//1基础道具编辑
          this.dialogAddInfo = true
          for(let key in row){
             row[key] = (row[key]||'').toString()
          }

           Object.assign(this.form,row)
        


        },
        deleteActionFirst(index,row){
          let option = {}
          option.aids = row.rewardId
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelReward(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryLists()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })

        },
         queryLists(){
            let option = {}
            option.rewardType = 2
         
            this.API.ApirewardQueryPage(option).then((res)=>{
            
            res.data.rows.forEach((item)=>{
                 this.pagtotal = res.data.total
                  item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd hh:mm:ss'):''
                  item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd hh:mm:ss'):''
                   item.xdanId = this.danIds[item.danId-1].label 
                 
                 

            })
           
              this.tableData = res.data.rows


           },(res)=>{})
         },
           ensureAction(){
                      let option = {};

                      Object.assign(option,this.form)

                   

                        this.API.ApisaveReward(option).then((res)=>{
                        this.$message(`${res.data.retmsg}`)
                          if (res.data.retcode==1) {
                            this.resetForm("form")
                            this.dialogAddInfo = false
                             this.queryLists()
                          
                          }

                        })




         },

       
      
         handleCurrentChange(val){
             this.pageNo = val
             this.queryLists()
             this.pageNo = 1
         },
         
         submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
               this.ensureAction()
              } else {
                console.log('error submit!!');
                return false;
              }
            })
      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
        this.dialogAddInfo = false
      },

        
         
      },
     


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.activityMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
  .deletemint{
    margin-top: 40px;
  }
    .el-dialog__footer{
    text-align: center;
}
  nav{
  // height: 25px;
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  .nav-item{
    display: flex;
     align-items:center;
     min-width: 150px;
     margin-left: 10px;
      font-size: 12px;
   
        label{
          margin-bottom: 0px;
          min-width: 40px;
        }
 
        .form-control{
          width: 100px;
          // margin-left: 10px;
          height: 25px;
        }
          
        .el-input--small{
          height: 25px;
          width: 120px;
        }
        .el-input__inner{
          height: 25px;
        } 

    }
     .el-button {
          height: 25px;
          line-height: 25px;
          margin-left: 10px;
          span{
            font-size: 12px;
          }
          padding: 0px 10px;
    }

  
  }

}
</style>

