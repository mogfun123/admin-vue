<template>
  <div class="activityMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="keywords">商品id</label>
              <el-input v-model="gid" size="small" placeholder=""></el-input>
             
        </div>  

       <el-button type="primary" size="small" @click="queryLists">搜索</el-button>
      <el-button type="primary" size="small"  @click="addShopitem">添加商品</el-button>
    
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55">
          </el-table-column>
        <el-table-column prop="gid" label="商品ID" width="120">
        </el-table-column>
         
         <el-table-column prop="gname" label="商品名称" width="220">
        </el-table-column>
         <el-table-column prop="stock" label="库存" width="120">
        </el-table-column>
          <el-table-column prop="price" label="售价" width="120">
        </el-table-column>
         <el-table-column prop="xaddtime" label="上架时间" width="220">
        </el-table-column>

         <el-table-column label="操作" >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">修改</el-button>
          <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
         
      </el-table>
      <div class="deletemint">
        <el-button type="primary" size="small" @click="selectionDelete">多选删除</el-button>
      </div>
       
<!-- table -->
<!--   //添加公告 -->
    <el-dialog title="添加公告" v-model="dialogAddActive" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
              <el-form-item label="商品名称" prop="gname">
                     <el-col :span="14">
                      <el-input v-model="form.gname" ></el-input>
                      </el-col>
                </el-form-item>
             <el-form-item label="商品描述" prop="synopsis">
                     <el-col :span="14">
                      <el-input v-model="form.synopsis" ></el-input>
                      </el-col>
                </el-form-item>
              <el-form-item label="库存" prop="stock">
                     <el-col :span="14">
                      <el-input v-model="form.stock" type="number" min="1"></el-input>
                      </el-col>
                    </el-form-item>
                <el-form-item label="售价" prop="price">
                     <el-col :span="14">
                      <el-input v-model="form.price" type="number" min="1"></el-input>
                      </el-col>
                </el-form-item>
            <el-form-item label="商品页签图" prop="tabImg" >
                <el-col :span="14">
                      <el-upload
                      class="avatar-uploader"
                      :action="API.UPLOADURL"
                      :show-file-list="false"
                     
                      :on-success="handleAvatarSuccess"
                     >
                      <img v-if="form.tabImg" :src="form.tabImg" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>
                </el-col>
              </el-form-item>
            
                     
                  <el-form-item label="商品详情图">
                     <el-col :span="14">
                          <el-upload
                              class="upload-demo"

                               :action="API.UPLOADURL"
                              :on-preview="handlePreview"
                              :on-remove="handleRemove"
                              :file-list="gimgslist"
                               
                               :on-success="handleAvatarSuccessgimgs"
                              list-type="picture-card">
                              <i class="el-icon-plus"></i>

                            </el-upload>
                      </el-col>
                    </el-form-item>
            
                  
             
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      <!--   <el-button type="primary" @click="resetForm('form')">重置</el-button> -->
        <el-button type="primary" @click="dialogAddActive = false">返回</el-button>
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
  
         tableData:null,
          multipleSelection: [],//多选
          dialogAddActive:false,
          gid:'',//修改商品id
         pagtotal:1,
         pageNo:1,
          gimgslist:[],
          fileList:[],
           //表单
          form: {
            gname:'',
            synopsis:'',
            stock:'',
            price:'',
            tabImg:'',
            gimgs:"",
           
          },
          //表单
          //表单验证
          rules: {
          gname: [
            { required: true, message: '请输入商品名称', trigger: 'blur' },
           
          ],
          synopsis: [
            { required: true, message: '请输入商品描述', trigger: 'blur' }
          ],
         
          stock: [
            { required: true, message: '请输入库存', trigger: 'blur' }
          ],
          price: [
            { required: true, message: '请输入售价', trigger: 'blur' }
          ],
           gimgs: [
            { required: true, message: '请添加商品详情图', trigger: 'blur' }
          ],
          tabImg: [
            { required: true, message: '请添加商品页签图', trigger: 'blur' }
          ]
        },
          //表单验证
        }
      },
      methods:{
        addShopitem(){
           this.resetForm('form')
          this.dialogAddActive = true
          this.form.gid=''
          this.gimgslist=[]
         
        
        },
         handleRemove(file, fileList) {
           this.gimgslist = fileList
        },
        handlePreview(file) {
          console.log(file);
        },
        handleAvatarSuccess(res, file) {
         
          this.form.tabImg =res.data;
      },
       handleAvatarSuccessgimgs(res, file,fileList) {
          console.log(fileList)
          this.gimgslist = fileList
          // this.form.gimgs = res.data;
      },
      selectionDelete(){//多选删除
        let option = {
          gids:[]
        },
            gids = [];
            if (this.multipleSelection.length==0) {
              this.$message(`请选择要删除的项`)
              return 
            }
        this.multipleSelection.forEach((item)=>{
                gids.push(item.gid)
        })

          option.gids = gids
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelCommodity(option).then((res)=>{
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

        handleSelectionChange(val) {
            this.multipleSelection = val;
            
      },
         queryLists(){
           let option = {}
           option.gid = this.gid
            this.API.ApicommodityQueryPage(option).then((res)=>{
            
            res.data.rows.forEach((item)=>{
                 this.pagtotal = res.data.total
                  item.xaddtime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd hh:mm:ss'):''
                 

            })
           
              this.tableData = res.data.rows


           },(res)=>{})

         },
        
         handleCurrentChange(val){
          this.pageNo = val
          this.queryLists()
          this.pageNo = 1

         },
        editorActionFist(index,row){//1基础道具编辑
          this.dialogAddActive = true
          for(let key in row){
             row[key] = (row[key]||'').toString()
          }

           Object.assign(this.form,row)
           this.gimgslist = row.gimgs.split(',').map((item)=>{

            return {name:'',url:item}
           })


        },
        deleteActionFirst(index,row){
          let option = {}
          option.gids = row.gid
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelCommodity(option).then((res)=>{
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
               this.ensureAtion()
              } else {
                console.log('error submit!!');
                return false;
              }
            })
      },
      resetForm(formName) {//表单重置
            (this.$refs[formName])?this.$refs[formName].resetFields():'';
            
          this.form.gname=""
           this.form.synopsis=""
           this.form.stock=""
           this.form.price=""
           this.form.tabImg=""

      },

        ensureAtion(){
          let option = {} ,
              arr = [];
           Object.assign(option,this.form)
           if (this.gimgslist.length==0) {
             this.$message(`请添加商品详情图`)
             return 
           }
           
           this.gimgslist.forEach((item)=>{

                item.response?arr.push(item.response.data):arr.push(item.url)
           })
           option.gimgs = arr.join(',')

          this.API.ApisaveCommodity(option).then((res)=>{
                   if (res.data.retcode==1) {
                      this.dialogAddActive = false
                      this.resetForm("form")
                      this.queryLists()
                }
          this.$message(`${res.data.retmsg}`)
          })
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

