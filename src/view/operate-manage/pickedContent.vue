<template>
  <div class="propMange-wrapper">

         
         <nav>
              <div class="nav-item">
                 <el-button size="small"  type="primary" @click="dialogArts=true,from.id=''">添加每周精选</el-button> 
              </div>
              <div class="nav-item">
              <label for="userName">精选ID:</label>
              <el-input v-model="search.id" size="small" placeholder=""></el-input>
            </div>  
            <div class="nav-item">
              <label for="userName">精选标题:</label>
              <el-input v-model="search.title" size="small" placeholder=""></el-input> 
            </div> 
             
            <div class="nav-item">
            <label for="userName">是否启用:</label>
            <el-select v-model="search.isEnable" placeholder="请选择">
                  <el-option
                    v-for="item in isEnables"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </div> 
          <div class="nav-item">
                 <el-button size="small"  type="primary" @click="queryPropBaseList">查询</el-button> 
              </div>
          </nav>
<!-- table -->
           <el-table :data="tableData" highlight-current-row row-class-name="cell-style" style="width: 100%">
            <el-table-column  prop="id" label="精选ID" width="120">
            </el-table-column>
            <el-table-column prop="title" label="精选标题" >
            </el-table-column>
             
             <el-table-column prop="weekDesc" label="精选描述" min-width="120">
            </el-table-column>
             <el-table-column label="精选图片" width="150">
               <template scope="scope">
                        <img v-if="scope.row.picUrl" :src="scope.row.picUrl" class="avatar">
                </template>
            </el-table-column>
               <el-table-column prop="xaddTime" label="创建时间" min-width="120">
              </el-table-column>
               <el-table-column prop="xupdTime" label="修改时间" min-width="120">
              </el-table-column>
             <el-table-column prop="adminName" label="操作人">
            </el-table-column>
            <el-table-column label="操作" >
              <template scope="scope">
              <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">编辑</el-button>
              <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">{{scope.row.isEnable==1?'关闭':'启用'}}</el-button>
                </template>
              </el-table-column>
            </el-table>
<!-- table -->
  <!--   //添加权限 -->
    <el-dialog title="添加道具信息" v-model="dialogArts" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">

               <!--   <el-form-item label="道具ID" prop="pid">
                     <el-col :span="10">
                      <el-input v-model="form.pid" type="number" min="1"></el-input>
                      </el-col>
                    
                  </el-form-item> -->
                     <el-form-item label="精选名称" prop="title">
                     <el-col :span="10">
                      <el-input v-model="form.title" ></el-input>
                      </el-col>
                  </el-form-item>
                   <el-form-item label="精选描述" prop="weekDesc">
                          <el-input type="textarea" v-model="form.weekDesc"></el-input>
                        </el-form-item>
                     <el-form-item label="道具icon" prop="picUrl">
                     <el-col :span="10">
                        <el-upload
                        class="avatar-uploader"
                        :action="API.UPLOADURL"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccessContentImage"
                       >
                        <img v-if="form.picUrl" :src="form.picUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                       </el-upload>
                      </el-col>
                    
                  </el-form-item>
                    <el-form-item label="链接地址" prop="link">
                     <el-col :span="10">
                      <el-input v-model="form.link" ></el-input>
                      </el-col>
                  </el-form-item>
                            <el-form-item label="是否启用" prop="isEnable">
                     <el-col :span="10">
                   
                       <el-select v-model="form.isEnable" placeholder="请选择">
                        <el-option
                          v-for="item in isFEnables"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
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
          isEnables:[
          {
            value:'',
            label:'所有'
          },
          {
            value:1,
            label:'启用'
          },{
            value:0,
            label:'不启用'
          },],
           isFEnables:[
          {
            value:1,
            label:'启用'
          },{
            value:0,
            label:'不启用'
          },],

         
         tableData: null,
         pageNo:1,
         pagtotal:1,
          search:{//道具基础配置查询参数1
            id:'',
            title:'',
           isEnable:'',
          },
          form:{//道具基础配置form添加1
            id:'',
            title:'',
            weekDesc:'',
            picUrl:'',
            isEnable:1,
          link:'',
          },
         
         
          dialogArts:false,
         
          //表单
          //表单验证
          rules: {
          title: [
            { required: true, message: '请输入精选标题', trigger: 'blur' },
           
          ],
           weekDesc: [
            { required: true, message: '请输入描述', trigger: 'blur' },
           
          ],
           picUrl: [
            { required: true, message: '请选择图片', trigger: 'blur' },
           
          ],
         link: [
            { required: true, message: '请填写链接地址', trigger: 'blur' },
           
          ],
          
       
         
        },
          //表单验证
        }
      },
      methods:{

       
         handleAvatarSuccessContentImage(res, file) {
    
          this.form.picUrl = res.data;
      },
        
        queryPropBaseList(){//1道具基础属性配置列表查询
          let option = {}
           Object.assign(option,this.search)
           // option.pageNo = this.pageNo
           this.API.APIgetWeekHandpickList(option).then((res)=>{
            this.pagtotal = res.data.total
                res.data.rows.forEach((item)=>{
                 
                    item.xaddTime = item.addtime?dateUtil.format(item.addtime,'yyyy-MM-dd HH:mm:ss'):''
                     item.xupdTime = item.updtime?dateUtil.format(item.updtime,'yyyy-MM-dd HH:mm:ss'):''


                })

                this.tableData = res.data.rows

           })

        },
        editorActionFist(index,row){//1基础道具编辑

          let option = {
            id : row.id
          }
              this.API.APIgetWeekHandpickById(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                       this.dialogArts = true
                //               for(let key in row){
                //    row[key] = row[key].toString()
                // }
                 Object.assign(this.form,res.data.data)
                    }
                })

         
         


        },
        deleteActionFirst(index,row){
          let option = {}
          option.id = row.id
           this.$confirm('将修改精选状态, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.APIupdWeekHandpickById(option).then((res)=>{
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

        this.API.APIsaveWeekHandpick(option).then((res)=>{
           this.$message(`${res.data.retmsg}`)
               if (res.data.retcode==1) {
                this.dialogArts = false
                this.resetForm('form')
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
.propMange-wrapper{
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
      .el-select{
        width: 130px;
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
  
  }

}
</style>

