<template>
   <div></div>
</template>

<script>

import echarts from 'echarts'



export default {

  data () {
    return {
        
    }
  },
  props:{
    mapdata:Object,
    width:{
      type:String,
      default:'800px',
    },
    echartext:{
      type:String,
      default:'',
    }
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
             

      },
    structureChartsAction(data){
          let keys,
              values,
              option;
              keys = Object.keys(data).sort()
              values = keys.map((key)=>{
                return data[key]
              })
              
         option = {
                    color: ['#3398DB'],
                    title: {
                        text: this.echartext,

                      },
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : keys,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                          {
                            type: 'bar',
                            barMaxWidth:'20',
                             label: {
                                  normal: {
                                      show: true,
                                      position: 'top'
                                  }
                              },
                            itemStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#83bff6'},
                                            {offset: 0.5, color: '#188df0'},
                                            {offset: 1, color: '#188df0'}
                                        ]
                                    )
                                },
                                emphasis: {
                                    color: new echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#2378f7'},
                                            {offset: 0.7, color: '#2378f7'},
                                            {offset: 1, color: '#83bff6'}
                                        ]
                                    )
                                }
                            },
                            data: values
                        }
                    ]
                };



                this.initDataEcharts(option)
    },


  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/style/color.scss";

  



</style>
