<template>
  <div class="activityMange-wrapperr">
  
    <nav>     
        <div class="nav-item">
             
              <el-input v-model="keywords" size="small" placeholder=""></el-input>
        </div>  
      <div class="nav-item">
          <el-button type="primary" size="small" @click="queryById">id查询</el-button>
      </div>
       <div class="nav-item">
          <el-button type="primary" size="small"  @click="dialogAddActive = true,form.activeId=''">添加活动</el-button>
       </div>
     
    
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" highlight-current-row row-class-name="cell-style"  @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55">
          </el-table-column>
        <el-table-column prop="activeId" label="活动ID" >
        </el-table-column>
         
         <el-table-column prop="activeTitle" label="活动标题" >
        </el-table-column>
         <el-table-column prop="xactiveType" label="活动类型" >
        </el-table-column>
         <el-table-column prop="xshelveTime" label="上架时间" min-width="120">
        </el-table-column>
         <el-table-column prop="xunshelveTime" label="下架时间" min-width="120">
        </el-table-column>
         <el-table-column label="操作" >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="handleGag(scope.$index,scope.row)">修改</el-button>
          <el-button size="small"  type="primary" @click="deleteAction(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
      </el-table>
      <div class="deletemint">
        <el-button type="primary" size="small" @click="multiselectDelete">多选删除</el-button>
      </div>
       
<!-- table -->
<!--   //添加公告 -->
    <el-dialog title="添加活动" v-model="dialogAddActive" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :label-position="labelPosition" :model="form" :rules="rules" label-width="100px">
              <el-form-item label="活动类型" prop="activeType">
                <el-radio-group v-model="form.activeType"  @change='changeActiveType'>
                   <el-radio class="radio"  label="1">轮播式活动</el-radio>
                    <el-radio class="radio" label="2">任务式活动</el-radio>
                  </el-radio-group>
                  </el-form-item>
                <el-form-item label="活动标题">
                    <el-col :span="14">
                    <el-input v-model="form.activeTitle"></el-input>
                    </el-col>
                  </el-form-item>
              <el-form-item label="活动上架时间">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.shelveTime" @change="changStartTime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动下架时间">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.unshelveTime" @change="changEndTime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item> 
            <el-form-item label="分页图">
                 <el-col :span="14">
                    <el-upload
                      class="avatar-uploader"
                      :action="API.UPLOADURL"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="form.pagingImg" :src="form.pagingImg" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>

                </el-col>
              </el-form-item>
             

          <template v-if="form.activeType==1">


                     <el-form-item label="轮播间隔">
                      <el-col :span="14">
                      <el-input v-model="form.playTime" type='number' min='0'></el-input>
                      </el-col>
                      </el-form-item>
                  <el-form-item label="H5链接1">
                     <el-col :span="14">
                      <el-input v-model="form.carousel1"></el-input>
                      </el-col>
                    </el-form-item>
                  <el-form-item label="轮播图1">
                     <el-col :span="14">
                        <el-upload
                          class="avatar-uploader"
                          :action="API.UPLOADURL"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess1"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.imageUrl1" :src="form.imageUrl1" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>

                      </el-col>
                    </el-form-item>
                  
                  <el-form-item label="H5链接2">
                     <el-col :span="14">
                      <el-input v-model="form.carousel2"></el-input>
                      </el-col>
                    </el-form-item>
                  <el-form-item label="轮播图2">
                     <el-col :span="14">
                        <el-upload
                          class="avatar-uploader"
                           :action="API.UPLOADURL"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess2"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.imageUrl2" :src="form.imageUrl2" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>

                      </el-col>
                    </el-form-item>
                    
                  <el-form-item label="H5链接3">
                     <el-col :span="14">
                      <el-input v-model="form.carousel3"></el-input>
                      </el-col>
                    </el-form-item>
                  <el-form-item label="轮播图3">
                     <el-col :span="14">
                        <el-upload
                          class="avatar-uploader"
                          :action="API.UPLOADURL"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess3"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.imageUrl3" :src="form.imageUrl3" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>

                      </el-col>
                    </el-form-item>
                    
                  <el-form-item label="H5链接4">
                     <el-col :span="14">
                      <el-input v-model="form.carousel4"></el-input>
                      </el-col>
                    </el-form-item>
                  <el-form-item label="轮播图4">
                     <el-col :span="14">
                        <el-upload
                          class="avatar-uploader"
                          :action="API.UPLOADURL"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess4"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.imageUrl4" :src="form.imageUrl4" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>

                      </el-col>
                    </el-form-item>
                   
                  <el-form-item label="H5链接5">
                     <el-col :span="14">
                      <el-input v-model="form.carousel5"></el-input>
                      </el-col>
                    </el-form-item>
                  <el-form-item label="轮播图5">
                     <el-col :span="14">
                        <el-upload
                          class="avatar-uploader"
                          :action="API.UPLOADURL"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess5"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="form.imageUrl5" :src="form.imageUrl5" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                         </el-upload>

                      </el-col>
                    </el-form-item>
              </template>
                     <template v-if="form.activeType==2">
                  <!--   <el-form-item label="分页图">
              
                    <el-col :span="14">
                    <el-upload
                      class="avatar-uploader"
                      action="/TitanCMS/upload/uploadImg"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccessr"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrlr" :src="imageUrlr" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>

                </el-col>
              </el-form-item> -->
                     <el-form-item label="任务类型">
                      <el-col :span="14">
                         <el-cascader
                          :options="options"
                          :show-all-levels="false"
                           v-model="form.selectedOptions"
                          @change="handleChange"
                        ></el-cascader>
                      </el-col>
                      </el-form-item>
                  <el-form-item label="任务X数值">
                     <el-col :span="14">
                      <el-input v-model="form.taskCount" type="number" min="1"></el-input>
                      </el-col>
                    </el-form-item>
                  <el-form-item label="跳转链接">
                       <el-col :span="14">
                      <el-input v-model="form.taskConnect"></el-input>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="任务描述" prop="desc">
                     <el-col :span="14">
                      <el-input type="textarea" v-model="form.taskRemark"></el-input>
                       </el-col>
                    </el-form-item>
              </template>
             
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      
        <el-button type="primary" @click="resetForm('form')">返回</el-button>
      </span>
    </el-dialog>
