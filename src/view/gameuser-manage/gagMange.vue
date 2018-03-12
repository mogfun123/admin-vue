<template>
	<div class="gagMange-wrapper">
  <zs-tip :tiptext='tipName'></zs-tip>
       <nav>

        <div class="nav-item">
              <label for="userName">用户ID</label>
              <el-input v-model="searchform.playerId" size="small" placeholder="用户ID"></el-input>

        </div>

          <div class="nav-item">
              <label for="nickName">昵称</label>
              <el-input v-model="searchform.nickName" size="small" placeholder="昵称"></el-input>
        </div>

          <div class="nav-item">
              <label for="iphone">账号</label>
              <el-input v-model="searchform.account" :maxlength=11 size="small" placeholder="账号"></el-input>
        </div>

        <div class="nav-item">
            <label >操作</label>
            <el-select v-model="searchform.operateType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in operateTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>
       <br>
        <div class="nav-item">
            <el-button size="small" type="primary" class='btn-search-s'  @click="queryGameUserList">查询</el-button>
       </div>


   </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData"
          highlight-current-row
           align='left'
          row-class-name="cell-style" style="width: 100%">
        <el-table-column   prop="id" label="ID" >
        </el-table-column>

        <el-table-column   prop="playerId" label="用户ID" >
        </el-table-column>

         <el-table-column  prop="nickName" label="昵称" >
        </el-table-column>
          <el-table-column  prop="account" label="账号"  min-width="100">
        </el-table-column>
         <el-table-column  prop="blockTime" label="封禁时间" min-width="120">
        </el-table-column>
        <el-table-column  prop="createTime" label="创建时间"  min-width="130">
        </el-table-column>
         <el-table-column  label="操作" prop='operateType'>
          </el-table-column>
       <el-table-column  label="备注" prop='operateNote'>
       </el-table-column>
           <el-table-column  label="操作状态" prop='operateStatus'>
          </el-table-column>
         <el-table-column  prop="addBy" label="操作人" >
        </el-table-column>

      </el-table>
<!-- table -->
<!--   //禁言用户操作 -->
    <el-dialog title="禁言操作提示" v-model="dialogGag" size="tiny" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
          <div class="input-item">
            <label class="inputname">用户ID</label>
            <el-input v-model="xuserName"  size="small" placeholder="请输入用户名,4-20个字符"></el-input>
          </div>
           <div class="input-item">
            <label class="subtitle">禁言期限：</label>
            <el-select v-model="gagTime" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in gagOptions"
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
     <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="total, prev, pager, next, jumper"
            :total="total">
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
//vm.queryGameUserList()
  			})
  		},
   	beforeRouteUpdate (to, from, next) {
        next()
  		},
  	beforeRouteLeave (to, from, next) {
      next()
  		},
      name:"gagMange",
  		data(){

  			return {
  				tipName:"用户操作记录",
           options: [{
                  value: '选项1',
                  label: '禁用'
                  },
                 {
                   value: '选项2',
                   label: '正常'
                  }],
          gagOptions: [{
                  value: '1',
                  label: '一天'
                  },
                 {
                   value: '2',
                   label: '七天'
                  },
                   {
                   value: '3',
                   label: '永久'
                  }
                  ],
          operateTypes:[
          {
            value:'',
            label:"所有"
          },
           {
            value:'踢人',
            label:"踢人"
          },
           {
            value:'封号',
            label:"封号"
          },
           {
            value:'解除封号',
            label:"解除封号"
          },
           {
            value:'禁言',
            label:"禁言"
          },
           {
            value:'解除禁言',
            label:"解除禁言"
          },
           {
            value:'删除玩家',
            label:"删除玩家"
          },
           {
            value:'恢复玩家',
            label:"恢复玩家"
          }],
          value:"",
          searchform:{
            playerId:"",
            nickName:'',
            account:'',
            operateType:'',
          },
          userName:"",//禁言用户ID
          gagTime:"1",//禁言时长
          gagid:0,//禁言id
          dialogGag:false,//禁言操作dialo
          dialogUnGag:false,//解封操作提示
          total:0,//总页数
          pageNo:1,//查询页
          userName:'',//用户id
          xuserName:'',//用户id 禁言
          index:0,
          nickName:"",//昵称
          mobile:'',//手机号
          tableData: null,
  		  }
      },
      methods:{
         queryGameUserList(){
          let option = {}
          option.pageNo = this.pageNo
          Object.assign(option,this.searchform)
           this.API.ApiqueryGameUserGagList(option).then((res)=>{
            this.total = res.data.total

            res.data.rows.forEach((item)=>{
              item.xgagStatus = item.gagStatus==1?"正常":"禁言"
              item.gagTime =item.gagTime?dateUtil.format(item.gagTime,'yyyy-MM-dd'):''

            })
              this.tableData = res.data.rows
           },(res)=>{})
         },

         handleCurrentChange(val){
              this.pageNo = val
              this.queryGameUserList()
               this.pageNo = 1
         },

         handleGag(index,row){//禁言
             this.xuserName = row.gameUserid
             this.gagid = row.gagid
             this.index = index
          if (row.gagStatus=="1") {//准备禁言

                this.dialogGag = true
          }else{//准备解禁
                  this.dialogUnGag = true

          }



         },
         confirmFun(){//禁言确定
            let option = {}
            option.gameUserid = this.xuserName
            option.gagDeadline = this.gagTime
            this.API.ApigameUserGag(option).then((res)=>{
              if (res.data.retcode==1) {

                 this.tableData[this.index].xgagStatus = "禁言"
                  this.tableData[this.index].gagStatus =2
              }
               this.$message(`${res.data.retmsg}`)
               this.dialogGag = false
            })

         },
         cancelFun(){
          this.xuserName = 0
          this.gagid = 0
          this.dialogGag = false
          this.dialogUnGag = false
         },
         confirmUngag(){//禁言解封
               let option = {}
            option.gameUserid = this.xuserName
            option.id =  this.gagid
            this.API.ApiupdateGameUserGag(option).then((res)=>{
               if (res.data.retcode==1) {

                 this.tableData[this.index].xgagStatus = "正常"
                  this.tableData[this.index].gagStatus =1
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
.gagMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
   .block{//分页
    margin-top: 80px;
    text-align:center;
  }



    .nav-item{
    label{
      width: auto;
    }
  }


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

