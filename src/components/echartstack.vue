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
  mounted(){
     this.structureChartsAction()
  },
  props:{
    stackdata:Object,
    echartext:{
      type:String,
      default:'',
    },
     width:{
      type:String,
      default:'250px',
    },
  },
  watch:{
    stackdata(value){
        this.stackdata = value;
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
                 dom.style.height = '480px'
              this.chartLine = echarts.init(dom);
              this.chartLine.setOption(option);

             

      },
    structureChartsAction(data){
      let option = {}

      option = {
    title: {
        text: this.echartext,
         left: 'center',
          top: 15,
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
       bottom: 0,
        left: 'center',
         bottom: '5%',
        data:data.legend
    },
    grid: {
        left: '0',
        right: '4%',
        bottom: '20%',
        containLabel: true
    },
    toolbox: {
        feature: {
           
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data:data.keys
       
    },
    yAxis: {
        type: 'value'
    },
    series:data.datas
};
               this.initDataEcharts(option)
    },


  },

}
</script>


<style lang="scss" scoped>


  



</style>
