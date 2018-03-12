<template>
  <div class="channel-wrapper">
    <zs-tip :tiptext='tipName'></zs-tip>
     <nav>  
    
       
          <div class="nav-item" style="display:inline-block">
            <label class="subtitle">渠道</label>
            <el-select  v-model="serachform.channel" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
         <div class="nav-item" style="display:inline-block">
            <label class="subtitle">数量</label>
              <el-input type='number' style='width:160px' v-model="serachform.count" size="small" placeholder="不超过50000"></el-input>
            
        </div>
        <div class="nav-item" style="display:inline-block">
            <label class="subtitle">限制使用次数</label>
              <el-input type='number' style='width:160px' v-model="serachform.limitTimes" size="small" placeholder="数量"></el-input>
            
        </div>
         <div class="nav-item" style="display:inline-block">
        <label >有效时间</label>
         <el-date-picker
              v-model="serachform.validTime"
              type="datetime"
              :editable='false'
              @change="changTime" 
              size="small"
              placeholder="不选为永久有效">
            </el-date-picker>  
            </div>
            <br>
         <div class="nav-item"  style="display:inline-block">    
         <el-button size="small"  type="primary" class='btn-search-s' @click='makeUpExchange'>生成兑换码</el-button>
         </div>
     
     
    </nav>
    <!-- 导航栏 -->
 
           

<!-- 上导航栏 -->

  
     <el-table :data="tableData"   highlight-current-row row-class-name="cell-style" style="width: 100%">
       <el-table-column prop="id" label="id" min-width="100">
        </el-table-column>
         <el-table-column prop="channel" label="渠道" min-width="100">
        </el-table-column>
        <el-table-column prop="count" label="数量" min-width="200">
        </el-table-column>
         <el-table-column prop="xaddtime" label="添加时间" min-width="200">
        </el-table-column>
          <el-table-column prop="limitTimes" label="限制使用次数" min-width="200">
        </el-table-column>
          <el-table-column prop="validTime" label="有效时间" min-width="200">
        </el-table-column>
       <el-table-column prop="name" label="操作" min-width="250">
          <template scope="scope">
             <el-button size="small"  type="primary" @click="handClickExcel(scope.$index, scope.row)">导出Excel</el-button>  
              <el-button size="small"  type="primary" @click="handClickSQL(scope.$index, scope.row)">导出SQL</el-button>  
             
      </template>
       </el-table-column>
    

        
      </el-table>

   
        <zspagination :total = total :pagesize="15" @click="handleCurrentChange"></zspagination>
 
<!--   //添加用户 -->

<!--   //添加用户 -->

  </div>
</template>

<script>
import { hsdateUtil } from '@/utils'
import myMixin from '@/mixin/mixinchannel'