<!--   //添加公告 -->
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
          vm.queryTaskType()
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
         
          
         tableData: null,
                        multipleSelection: [],//多选
          dialogAddActive:false,
           pagtotal:0,
           pageNo:1,
          keywords:"",//关键字
          labelPosition:"left",
           //表单
          form: {
           activeTitle:'',
           activeType:'1',
          shelveTime:'',
          unshelveTime:'',
          selectedOptions:[],
            playTime:0,
            pagingImg:'',
            hConnect:'',
           carousel:'',
           taskType:'',
           taskCount:'',
           taskConnect:'',
           taskRemark:'',
             //图片上传
           imageUrl: '',
            imageUrlr: '',
          imageUrl1: '',
           imageUrl2: '',
          imageUrl3: '',
           imageUrl4: '',
          imageUrl5: '',
          //图片上传
             //h5链接
              carousel1:'',
              carousel2:'',
              carousel3:'',
              carousel4:'',
              carousel5:'',
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
        
          remark: [
            { required: true, message: '请选择活动描述', trigger: 'blur' }
          ],
          
        },
          //表单验证
        
        
          //级联
           selectedOptions: [],
          options: null,
          //级联
        }
      },
      methods:{
        queryById(){
          let option = {}
          option.id = this.keywords
          this.API.ApiActivequeryById(option).then((res)=>{
            if (res.data.retcode==1) {
                     this.pagtotal = 1
                  let item = res.data.data
                   let contrast  = item.activeType
                  item.xactiveType = contrast==1?"轮播式活动":contrast==2?"任务式活动":''
                item.xshelveTime = item.shelveTime?dateUtil.format(item.shelveTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xunshelveTime = item.unshelveTime?dateUtil.format(item.unshelveTime,'yyyy-MM-dd HH:mm:ss'):''   



              
                this.tableData = [item]
            }

          })
        },
        changeActiveType(val){//radio变化
         this.resetForm()
        },
         changStartTime(val){
         
          this.form.shelveTime = val
        },
         changEndTime(val){
           this.form.unshelveTime = val
          if (this.form.shelveTime>val) {
              this.$message(`上架结束时间必须大于上架起始时间`)
              this.form.unshelveTime = " "
          }
          
        },
        multiselectDelete(){//多选删除
          let option = {aids:[]}

          this.multipleSelection.forEach((item)=>{
            option.aids.push(item.activeId)
          })

           this.API.ApideleteActive(option).then((res)=>{
              this.$message(`${res.data.retmsg}`)
              if (res.data.retcode==1) {
                    this.queryLists()      
                }
           })
        },
         deleteAction(index,row) {
            let vm = this
              this.$confirm('此操作将删除该活动, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                vm.deleteSureAction(index,row)
               
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消删除'
                });          
              });
      },
        handleChange(value){//级联
          console.log(value,this.form.selectedOptions)

        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val)
      },
      queryTaskType(){
        let option = [] 
        let vm = this
        this.API.ApisaveTaskActive({}).then((res)=>{
          option = res.data.data.filter((item)=>{
            item.value = item.id
             item.label = item.taskName
            return item.parentId==0
          })

          option.forEach((item)=>{
             let xoption =  res.data.data.filter((xitem)=>{
                return item.id == xitem.parentId
              })
             item.children = xoption||[]
          })
       vm.options = option

        })

      

      },
         queryLists(){
          let option = {}
           option.pageNo = this.pageNo
            this.API.ApiqueryActive(option).then((res)=>{
               this.pagtotal = res.data.total
                res.data.rows.forEach((item)=>{ 
                   let contrast  = item.activeType
                  item.xactiveType = contrast==1?"轮播式活动":contrast==2?"任务式活动":''
                item.xshelveTime = item.shelveTime?dateUtil.format(item.shelveTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xunshelveTime = item.unshelveTime?dateUtil.format(item.unshelveTime,'yyyy-MM-dd HH:mm:ss'):''   



                 })
                this.tableData = res.data.rows


            })
          
         },
         handleGag(index,row){
        
          let vm =this
            this.dialogAddActive = true
            Object.assign(vm.form,row)
            this.activeId = row.activeId
            this.form.activeType = row.activeType.toString()
            let hConnects = row.hConnect.split(',')
             let carousels = row.carousel.split(',')
           
             for(let i=0;i<hConnects.length;i++){
                let j = i+1 
                vm.form['imageUrl'+j] = hConnects[i]
                vm.form['carousel'+j] = carousels[i]
             }

             // console.log(this.form)

         },//ApideleteActive
         deleteSureAction(index,row){
          let option = {}
          option.aids = [row.activeId]
          this.API.ApideleteActive(option).then((res)=>{
               this.$message(`${res.data.retmsg}`)
              if (res.data.retcode==1) {
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
               this.ensureAtion()
              } else {
                console.log('error submit!!');
                return false;
              }
            });
      },
      ensureAtion(){
        let option = {}
        option.activeId = this.activeId
        option.activeTitle = this.form.activeTitle
        option.activeType = this.form.activeType
        option.shelveTime = this.form.shelveTime
        option.unshelveTime = this.form.unshelveTime
        option.pagingImg = this.form.pagingImg
        option.playTime = this.form.playTime
        option.taskType = this.form.selectedOptions[1]
        option.taskCount = this.form.taskCount
        option.taskConnect = this.form.taskConnect
        option.taskRemark = this.form.taskRemark

        let  hConnects = [this.form.imageUrl1,this.form.imageUrl2,this.form.imageUrl3,this.form.imageUrl4,this.form.imageUrl5]
        let carousels = [this.form.carousel1,this.form.carousel2,this.form.carousel3,this.form.carousel4,this.form.carousel4]
        
       option.hConnect = hConnects.filter((x) => {
            return x!=''
       }).join(',')
       
     
        option.carousel = carousels.filter((x) => {
           return x!=''
        }).join(',')

      
        this.API.ApiaddActive(option).then((res)=>{
          this.$message(`${res.data.retmsg}`)
           if (res.data.retcode==1) {
            this.dialogAddActive = false
            this.queryLists()
            this.resetForm()
           }
        })

      },
      resetForm() {//表单重置
        let vm = this
     let option = {
           activeTitle:'',
           activeType:vm.form.activeType,
          shelveTime:'',
          unshelveTime:'',
          selectedOptions:[],
            playTime:0,
            pagingImg:'',
            hConnect:'',
           carousel:'',
           taskType:'',
           taskCount:'',
           taskConnect:'',
           taskRemark:'',
             //图片上传
           imageUrl: '',
            imageUrlr: '',
          imageUrl1: '',
           imageUrl2: '',
          imageUrl3: '',
           imageUrl4: '',
          imageUrl5: '',
          //图片上传
             //h5链接
              carousel1:'',
              carousel2:'',
              carousel3:'',
              carousel4:'',
              carousel5:'',
          }
          this.activeId = ''
          this.form = option
            this.dialogAddActive = false
          
      },
      handleAvatarSuccess(res, file) {
      
        // this.form.pagingImg = URL.createObjectURL(file.raw);
          this.form.pagingImg = res.data;
      },
      //  handleAvatarSuccessr(res, file) {
      //   this.imageUrlr = URL.createObjectURL(file.raw);
      // },
       handleAvatarSuccess1(res, file) {
        // this.imageUrl1 = URL.createObjectURL(file.raw);
        this.form.imageUrl1 = res.data;
      },
       handleAvatarSuccess2(res, file) {
        // this.imageUrl2 = URL.createObjectURL(file.raw);
        this.form.imageUrl2 = res.data;
      },
       handleAvatarSuccess3(res, file) {
        // this.imageUrl3 = URL.createObjectURL(file.raw);
        this.form.imageUrl3 = res.data;
      },
       handleAvatarSuccess4(res, file) {
        // this.imageUrl4 = URL.createObjectURL(file.raw);
        this.form.imageUrl4 = res.data;
      },
       handleAvatarSuccess5(res, file) {
        // this.imageUrl5 = URL.createObjectURL(file.raw);
        this.form.imageUrl5 = res.data;
      },
     
       //上传图片
     
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
       //上传图片
        
         
      },

    

} 
</script>

<style lang="scss">
@import "~style/color.scss";
.activityMange-wrapperr{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
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
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
  .deletemint{
    margin-top: 40px;
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
     // min-width: 150px;
     margin-left: 10px;
      font-size: 12px;
   margin-top: 0px;
        // label{
        //   margin-bottom: 0px;
        //   min-width: 40px;
        // }
 
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
    //  .el-button {
    //       height: 25px;
    //       line-height: 25px;
    //       margin-left: 10px;
    //       margin-top: 20px;
    //       span{
    //         font-size: 12px;
    //       }
    //       padding: 0px 10px;
    // }

  
  }

}
</style>

