<template>
  <div class="notice-wrapper">   
   <zs-tip :tiptext='tipName'></zs-tip>
    <nav style="display:flex">     
  

        <div class="nav-item" style='width:220px'>
              <label for="id">ID查询</label>
              <el-input v-model="search.id" size="small" placeholder="id"></el-input>
             
        </div>  
    <div class="nav-item">
     <el-button type="primary" class='btn-search-s' @click="queryLists">查询</el-button>
     </div>
     <div class='nav-item'>
     <el-button type="primary" class='btn-search-s' @click="addNoticeMange">添加跑马灯</el-button>
     </div>
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" highlight-current-row row-class-name="cell-style" >
       
        <el-table-column prop="id" label="跑马灯ID" width="80">
        </el-table-column>
         
         <el-table-column prop="xbulletinType" label="跑马灯类型" width="120">
        </el-table-column>
    
         <el-table-column prop="xstartTime" label="播放起始时间" width="160">
        </el-table-column>
         <el-table-column prop="xendTime" label="播放结束时间" width="160">
        </el-table-column>
        <el-table-column prop="contents" label="跑马灯文本" min-width="150">
         <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:150px'>{{ scope.row.contents }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.contents }}
                </div>
              </el-popover>
            </template>
        </el-table-column>
        <el-table-column prop="xisDisplay" label="是否显示" >
        </el-table-column>
         <el-table-column prop="xaddtime" label="创建时间" min-width="120">
          </el-table-column>
         <el-table-column prop="xupdtime" label="修改时间" min-width="120">
        </el-table-column>
         <el-table-column prop="adminName" label="操作人"width="120" >
        </el-table-column>
         <el-table-column label="操作" width="220">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="editOperation(scope.$index,scope.row)">编辑</el-button>
  <el-button size="small"  type="primary" @click="sendOperation(scope.$index,scope.row)">手动推送</el-button>
           <el-button size="small"  type="primary" @click="deleteOperation(scope.$index,scope.row)">删除</el-button>

            </template>
          </el-table-column>
       
        
         
      </el-table>
<!-- table -->
<!--   //添加公告 -->
    <el-dialog :title="form.id?'编辑跑马灯':'添加跑马灯'" v-model="dialogNotice" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form" :rules="rules" label-width="100px">
          <el-form-item label="跑马灯类型">
            <el-col :span="16">
           <el-select v-model="form.bulletinType" placeholder="请选择"  size="small" >
             
                <el-option
                  v-for="item in bulletinTypes"
                  :label="item.label"
                  :key="item.label"

                  :value="item.value">
                </el-option>
              </el-select>
        </el-col>
        </el-form-item>
         <el-form-item label="跑马灯标题" prop="bulletionTitle">
            <el-col :span="16">
                  <el-input type="text" v-model="form.bulletionTitle"></el-input>
                  </el-col>
          </el-form-item>
                <el-form-item label="播放起始时间">
                  <el-col :span="16">
               
                    <el-date-picker type="datetime"  placeholder="选择日期"  @change="changStartTime" v-model="form.startTime" style="width: 100%;"></el-date-picker>
                 
                  </el-col>
                </el-form-item>
                <el-form-item label="播放结束时间" >
                  <el-col :span="16">
                    <el-date-picker type="datetime" placeholder="选择日期"  @change="changendTime" v-model="form.endTime" style="width: 100%;"></el-date-picker>
                  </el-col>
                </el-form-item>
               
               
                <el-form-item label="播放时间间隔" >
                 <el-col :span="16">
                    <el-input  v-model="form.playTime" placeholder="单位为秒" type="number" ></el-input>
                     </el-col>
                  </el-form-item>
                 
              </el-form-item>
                               
              
                <el-form-item label="跑马灯内容" prop="contents">
                    <el-input type="textarea" v-model="form.contents"></el-input>
                  </el-form-item>

                <el-form-item label="是否显示" >
                 <el-col :span="16">
                 <el-radio-group v-model="form.isDisplay">
                     <el-radio :label="1">显示</el-radio>
                      <el-radio :label="0">不显示</el-radio>
                    </el-radio-group>
                     </el-col>
                  </el-form-item>
               
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="submitForm('form')">确定</el-button>
       <el-button type="primary" @click="cancelFun">取消</el-button>
    
       
      </span>
    </el-dialog>
<!--   //添加公告 -->
<!--   //删除操作 -->
    <el-dialog title="删除提示" v-model="dialogDelete" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        删除将无法恢复,是否确定删除?
           
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="confirmDeleteFun">确定</el-button>
    
        <el-button type="primary" @click="cancelDeleteFun">取消</el-button>
      </span>
    </el-dialog>
