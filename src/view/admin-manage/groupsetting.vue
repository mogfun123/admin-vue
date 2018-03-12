<template>
	<div class="admin-wrapper">
	  <zs-tip :tiptext='tipName'></zs-tip>
    <!-- <router-link :to="{ name: 'admin' }">/admin</router-link> -->
    <nav>
        
          <label for="exampleInputName2">群组名称</label>
          <input type="text" class="form-control" id="exampleInputName2" placeholder="">
     
      <button type="button" class="btn btn-danger addbtn">新增</button>
      <button type="button" class="btn btn-danger addborder" disabled="disabled">修改权限</button>
      <button type="button" class="btn btn-danger addborder" disabled="disabled">修改群组名</button>
      <button type="button" class="btn btn-danger  addborder" disabled="disabled">删除</button>
       <label class="subtitle">群组列表：</label>
     
          <el-select v-model="value" placeholder="请选择"  size="small" >
          <el-option
            v-for="item in options"
            :label="item.label"
            :key="item.label"

            :value="item.value">
          </el-option>
        </el-select>

      
    </nav>
    
           <div class="checklist">
        <ul>
          <li class="short-li">
            <div class="history-check"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
          <li class="long-li">
            <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
        </ul>
         <ul>
          <li class="short-li">
            <div class="history-check"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
          <li class="long-li">
            <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
        </ul>
         <ul>
          <li class="short-li">
            <div class="history-check"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
          <li class="long-li">
            <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
        </ul>
         <ul>
          <li class="short-li">
            <div class="history-check"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
          <li class="long-li">
            <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
              <div class="history-check checked"> 
                <span><i></i></span>
                <em>获取消息设置页</em>
              </div>
          </li>
        </ul>
      </div>
     

	</div>
</template>

<script>
import zsTip from 'components/tip-header'
export default{
 	 //  beforeRouteEnter (to, from, next) {
  	// 		next(vm =>{

  	// 		})
  	// 	},
   // 	beforeRouteUpdate (to, from, next) {
   
  	// 	},
  	// beforeRouteLeave (to, from, next) {
   
  	// 	},
      name:"groupset",
  		data(){

  			return {
  				tipName:"群组设定",
          options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
           value:"",
                        

  			}
  		},
      methods:{
        
      },
      components: {
          zsTip
  },


}	
</script>

<style lang="scss">
@import "~style/color.scss";
.admin-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
nav{
  height: 25px;
  line-height: 25px;
  display: flex;
  align-items:center;
  
    
    font-size: 12px;
    margin-top: 10px;
    label{
      margin-bottom: 0px;
    }
    .subtitle{
      height: 25px;
      width: 70px;
      font-size: 12px;
      margin-left: 25px;
      margin-bottom: 0px;
        
    }
    .form-control{
      width: 120px;
      margin-left: 10px;
      height: 25px;
    }
    .addbtn{
       border:none;
      border-radius:0px;
      margin-left: 25px;
      height: 25px;
     font-size: 12px;
    }
    .addborder{
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
.checklist{
  margin-top: 20px;
   ul{
    display: flex;
    margin-bottom: 0px;
      li{
        // float: left;
        display: flex;
       flex-wrap: wrap ;
        .history-check{
          color:#777;
          margin:5px;
          width: 190px;
          display: inline-block;
          font-size: 12px;
          &.checked i{
            background-color: #df4e49;
          }
          span{
                position: relative;
                top: 4px;
                display: inline-block;
                width: 16px;
                height: 16px;
                border: 1px solid #df4e49;
                i{
                      display: block;
                      width: 12px;
                      height: 12px;
                      margin: 1px;
                      background-color: #eebfbd;
                }
          }
          em{
            margin-left: 3px;
            line-height: 20px;
            font-size: 12px;
            color:#777;
            font-style: normal;
          }
        }
      }
      li.short-li{
        width: 20%;
        border-top: 1px solid #ddd;
        padding: 5px 7px;
        overflow: hidden;
      }

      li.long-li{
          width: 80%;
          border-right: none;
          border-left: 1px solid #ddd;
          border-top: 1px solid #ddd;
          padding: 5px 7px;
          overflow: hidden;

      }
   }

}
 

}
</style>

