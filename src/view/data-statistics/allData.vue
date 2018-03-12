<template>
    <div style="text-align: left">
        <zs-tip :tiptext="tipName"></zs-tip>



        <nav>
            <div class="nav-item">
                <label>选择日期</label>
                <el-date-picker
                    v-model="formInline.startTime"
                    :editable=false
                    type="datetime"
                 
                    placeholder="开始日期"
                    >
                </el-date-picker>
                 </div>
        <div class="nav-item">
         <label >至</label>
                <el-date-picker
                    v-model="formInline.endTime"
                    :editable=false
                    type="datetime"
                  
                    placeholder="结束日期"
                    >
                </el-date-picker>
            </div>
             <div class="nav-item">
            <label>渠道</label>
            <el-select size="small"  style="width:160px" v-model="formInline.channel" placeholder="请选择"  >
              <el-option
                v-for="item in channels"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div>
            <div class="nav-item">
                <!--tableList-->
                <el-button type="primary" size="small" @click="tableList" class='btn-search-s'>查询</el-button>
                 <el-button size="small" type="primary" class='btn-search-s' @click="confirmDownload">导出xlsx表格</el-button>
            </div>
        </nav>

        <el-table
            :data="tableData"
            border
             highlight-current-row
          row-class-name="cell-style"

            style="width: 100%"
          
           >
            <el-table-column
            min-width="150"
                prop="recordDate"
                label="日期"
            >
            </el-table-column>
             <el-table-column
                prop="channel"
                min-width="120"
                label="渠道">
            </el-table-column>
            <el-table-column
                prop="registerCount"
                min-width="160"
                sortable
                :sort-method = createSortMethodFun()
                label="新增注册用户">
            </el-table-column>
            <el-table-column
                prop="allActiveCount"
                 min-width="120"
                label="总活跃用户">
            </el-table-column>
            <el-table-column
                prop="rechargeCount"
                 min-width="120"
                label="付费用户">
            </el-table-column>
            <el-table-column
                prop="rechargeMoney"
                 min-width="120"
                label="付费金额">
            </el-table-column>
            <el-table-column
                prop="upValue"
                 min-width="120"
                label="付费用户ARPU">
            </el-table-column>
            <el-table-column
                prop="regNeU"
                label="收注比">
            </el-table-column>
            <el-table-column
                prop="registerUp"
                label="注册付费率">
            </el-table-column>
            <el-table-column
                prop="retention1"
                 min-width="130"
                label="次日留存">
            </el-table-column>
            <el-table-column
                prop="avgRegisterHand"
                  min-width="130"
                label="新增用户平均对局数">
            </el-table-column>
            <el-table-column
                prop="avgJoinHand"
                  min-width="130"
                label="新增用户参与牌局对局数">
            </el-table-column>
            <el-table-column
                prop="retention3"
                  min-width="120"
                label="单局平均时长(min)">
            </el-table-column>
            <el-table-column
                prop="avgGameTimes"
                 min-width="120"
                label="单用户平均游戏时长(min)">
            </el-table-column>
        </el-table>

        <!--  //分页 -->
        <zspagination :total=total :pagesize="15" @click="handleCurrentChange"></zspagination>
    </div>
</template>

<script>
import myMixin from '@/mixin/mixinchannel'
import { hsdateUtil,dateParseUtil } from '@/utils'
    export default {
        data() {
            return {
                tipName: '整体数据统计',
                channels: [],
                formInline: {
         startTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 0),//开始时间
        endTime:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59,59),//结束时间
                    channel: ''
                },
                pageNo: 1,
                total: null,
                tableData: []
            }
        },
           mixins: [myMixin],
        methods: {
              beginDownExcl(title){
                       let keytitle  = {
                        recordDate:'日期',
                        channel:'渠道',
                        registerCount:'新增注册用户',
                        allActiveCount:'总活跃用户',
                        rechargeCount:'付费用户',
                        rechargeMoney:'付费金额',
                        upValue:'付费用户ARPU',
                        regNeU:'收注比',
                        registerUp:'注册付费率',
                        retention1:'次日留存',
                        avgRegisterHand:'注册用户平均对局数',
                        avgJoinHand:'参与牌局用户平均对局数',
                        retention3:'单局平均时长(min)',
                        avgGameTimes:'单用户平均游戏时长(min)',
                      
                       } ,vm = this;
                     title = title||'表格'
                      this.exportLists('ApioverallDataStatistic').then((res)=>{
                           if (vm.validateExportData(res)) { return }

                          vm.downloadExl([keytitle,...res.data.rows],title)

                       })



                },
            tableList() {
                let option = {
                    pageSize: 15,
                    pageNo: this.pageNo,
                    startTime: this.formInline.startTime,
                    endTime: this.formInline.endTime,
                    channel: this.formInline.channel,
                }
                 option.startTime = hsdateUtil(option.startTime)
                    option.endTime = hsdateUtil(option.endTime)

                this.tableData = []
                let _this = this
                this.API.ApioverallDataStatistic(option).then((res) => {
                    _this.total = res.data.total
                 
                    _this.tableData = res.data.rows

                   
                }).catch((err) => {
                    console.log(err)
                })
            },
            handleCurrentChange(val) {
                this.pageNo = val
                this.tableList()
            },
            submit() {
                console.log(this.formInline)
            }

        },
        mounted() {
            //this.channelList()
//            this.tableList()
        }
    }
</script>

<style lang="scss" scoped >
  
</style>
