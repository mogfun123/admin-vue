<template>
 
        <div></div>
     
</template>

<script>

import echarts from 'echarts'
import {toolitemsfun} from '@/toolitems'


export default {

  data () {
    return {
   
    }
  },
  props:{
    mapdata:Object,
    echartext:{
      type:String,
      default:'',
    },
     toolitemIndex:{
      type:Number,
      default:0,
    },
     ToolShow:{
      type:Boolean,
      default:true,
    },

     width:{
      type:String,
      default:'800px',
    },
  },
  watch:{
    mapdata(value){
        this.mapdata = value;
        if (value) {
          this.structureChartsAction(value)
        }
        

    },
  },
  methods:{
    handleClick(evt) {
        this.$emit('switchClick', evt);
      },
    initDataEcharts(obj){
         var _this = this,
              option = obj||{}
              //基于准备好的dom，初始化echarts实例
               let dom = _this.$el
                  dom.style.width = this.width
                    dom.style.height = '300px'
              this.chartLine = echarts.init(dom);
            
              this.chartLine.setOption(option);
              this.chartLine.on('click', function (params) {
                  console.log(params,4)

               });

      },
    structureChartsAction(data){
        let keys,
            values,
            objkeys,
            vm = this,
            dataAry = [];

           keys = Object.keys(data[Object.keys(data)[0]]).sort() 
           objkeys = Object.keys(data).sort() 
           objkeys.forEach(function(objkey){
            let valueArr= [];
              keys.forEach(function(key){
                 valueArr.push(data[objkey][key]) 
              })
              dataAry.push(valueArr)

                  
           })
            // values = keys.map(function(key){
            //           return data[0][key]
            //          });
           let echartsoption = {
              title: {
                text: vm.echartext,
              },
              tooltip: {
                  trigger: 'axis'
              },
              legend: {
                bottom:'1',
                data:['今日','昨日','7天前','30天前']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '10%',
                  containLabel: true,
                  
                  
              },
              toolbox: {
                left:'250',
                feature:{}, 
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  data: keys,
              },
              yAxis: {
                  type: 'value',
              },
              series: [
                  {
                      name:'今日',
                      type:'line',
                      // stack: '总量1',
                      data:dataAry[0]
                  },
                  {
                      name:'昨日',
                      type:'line',
                      // stack: '总量2',
                      data:dataAry[1]
                  },
                  {
                      name:'7天前',
                      type:'line',
                      // stack: '总量3',
                      data:dataAry[2]
                  },
                  {
                      name:'30天前',
                      type:'line',
                      // stack: '总量4',
                      data:dataAry[3]
                  }
                ]
              }

    let toolitems = toolitemsfun(vm,vm.toolitemIndex);


  if (vm.ToolShow) {
       Object.assign(echartsoption.toolbox.feature,toolitems)
  }else{

  }
 



                this.initDataEcharts(echartsoption)
    },


  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../style/color.scss";

  



</style>
