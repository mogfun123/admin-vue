<template>
  <div class="matchMange-wrapper">  
  <div class="nav-top">
       <el-button size="small"  type="primary" @click="dialogInfo=true">添加主播</el-button> 
  </div>
  
    <nav>     


        <div class="nav-item">
              <label for="userName">主播ID:</label>
              <el-input v-model="userName" size="small" placeholder=""></el-input>
             
          </div>  


         <div class="nav-item">
              <label for="nickName">主播昵称:</label>
              <el-input v-model="nickName" size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">主播状态：</label>
            <el-select v-model="value" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in mailtypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
        <div class="nav-item">

            <label class="subtitle">游戏状态：</label>
            <el-select v-model="value" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in customerTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>
         <div class="nav-item">
            <div class="blocktime">
              <span class="demonstration">创建时间</span>
              <el-date-picker
                  v-model="timestart"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions1"
                  >
                </el-date-picker>
              </div>
               <div class="blocktime">
               <span class="demonstration">至</span>
                <el-date-picker
                  v-model="timeend"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                  :picker-options="pickerOptions1"
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
   <el-table :data="tableData" border style="width: 100%">
       
        <el-table-column prop="name" label="主播ID" width="120">
        </el-table-column>
         
         <el-table-column prop="name" label="主播昵称" width="120">
        </el-table-column>
         <el-table-column prop="name" label="主播ID" width="120">
        </el-table-column>
         <el-table-column prop="name" label="头像" width="200">
        </el-table-column>
          <el-table-column prop="name" label="性别" width="100">
        </el-table-column>
          <el-table-column prop="name" label="主播状态" width="200">
        </el-table-column>
          <el-table-column prop="name" label="游戏状态" width="120">
        </el-table-column>
          <el-table-column prop="name" label="注册时间" width="120">
        </el-table-column>
        
           <el-table-column label="主播信息" >
          <template scope="scope">
            <el-button size="small"  type="primary" @click="handleGag()">修改</el-button>
         
            </template>
          </el-table-column>
           <el-table-column label="直播记录" >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="open2">下线</el-button>
            </template>
          </el-table-column>
             <el-table-column label="操作" >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="open2">下线</el-button>
            </template>
          </el-table-column>
       
      </el-table>
<!-- table -->

<!--   //发邮件 -->
    <el-dialog title="添加主播" v-model="dialogInfo" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :label-position="labelPosition" :model="form" :rules="rules" label-width="80px">
               <el-form-item label="主播ID">
                  <el-col :span="14">
                  <el-input v-model="form.name" ></el-input>
                  </el-col>
              </el-form-item>
            <el-form-item label="血型">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="星座">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
           
              <el-form-item label="生日">
                  <el-col :span="14">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.dateStrat" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                 <el-form-item label="个性签名">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                  </el-form-item>
            <el-form-item label="主播头像">
                <el-col :span="14">
                <el-input v-model="form.name"></el-input>
                </el-col>
                 <el-col :span="14">
                 <el-button size="small"  type="primary">上传图片</el-button>
                </el-col>
              </el-form-item>
               <el-form-item label="主播照片">
                <el-col :span="14">
                <el-input v-model="form.name"></el-input>
                </el-col>
                 <el-col :span="14">
                 <el-button size="small"  type="primary">上传图片</el-button>
                </el-col>
              </el-form-item>
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
        <el-button type="primary" @click="resetForm('form')">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //发邮件 -->
 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
           
            @current-change="handleCurrentChange"
          
            layout="total, prev, pager, next, jumper"
            :total="400">
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
      name:"freezeMange",
      data(){

        return {
          tipName:"管理员",
          mailtypes:[{
                  value: '选项1',
                  label: '文本邮件'
                  }, 
                 {
                   value: '选项2',
                   label: '筹码类邮件'
                  },
                   {
                   value: '选项2',
                   label: '实物兑换券类邮件'
                  },
                   {
                   value: '选项2',
                   label: '礼包类邮件'
                  }],
          gametypes: [{
                  value: '选项1',
                  label: '所有'
                  }, 
                 {
                   value: '选项2',
                   label: '德州扑克'
                  }],
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
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
            value:"",
        gagText:"封禁",
        dialogInfo:false,
          userName:'',//用户名
          nickName:"",//昵称
          iphone:'',//手机号
          //表单
          form: {
            dateStrat: '',
            switchwidth:70,
            dateEnd: '',
            dateInterval:0,
           region:'',
            type: [],
           radio:1,
            desc: '',
            timelimitup:false,
            timelimitdown:false,
            resource:'',
          },
          //表单
          //表单验证
          rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        },
          //表单验证
        }
      },
      methods:{
         queryButton(){
            let vm = this
         },
         handleGag(){

         },//封禁/解封
         handleSizeChange(){

         },
         handleCurrentChange(){

         },
          submitForm(formName) {//表单确定
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
      },
        open2() {
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              })},
         
      },


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.matchMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
   .el-dialog__footer{
  text-align: center;
}
  .nav-top{
    margin-left: 10px;
    margin-top: 10px;
  }
  nav{
  // height: 25px;
  line-height: 25px;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  font-size: 12px;
  margin: 20px auto;
  margin-top: 10px;
  .nav-item{
    display: flex;
     align-items:center;
     min-width: 150px;
     margin-left: 10px;
     margin-top: 10px;
      font-size: 12px;
        .blocktime{
            .demonstration{
              display: inline-block;
              margin:auto 10px;
              font-size: 12px;
              font-weight: bold;
            }
       }
        label{
          margin-bottom: 0px;
          min-width: 40px;
        }
        .subtitle{
          height: 25px;
        
         
          
          margin-bottom: 0px;
            
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

