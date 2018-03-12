<template>
  <div class="signMange-wrapper">
    <nav>     
        <div class="nav-item">
             <el-button type="primary" size="small" @click="dialogAddreward=true,form.id=''">添加签到奖励</el-button>
        </div>        
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" highlight-current-row row-class-name="cell-style" style="width: 100%">
        <!-- <el-table-column type=index label="序号" width="40">
        </el-table-column> -->
        <el-table-column prop="id" label="奖励ID">
        </el-table-column>
         <el-table-column prop="xdays" label="对应天数" >
        </el-table-column>
         <el-table-column prop="xastrict" label="双倍限制" >
        </el-table-column>
         <el-table-column prop="pid" label="奖励道具" >
        </el-table-column>

         <el-table-column prop="pcount" label="道具数量" >
          </el-table-column>

         <el-table-column prop="xaddTime" label="创建时间" min-width="120">
          </el-table-column>

         <el-table-column prop="xupdTime" label="修改时间" min-width="120">
          </el-table-column>
         <el-table-column prop="adminName" label="操作人" >
        </el-table-column>
         <el-table-column label="操作" >
          <template scope="scope">
          <el-button size="small" type="primary" @click="editrAction(scope.$index,scope.row)">编辑</el-button>
            <el-button size="small" type="primary" @click="deleteAction(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>
       
         
      </el-table>
<!-- table -->
<!--   //添加签到奖励 -->
    <el-dialog title="添加签到奖励" v-model="dialogAddreward" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form" :label-position="labelPosition" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="选择天数" prop="days">
              <el-select v-model="form.days"  placeholder="请选择活动区域">
                 <el-option v-for="item in daysoption":key="item.value":label="item.label":value="item.value"></el-option>
              </el-select>
            </el-form-item>
                 <el-form-item label="双倍奖励限制" prop="astrict" >
              <el-select v-model="form.astrict"  placeholder="请选择活动区域">
                <el-option v-for="item in awardoption":key="item.value":label="item.label":value="item.value"></el-option>
               
              </el-select>
            </el-form-item>
             
              <el-form-item label="奖励道具" prop="pid">
                <el-col :span="14">
                <el-input v-model="form.pid"  placeholder="请输入奖励道具ID"></el-input>
                </el-col>
        
              </el-form-item>
            <el-form-item label="奖励道具数量" prop="pcount">
                <el-col :span="14">
                <el-input v-model="form.pcount" type="number" min="1" placeholder="请输入奖励道具数量"></el-input>
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
<!--   //添加签到奖励 -->
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
                let i = 1
                while(i<=30){
                  let item = {
                    value:`${i}`,
                    label:`第${i}天`
                  }
                  vm.daysoption.push(item)
                        i++
                }
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
                  daysoption:[],
                  awardoption:[
                   {
                    value: '0',
                    label: '无双倍'
                    },
                    {
                    value: '1',
                    label: 'vip1'
                    },
                     {
                    value: '2',
                    label: 'vip2'
                    },
                     {
                    value: '3',
                    label: 'vip3'
                    },
                     {
                    value: '4',
                    label: 'vip4'
                    },
                     {
                    value: '5',
                    label: 'vip5'
                    },

                     {
                    value: '6',
                    label: 'vip6'
                    },
                     {
                    value: '7',
                    label: 'vip7'
                    },
                     {
                    value: '8',
                    label: 'vip8'
                    },
                     {
                    value: '9',
                    label: 'vip9'
                    },
                     {
                    value: '10',
                    label: 'vip10'
                    },
                    
                  ],
         tableData:null,
            value:"",
            dialogAddreward:false,
            labelPosition:"left",

          pagtotal:0,
          pageNo:0,
           //表单
          form: {
           days:'',
           astrict:"",
           pid:'',
           pcount:'',
            id:'',
          },
          //表单
          //表单验证
          rules: {
          days: [
            { required: true, message: '请选择对应天数', trigger: 'blur' },
            
          ],
          astrict: [
            { required: true, message: '请选择奖励限制', trigger: 'blur' }
          ],
          pid: [
            { required: true, message: '请输入道具id', trigger: 'blur' },
          ],
          pcount: [
            { required: true, message: '请输入道具数量', trigger: 'blur' },
          ],
         
        },
          //表单验证
        }
      },
      methods:{
        editrAction(index,row){
         
          this.form.days = row.days.toString()
          this.form.astrict = row.astrict.toString()
          this.form.pcount = row.pcount.toString()
          this.form.pid = row.pid.toString()
           this.form.id = row.id.toString()
          this.dialogAddreward = true



        },
        deleteSureAction(index,row){
          let option = {}
          option.ids =[row.id]
          this.API.ApideleteReport(option).then((res)=>{
              this.$message(`${res.data.retmsg}`)
              if (res.data.retcode==1) {
                    this.queryLists()      
                }
          })

        },
         submitForm(formName){//b
           this.$refs[formName].validate((valid) => {
              if (valid) {
               this.ApisaveReport()
              } else {
                
                return false;
              }
            });
        },
      resetForm(formName) {
        
          this.$refs[formName].resetFields();
          this.form.id =''
          this.dialogAddreward = false
      },
         queryLists(){
             let option = {}
              option.pageNo = this.pageNo
              this.API.ApiqueryReport(option).then((res)=>{
             this.pagtotal = res.data.total
           
                res.data.rows.forEach((item)=>{
               
            
                item.xaddTime = item.addtime?dateUtil.format(item.addtime,'yyyy-MM-dd HH:mm:ss'):''

                item.xupdTime = item.updtime?dateUtil.format(item.updtime,'yyyy-MM-dd HH:mm:ss'):''
                item.xdays = `第${item.days}天`
                item.xastrict = item.astrict==0?'无限制':`VIP${item.days}`
           
                 
            })
              this.tableData = res.data.rows


           },(res)=>{})
         },
         ApisaveReport(){
          let option = {}
            option.days = this.form.days
           option.astrict=this.form.astrict
           option.pid=this.form.pid
           option.pcount=this.form.pcount
           option.id=this.form.id
            this.API.ApisaveReport(option).then((res)=>{
               if (res.data.retcode==1) {
                    this.dialogAddreward = false
                    this.queryLists()
               }
                this.$message(`${res.data.retmsg}`)
            })
          
         },
         handleCurrentChange(val){
           this.pageNo = val
          this.queryLists()  
          this.pageNo = 1
         },
          deleteAction(index,row) {
            let vm = this
              this.$confirm('删除将无法恢复, 是否继续?', '提示', {
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
        
         
      },
     


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.signMange-wrapper{
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
  nav{
  // // height: 25px;
  // line-height: 25px;
  // display: flex;
  // flex-wrap: wrap;
  // align-items:center;
  // font-size: 12px;
  margin: 20px auto;
  .nav-item{
    // display: flex;
     // align-items:center;
     // min-width: 150px;
     // margin-left: 10px;
      font-size: 12px;

     
  }
  
  }

}
</style>

