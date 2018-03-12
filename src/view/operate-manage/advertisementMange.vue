<template>
  <div class="advertMange-wrapper">
   <zs-tip :tiptext='tipName'></zs-tip>

  <nav>     
        <div class="nav-item">
             <el-button type="primary" class='btn-search-s'  size="small" @click="dialogAddpage=true,form.id=''">添加页面</el-button>
             <!--   <el-button type="primary" size="small" @click="deleteAction">删除</el-button> -->
        </div>        
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" highlight-current-row row-class-name="cell-style" style="width:860px">
        <el-table-column prop="id" label="页面ID" width="120">
        </el-table-column>
         <el-table-column prop="xtype" label="显示类型" width="120">
        </el-table-column>
         <el-table-column prop="addtime" label="创建时间" min-width="120">
        </el-table-column>
         <el-table-column prop="updtime" label="修改时间" min-width="120">
        </el-table-column>
           <el-table-column prop="adminName" label="操作人"width="120" >
        </el-table-column>
         <el-table-column label="操作" >
          <template scope="scope">
          <el-button size="small"  type="primary" @click="handleGag(scope.$index,scope.row)">编辑</el-button>
           <el-button size="small"  type="primary" @click="deleteAction(scope.$index,scope.row)">删除</el-button>
            </template>
          </el-table-column>    
      </el-table>
<!-- table -->

<!--   //添加签到奖励 -->
    <el-dialog :title="form.id?'编辑页面':'添加页面'" v-model="dialogAddpage" size="mini" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form ref="form"  :model="form"  label-width="100px">
         <!--  <el-form-item label="页面id" >
            <el-col :span="14">
                <el-input type="number" v-model="form.id" placeholder="请输入页面id"></el-input>
                </el-col>
              </el-form-item> -->
            <el-form-item label="页面显示类型">
              <el-col :span="24">
                <el-radio-group v-model="form.layout">
                    <el-radio label="1">一条</el-radio>
                    <el-radio label="2">二条</el-radio>
                    <el-radio label="3">三条</el-radio>
                    <el-radio label="4">四条</el-radio>
                </el-radio-group>
                </el-col>
              </el-form-item>
               <el-form-item label="页面状态">
                 <el-col :span="16">
              <el-select v-model="form.displayId" placeholder="请选择活动区域">
                <el-option label="显示" value="1"></el-option>
                <el-option label="不显示" value="2"></el-option>
              </el-select>
              </el-col>
            </el-form-item>
        
         

          
              
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button type="primary" @click="dialogAddpage=false">取消</el-button>
       
      </span>
    </el-dialog>
<!--   //添加签到奖励 -->
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
      name:"freezeMange",
      data(){

        return {
         tableData:null,
         tipName:'广告界面管理',
         id:'',
          dialogAddpage:false,
            //表单
          form: {
            id:'',
           layout:"1", 
           displayId:'1',
          },
          //表单
          
        }
      },
      methods:{
         queryLists(){
          let option = {}
            this.API.ApiqueryUi(option).then((res)=>{

                res.data.rows.forEach((item)=>{
               
                let contrast  = item.type
                item.xtype = `${item.layout}条显示`
                item.addtime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                item.updtime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''

                 
            })
              this.tableData = res.data.rows

            })
          
         },
          deleteAction(index,row){
          let option ={
            id:row.id,
          

          }

                this.$confirm('删除提示, 是否删除?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.API.ApiAdvertdeleteAdvertById(option).then((res)=>{
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
                });

        },
         handleGag(index,row){
         
            this.form.displayId = row.displayId.toString()
             this.form.layout = row.layout.toString()
            this.form.id = row.id
            this.dialogAddpage = true
         },//封禁/解封
        
         handleCurrentChange(){

         },
          submitForm() {//表单确定
            let option = {}
            option.layout = this.form.layout
            option.id = this.form.id
            option.displayId = this.form.displayId
            let vm = this

     

                      if (vm.tableData&&vm.tableData.length>=4&&!vm.form.id) {
                         this.$message(`创建页面过多`)
                         return 
                      }
                     this.API.ApisaveUi(option).then((res)=>{
                     if (res.data.retcode==1) {
                          this.queryLists()
                     }
                      this.$message(`${res.data.retmsg}`)

                 })

            
            
            this.dialogAddpage = false
           
      },
      
        
         
      },
 

} 
</script>

<style lang="scss">
@import "~style/color.scss";
.advertMange-wrapper{
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