<!--   //删除操作 -->
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
         tipName:'跑马灯',
          dialogNotice:false,//添加公告
         
          dialogDelete:false,//删除dialog
          row:null,//删除编辑时传递item
          search:{
          
             id:'',
          },
            bulletinTypes: [
                   {
                  value: '2',
                  label: '系统紧急公告跑马灯'
                  }, 
              
                   {
                   value: '1',
                   label: '游戏系统公告'
                  }],   
          
          
         tableData: null,
          // id:'',//公告ID
           // id:"",//修改公告id临时参数
          pagtotal:0,
          pageNo:1,
          //表单
          form: {
            bulletinType:'1',
           id:'',
            startTime: '',
            endTime: '',
            playTime:1,
            bulletionTitle:'',
            isDisplay:1,
            contents:'',
          },
          rules:{
             startTime: [{ type: 'date', required: true, message: '请选择播放起始日期', trigger: 'blur' }],
              endTime: [{ type: 'date', required: true, message: '请选择播放结束时间日期', trigger: 'blur' }],
          
             contents: [{ required: true,type:'string', message: '请填写公告', trigger: 'blur' }],
              
          },
          //表单
        
        }
      },
      methods:{
        queryLists(){//查询table
           

             let option = {}
             Object.assign(option,this.search)
              option.pageNo = this.pageNo
           this.API.ApiqueryAnnouncement(option).then((res)=>{
             this.pagtotal = res.data.total
           
                res.data.rows.forEach((item)=>{
                 Object.assign(item,item.gameAnnouncement) 
                let contrast  = item.bulletinType
                 item.xbulletinType = contrast==1?'游戏系统公告':contrast==2?'系统紧急公告跑马灯':''
                  contrast = item.isDisplay
                  item.xisDisplay = contrast==1?'显示':contrast==0?'不显示':''
                item.xstartTime = item.startTime?dateUtil.format(item.startTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xendTime = item.endTime?dateUtil.format(item.endTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xaddtime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                item.xupdtime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''

                 
            })
              this.tableData = res.data.rows


           },(res)=>{})
         },
        
         addNoticeMange(){
          let vm =this
            this.form.id='' 
            try{
               vm.resetForm('form');

            }catch(e){

            }
           
           this.dialogNotice = true
         },
         editOperation(index,row){//编辑
       
          this.dialogNotice = true
         
          Object.assign(this.form,row)

         this.form.startTime = row.xstartTime
          this.form.endTime = row.xendTime
            this.form.bulletinType = this.form.bulletinType.toString()
         },
         sendOperation(index,row){
           let option = {}
          option.id = row.id
         
           this.$confirm('您要推送该跑马灯, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.API.ApipushBulletin(option).then((res)=>{
                    this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {

                      this.queryLists()
                    }
                })
                
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
              })


         },
          deleteOperation(index,row){//删除
              this.row = row 
             this.dialogDelete = true
        },
         handleCurrentChange(val){
            this.pageNo = val
            this.queryLists()
            this.pageNo = 1
         },
        cancelFun(){//取消
          this.dialogNotice = false

        },
        changendTime(val){
           this.form.endTime = val
          if (this.form.startTime>val) {
              this.$message(`播放结束时间必须大于播放起始时间`)
              this.form.endTime = " "
          }
          
        },
        changStartTime(val){
         
          this.form.startTime = val
        },
       
        submitForm(formName){//b
           this.$refs[formName].validate((valid) => {
              if (valid) {
               this.confirmFun()
              } else {
                
                return false;
              }
            });
        },
     
        confirmFun(){//确定添加公告/修改
          let option = {}
     
          
           Object.assign(option,this.form)
         
          this.API.ApisaveAnnouncement(option).then((res)=>{
            if (res.data.retcode==1) {
              this.queryLists()
              this.dialogNotice = false
              this.resetForm("form")
               this.$message(`${res.data.retmsg}`)
            }
          },(res)=>{})
        },
        confirmDeleteFun(){//删除确定
          let option = {}
           option.ids = this.row.id 
          this.API.ApideleteAnnouncement(option).then((res)=>{
            if (res.data.retcode==1) {
                 this.dialogDelete = false
                  this.queryLists()
            }
             this.$message(`${res.data.retmsg}`)
          })
           
        },
        cancelDeleteFun(){//删除取消
            this.dialogDelete = false
        },
         resetForm(formName) {

        this.$refs[formName].resetFields();
        Object.assign(this.form, this.$options.data().form)
      }
         
      },
    


} 
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
@import "~style/common.scss";
.notice-wrapper{
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
  .el-button {
    height: 25px;
    line-height: 25px;
    margin-left: 10px;
    span{
      font-size: 12px;
    }
    padding: 0px 10px;
  }
  .cell .el-button--primary{
    margin-top: 10px;
    margin-bottom: 10px;
  }
 

}
</style>

