<template>
  <div class="freezeMange-wrapper">         
    <el-row :gutter="10">
      <el-col :xs="9" :sm="8" :md="7" :lg="5" >
        <div class="nav-item">
              <label >用户ID:</label>
              <el-input v-model="userID" size="small" placeholder="用户ID"></el-input>
             
        </div>  
      </el-col>
       <el-col :xs="16" :sm="12" :md="9" :lg="5" >
          <div class="nav-item">
              <label >昵称:</label>
              <el-input v-model="nickName" size="small" placeholder="昵称"></el-input>
        </div>  
        </el-col>
       <el-col :xs="16" :sm="12" :md="9" :lg="5" >
          <div class="nav-item">
              <label >手机号:</label>
              <el-input v-model="mobile" :maxlength=11 size="small" placeholder="手机号"></el-input>
        </div> 
        </el-col>
       <el-col :xs="16" :sm="12" :md="9" :lg="5" > 
        <div class="nav-item">
            <label >用户状态:</label>
            <el-select v-model="sealStatu" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in sealStatus"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
        </el-col>
       <el-col :xs="6" :sm="4" :md="3" :lg="2" >
       
        <div class="nav-item">
            <el-button size="small"  type="primary" @click="queryGameUserSealList">查询</el-button>
      </div> 
        
      
   </el-col>
   </el-row>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"  highlight-current-row row-class-name="cell-style" style="width:100%">
        <el-table-column align="center" prop="gameUserid" label="用户ID" width="120">
        </el-table-column>
         <el-table-column align="center" prop="nickname" label="昵称" width="120">
        </el-table-column>
         <el-table-column align="center" prop="mobile" label="手机号" width="150">
        </el-table-column>
         <el-table-column align="center" prop="xsealStatus" label="用户状态" width="120">
        </el-table-column>
         <el-table-column align="center" label="操作" width="120">
          <template scope="scope">
          <el-button size="small"  type="primary" @click="handleGag(scope.$index,scope.row)">{{scope.row.sealStatus=='1'?'封号':'解封'}}</el-button>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="xsealTime" label="上次禁言时间" nin-width="120">
          </el-table-column>
         <el-table-column align="center" prop="xsealDeadline" label="封号期限" min-width="120">
          </el-table-column>
         <el-table-column align="center"  prop="ausername" label="操作人" >
         </el-table-column>
      </el-table>
<!-- table -->
<!--   //禁言用户操作 -->
    <el-dialog title="封号操作提示" v-model="dialogGag" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
          <div class="input-item">
            <label class="inputname">用户ID</label>
            <el-input v-model="xuserName"  size="small" placeholder="请输入用户名,4-20个字符"></el-input>
          </div>
           <div class="input-item">
            <label class="subtitle">封号期限：</label>
            <el-select v-model="sealDeadline" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in sealDeadlines"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
          </div>
           
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="confirmFun">确定</el-button>
    
        <el-button type="primary" @click="cancelFun">取消</el-button>
      </span>
    </el-dialog>
<!--   //禁言用户操作 -->
<!--   //解封操作 -->
    <el-dialog title="解封操作提示" v-model="dialogUnGag" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        {{ `确定要对${xuserName}用户进行解封操作,解封后该用户可重新发言聊天`}}
           
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="confirmUngag">确定</el-button>
    
        <el-button type="primary" @click="cancelFun">取消</el-button>
      </span>
    </el-dialog>
<!--   //解封操作 -->
 <!--  //分页 -->

         <zspagination :total = pagtotal :pagesize="10" @click="handleCurrentChange"></zspagination>
     <!-- 分页 -->
  </div>
</template>

<script>

import {dateUtil} from '@/utils'