export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
             
              vm.queryLists()
            
             
             
           next()
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

        total:0,
        pageNo:1,
        serachform:{
            channel:'',
            count:100,
            limitTimes:100,
            validTime:'',
        },
        tipName:"兑换码管理",
        counts:[
        { value:1000,
          label:1000
        },
        { value:10000,
          label:10000
        },
        { value:100000,
          label:100000
        },{value:1000000,
          label:1000000
        },
        { value:10000000,
          label:10000000
        },
       ],
       channels:[],
        form:{
            channelName:"",
          },
        dialogChannel:false,
        tableData:null,
          
 //表单验证
          rules: {
          channelName: [
            { required: true, message: '请输入渠道名', trigger: 'blur' },
            
          ],
         
        
        
          
        },
          //表单验证
        
        }
      },
        mixins: [myMixin],
      methods:{
         changTime(val){
        
            this.serachform.validTime = val
     
    },
        handClickExcel(index,row){

        var url =`gameOperation/redeem/downloadRemeedCodeFile?id=${row.id}&type=1`
        var fileName = `download${row.channel}.xlsx`;
        var form = $("<form></form>").attr("action", url).attr("method", "post");
        form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
        form.appendTo('body').submit().remove();
           // let hf =  document.createElement('a')
           // hf.href = `TitanGameCMS/gameOperation/redeem/downloadRemeedCodeFile?id=${row.id}&type=1`;
           // hf.target ='_blank'
           // hf.click(); //

        },
        handClickSQL(index,row){
            var url =`gameOperation/redeem/downloadRemeedCodeFile?id=${row.id}&type=2`
        var fileName = `download${row.channel}.sql`;
        var form = $("<form></form>").attr("action", url).attr("method", "post");
        form.append($("<input></input>").attr("type", "hidden").attr("name", "fileName").attr("value", fileName));
        form.appendTo('body').submit().remove();
           // let hf =  document.createElement('a')
           // hf.href = `TitanGameCMS/gameOperation/redeem/downloadRemeedCodeFile?id=${row.id}&type=0`;
           //  hf.target ='_blank'
           // hf.click(); //

        },
        // queryChaneel(){//查询渠道
        //   let vm = this,option = {};
        //      this.channelsx = []
        //   this.API.ApiquerycChannelList(option).then((res)=>{
        //    res.data.data.forEach((item)=>{
        //       let itemx = {} ;
        //       itemx.value = item.channel
        //       itemx.label = item.channelName
        //       this.channelsx.push(itemx)

        //     })

        //   })

        // },
         addChannel(){
          this.dialogChannel = true
         },
         makeUpExchange(){
          let vm= this ,option = {};
          Object.assign(option,this.serachform)
          console.log(option)
          if (!option.channel) {
             this.$message(`渠道不能为空`)
             return 
          }
          if (!option.limitTimes&&option.limitTimes==0) {
             this.$message(`限制使用次数不能为空`)
             return 
          }
           if (!option.count&&option.count==0) {
             this.$message(`数量不能为空`)
             return 
          }
           if (option.count > 50000) {
              this.serachform.count= 0
             this.$message(`数量不能大于50000`)
             return 
          }
          this.API.ApigenerateCode(option).then((res)=>{
               this.$message(`${res.data.retmsg}`)
               this.queryLists()
          })


         },
          queryLists(){//获取兑换码记录
            let vm = this,
              option = {} ;
            option.pageNo = this.pageNo;
            option.pageSize = 15
          this.API.ApiqueryRemeedList(option).then((res)=>{
            if (res.data.rows.length>0) {
              res.data.rows.forEach((item)=>{
                item.xaddtime = hsdateUtil(item.generateTime)
                item.validTime = hsdateUtil(item.validTime)
              })
              vm.tableData = res.data.rows
              vm.total = res.data.total
           
            }
               

          },(res)=>{

          })

         

          },
       
          handleCurrentChange(val) {

            this.pageNo = val
            this.queryLists()
            this.pageNo = 1
           
          },
          ensureAtion(index,row){//表单确认
            let option = {};
            Object.assign(option,this.form)
           
            this.API.ApiquerysaveChannel(option).then((res)=>{
                this.$message(`${res.data.retmsg}`)
                this.resetForm('form')
                this.queryLists()
            })
           
          },
         
         
         deleteAction(index,row){
              let vm = this
             
              this.$confirm(`确定要删除该渠道?`, '删除提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                  let option = {
                    id :row.id,                 
                  }
                vm.API.ApiquerydeleteChannel(option).then((res)=>{
                   this.$message(`${res.data.retmsg}`)
                    if (res.data.retcode==1) {
                           this.queryLists()                       
                         }
                },(res)=>{})   
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '取消操作'
                });          
              });
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
         
          resetForm(formName) {//表单重置
            this.$refs[formName].resetFields();
            this.dialogChannel=false
      },
      },
    


} 
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
@import "~style/common.scss";
.channel-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
  .nav-item{
    margin-right: 20px;
  }

 
.el-dialog__footer{
  text-align: center;
}


}
</style>

