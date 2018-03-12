<template>
    <div >
         <zs-tip :tiptext='tipName'></zs-tip>
    <!-- table -->
    <div class="home-nav">
          <div class="nav-item" style='padding-left:20px'>
            <label style='font-size:20px;margin-right:20px'>今日总览</label>
            <el-button size="small" type="primary" @click="handerChose">刷新</el-button>

        </div>
 
        <div class="nav-item" style="float:right;padding-right:20px">
            <label style='font-size:20px;margin-right:20px'>渠道</label>
            <el-select size="small"  style="width:160px" v-model="serachform.channel" placeholder="请选择"  >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
       
        </div>
      <div id='echartpie' v-if='haspie'>
        <div class="tabs" >
        <el-tabs v-model="activeName" @tab-click='handleClick'>
            <el-tab-pane style="width:250px" label="新增设备" name="first"></el-tab-pane>
            <el-tab-pane style="width:250px" label="注册用户" name="second"></el-tab-pane>
            <el-tab-pane style="width:250px" label="活跃用户" name="third"></el-tab-pane>
            <el-tab-pane style="width:250px" label="付费用户" name="fourth"></el-tab-pane>
            <el-tab-pane style="width:250px" label="今日收入" name="five"></el-tab-pane>
             <el-tab-pane style="width:250px" label="今日消费(钻石)" name="six"></el-tab-pane>
          </el-tabs>
               
    </div>
        <div class="tab-contents">
        <div class="tab-content"> 
          <echartpie :mapdata='markoption.deviceCount.dataArr' ></echartpie>
        </div> 
            <div class="tab-content">
            <echartpie :mapdata='markoption.registerCount.dataArr'></echartpie>
        </div>
             <div class="tab-content">
            <echartpie :mapdata='markoption.activeCount.dataArr' ></echartpie>
        </div>
             <div class="tab-content">
            <echartpie :mapdata='markoption.rechargeCount.dataArr' ></echartpie>
        </div>
             <div class="tab-content">
            <echartpie :mapdata='markoption.incomeToday.dataArr' ></echartpie>
        </div>
        <div class="tab-content">
            <echartpie :mapdata='markoption.consumeToday.dataArr' ></echartpie>
        </div>
    </div>
    <div class="piefooter">
        <div class="piefooter-item">{{markoption.deviceCount.total}}</div>
         <div class="piefooter-item">{{markoption.registerCount.total}}</div>
         <div class="piefooter-item">{{markoption.activeCount.total}}</div>
         <div class="piefooter-item">{{markoption.rechargeCount.total}}</div>
         <div class="piefooter-item">{{markoption.incomeToday.total}}</div>
         <div class="piefooter-item">{{markoption.consumeToday.total}}</div>
    </div>
    </div>
    <div>
        <echartstack  :echartext="echartexts[serachform.type]" :stackdata='stackdatas' width='1550px'></echartstack>
    </div>

    </div>
</template>