export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
          vm.queryGameUserSealList()
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
        
          pagtotal:0,//总页数
           sealStatus: [{
                  value: '1',
                  label: '正常'
                  }, 
                 {
                   value: '2',
                   label: '封号'
                  }],
        sealDeadlines:[
          {
            value:'1',
            label:'一天'
          },
          {
            value:'2',
            label:'七天'
          },
          {
            value:'3',
            label:'永久'
          },
        ],
         tableData: null,
         sealDeadline:'1',
            value:"",
          pageNo:1,//页面
          userID:'',//用户id
          nickName:"",//昵称
          mobile:'',//手机号
          sealStatu:'1',//状态
          xuserName:'',//封号解封用户id
          sealid:"",//封号id
          dialogGag:false,//
          dialogUnGag:false,//
        }
      },
      methods:{
         queryGameUserSealList(){
          let option = {}
          option.pageNo = this.pageNo
          option.id = this.userID
          option.nickname = this.nickName
          option.mobile = this.mobile
           this.API.ApiqueryGameUserSealList(option).then((res)=>{
            this.pagtotal = res.data.total
           
            res.data.rows.forEach((item)=>{
              item.xsealStatus = item.sealStatus==1?"正常":"封号"
              switch(item.sealDeadline){
                  case 1:
                  item.xsealDeadline = "一天"
                  break;
                   case 2:
                    item.xsealDeadline = "七天"
                  break;
                   case 3:
                    item.xsealDeadline = "永久"
                  break;
                  default:
              }

              item.xsealTime = item.sealTime?dateUtil.format(item.sealTime,'yyyy-MM-dd hh:mm:ss'):''

                 
            })
              this.tableData = res.data.rows
           },(res)=>{})
         },
         
         handleCurrentChange(val){
              this.pageON = val
              this.queryGameUserSealList()
                this.pageNo = 1
         },
         handleGag(index,row){//禁言
             this.xuserName = row.gameUserid
             this.sealid = row.sealid
             this.index = index
          if (row.sealStatus=="1") {//准备禁言
               
                this.dialogGag = true 
          }else{//准备解禁
                  this.dialogUnGag = true

          }

         },
          confirmFun(){//封号确定
            let option = {}
            option.gameUserid = this.xuserName
            option.sealDeadline = this.sealDeadline
            this.API.ApigameUserSeal(option).then((res)=>{
              if (res.data.retcode==1) {
               
                 this.tableData[this.index].xsealStatus = "封号"
                  this.tableData[this.index].sealStatus =2
              }
               this.$message(`${res.data.retmsg}`)
               this.dialogGag = false 
            })

         },
         cancelFun(){
          this.xuserName = 0
          this.sealid = 0
          this.dialogGag = false 
          this.dialogUnGag = false
         },
         confirmUngag(){//禁言解封
               let option = {}
            option.gameUserid = this.xuserName
            option.id =  this.sealid
            this.API.ApiupdateGameUserSeal(option).then((res)=>{
               if (res.data.retcode==1) {
               
                 this.tableData[this.index].xsealStatus = "正常"
                  this.tableData[this.index].sealStatus =1
              }
               // this.$message(`${res.data.retmsg}`)
               // this.dialogGag = false 
              this.$message(`${res.data.retmsg}`)
               this.dialogUnGag = false
            })
         },
        
        
         
      },
     


} 
</script>

<style lang="scss" scoped>
@import "~style/common.scss";
.freezeMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
     .nav-item{
    label{
      width: 60px;
    }
  }

   
  // .nav-item{
  //   display: flex;
  //    align-items:center;
  //    min-width: 150px;
  //    margin-left: 10px;
  //     font-size: 12px;

     

  //       .form-control{
  //         width: 100px;
  //         // margin-left: 10px;
  //         height: 25px;
  //       }
       
       
  //       .el-input--small{
  //         height: 25px;
  //         width: 120px;
  //       }
  //       .el-input__inner{
  //         height: 25px;
  //       } 

  // }
  
  
   .el-dialog__footer{
      text-align: center;
    }
      .input-item{
       height: 30px;
       display: flex;
       justify-content: center;
       margin:20px auto;
     
        .inputname{
          height: 30px;
          width: 60px;
          line-height: 30px;
          font-size: 12px;
         
        }
        .el-input{
          // float: left;
          width: 180px;
         
        }

    }

}
</style>

