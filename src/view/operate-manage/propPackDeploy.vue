<template>
  <div class="propMange-wrapper">
     
            <nav>
              <div class="nav-item nav-botton-top">
                 <el-button size="small"  type="primary" @click="dialogArts=true,form.awardId=''">添加礼包</el-button> 
              </div>
              <div class="nav-item">
              <label for="userName">礼包ID:</label>
              <el-input v-model="search.awardId" size="small" placeholder=""></el-input>
            </div>  
            <div class="nav-item">
              <label for="userName">礼包名称:</label>
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
            <el-table-column prop="awardId"label="礼包道具ID">
            </el-table-column>
            <el-table-column prop="pname" label="道具名称" >
            </el-table-column>
             
             <el-table-column prop="propsId1" label="道具ID1" >
            </el-table-column>
            <el-table-column prop="propsCount1" label="数量1" >
            </el-table-column>
             <el-table-column prop="propsId2" label="道具ID2" >
            </el-table-column>
            <el-table-column prop="propsCount2" label="数量2" >
            </el-table-column>
             <el-table-column prop="propsId3" label="道具ID3" >
            </el-table-column>
            <el-table-column prop="propsCount3" label="数量3" >
            </el-table-column>
             <el-table-column prop="propsId4" label="道具ID4">
            </el-table-column>
            <el-table-column prop="propsCount4" label="数量4" >
            </el-table-column>
             <el-table-column prop="propsId5" label="道具ID5">
            </el-table-column>
            <el-table-column prop="propsCount5" label="数量5" >
            </el-table-column>
            
               <el-table-column prop="xaddTime" label="创建时间" min-width="120">
              </el-table-column>
               <el-table-column prop="xupdTime" label="修改时间" min-width="120">
              </el-table-column>
             <el-table-column prop="adminName" label="操作人" >
            </el-table-column>
            <el-table-column label="操作" min-width="120">
              <template scope="scope">
              <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">编辑</el-button>
              <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
<!-- table -->
  <!--   //添加权限 -->
    <el-dialog title="添加礼包信息" v-model="dialogArts" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">

                 <el-form-item label="礼包道具ID" prop="awardId">
                     <el-col :span="10">
                      <el-input v-model="form.awardId" type="number" min="1"></el-input>
                      </el-col>
                    
                  </el-form-item>
                  <el-form-item label="礼包名称" prop="pname">
                     <el-col :span="10">
                      <el-input v-model="form.pname" ></el-input>
                      </el-col>
                    
                  </el-form-item>
                     <el-form-item label="道具1" prop="propsId1">
                     <el-col :span="10">
                      <el-input v-model="form.propsId1" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                      <el-form-item label="数量1" prop="propsCount1">
                     <el-col :span="10">
                      <el-input v-model="form.propsCount1" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                     </el-form-item>
                     <el-form-item label="道具2">
                     <el-col :span="10">
                      <el-input v-model="form.propsId2" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                      <el-form-item label="数量2">
                     <el-col :span="10">
                      <el-input v-model="form.propsCount2" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                   
                     </el-form-item>
                     <el-form-item label="道具3">
                     <el-col :span="10">
                      <el-input v-model="form.propsId3" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                      <el-form-item label="数量3">
                     <el-col :span="10">
                      <el-input v-model="form.propsCount3" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                   
                     </el-form-item>
                     <el-form-item label="道具4">
                     <el-col :span="10">
                      <el-input v-model="form.propsId4" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                      <el-form-item label="数量4">
                     <el-col :span="10">
                      <el-input v-model="form.propsCount4" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                   
                     </el-form-item>
                     <el-form-item label="道具5">
                     <el-col :span="10">
                      <el-input v-model="form.propsId5" type="number" min="1"></el-input>
                      </el-col>
                  </el-form-item>
                      <el-form-item label="数量5">
                     <el-col :span="10">
                      <el-input v-model="form.propsCount5" type="number" min="1"></el-input>
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
              :total="pagetotal">
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
      name:"freezeMange",
      data(){

        return {
         tableData: null,
         pageNo:1,
         pagetotal:1,
          search:{//道具基础配置查询参数1
            awardId:'',
            pname:'',
            startTime:'',
            endTime:'',
          },
          form:{//道具基础配置form添加1
            pname:'',
            awardId:'',
            propsId1:'',
            propsCount1:'',
            propsId2:'',
            propsCount2:'',
            propsId3:'',
            propsCount3:'',
            propsId4:'',
            propsCount4:'',
            propsId5:'',
            propsCount5:'',
          
          },
          dialogArts:false,
          //表单
          //表单验证
          rules: {
          awardId: [
            { required: true, message: '请输入礼包id', trigger: 'blur' },
           
          ],
           pname: [
            { required: true, message: '请输入道具名称', trigger: 'blur' },
           
          ],
           propsId1: [
            { required: true, message: '请输入道具id', trigger: 'blur' },
           
          ],
    
         propsCount1: [
            { required: true, message: '请选择道具数量', trigger: 'blur' },
           
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
        queryPropBaseList(){//1道具基础属性配置列表查询
          let option = {}
           Object.assign(option,this.search)
           option.pageNo = this.pageNo
           this.API.ApiqueryAward(option).then((res)=>{
            this.pagetotal = res.data.total
                res.data.rows.forEach((item)=>{
                  let contrast  = item.gameType
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
          option.awardIds = row.awardId
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApropsIdelAward(option).then((res)=>{
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

        this.API.ApisaveAward(option).then((res)=>{
               if (res.data.retcode==1) {
                this.dialogArts = false
                this.queryPropBaseList()
                 
                }
            this.$message(`${res.data.retmsg}`)

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
              color: #666;
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
   .nav-botton-top{
    min-width: 80px;
    width: 80px;
   
  }
  
  }


}
</style>

