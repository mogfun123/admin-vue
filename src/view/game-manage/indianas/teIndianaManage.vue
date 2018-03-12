<template>
  <div class="activityMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="keywords">关键字</label>
              <el-input  size="small" placeholder=""></el-input>
             
        </div>  

       <el-button type="primary" size="small"  @click="queryLists">搜索</el-button>
        <el-button type="primary" size="small" @click="dialogAddIndia = true">添加夺宝</el-button>
      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="55">
          </el-table-column>
        <el-table-column prop="xaStartTime" label="活动开启时间" width="220">
        </el-table-column>
         
         <el-table-column prop="xaEndTime" label="活动关闭时间" width="220">
        </el-table-column>
         <el-table-column prop="trailerTime" label="预告提前时间(秒)" width="150">
        </el-table-column>
          <el-table-column prop="roomId" label="房间" width="120">
        </el-table-column>
         <el-table-column prop="cid" label="奖励道具" width="220">
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


<!--   //添加夺宝 -->
    <el-dialog title="添加夺宝" v-model="dialogAddIndia" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :label-position="labelPosition" :model="form" :rules="rules" label-width="100px">
              <el-form-item label="活动名称">
                     <el-col :span="14">
                      <el-input v-model="form.aname" ></el-input>
                      </el-col>
                </el-form-item>
                   <el-form-item label="活动开启时间">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.aStartTime" style="width: 100%;"      @change="changStartTime"></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="活动结束时间">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.aEndTime" style="width: 100%;"       @change="changEndTime"></el-date-picker>
                  </el-col>
                </el-form-item> 
             <el-form-item label="提前预告时间">
                     <el-col :span="14">
                      <el-input v-model="form.trailerTime"  placeholder="单位为秒" type="number"></el-input>
                      </el-col>
                </el-form-item>
            <el-form-item label="房间配置">
              <el-select v-model="form.roomId" placeholder="请选择活动区域">
                      <el-option
                          v-for="item in roomIDoptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
              </el-select>
            </el-form-item>
              <el-form-item label="道具奖励">
              <el-select v-model="form.cid" placeholder="请选择活动区域">
                 <el-option
                          v-for="item in shopListoptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
              </el-select>
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
<!--   //添加夺宝 -->
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
         vm.queryRooms()//房间查询
         vm.shopQueryLists()//道具
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
          tipName:"管理员",
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
         tableData:null,
         pagtotal:0,
         pagNo:0,
         roomIDoptions:[],
     shopListoptions:[],
        multipleSelection: [],//多选
      dialogAddIndia:false,
          labelPosition:"left",
           //表单
          form: {
           aid:'',
           aname:'',
           aStartTime:'',
           aEndTime:'',
           // isTrailer:1,
           trailerTime:'',
           roomId:'',
           cid:'',
           
          },
          //表单
          //表单验证
          rules: {
         
            aname: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
           
          ],
            aStartTime: [
            { required: true, message: '请输入活动开始时间', trigger: 'blur' },
           
          ],
            aEndTime: [
            { required: true, message: '请输入活动结束时间', trigger: 'blur' },
           
          ],
            isTrailer: [
            { required: true, message: '请输入是否预告', trigger: 'blur' },
           
          ],
            trailerTime: [
            { required: true, message: '请选择预告时间', trigger: 'blur' },
           
          ],
            roomIid: [
            { required: true, message: '请选择房间', trigger: 'blur' },
           
          ],
            cid: [
            { required: true, message: '请选择商品', trigger: 'blur' },
           
          ],
        
        },
          //表单验证
        }
      },
      methods:{
          changEndTime(val){

           this.form.aEndTime = val
          if (this.form.aStartTime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.form.aEndTime = " "
          }
          
        },
        changStartTime(val){
         
          this.form.aStartTime = val
        },
        handleSelectionChange(val) {
        this.multipleSelection = val;
       
      },
        shopQueryLists(){
           let option = {},
           arr = []
          
            this.API.ApicommodityQueryPage(option).then((res)=>{
            
            res.data.rows.forEach((item)=>{
                let oop = {
                  value:item.cid,
                  label:item.cname
                }
                arr.push(oop)
                 

            })
           
              this.shopListoptions = arr


           },(res)=>{})

         },
         queryLists(){
           let option = {}
         
            this.API.ApiactivityQueryPage(option).then((res)=>{
            
            res.data.rows.forEach((item)=>{
                 this.pagtotal = res.data.total
                  item.xaEndTime = item.aEndTime?dateUtil.format(item.aEndTime,'yyyy-MM-dd hh:mm:ss'):''
                  item.xaStartTime = item.aStartTime?dateUtil.format(item.aStartTime,'yyyy-MM-dd hh:mm:ss'):''
                  // item.xtrailerTime = item.trailerTime?dateUtil.format(item.trailerTime,'yyyy-MM-dd hh:mm:ss'):''
                 

            })
           
              this.tableData = res.data.rows


           },(res)=>{})

         },
      ensureAction(){
          let option = {};

          Object.assign(option,this.form)

          option.playId = 1

            this.API.ApisaveActivity(option).then((res)=>{

              if (res.data.retcode==1) {
                this.resetForm("form")
                this.dialogAddIndia = false
                 this.queryLists()
              
              }

            })




         },

         handleCurrentChange(){
          this.pageNo = val
           this.queryLists()
           this.pageNo = 1

         },
         queryRooms(){
          let option = {},
          arr = []
          // this.roomIDoptions
         
            this.API.ApiroomQueryPage(option).then((res)=>{
            
            res.data.rows.forEach((item)=>{
             let opp = {
              label:item.synopsis,
              value:item.roomId
             }

                 arr.push(opp)

            })
            this.roomIDoptions = arr


           },(res)=>{})

         },
       editorActionFist(index,row){//1基础道具编辑
          this.dialogAddIndia = true
          // for(let key in row){
          //    row[key] = (row[key]||'').toString()
          // }

           Object.assign(this.form,row)
             // this.form.roomIid = row.roomId.toString()



        },
        deleteActionFirst(index,row){
          let option = {}
          option.aids = row.aid
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelActivity(option).then((res)=>{
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
    selectionDelete(){//多选删除
        let option = {
          aid:[]
        }
           
            if (this.multipleSelection.length==0) {
              this.$message(`请选择要删除的项`)
              return 
            }
        this.multipleSelection.forEach((item)=>{
                option.aid.push(item.aid)
        })

           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelActivity(option).then((res)=>{
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

