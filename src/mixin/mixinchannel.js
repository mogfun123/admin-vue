import API from "@/api.js";
import  xlsx from "xlsx";
import { hsdateUtil,dateParseUtil } from "@/utils";
var myMixin = {
  created: function() {
    let vm = this;
    vm.API.ApicommongetChannelList({}).then(res => {
      vm.$nextTick(function() {
        vm.channels =  Object.keys(res.data.data).map((key)=>({value:key,label:res.data.data[key]}))
        vm.channels.unshift({ label: "所有", value: "" });
      });
    });
  },
  methods: {
      createSortMethodFun(option={}){
        console.log(option)
        let recordDate = option.recordDate||'recordDate'
        let count = option.count||'registerCount'
                return function (a,b){
                     let preDate ,nextDate,preCount,nextCount;
                    preDate = dateParseUtil(a[recordDate]);
                    nextDate = dateParseUtil(b[recordDate])
                    preCount= a[count]
                    nextCount=b[count]


                    if (preDate > nextDate) {
                        return true
                       }
                    if (preDate === nextDate) {   
                        return (preCount >= nextCount)?true:false
                   }
                    if (preDate < nextDate) {
                
                    return false
                   }
                   }

      },
   // createCountSortMethodFun(option={}){
   //      let count = option.count||'registerCount'
   //              return function (a,b){
   //                   let preCount,nextCount;
            
   //                  preCount= a[count]
   //                  nextCount=b[count]


                    
   //                      return (preCount >= nextCount)?true:false
                  
   //                 }

   //    },
    validateExportData(res) {
      if (!res.data.rows || res.data.rows.length == 0) {
        this.$message({
          message: "查询结果为空",
          type: "warning"
        });
        return true;
      }
    },
    confirmDownload() {
      this.$prompt("请输入导出表格名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        //inputValue:'表格',
        customClass: "msgStyle",
        closeOnClickModal: false,
        inputPlaceholder: "请输入导出表格名"
      })
        .then(({ value }) => {
          this.beginDownExcl(value);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消导出"
          });
        });
    },
    async exportLists(api, nooption) {
      //用户
      let option = { pageNo: "" };
      if (nooption === "nooption") {
      } else {
        Object.assign(option, this.serachform);
        option.startTime = hsdateUtil(option.startTime);
        option.endTime = hsdateUtil(option.endTime);
      }

      let data = await this.API[api](option);

      return data;
    },
    downloadExl(json, title, type) {
      let tmpDown; //导出的二进制对象
      var tmpdata = json[0],
        vm = this;
      json.unshift({});
      var keyMap = []; //获取keys
      for (var k in tmpdata) {
        keyMap.push(k);
        //json[0][k] = tmpdata[k];
      }
      json.shift();
      var tmpdata = []; //用来保存转换好的json
      json
        .map((v, i) =>
          keyMap.map((k, j) =>
            Object.assign(
              {},
              {
                v: v[k],
                position:
                  (j > 25 ? vm.getCharCol(j) : String.fromCharCode(65 + j)) +
                  (i + 1)
              }
            )
          )
        )
        .reduce((prev, next) => prev.concat(next))
        .forEach(
          (v, i) =>
            (tmpdata[v.position] = {
              v: v.v
            })
        );
      var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
      console.log(outputPos[outputPos.length - 1]);
      var tmpWB = {
        SheetNames: ["mySheet"], //保存的表标题
        Sheets: {
          mySheet: Object.assign(
            {},
            tmpdata, //内容
            {
              "!ref": outputPos[0] + ":" + outputPos[outputPos.length - 1] //设置填充区域
            }
          )
        }
      };

      tmpDown = new Blob(
        [
          vm.s2ab(
            xlsx.write(
              tmpWB,
              {
                bookType: type == undefined ? "xlsx" : type,
                bookSST: false,
                type: "binary"
              } //这里的数据是用来定义导出的格式类型
            )
          )
        ],
        {
          type: ""
        }
      ); //创建二进制对象写入转换好的字节流
      var href = URL.createObjectURL(tmpDown); //创建对象超链接
      let hf = document.createElement("a");
      document.body.appendChild(hf);
      hf.href = href;
      hf.download = `${title}.xlsx`; //绑定a标签download="这里是下载的文件名.xlsx"
      hf.click(); //模拟点击实现下载
      setTimeout(function() {
        //延时释放
        URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
      }, 100);
    },

    s2ab(s) {
      //字符串转字符流
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    },

    // 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
    getCharCol(n) {
      let temCol = "",
        s = "",
        m = 0;
      while (n > 0) {
        m = n % 26 + 1;
        s = String.fromCharCode(m + 64) + s;
        n = (n - m) / 26;
      }
      return s;
    }
  }
};

export default myMixin;
