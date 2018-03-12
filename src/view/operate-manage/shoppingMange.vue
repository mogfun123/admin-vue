<template>
  <div class="shopMange-wrapper">
    <!-- <zs-tip :tiptext='tipName'></zs-tip>
      <button type="button" class="btn btn-danger addadmin" @click='dialogVisible =true,fromtype=fromtypes[0]'>添加后台用户</button> -->
    <!-- 导航栏 -->
 
           
    <nav>     
        <div class="nav-item">
              <label for="userName">商品ID:</label>
              <el-input v-model="mid" size="small" placeholder=""></el-input>
             
        </div>  
      
          
        <div class="nav-item">
            <label class="subtitle">商品类型:</label>
            <el-select v-model="goodsType" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in shopgoodsTypes"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
         <div class="nav-item">
            <label class="subtitle">商品状态:</label>
            <el-select v-model="goodsState" placeholder="请选择"  size="small" >
              <el-option
                v-for="item in goodsStates"
                :label="item.label"
                :key="item.label"

                :value="item.value">
              </el-option>
            </el-select>
        </div> 
       
      
        
          

     
    
     <el-button type="primary" @click="queryLists">查询</el-button>
      <el-button type="primary" @click="dialogAddShop = true,form.mid=''">添加商品</el-button>

      
    </nav>
<!-- 上导航栏 -->
<!-- table -->
   <el-table :data="tableData" highlight-current-row row-class-name="cell-style">
        
        <el-table-column prop="mid" label="商品ID" width="120">
        </el-table-column>
         
         <el-table-column prop="xgoodsType" label="商品分类" width="120">
        </el-table-column>
         <el-table-column prop="goodsId" label="道具ID" width="120">
        </el-table-column>

         <el-table-column prop="count" label="道具数量" width="100">
        </el-table-column>
        <el-table-column prop="goodsAnnexation" label="附赠金币" width="120">
        </el-table-column>
          <el-table-column prop="xcurrencyType" label="货币类型" width="120">
        </el-table-column>
          <el-table-column prop="money" label="价格" width="120">
        </el-table-column>
        <el-table-column prop="xgoodsDiscount" label="折扣" width="80">
        </el-table-column>
        <el-table-column prop="goodsLimit" label="限购" width="100">
        </el-table-column>
        <el-table-column prop="xgoodsState" label="状态" width="100">
        </el-table-column>
        <el-table-column prop="addtime" label="创建时间" min-width="120">
        </el-table-column>
         <el-table-column prop="updtime" label="修改时间" min-width="120">
        </el-table-column>
      
         <el-table-column prop="adminName" label="操作人" >
        </el-table-column>
           <el-table-column label="操作" width="200">
          <template scope="scope">
           <el-button size="small" type="primary"  @click="changeState(scope.$index, scope.row)">{{scope.row.goodsState==1?'下架':'上架'}}</el-button>
          <el-button size="small"  type="primary" @click="handleGag(scope.$index, scope.row)">修改</el-button>
            </template>
          </el-table-column>
         
      </el-table>
