<template>
  <div class="activityMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <el-button type="primary" size="small" @click="dialogAddInfo = true,form.roomId = '' ">添加信息</el-button>
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%">
        
        <el-table-column prop="xdanId" label="段位" width="150">
        </el-table-column>
         
         <el-table-column prop="minBlindNote" label="小盲注" width="150">
        </el-table-column>
         <el-table-column prop="maxBlindNote" label="大盲注" width="120">
        </el-table-column>
          <el-table-column prop="maxIntegral" label="携带积分上限" width="120">
        </el-table-column>
         <el-table-column prop="integralPump" label="积分抽水" width="120">
        </el-table-column>
            <el-table-column prop="addTime" label="创建时间" width="200">
        </el-table-column>
            <el-table-column prop="updTime" label="修改时间" width="200">
        </el-table-column>
            <el-table-column prop="adminName" label="操作人" width="150">
        </el-table-column>
        
         <el-table-column label="操作" width="220">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">修改</el-button>
          <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
      </el-table>
     
       
<!-- table -->
<!--   //添加房间 -->
    <el-dialog title="添加排位赛房间" v-model="dialogAddInfo" size="small" :modal-append-to-body = false>
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
             <el-form-item label="小盲注">
                     <el-col :span="14">
                      <el-input v-model="form.minBlindNote"type="number" min="1" ></el-input>
                      </el-col>
                    
                </el-form-item>
              <el-form-item label="大盲注">
                     <el-col :span="14">
                      <el-input v-model="form.maxBlindNote" type="number" min="1"></el-input>
                      </el-col>
                    </el-form-item>
                <el-form-item label="免费携带积分上限">
                     <el-col :span="14">
                      <el-input v-model="form.maxIntegral" type="number" min="1"></el-input>
                      </el-col>
                      
                </el-form-item>
                     <el-form-item label="积分抽水">
                     <el-col :span="14">
                      <el-input v-model="form.integralPump" type="number" min="1"></el-input>
                      </el-col>
                      %
                </el-form-item>
           
                  </el-form-item>
                 
             
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
       <!--  <el-button type="primary" @click="resetForm('form')">重置</el-button> -->
        <el-button type="primary" >返回</el-button>
      </span>
    </el-dialog>
<!--   //添加房间 -->

 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
          
            @current-change="handleCurrentChange"
          
            layout="total,prev, pager, next, jumper"
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
         
         tableData: null,
                        multipleSelection: [],//多选
                        dialogAddInfo:false,
                        
            pagtotal:1,
          pagNo:1,
       
         
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
         maxBlindNote:'',
         maxIntegral:'',
         integralPump:'',
         minBlindNote:'',
         danId:'',
         roomId:'',
         playId:'',
          },
          //表单
          //表单验证
          rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
          
          ],
         
        },
          //表单验证
        }
      },
      methods:{
        //       changEndTime(val){

        //    this.form.aEndTime = val
        //   if (this.form.aStartTime>val) {
        //       this.$message(`结束时间必须大于起始时间`)
        //       this.form.aEndTime = " "
        //   }
          
        // },
        // changStartTime(val){
         
        //   this.form.aStartTime = val
        // },
       
       
         queryLists(){
           let option = {}
           option.playId = 2
         
            this.API.ApiroomQueryPage(option).then((res)=>{
               this.pagtotal = res.data.total
            res.data.rows.forEach((item)=>{

                 this.pagtotal = res.data.total
                 //item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd hh:mm:ss'):''
                 // item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd hh:mm:ss'):''
                  item.xdanId = this.danIds[item.danId-1].label 
                 

            })
           
              this.tableData = res.data.rows


           },(res)=>{})

         },
      ensureAction(){
          let option = {};

          Object.assign(option,this.form)

          option.playId = 2

            this.API.ApisaveRoom(option).then((res)=>{

              if (res.data.retcode==1) {
                this.resetForm("form")
                this.dialogAddInfo = false
                 this.queryLists()
              
              }

            })




         },

         handleCurrentChange(){
          this.pageNo = val
           this.queryLists()
           this.pageNo = 1

         },
      
       editorActionFist(index,row){//1基础道具编辑
          this.dialogAddInfo = true
          // for(let key in row){
          //    row[key] = (row[key]||'').toString()
          // }

           Object.assign(this.form,row)
             // this.form.roomIid = row.roomId.toString()



        },
        deleteActionFirst(index,row){
          let option = {}
          option.rids = row.roomId
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelRoom(option).then((res)=>{
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