<script>
import { hsdateUtil } from '@/utils'
import myMixin from '@/mixin/mixinchannel'
import {getStore} from '@/utils'
    export default {
        data() {
            return {
                 tipName:'首页',
                  serachform:{
                       channel:'',
                        type:1,
                     },
                    activeName:'first',
                channels:[],
                haspie:true,
                echartexts:{
                  1:'新增设备变化趋势',
                  2:'注册用户变化趋势',
                  3:'活跃用户变化趋势',
                  4:'付费用户变化趋势',
                  5:'今日收入变化趋势',
                  6:'今日消费(钻石)变化趋势',

                },

                markoption:{
                    deviceCount:{},
                    rechargeCount:{},
                    activeCount:{},
                    incomeToday:{},
                    registerCount:{},
                    consumeToday:{}
                },
                stackdatas:{
                    keys:[],
                    datas:[],
                    legend:[]
                },
                legendkeys:{
                    sevenday:'七天',
                    today:'今天',
                    yesterday:'昨天',
                },
               
               
               
                tableData: []
            }
        },
         mixins: [myMixin],
          watch:{
                'serachform.channel':{
                    handler:function(val,oldval){
                     
                           this.handerChose()
                       
                    },
                    deep:true
                }
            },
        methods: {
            handleClick({index}){
              let menuoper = JSON.parse(getStore('MENUOPER'))||[]
                  let isTruestack = menuoper.some((item)=>{
                    return (item.opCode==='0902')
                }) 
                  index = Number(index) + 1
                  this.serachform.type = index
                  

              if (isTruestack) {
                 this.getEchartstackData()
              }
            },
            getEchartstackData(){
                let option = {...this.serachform},vm =this;
                let curHours = new Date().getHours();
                this.API.ApiTwistsStatisticPic(option).then((res)=>{
                    let data = res.data.data,stackdata={legend:[]};
                   let arrs = Object.keys(data).map((key)=>{
                               let ob = {},
                                dataKeys = Object.keys(data[key]),
                               dataValues = Object.values(data[key]);
                               ob.name=vm.legendkeys[key],
                               ob.type='line',
                               console.log(ob.name)
                               if (ob.name=='今天') {
                                   dataKeys.some((keyTime,index)=>{
                                    if (Number(keyTime.split(':')[0]) > curHours ) {
                                        dataValues.splice(index)
                                           return true
                                        }
                                       })
                
                               }
                       
                               ob.data= dataValues
                              stackdata.keys=dataKeys
                              
                               return ob 
                    })
                  
                    stackdata.legend= ['今天','昨天','七天']
                     stackdata.datas = [...arrs]
                 

                    this.stackdatas = stackdata
                    return 
                      
                })

            },
            datahandler(data){
                let markoptions = {},vm =this;
                 for(let [key,value] of Object.entries(data)){
                  let dataArr = [],total = 0
                           value.forEach((item)=>{
                             if (/^\d+$/g.test(item[key])) {                       
                                total = total + item[key]
                                dataArr.push({name:item.channel?item.channel:'未知',value:item[key]})
                            }
                            
                          }) 

                     
                      markoptions[key] ={dataArr,total} 
                     
                 }
               

                       vm.markoption = markoptions


            },
           
          
            refreshData() {
                let option = {};
                let vm = this
                Object.assign(option,this.serachform)
                delete option.type
                this.API.ApiDashboard(option).then((res) => {
                    if (res.data.retcode == 1) {
                      vm.datahandler(res.data.data)
                    } else {
                        this.$message.error(res.data.retmsg)
                    }
                }).catch((err) => {
                   
                })

            },
            handerChose(){
                let menuoper = JSON.parse(getStore('MENUOPER'))||[]
                  let isTruestack = menuoper.some((item)=>{
                    return (item.opCode==='0902')
                }) 
                   let isTruepie = menuoper.some((item)=>{
                    return (item.opCode==='0901')
                }) 

              if (isTruestack) {
                 this.getEchartstackData()
              }
                if (isTruepie) {
                 this.refreshData()
              }else{
                this.haspie = false
              }
                
               
            },
        },
        mounted(){
           this.handerChose()
        }
    }
</script>

<style lang="scss"  >
.home-nav{
      width: 1500px;
    background:#ccc;
    text-align: left;
    margin-bottom: 0px!important;
    border-radius:10px 10px 0 0 /5px 5px 0 0 ;

}
.tabs{
    width: 1500px;
     min-width: 1500px;
     .el-tabs__header{
        margin-bottom: 0px;
     }
  .el-tabs__nav{
    min-width: 1500px;
    .el-tabs__active-bar{
        display: none;
    }
    .el-tabs__item{
        width: 16.66%;
        border: 1px solid #dfe6ec;
        border-left:none;
        &:nth-of-type(2){
             border-left: 1px solid #dfe6ec;
        }
        &.is-active{
            background: #dfe6ec;
        }
    }
}  
}
.tab-contents{
   display: flex;
   width:1500px;
   max-width:1500px;
}
.tab-content{
    position: relative;

    &::after{
        position:absolute;
        right: 0px;
        top:0px;
        width: 1px;
        height: 250px;
        content: '';
        background:#dfe6ec;
    }
        &:first-child::before{
            position:absolute;
            left: 0px;
            top:0px;
            width: 1px;
            height: 250px;
            content: '';
            background:#dfe6ec;
        }

}
.piefooter{
    display: flex;
     width: 1500px;
     height: 50px;
     display: flex;
     margin-top: -5px;
    .piefooter-item{
      width: 0px;
         height: 50px;
         line-height: 50px;
        flex-grow:1;
        font-size: 18px;
        font-weight: bold;
        box-sizing:border-box;
        border: 1px solid #dfe6ec;
        border-left:none;
        &:first-child{
            //width: 250px;
             border-left: 1px solid #dfe6ec;
             margin-right: -1px;
        }
    }
}



</style>
