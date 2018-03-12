<template>
  <div class="propdeploy-wrapper">

         
         <nav>
              <div class="nav-item">
                 <el-button size="small"  type="primary" @click="dialogArts=true,form.pid=''">添加道具</el-button> 
              </div>
              <div class="nav-item">
              <label for="userName">道具ID:</label>
              <el-input v-model="search.pid" size="small" placeholder=""></el-input>
            </div>  
            <div class="nav-item">
              <label for="userName">道具名称:</label>
              <el-input v-model="search.pname" size="small" placeholder=""></el-input> 
            </div> 
             
            <div class="nav-item">
            <div class="blocktime">
              <label>创建时间:</label>
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
                 <el-button size="small"  type="primary" @click="queryPropBaseList">查询</el-button> 
              </div>
          </nav>
<!-- table -->
           <el-table :data="tableData" highlight-current-row row-class-name="cell-style" style="width: 100%">
            <el-table-column  prop="pid" label="道具ID" >
            </el-table-column>
            <el-table-column prop="pname" label="道具名称" >
            </el-table-column>
             
             <el-table-column prop="describeProp" label="道具描述" >
            </el-table-column>
             <el-table-column label="icon资源" >
               <template scope="scope">
                        <img v-if="scope.row.iconPicture" :src="scope.row.iconPicture" class="avatar">
                </template>
            </el-table-column>
               <el-table-column prop="xaddTime" label="创建时间" min-width="120">
              </el-table-column>
               <el-table-column prop="xupdTime" label="修改时间" min-width="120">
              </el-table-column>
             <el-table-column prop="adminName" label="操作人"  >
            </el-table-column>
            <el-table-column label="操作" >
              <template scope="scope">
              <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">编辑</el-button>
              <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
<!-- table -->
  <!--   //添加权限 -->
    <el-dialog title="添加道具信息" v-model="dialogArts" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">

                 <el-form-item label="道具ID" prop="pid">
                     <el-col :span="10">
                      <el-input v-model="form.pid" type="number" min="1"></el-input>
                      </el-col>
                    
                  </el-form-item>
                     <el-form-item label="道具名称" prop="pname">
                     <el-col :span="10">
                      <el-input v-model="form.pname" ></el-input>
                      </el-col>
                  </el-form-item>
                   <el-form-item label="道具描述" prop="describeProp">
                          <el-input type="textarea" v-model="form.describeProp"></el-input>
                        </el-form-item>
                     <el-form-item label="道具icon" prop="iconPicture">
                     <el-col :span="10">
                        <el-upload
                        class="avatar-uploader"
                        :action="API.UPLOADURL"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccessContentImage"
                       >
                        <img v-if="form.iconPicture" :src="form.iconPicture" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                       </el-upload>
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
<!--   //添加权限 -->
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
          vm.queryPropBaseList()
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
         pageNo:1,
         pagtotal:1,
          search:{//道具基础配置查询参数1
            pid:'',
            pname:'',
            startTime:'',
            endTime:'',
          },
          form:{//道具基础配置form添加1
            pname:'',
            pid:'',
            describeProp:'',
            iconPicture:'',
          
          },
         
         
          dialogArts:false,
         
          //表单
          //表单验证
          rules: {
          pid: [
            { required: true, message: '请输入道具id', trigger: 'blur' },
           
          ],
           pname: [
            { required: true, message: '请输入道具名称', trigger: 'blur' },
           
          ],
           describeProp: [
            { required: true, message: '请输入道具描述', trigger: 'blur' },
           
          ],
         iconPicture: [
            { required: true, message: '请选择图片', trigger: 'blur' },
           
          ],
       
         
        },
          //表单验证
        }
      },
      methods:{

          beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
              this.$message.error('上传图片只能是 PNG 格式!');
            }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
      },
         handleAvatarSuccessContentImage(res, file) {
    
          this.form.iconPicture = res.data;
      },
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
        queryPropBaseList(){//1道具基础属性配置列表查询
          let option = {}
           Object.assign(option,this.search)
           option.pageNo = this.pageNo
           this.API.ApiqueryPropArt(option).then((res)=>{
            this.pagtotal = res.data.total
                res.data.rows.forEach((item)=>{
                 
                    item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                     item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''


                })

                this.tableData = res.data.rows

           })

        },
        editorActionFist(index,row){//1基础道具编辑
          this.dialogArts = true
          for(let key in row){
             row[key] = row[key].toString()
          }
           Object.assign(this.form,row)


        },
        deleteActionFirst(index,row){
          let option = {}
          option.pids = row.pid
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApideletePropArt(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryPropBaseList()
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
               this.ensureBaseAction()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      ensureBaseAction(){
        let option = {}
        Object.assign(option,this.form)

        this.API.ApisavePropArt(option).then((res)=>{
           this.$message(`${res.data.retmsg}`)
               if (res.data.retcode==1) {
                this.dialogArts = false
                this.queryPropBaseList()
                 
                }

        })

      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
       
        this.dialogArts=false
       
      },

          handleCurrentChange(val){
            this.pageNo = val
            this.queryPropBaseList()
            this.pageNo = 1
         },
        
         
      },



} 
</script>

<style lang="scss">
@import "~style/color.scss";
.propdeploy-wrapper{
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
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .el-upload__input{
      display: none;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
.nav-second{
  margin:10px ;
  margin-top: 0px;
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
    margin-top: 10px;
      font-size: 12px;
        .blocktime{
            .demonstration{
              display: inline-block;
              margin:auto 10px;
              font-size: 12px;
                color:#666;
               font-weight: normal;
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
        .querybtn{
           border:none;
          border-radius:0px;
          margin-left: 25px;
          height: 25px;
         font-size: 12px;
        }
       
        .el-input--small{
          height: 25px;
          width: 120px;
        }
        .el-input__inner{
          height: 25px;
        } 

  }
  
  }

}
</style>

