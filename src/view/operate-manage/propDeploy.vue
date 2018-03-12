<template>
  <div class="propDeploy-wrapper">
    
          <nav>
               <el-row :gutter="1">
                  <el-col :xs="12" :sm="9" :md="7" :lg="5"> 
              <div class="nav-item">
              <label>道具ID:</label>
              <el-input style="width:180px" v-model="searchBaseOption.pid" size="small" placeholder=""></el-input>
            </div> 
            </el-col> 
            <el-col :xs="12" :sm="9" :md="7" :lg="5"> 
            <div class="nav-item">
              <label>道具名称:</label>
              <el-input style="width:180px"  v-model="searchBaseOption.pname" size="small" placeholder=""></el-input> 
            </div> 
             </el-col> 
            <el-col :xs="12" :sm="9" :md="7" :lg="5"> 
              <div class="nav-item">
              <label>所属游戏:</label>
               <el-select v-model="searchBaseOption.gameType" placeholder="请选择所属游戏">
                              <el-option
                                      v-for="item in gameTypes"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
           
            </div> 
             </el-col> 
            <el-col :xs="12" :sm="9" :md="7" :lg="5">  
              <div class="nav-item">
              <label>道具品质:</label>
             
               <el-select style="width:180px" v-model="searchBaseOption.propGrade" placeholder="请选择道具品质">
                                 <el-option
                                      v-for="item in propGrades"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select> 
            </div> 
             </el-col> 
             </el-row>
             <el-row>
             <el-col :xs="12" :sm="9" :md="7" :lg="5">  
              <div class="nav-item">
              <label>道具类型:</label>
             
               <el-select style="width:180px" v-model="searchBaseOption.ptype" placeholder="请选择道具类型">
                                <el-option
                                      v-for="item in ptypes"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
            </div>  
             </el-col> 
             <el-col :xs="12" :sm="9" :md="7" :lg="5"> 
              <div class="nav-item">
              <label>使用限制:</label>
            
              <el-select style="width:180px" v-model="searchBaseOption.isAstrict" placeholder="请选择使用限制">
                                <el-option
                                      v-for="item in isAstricts"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
            </div> 
             </el-col> 
             </el-row> 
             <el-row>
             <el-col>
            <div class="nav-item">
              <label>创建时间</label>
              <el-date-picker
                  style="width:180px"
                  v-model="searchBaseOption.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                     @change="changStartTime"
                  >
                </el-date-picker>
            
              
               <span class="demonstration">至</span>
                <el-date-picker
                  style="width:180px"
                  v-model="searchBaseOption.endTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  align="right"
                    @change="changEndTime"
                  >
                </el-date-picker>
             
              </div> 
              </el-col>
              <el-col :xs="9" :sm="7" :md="5" :lg="3">
              <div class="nav-item">
                 <el-button size="small"  type="primary" @click="queryPropBaseList">查询</el-button> 
              </div>
              </el-col>
               <el-col :xs="9" :sm="7" :md="5" :lg="3">
              <div class="nav-item">
                 <el-button size="small"  type="primary" @click="dialogAddProp=true,form.pid=''">添加道具</el-button> 
              </div>
              </el-col>
              </el-row>
          </nav>
            <!-- table -->
               <el-table :data="tablepropbase" highlight-current-row row-class-name="cell-style" style="width: 100%">
                    <el-table-column prop="pid" label="道具ID">
                    </el-table-column>
                     
                     <el-table-column prop="pname" label="道具名称" >
                    </el-table-column>
                     <el-table-column prop="xgameType" label="道具所属游戏" >
                    </el-table-column>
                     <el-table-column prop="propGrade" label="道具品质" >
                    </el-table-column>
                      <el-table-column prop="xptype" label="道具类型" >
                    </el-table-column>
                      <el-table-column prop="xisDeposit" label="存入背包" >
                    </el-table-column>
                      <el-table-column prop="xaddTime" label="创建时间" min-width="120">
                    </el-table-column>
                      <el-table-column prop="xupdTime" label="修改时间" min-width="120">
                    </el-table-column>
                 
                    <el-table-column prop="adminName" label="操作人" width="120">
                    </el-table-column>
                     <el-table-column label="操作">
                      <template scope="scope">
                      <el-button size="small"  type="primary" @click="editorActionFist(scope.$index,scope.row)">编辑</el-button>
                      <el-button size="small"  type="primary" @click="deleteActionFirst(scope.$index,scope.row)">删除</el-button>
                        </template>
                      </el-table-column>   
                  </el-table>
            <!-- table -->
            <!--   //敏感字编辑 -->
    <el-dialog title="道具基础属性" v-model="dialogAddProp" size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="formBaseOption" :model="formBaseOption" :rules="rules" label-width="100px">
              <el-form-item label="道具名称" prop="pname">
                     <el-col :span="10">
                      <el-input v-model="formBaseOption.pname"  min="1"></el-input>
                      </el-col>
               </el-form-item>

                 <el-form-item label="道具ID" prop="pid">
                     <el-col :span="10">
                      <el-input v-model="formBaseOption.pid" type="number" min="1"></el-input>
                      </el-col>
               </el-form-item>
                  <el-form-item label="所属游戏" prop="gameType">
                      <el-select v-model="formBaseOption.gameType" placeholder="请选择所属游戏">
                              <el-option
                                      v-for="item in gameTypes"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
                  </el-form-item>
                    <el-form-item label="道具品质" prop="propGrade">
                      <el-select v-model="formBaseOption.propGrade" placeholder="请选择道具品质">
                                 <el-option
                                      v-for="item in propGrades"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
                  </el-form-item>
                    <el-form-item label="道具类型" prop="ptype">
                      <el-select v-model="formBaseOption.ptype" placeholder="请选择道具类型">
                                <el-option
                                      v-for="item in ptypes"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
                  </el-form-item>
                    <el-form-item label="存入背包" prop="isDeposit">
                      <el-select v-model="formBaseOption.isDeposit" placeholder="请选择存入背包">
                                  <el-option
                                      v-for="item in isDeposits"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
                  </el-form-item>
                    <el-form-item label="使用限制" prop="isAstrict">
                      <el-select v-model="formBaseOption.isAstrict" placeholder="请选择使用限制">
                                <el-option
                                      v-for="item in isAstricts"
                                      :key="item.value"
                                      :label="item.label"
                                      :value="item.value">
                                    </el-option>
                        </el-select>
                  </el-form-item>
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm('formBaseOption')">确定</el-button>
        <el-button type="primary" @click="resetForm('formBaseOption')">取消</el-button>
       
      </span>
    </el-dialog>
    <!--  //分页 -->
        <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
           <el-pagination
              @current-change="handleCurrentChangeBase"
              layout="total, prev, pager, next, jumper"
              :total="basepagtotal">
            </el-pagination>
       </div>
     <!-- 分页 -->
