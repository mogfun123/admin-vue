<!-- 菜单为：用户管理 - 管理员、群组设定、主播管理。房间收益 - 收益查询、贡献排行。结算中心 - 结算详情、账户信息。直播 - 设置管理、添加/管理禁言
 -->
<template>

   <aside class="sidebar" :class="{visshow:isShow}">
     <div class="btn-group-vertical" style="z-index:19" :class="[isPackup ? 'packup' :'']"  role="group" aria-label="...">
     <button type="button" class="btn btn-toggle" @click="togglePackUp">
       <i class="fa fa-bars fa-lg " :class="[isPackup ? '' :'fa-rotate']" aria-hidden="true"></i>
     </button>
     <button type="button" class="btn btn-default"  @click="enterSidebar(item)" v-for="item in mainsidebar" :class="mainindex==item.id ?'active':''" >
       <el-tooltip v-if="isPackup" class="item" effect="dark" :content="item.name" placement="right">
         <el-button>
           <span class="glyphicon" :class="['glyphicon-' + icons[item.id]]" aria-hidden="true"></span>
         </el-button>
       </el-tooltip>
       <span v-else class="glyphicon" :class="['glyphicon-' + icons[item.id]]" aria-hidden="true"></span>
       <span class="heading"> {{item.name}}</span>
     </button>

   </div>
      <!-- //子侧栏 -->


     <transition  name="bounce" type="animation">
      <div class="btn-group-vertical btn-group-vertical-one" v-show="isOpen" role="group" aria-label="...">
        <button type="button" class="btn btn-default btn-title">{{curItem.name}}
        </button>
            <el-tree
              :data="catalog[mainindex]"
              :props="defaultProps"
              :accordion = 'true'
              :default-expand-all= 'false'
              :indent = 10
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree2">
            </el-tree>
      </div>
       </transition>



       <div class="icon_img" v-show="isHidden" @click ="toogleDate" :class="{icon_show:isShow}">
        </div>
   </aside>




</template>

