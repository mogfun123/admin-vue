// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./vuex/index";
import ElementUI from "element-ui";
import $ from "jquery";
import axios from "axios";
Vue.config.productionTip = false;

import "bootstrap/js/bootstrap.min.js";
import "bootstrap/css/bootstrap.min.css";
import "@/assets/css/font-awesome.min.css";
import "element-ui/lib/theme-default/index.css";
import "./style/common.css";
import zsTip from "components/tip-header";
import API from "@/api.js";
import queryBar from "components/queryBar";
import echartst from "components/echartst";
import echartpie from "components/echartpie";
import echartstack from "components/echartstack";
import echartbar from "components/echartbar/echartbar";
import zspagination from "components/zspagination";
Vue.component("zs-tip", zsTip);
Vue.component("query-Bar", queryBar);
Vue.component("echartst", echartst);
Vue.component("echartstack", echartstack);
Vue.component("echartbar", echartbar);
Vue.component("echartpie", echartpie);
Vue.component("zspagination", zspagination);
// import VueQuillEditor from 'vue-quill-editor'
var querystring = require("querystring");
Vue.prototype.API = API;
Vue.use(ElementUI);
import { Loading } from "element-ui";
// Vue.use(VueQuillEditor)
//添加请求拦截器
let loadingInstance = null;
//  loadingInstance = Vue.$loading({text:"请求..."})

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";
//POST传参序列化
axios.defaults.timeout = 20000;
axios.interceptors.request.use(
  function(config) {
    config.data = querystring.stringify(config.data);
    if ("/TitanGameCMS/common/getChannelList" == config.url) {
    } else {
      loadingInstance = Loading.service({});
    }

    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function(response) {
    loadingInstance.close();
    return response;
  },
  function(error) {
    loadingInstance.close();
    return Promise.reject(error);
  }
);
API.Apicommongetenvironment().then(res => {
  let head = document.getElementsByTagName("head")[0];
  let link = document.createElement("link");
  link.rel = "shortcut icon";
  link.type = "image/x-icon";
  console.log(res.data.data);
  if (res.data.data == 1) {
    link.href = "./static/img/favicon1.ico";
    document.title = "必赢德扑管理系统";
  } else if (res.data.data == 0) {
    link.href = "./static/img/favicon.ico";
    document.title = "泰坦竞技管理系统";
  }
  head.appendChild(link);
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: { App }
});
