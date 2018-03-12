<template>
  <div >  
 <zs-tip :tiptext='tipName'></zs-tip>
 <nav>
   
         <div class="nav-item">
              <label>期号ID</label>
              <el-input  v-model="serachform.baseid" size="small" placeholder="期号ID"></el-input>
             
          </div> 
          
           <div class="nav-item">
            <label class="subtitle">发放类型</label>
            <el-select style="width:160px" v-model="serachform.created" placeholder="发放类型"  size="small" >
          
              <el-option
                v-for="item in createds"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
       
          <div class="nav-item">
              <label for="">邮件标题</label>
              <el-input  v-model="serachform.title" size="small" placeholder="邮件内容"></el-input>
        </div>  
        
          <div class="nav-item">
              <label for="">附件内容</label>
              <el-input  v-model="serachform.goodsName" size="small" placeholder="附件内容"></el-input>
        </div>  
        <br>
          <div class="nav-item">
              <label for="">商品Id</label>
              <el-input  v-model="serachform.attrValue" size="small" placeholder="商品Id"></el-input>
        </div>  
       
       <div class="nav-item">
              <label for="">玩家ID</label>
              <el-input  v-model="serachform.playerid" size="small" placeholder="玩家ID"></el-input>
          </div>  
           
       
           <div class="nav-item">
            <label>渠道</label>
            <el-select size="small"  style="width:160px" v-model="serachform.channel" placeholder="请选择"  >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>
       
     <br>
        <div class="nav-item">
         <label >时间</label>
                 <el-date-picker
                v-model="serachform.startTime"
                type="datetime"
                :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
        <div class="nav-item">
         <label class="date-label">至</label>
         <el-date-picker
                v-model="serachform.endTime"
                type="datetime"
                 :editable=false
                placeholder="选择日期时间">
              </el-date-picker>
        </div>
       
         <div class="nav-item">
         <el-button size="small" class='btn-search-s' type="primary" @click="queryLists">查询</el-button>
           <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
         </div>
     
        
     </nav>     

      

<!-- 上导航栏 -->
<!-- table -->
          
   <el-table :data="tableData"   align='left' highlight-current-row row-class-name="cell-style"  style="width: 100%">
       
      <!--   <el-table-column prop="xgameType" label="游戏类型" width="100">
        </el-table-column> -->
         
         <el-table-column prop="baseid" label="期号ID" >
        </el-table-column>
         <el-table-column  prop="created" label="发放类型" >
        </el-table-column>
         <el-table-column  prop="title" label="邮件标题" min-width="120">
          <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:200px'>{{ scope.row.title }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.title }}
                </div>
              </el-popover>
            </template>
        </el-table-column>
        <!--  <el-table-column prop="goodsName" label="附件内容" min-width="150">
        </el-table-column> -->
         <el-table-column
            label="附件内容"
           min-width="150">
            <template scope="scope">
              <el-popover trigger="hover" placement="top">
                <p style='max-width:200px'>{{ scope.row.goodsName }}</p>
                <div slot="reference" class="name-wrapper" style='text-overflow:ellipsis; white-space:nowrap; overflow:hidden;'>
                 {{  scope.row.goodsName }}
                </div>
              </el-popover>
            </template>
          </el-table-column>
         <el-table-column  prop="attrValue" label="商品ID"  >
        </el-table-column>
          <el-table-column  prop="playerid" label="玩家ID"  >
        </el-table-column>
          <el-table-column  prop="nickname" label="昵称"  >
        </el-table-column>
          <el-table-column  prop="channel" label="渠道" >
        </el-table-column>
         <el-table-column  prop="exchangeCode" label="兑换码" min-width="140">
          </el-table-column>
         <el-table-column  prop="times" label="创建时间" min-width="140">
          </el-table-column>
           <el-table-column  prop="emailStatus" label="状态" >
        </el-table-column>
       
       
      </el-table>



    <zspagination :total = total :pagesize="20" @click="handleCurrentChange"></zspagination>
   
   
  </div>
</template>

<script>
import {dateUtil,hsdateUtil} from '@/utils'
import myMixin from '@/mixin/mixinchannel'

export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
         // vm.queryLists()
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
        
           channels:[],
          allTime:'',
          tipName:'系统邮件',
          serachform:{
            channel:'',
            baseid:'',
            created:'',
            title:'',
            goodsName:'',
            attrValue:'',
            playerid:'',
        startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
         endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),
          },
          accessoryType:'',
          statusTypes:[{
                  value: '',
                  label: '所有'
                  },{
                  value: '0',
                  label: '未兑换'
                  }, 
                 {
                   value: '1',
                   label: '未确认地址'
                  },
                  {
                   value: '2',
                   label: '未发货'
                  },
                   {
                   value: '3',
                   label: '已发货'
                  },
                   {
                   value: '4',
                   label: '已签收'
                  }],
          createds: [
                  {
                  value: '',
                  label: '所有'
                  }, 
                   {
                  value: '夺宝赛',
                  label: '夺宝赛'
                  }, 
                {
                   value: '锦标赛',
                   label: '锦标赛'
                  },
                   ],         
          
         tableData: null,
       
          total:0,
          pageNo:1,
        
          
        
         
        }
      },
        mixins: [myMixin],
      methods:{
         beginDownExcl(title){
           let keytitle  = {
            baseid:'期号ID',
            created:'发放类型',
            title:'邮件标题',
            goodsName:'附件内容',
            attrValue:'商品ID',
            playerid:'玩家ID',
             nickname:'昵称',
            channel:'渠道',
             exchangeCode:'兑换码',
             times:'创建时间',
            emailStatus:'状态'

           } ,vm = this ; 
         title = title||'表格'    
          this.exportLists('ApiquerySystemEmailList').then((res)=>{
              if (vm.validateExportData(res)) { return }
              this.dataHanding(res.data)
              this.downloadExl([keytitle,...res.data.rows],title)
           })
          
      

    },
       dataHanding(data){
      let vm = this;
        data.rows.forEach(function(item){
          let index = item.emailStatus + 1 ;
              item.emailStatus = vm.statusTypes[index].label
             
          })
   },
         queryLists(){
         let option = {},vm = this;
         Object.assign(option,this.serachform)
        option.pageNo = this.pageNo
        option.pageSize = 20
      option.startTime = hsdateUtil(option.startTime)
      option.endTime = hsdateUtil(option.endTime)
         this.API.ApiquerySystemEmailList(option).then((res)=>{
          let data = res.data
            
                if (!data||!data.rows||data.rows.length==0) {
                        vm.tableData = []
                        vm.total = 0
                          vm.$message({
                            message: '数据结果为空',
                            type: 'warning'
                          });
                          return 
                   }
              this.dataHanding(data)
              this.total = data.total||0
         

               this.tableData = data.rows||[]

         })



         },
       
      

         handleCurrentChange(val){
          this.pageNo = val
          this.queryLists()
          this.pageNo = 1


         },
    
    
        
         
      },


} 
</script>

<style lang="scss" scoped>
@import "~style/common.scss";


    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
   .el-dialog__footer{
  text-align: center;
}


    .nav-item{
    label{
      width:60px;}
      .el-input.el-input--small{
        width: 160px;
      }
  }


</style>