<script>
import {getStore} from '@/utils'
import authortylist from '@/authority/authoritylist'
import Vue from 'vue'
export default {

  name: 'sidebar',

  data () {
    return {
      menuOper:[],
      curItem:[],
     mainsidebar:[
                  {name:"首页",id:8,opCode:'09'},
                  {name:"系统管理",id:0,opCode:'01'},
                  {name:"游戏用户管理",id:1,opCode:'03'},
                  {name:"运营管理",id:2,opCode:'05'},
                  {name:"订单管理",id:3,opCode:'04'},
                  {name:"邮件管理",id:4,opCode:'07'},
                  {name:"数据统计",id:5,opCode:'08'},
                  // {name:"德州扑克",id:6,opCode:'06'},
                  {name:"服务器管理",id:7,opCode:'02'},
                  {name:"机器人管理",id:9,opCode:'10'},
                  ]
        ,
                 // th-large
      icons:['equalizer',"home","paperclip","folder-close","record","tags","jpy","th-large","pushpin","user"],

        defaultProps: {
            children: 'children',
            label: 'label'
          },
        catalog:authortylist,
        mainindex:8,
        sideindex:0,
        secondindex:0,
        filterText:'',
        isOpen:false,
        // hasSecond:false,
        isPackup:false,
        isShow:false,
        isHidden:false,//默认不显示

      }


    },
    mounted:function(){
      let parsedata = JSON.parse(getStore('MENUOPER'))
      let arr = []
      parsedata.forEach(function(item){
        let str = item.opCode.substr(0,2)
            arr.push(str)

      })

      this.mainsidebar = this.mainsidebar.filter((item)=>{

          let isTrue = arr.some((itemr)=>{
                return itemr === item.opCode
            })

          return isTrue

      })


    },


  methods:{
     filterNode(value, data) {//tree过滤
      let isTrue = value.some(function(item){
          return item.opCode == data.opCode
      })
        return isTrue;
      },

      handleNodeClick(item) {
        let vm = this;
        //this.togglePackUp()
        if (item.routename) {
          Vue.$router = vm.$router
           vm.$router.push({name:item.routename})
        }

    //     query: {
    //     t: + new Date()
    // }

    },
    togglePackUp(){//收缩/放大
      let vm = this,
      btn = document.querySelector(".btn-toggle")
      this.isPackup = !this.isPackup
      if (vm.isPackup) {
          btn.style.width = '46px';//


      }else{
          btn.style.width = '140px';//

      }


    },
      enterSidebar(item){//主目录

          let vm = this
          vm.mainindex = item.id
          if (item.opCode == '09') {
              this.isShow = false
              this.isOpen = false
              vm.$router.push({path:"dashboard"})

          } else {
              let vm = this,filterArr = [];
              this.isOpen = true
              this.sideindex = 0
              this.isHidden = true
              this.isShow =false
              this.curItem = item
              if (this.menuOper.length>=1) {
                  filterArr = this.menuOper
              }else{

                  filterArr = JSON.parse(getStore('MENUOPER'))
                  this.menuOper =filterArr
              }

              vm.$nextTick(function(){

                  this.$refs.tree2.filter(filterArr);
                  vm.$nextTick(()=>{
                      Array.prototype.slice.call(vm.$refs.tree2.$el.childNodes).reverse()
                          .forEach((node,index)=>{
                              if (node.nodeType===1) {
                                  node.children[1].style.display = 'none'
                                  node.click()
                              }
                          })

                  })


              })
          }

      },
      enteraSidebar(item){//子侧栏
       this.sideindex = item.sid
      if (item.routename) {
        this.$router.push({name:item.routename})
      }


      },

     toogleDate () {

       this.isShow = !this.isShow

       this.isOpen = !this.isOpen




     }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
@import "~style/color.scss";
.sidebar{
    display: flex;
    min-height: 100%;
    flex-grow:1;
    z-index: 50;
    position:relative;
      box-shadow:none;
      overflow: hidden;
      &.visshow{
        overflow:visible;
      }
     // overflow: hidden;
       .el-tree-node__label{
        font-size: 10px;

        //color:#333;
       }
    .el-tree-node__expand-icon{
      border:5px solid transparent;
      border-left-color:#333;
      border-left-width: 5px;
    }

   .el-tree-node__children .el-tree-node__content{
        color:hsl(290,0%,50%);
        background:#EAEDF1;
      //    overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;

       .el-tree-node__label{
        font-size: 12px;
        color: #666;
      //   overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;

       }
       // &:hover{
       //  background:red;
       // }
   }
    .el-tree-node__content{
      height: 40px;
      line-height: 40px;
       text-align: left;
       text-indent: 3px;
        background:#EAEDF1;


    }
    .el-tree-node .is-current{
         background:#FFFFFF;
    }
    .el-tree-node {

        .el-tree-node__content{

           height: 40px;
          line-height: 40px;
           text-align: left;
           text-indent: 3px;
            &:hover{
              background:#F4F6F8;
        }
           // background:#EAEDF1;

        }

         &.is-expanded{

                .el-tree-node__content{

                   background:#EAEDF1;

                  }
                   .el-tree-node__content:hover{
                        // background:hsla(120,65%,92%,0.3);
                        background:#F4F6F8;

                }
            }
         &.is-current >.el-tree-node__content {

                        background:#FFFFFF;

            }

    }
// .slide-fade-enter-active {
//   // transition: all .3s ease;
// }
// .slide-fade-leave-active {
//   // transition:all .3s ease;
// }
// .slide-fade-enter, .slide-fade-leave-to
// /* .slide-fade-leave-active for below version 2.1.8 */ {
//   //transform: translateX(-130px);
//   width: 0px;
// }

.bounce-enter-active {
  animation: bounce-in .2s ease;
}
.bounce-leave-active {
  animation: bounce-in .2s ease reverse;
}
@keyframes bounce-in {
  from {
    margin-left: -165px;
  }

  to {
    margin-left: 0px;
  }
}


    .icon_img {
        position: absolute;
        width: 17px;
        height: 49px;
        top: 50%;
        right: -5px;
        background: url("~assets/images/icon_all.png") no-repeat 0 0;
        cursor: pointer;
        z-index: 17;
        transition: all 0.1s ease;
        &:hover{
          right: 0px;
        }
      }
    .icon_show {
       background: url("~assets/images/icon_all.png") no-repeat 0 bottom;
      right: -10px;
      top: 50%;
        z-index: 17;
          &:hover{
          right: -17px;
        }
      }
   button{
    background: transparent;
    border:none;
    color:#aeb9c2;
    height: 40px;
    font-size: 12px;
    padding:0px 0px;
    text-align: left;
    margin-top: 0px!important;
    box-shadow:none;
    transition:all 0.12s ease;
    letter-spacing: 0.5px;

    // text-align: left;
    &:hover{
      background:#00C1DE;
      color: #FFFFFF;
      box-shadow:none;
    }
    &.active{
      background:#00C1DE;
      box-shadow:none;
      .glyphicon {
        color: #FFFFFF;
      }
    }
    &:focus,
      &:active:focus,
      &.active:focus,
      &.active,
      &:active.focus,
      &.active.focus {
          outline: none;
          box-shadow:none;
           background:#00C1DE;
          // background:red;
      }

  }

.btn-group-vertical{
      width: 140px;
      /*position: relative;*/
      background-color: rgb(66, 72, 91);
      box-shadow:none;
      overflow: hidden;
      .glyphicon{
        width: 18px;
        height: 16px;
        margin:auto 14px;
        margin-right: 13px;
        color: #aeb9c2;
      }
      span.heading{
        display: inline-block;
        width: 50px;
        height: 40px;
        color:#FFFFFF;
        line-height: 40px;

        // margin: 15px 0;

      }
      &.packup{
        /*margin-right: -95px;*/
        width: 46px;
      }



}

.btn-group-vertical-one,.btn-group-vertical-last{

      z-index: 16;
      position: relative;
       width: 165px;
      background:#D9DEE4;
      transition:all .0001s ease;
      box-shadow:none;
      button{
        color:#000;
        text-align: center;
          box-shadow:none;
          border-radius: none;

        &:hover{
          background:#00C1DE;
           color:#000;
             box-shadow:none;
        }
        &:focus{
          color:#000;
            box-shadow:none;
        }
         &.active{
          background:#00C1DE;
           color:#000;
             box-shadow:none;
        }
      }
      .btn-title{
        height: 70px;
        // cursor:default;
        text-align: left;
        font-weight: bold;
        text-indent: 20px;
        letter-spacing: 1px;


           &:hover{
          background:#D9DEE4;
           color:#000;
             box-shadow:none;
        }
        &:focus{
          color:#000;
            box-shadow:none;
        }
         &.active{
          background:#00C1DE;
           color:#000;
             box-shadow:none;
              border-radius: none;
        }
      }

}
.btn-group-vertical-last{
  width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // background:#ccc;
}
.btn-group-vertical>.btn{
    border-radius: 0px!important;
}
.btn-toggle{
  height: 30px;
  width: 100%;
  text-align: center;
  background:#4A5064;
  color:#aeb9c2;
  box-shadow:none;
  border-radius:0px;
  span{
    margin-left: -4px;
  }
  i.fa-rotate{
    color:#aeb9c2;
      transform: rotate(90deg);
  }
}
.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.active,
.btn:active.focus,
.btn.active.focus {
    outline: none;

}
.btn-default.active:hover{
   background:#00C1DE;
    color:#000;
  box-shadow:none;
}
.btn-toggle:hover,.btn-toggle:focus,.btn-toggle:focus:active,.btn-toggle:active{
   background:#4A5064;
    color:#FFFFFF;
  box-shadow:none;
}

}



</style>