<!-- table -->
<!--   //添加公告 -->
    <el-dialog title="添加公告"  v-model="dialogAddShop"    size="small" :modal-append-to-body = false>
      <div class="content">
        <div class="header">
        <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="100px">
            <el-form-item label="商品分类" prop="goodsType">
              <el-select v-model="form.goodsType" placeholder="请选择商品类型">
                <el-option label="筹码道具" value="1"></el-option>
                <el-option label="道具礼包" value="2"></el-option>
                <el-option label="充值" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品道具id" prop="goodsId">

              <el-col :span="14">
               <el-input v-model="form.goodsId" placeholder="请填入道具id"></el-input>
              </el-col>
             
              
            </el-form-item>
             <el-form-item label="道具数量" prop="count">
                <el-col :span="14">
               <el-input v-model="form.count" type="number" min="1" placeholder="请填入道具数量"></el-input>
                  </el-col>
               </el-form-item>

             <el-form-item label="货币类型" prop="currencyType">

              <el-col :span="14">
                <el-select v-model="form.currencyType" placeholder="请选择货币类型">
                <el-option label="人民币" value="1"></el-option>
                <el-option label="金币" value="2"></el-option>
                 <el-option label="钻石" value="3"></el-option>
              </el-select>
              </el-col>
              
             
            </el-form-item>
             <el-form-item label="商品价格" prop="money">
                  <el-col :span="14">
                   <el-input v-model="form.money" type="number" min="1" placeholder="请填入商品价格"></el-input>
                  </el-col>
               </el-form-item>

            <el-form-item label="商品排序"  prop="goodsSort">
                <el-col :span="14">
                <el-input v-model="form.goodsSort"  type="number" min="1" max="999"></el-input>
                </el-col>
              </el-form-item>
            <el-form-item label="商品折扣" prop="goodsDiscount">
              <el-select v-model="form.goodsDiscount" placeholder="请选择折扣">
                  <el-option label="不打折" value="10"></el-option>
                  <el-option label="1折" value="1"></el-option>
                  <el-option label="2折" value="2"></el-option>
                   <el-option label="3折" value="3"></el-option>
                  <el-option label="4折" value="4"></el-option>
                   <el-option label="5折" value="5"></el-option>
                  <el-option label="6折" value="6"></el-option>
                   <el-option label="7折" value="7"></el-option>
                  <el-option label="8折" value="8"></el-option>
                   <el-option label="9折" value="9"></el-option>
                 
                </el-select>
              </el-form-item>
            <el-form-item label="商品附赠" prop="goodsAnnexation">
              <el-col :span="14">
                <el-input v-model="form.goodsAnnexation"   placeholder="请填入赠送数量" type="number" min="1" ></el-input>
                </el-col>
                 <el-col :span="2">
                    <span>金币</span>
                </el-col>
            </el-form-item>
           <el-form-item label="商品限购">
              <el-col :span="14">
                <el-input v-model="form.goodsLimit"   placeholder="请填入限购次数" type="number" min="0" ></el-input>
                </el-col>
                 <el-col :span="2">
                    <span>次</span>
                </el-col>
            </el-form-item>

                <el-form-item label="上架时间">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.putawayTime" @change="changStartTime" style="width: 100%;"></el-date-picker>
                  </el-col>
                
                </el-form-item>
                <el-form-item label="下架时间">
                  <el-col :span="14">
                    <el-date-picker type="datetime" placeholder="选择日期" v-model="form.outTime"  @change="changEndTime" style="width: 100%;"></el-date-picker>
                  </el-col>
             
                </el-form-item> 
                <el-form-item>
                <el-col :span='14'>
                  <el-upload
                      class="avatar-uploader"
                       :action="API.UPLOADURL"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      >
                      <img v-if="form.goodsPic" :src="form.goodsPic"   class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                     </el-upload>
                </el-col>
                </el-form-item>

                <el-form-item label="商品状态" >
                   <el-radio class="radio" v-model="form.goodsState" label="1">上架</el-radio>
                    <el-radio class="radio" v-model="form.goodsState" label="2">下架</el-radio>
                  </el-form-item>
               
                <!-- </el-form-item> -->
          </el-form>
                   
          
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
       <el-button type="primary" @click="dialogAddShop=false">取消</el-button>
    
        <el-button type="primary" @click="submitForm('form')">确定</el-button>
      </span>
    </el-dialog>
