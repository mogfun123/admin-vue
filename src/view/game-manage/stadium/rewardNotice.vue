<template>
  <div class="activityMange-wrapper">
 <div class="nav-top">
         
         <el-button size="small"  type="primary" @click="dialogAddInfo=true">添加预告</el-button> 
      </div>
         


    <nav>     
         <div class="nav-item">
              <label for="userName">创建者:</label>
              <el-input v-model="userName" size="small" placeholder=""></el-input>
             
          </div>  
       
         <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">创建时间</span>
              <el-date-picker
                  v-model="search.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                   @change="changStartTime"
                  >
                </el-date-picker>
              </div>
               <div class="blocktime">
               <span class="demonstration">至</span>
                <el-date-picker
                  v-model="search.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                   @change="changEndTime"
                  >
                </el-date-picker>
              </div>
          </div>  
 
           <div class="nav-item">
            <el-button size="small"  type="primary" @click="handleGag()">查询</el-button>
           </div>

     
    </nav>

<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%"  >
           
            <el-table-column prop="name" label="序号" width="100">
              </el-table-column>
               <el-table-column prop="name" label="预告日期" width="200">
              </el-table-column>
              <el-table-column prop="name" label="预告内容" width="200">
              </el-table-column>
               <el-table-column prop="name" label="创建者" width="200">
              </el-table-column>
               <el-table-column prop="name" label="创建时间" width="200">
              </el-table-column>
      </el-table>
     
       
<!-- table -->
<!--   //添加房间 -->
    <el-dialog title="添加房间" v-model="dialogAddInfo" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
         
             <el-form-item label="预告日期">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.dateStrat"  @change="changAddStartTime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                  
              <el-form-item label="预告内容">
                <el-col :span="14">
                <el-input v-model="form.name" type="textarea"></el-input>
                </el-col>
              </el-form-item>
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">返回</el-button>
        
      </span>
    </el-dialog>
<!--   //添加房间 -->

 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total,  prev, pager, next, jumper"
            :total="pagtotal">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>
export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
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
          pagtotal:0,
          pagNo:1,
         tableData: [{
                          date: '2016-05-02',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                          date: '2016-05-04',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1517 弄'
                        }, {
                          date: '2016-05-01',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                          date: '2016-05-03',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1516 弄'
                        }],
                        multipleSelection: [],//多选
                        dialogAddInfo:false,
                        
           
        
           //表单
          search: {
            startTime:'',
            endTime:'',
         
          },
          form:{

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
       changEndTime(val){

           this.search.endTime = val
          if (this.search.startTime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.search.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.search.startTime = val
        },
        changAddStartTime(val){

        },
      
         handleGag(){

         },//封禁/解封
         
         handleCurrentChange(val){

         },
        
         submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            })
      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
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

