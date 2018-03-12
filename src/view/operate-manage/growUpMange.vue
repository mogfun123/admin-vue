<template>
  <div class="freezeMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="userName">用户名ID:</label>
              <el-input v-model="userName" size="small" placeholder=""></el-input>
             
        </div>  
      
          <div class="nav-item">
              <label for="nickName">昵称:</label>
              <el-input v-model="nickName" size="small" placeholder=""></el-input>
        </div>  
          <div class="nav-item">
              <label for="iphone">手机号:</label>
              <el-input v-model="iphone" :maxlength=11 size="small" placeholder=""></el-input>
        </div>  
        <div class="nav-item">
            <label class="subtitle">用户状态：</label>
            <el-select v-model="value" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in options"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
       
      
        
          

     
      <button type="button" class="btn btn-danger querybtn" @click="queryButton">查询</button>
    
      

      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" border style="width: 100%">
        <el-table-column type=index label="序号" width="40">
        </el-table-column>
        <el-table-column prop="name" label="用户ID" width="120">
        </el-table-column>
         
         <el-table-column prop="name" label="昵称" width="120">
        </el-table-column>
         <el-table-column prop="name" label="手机号" width="120">
        </el-table-column>
         <el-table-column prop="name" label="用户状态" width="120">
        </el-table-column>
         <el-table-column label="操作" width="120">
          <template scope="scope">
          <el-button size="small"  type="danger" @click="handleGag()">{{gagText}}</el-button>
            </template>
          </el-table-column>
       
        <el-table-column prop="address" label="上次禁言时间" width="120">
        </el-table-column>
         <el-table-column prop="name" label="封号期限" width="120">
          </el-table-column>
         <el-table-column prop="name" label="操作人" >
        </el-table-column>
         
      </el-table>
<!-- table -->
 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
    
            @current-change="handleCurrentChange"
            
            layout="total, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
      </div>
     <!-- 分页 -->
  </div>
</template>

<script>

import zsTip from 'components/tip-header'
import {ApiqueryAdmin} from '@/api.js'



export default{
    beforeRouteEnter (to, from, next) {
        next(vm =>{
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
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
         tableData: [{
                          date: '2016-05-02',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1518 弄'
                        }, {
                          date: '2016-05-04',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1517 弄'
                        }, {
                          date: '2016-05-01',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                          date: '2016-05-03',
                          name: '王小虎',
                          address: '上海市普陀区金沙江路 1516 弄'
                        }],
            value:"",
        gagText:"封禁",
          userName:'',//用户名
          nickName:"",//昵称
          iphone:'',//手机号
        }
      },
      methods:{
         queryButton(){
            let vm = this
         },
         handleGag(){

         },//封禁/解封
         handleSizeChange(){

         },
         handleCurrentChange(){

         }
        
         
      },
      components: {
          zsTip
      },


} 
</script>

<style lang="scss">
@import "~style/color.scss";
.freezeMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
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

