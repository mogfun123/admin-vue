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
  // mounted(){
  //   console.log(this.mapdata)
  //    //this.structureChartsAction(this.mapdata)
  // },
  props:{
    mapdata:Array,
    echartext:{
      type:String,
      default:'',
    },
     total:{
      type:Number,
      default:0,
    },
     width:{
      type:String,
      default:'250px',
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
                let dom = _this.$el
                 dom.style.width = this.width
                 dom.style.height = '250px'
              this.chartLine = echarts.init(dom);
              this.chartLine.setOption(option);

             

      },
    structureChartsAction(data){
     let vm = this

       let echartsoption = {
                  title : {
                      text: '',
                      x:'center',
                     
                  },
                  //     legend: {
                     
                  //     y:'bottom',
                  //     data:['主播','夺宝','赛场']
                  // },
                  tooltip : {
                      trigger: 'item',
                      formatter: "{a} <br/>{b} : {c} 占比{d}%"
                  },
                 
                  series : [
                      {
                          name: '访问来源',
                          type: 'pie',
                          radius : '60%',
                          center: ['50%', '50%'],
                          data:vm.mapdata.length==0?[{name:'总计',value:0}]:vm.mapdata,
                          itemStyle: {
                              emphasis: {
                                  shadowBlur: 10,
                                  shadowOffsetX: 0,
                                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                              }
                          }
                      }
                  ]
              };





                this.initDataEcharts(echartsoption)
    },


  },

}
</script>