<!--   //添加公告 -->
 <!--  //分页 -->
     <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
          <el-pagination
          
            @current-change="handleCurrentChange"
            
            layout="total, prev, pager, next, jumper"
            :total="pagtotal">
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
          vm.queryLists()
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
          pagtotal:"",
          pageNo:1,
           options: [{
                  value: '选项1',
                  label: '禁用'
                  }, 
                 {
                   value: '选项2',
                   label: '正常'
                  }],
         tableData:null,
            value:"",
            shopgoodsTypes:[{
                value:"",
                label:"所有"
            },
            {
                value:"1",
                label:"筹码道具"
            },{
              value:"2",
                label:"道具礼包"
            },{
              value:"3",
                label:"充值"
            }],
            goodsStates:[{
                value:"",
                label:"所有"
            },{
                value:"1",
                label:"上架"
            },{
              value:"2",
                label:"下架"
            }],
        gagText:"上架",
        userName:'',//用户名
        shopkind:'',//商品类型
        shopstate:'',//商品状态v
        dialogAddShop:false,//添加商品
        labelPosition:'left',
        pagtotal:0,//总页数
        mid:"",
        goodsType:"",
        goodsState:"",
        //表单
          form: {
            mid:'',
            goodsType: '',
           
            goodsId: '',
            count:"",
            currencyType:'',
           goodsPic:'',
            money:"",
            goodsSort: '',
            goodsDiscount:'',
            goodsAnnexation:'',
            goodsLimit:0,
            putawayTime:"",
            outTime:"",
             goodsState:'1',//1上架 2下架
          },
            rules: {
          goodsId: [
            { required: true, message: '请输入道具id', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          goodsType: [
            { required: true, message: '请选择商品分类', trigger: 'change' }
          ],
          currencyType: [
            { required: true, message: '请选择货币分类', trigger: 'change' }
          ],
           goodsSort: [
            { required: true, message: '请输入商品排序', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           money: [
            { required: true, message: '请输入商品价格', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
             count: [
            { required: true, message: '请输入商品数量', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         
          goodsAnnexation: [
            { required: true, message: '请输入商品附赠数目', trigger: 'change' }
          ],
         
        }
          //表单
        }
      },
      methods:{
        
         changStartTime(val){
         
          this.form.putawayTime = val
        },
         changEndTime(val){
           this.form.outTime = val
          if (this.form.putawayTime>val) {
              this.$message(`上架结束时间必须大于上架起始时间`)
              this.form.outTime = " "
          }
          
        },
        submitForm(formName){//验收
          console.log(this.form)
              this.$refs[formName].validate((valid) => {
              if (valid) {
               this.ensureAction()
              } else {
                
                return false;
              }
            });
        },
       handleAvatarSuccess(res, file) {

      
          this.form.goodsPic = res.data;
      },
         resetForm(formName) {
       
        this.$refs[formName].resetFields();
      },
         queryLists(){
            let vm = this,option={}

            option.mid = this.mid
            option.goodsType = this.goodsType
              option.pageNo = this.pageNo
            option.goodsState = this.goodsState
            this.API.ApiqueryCommodity(option).then((res)=>{
              this.pagtotal = res.data.total
                res.data.rows.forEach((item)=>{  
                // Object.assign(item,item.commodity) 
               
                let contrast  = item.goodsType
               item.xgoodsType = contrast==1?"筹码道具":contrast==2?"道具礼包":contrast==3?"充值":''
                  contrast  = item.currencyType
               item.xcurrencyType = contrast==1?"人民币":contrast==2?"金币":contrast==3?"钻石":''
                
               item.xgoodsDiscount = (item.goodsDiscount||10)+'折'
                   contrast  = item.goodsState
               item.xgoodsState = contrast==1?"上架":"下架"
                item.addtime = item.addTime?dateUtil.format(item.addTime,'yyyy-MM-dd HH:mm:ss'):''
                item.updtime = item.updTime?dateUtil.format(item.updTime,'yyyy-MM-dd HH:mm:ss'):''      
            })
              this.tableData = res.data.rows
            })
         },
         handleGag(index,row){
          this.dialogAddShop = true
           this.form.goodsType = row.goodsType.toString()
          this.form.goodsId= row.goodsId.toString()
          this.form.count = row.count.toString()
          this.form.currencyType = row.currencyType
          this.form.money = row.money.toString()
          this.form.goodsPic = row.goodsPic
           this.form.goodsSort = row.goodsSort.toString()
         this.form.goodsDiscount = row.goodsDiscount
         this.form.goodsAnnexation = row.goodsAnnexation
           this.form.goodsLimit = row.goodsLimit
         this.form.putawayTime = dateUtil.format(row.putawayTime,'yyyy-MM-dd HH:mm:ss')
         this.form.outTime = dateUtil.format(row.outTime,'yyyy-MM-dd HH:mm:ss')
         this.form.goodsState = row.goodsState.toString()
         this.form.mid = row.mid

         },
        
         handleCurrentChange(val){
            this.pageNo = val
            this.queryLists()
            this.pageNo = 1
         },
        
         ensureAction(){
          let option = {}
         
          Object.assign(option,this.form)
          option.goodsState= Number(this.form.goodsState)
         

        
          
          this.API.ApicsaveCommodity(option).then((res)=>{
              if (res.data.retcode==1) {
                 
                  this.$message(`${res.data.retmsg}`)
                  this.mid = ''
                  this.resetForm("form")
                  this.dialogAddShop = false
                   this.queryLists()
              }
          })


         },
         changeState(index,row) {
          let option = {}
          option.mid = row.mid
          let state = row.goodsState
              this.$confirm(`您将要${state==1?'下架该商品':'上架该商品'}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

                this.API.ApiupdCommodityState(option).then((res)=>{
                    if (res.data.retcode==1) {

                      this.$message({
                            type: 'success',
                            message: `${state==1?'商品已下架':'商品已上架'}`
                          });   
                       row.goodsState = state==1?'2':'1'
                        row.xgoodsState = row.goodsState==1?"上架":"下架"
                    }
                })
               
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消'
                });          
            });
            
         },
      },
  

} 
</script>

<style lang="scss" scoped>
@import "~style/color.scss";
.shopMange-wrapper{
  width: 100%;
  height: 100%;
  text-align: left;
  position: relative;
    .block{//分页
    margin-top: 80px;
    text-align:center;
  }
     .el-dialog__footer{
  text-align: center;
}
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
  }
  .el-upload__input{
      display: none;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
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
          min-width: 60px;
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
       
        .el-input--small{
          height: 25px;
          width: 120px;
        }
        .el-input__inner{
          height: 25px;
        } 


      }
   .el-button {
        height: 25px;
        line-height: 25px;
        margin-left: 10px;
        span{
          font-size: 12px;
        }
        padding: 0px 10px;
  }
  
  }

}
</style>