<!--   //敏感字编辑 -->
        
 


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
          tipName:"管理员",
           activeName: 'second',
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
          tablepropbase: null,
         tableData: null,
         pageNo:1,
         basepagtotal:1,
          searchBaseOption:{//道具基础配置查询参数1
            pid:'',
            gameType:'',
            propGrade:'',
            ptype:'',
            isAstrict:'',
            pname:'',
            startTime:'',
            endTime:'',
          },
          formBaseOption:{//道具基础配置form添加1
            pname:'',
            pid:'',
            gameType:'',
            propGrade:'',
            ptype:'',
            isAstrict:'',
            isDeposit:'',
          },
          gameTypes:[//平台
           {//平台
              value: '1',
              label: '全平台'
          },
          {//平台
              value: '2',
              label: '德州扑克'
          },
          ],
          propGrades:[{//道具品质
              value: '1',
              label: '1'
          },
          {//道具品质
              value: '2',
              label: '2'
          },
          {//道具品质
              value: '3',
              label: '3'
          },
          {//道具品质
              value: '4',
              label: '4'
          },
          {//道具品质
              value: '5',
              label: '5'
          }],
          ptypes:[{//道具类型
              value: '1',
              label: '资源'
          },
          {//道具类型
              value: '2',
              label: '实物商品'
          },
          {//道具类型
              value: '3',
              label: '普通道具'
          },
          {//道具类型
              value: '4',
              label: '礼包'
          }],
          isDeposits:[//是否存入背包
          {
            value:'1',
            label:'存入'
          },
          {
            value:'0',
            label:'不存入'
          }],
          isAstricts:[//使用限制
           {
            value:'1',
            label:'可使用'
          },
          {
            value:'0',
            label:'不可'
          }
          ],
          userName:'',//用户名
          nickName:"",//昵称
          iphone:'',//手机号
          timestart:'',
          timeend:'',
          dialogAddProp:false,
         
         
          //表单
          //表单验证
          rules: {
          pid: [
            { required: true, message: '请输入道具id', trigger: 'blur' },
           
          ],
           pname: [
            { required: true, message: '请输入道具名称', trigger: 'blur' },
           
          ],
           gameType: [
            { required: true, message: '请选择游戏类型', trigger: 'blur' },
           
          ],
         propGrade: [
            { required: true, message: '请选择道具品质', trigger: 'blur' },
           
          ],
         ptype: [
            { required: true, message: '请选择道具类型', trigger: 'blur' },
           
          ],
         isDeposit: [
            { required: true, message: '请选择是否存入背包', trigger: 'blur' },
           
          ],
         isAstrict: [
            { required: true, message: '请选择使用限制', trigger: 'blur' },
           
          ],
         
        },
          //表单验证
        }
      },
      methods:{
         changEndTime(val){
           this.searchBaseOption.endTime = val
          if (this.searchBaseOption.startTime>val) {
              this.$message(`结束时间必须大于起始时间`)
              this.searchBaseOption.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.searchBaseOption.startTime = val
        },
        queryPropBaseList(){//1道具基础属性配置列表查询
          let option = {}
           Object.assign(option,this.searchBaseOption)
           option.pageNo = this.pageNo
           this.API.ApipropQueryList(option).then((res)=>{
            this.basepagtotal = res.data.total
                res.data.rows.forEach((item)=>{
                  let contrast  = item.gameType
                    item.xaddTime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                    item.xupdTime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''
                      item.xgameType = contrast==1?"全平台":contrast==2?"德州扑克":''
                      contrast = item.isDeposit
                      item.xisDeposit = contrast==0?"不存入":contrast==1?"存入":''
                       contrast = item.isAstrict
                      item.xisAstrict = contrast==0?"不可":contrast==1?"可使用":''
                       contrast = item.ptype
                      item.xptype = contrast==1?"资源":contrast==2?"实物商品":contrast==3?"普通道具":contrast==4?"礼包":''


                })

                this.tablepropbase = res.data.rows

           })

        },
        editorActionFist(index,row){//1基础道具编辑
          this.dialogAddProp = true
          for(let key in row){
             row[key] = row[key].toString()
          }
           Object.assign(this.formBaseOption,row)


        },
        deleteActionFirst(index,row){
          let option = {}
          option.pids = row.pid
           this.$confirm('此操作将永久删除该配置且不可恢复, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApidelProp(option).then((res)=>{
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
        Object.assign(option,this.formBaseOption)

        this.API.ApisaveProp(option).then((res)=>{
               if (res.data.retcode==1) {
                this.dialogAddProp = false
                this.queryPropBaseList()
                 
                }

        })

      },
      resetForm(formName) {//表单重置
        this.$refs[formName].resetFields();
        this.dialogAddProp = false
       
      },
        
       
         handleCurrentChangeBase(val){
            this.pageNo = val
            this.queryPropBaseList()
            this.pageNo = 1
         },
       
         
      },



} 
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
@import "~style/common.scss";
.propDeploy-wrapper{
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
  // nav{
  // // height: 25px;
  // line-height: 25px;
  // display: flex;
  // flex-wrap: wrap;
  // align-items:center;
  // font-size: 12px;
  // margin: 20px auto;
  
  .demonstration{
    color:#666;
  }
  
  // }
  .nav-item{
    label{
      width: 60px;
    }

  }

}
</style>

