import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home";
import { routeopcode } from "@/authority/authoritylist";
// import admin from '../view/admin-manage/admin'
// import groupset from '../view/admin-manage/groupsetting'
// import one from '@/components/routeone'
// import two from '@/components/routetwo'
import login from "@/components/login";
import all from "../view/index.js";
import { getStore } from "@/utils";
Vue.use(Router);
let {
  channelGAStatisics,
  personGAStatisics,
  userBackpack,
  configurelMange,
  blackListlMange,
  retainedUserStatistics,
  backflowUserStatistics,
  onlineTimeStatistics,
  admin,
  operationRecord,
  anchor,
  sysmailMange,
  regisinfoquery,
  // balanceQuery,
  onlineStatistics,
  registerStatistics,
  personalScanCodeStatistics,
  channelScanCodeStatistics,
  makechampionshipsrobotinfo,
  makequalifyingrobotinfo,
  makeIndianarobotinfo,
  sweepCodeRecording,
  queryrobotinfo,
  superviserobotinfo,
  robotinfostatistics,
  gagMange,
  exchangelMange,
  channelMange,
  freezeMange,
  rechargeMange,
  recordsConsumption,
  channelRechargeRecord,
  addUserStatistics,
  personlRechargeRecord,

  activityMange,
  advertisementMange,
  channelExchangeRecord,
  personalExchangeRecord,
  growUpMange,
  mailMange,
  noticeMange,
  otherMange,
  propDeploy,
  shoppingMange,
  signMange,
  vipRedeployMange,
  advertConMange,
  propPackDeploy,
  propArtDeploy,
  // texasHoldem,//德州扑克
  // 	teActiveManage,
  teIndianaManage,
  teShopManage,
  avatarReward,
  daylyTitleRanking,
  quaBasis,
  quaRomConfigure,
  seasonRanking,
  weeklyTitleRanking,
  anchorsManage,
  jackpotManage,
  matchActManage,
  rewardNotice,
  rewardRules,
  teInromeManage,
  pickedContent,
  serverMange,
  propresource,
  rechargeRecord,
  noticem,
  userMange,
  exchangeRecord,
  propsUse,
  playerMessage,
  gameRecord,
  expenseCalendar,
  allData,
  clickEventQuery,
  personlConsumerRecord,
  channelConsumerRecord,
  dashboard
} = all;

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
    meta: { auth: false }
  },
  {
    path: "",
    redirect: "/home"
  },

  {
    path: "/home",
    name: "home",
    component: home,

    children: [
      {
        path: "admin",
        name: "admin",
        component: admin
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: dashboard
      },
      {
        path: "channelMange",
        name: "channelMange",
        component: channelMange
      },
      {
        path: "userBackpack",
        name: "userBackpack",
        component: userBackpack
      },

      {
        path: "operationRecord",
        name: "operationRecord",
        component: operationRecord
      },
      {
        path: "registerStatistics",
        name: "registerStatistics",
        component: registerStatistics
      },
      {
        path: "exchangeRecord",
        name: "exchangeRecord",
        component: exchangeRecord
      },
      {
        path: "makechampionshipsrobotinfo",
        name: "makechampionshipsrobotinfo",
        component: makechampionshipsrobotinfo
      },
      {
        path: "makequalifyingrobotinfo",
        name: "makequalifyingrobotinfo",
        component: makequalifyingrobotinfo
      },
      {
        path: "makeIndianarobotinfo",
        name: "makeIndianarobotinfo",
        component: makeIndianarobotinfo
      },
      {
        path: "retainedUserStatistics",
        name: "retainedUserStatistics",
        component: retainedUserStatistics
      },
      {
        path: "backflowUserStatistics",
        name: "backflowUserStatistics",
        component: backflowUserStatistics
      },
      {
        path: "channelGAStatisics",
        name: "channelGAStatisics",
        component: channelGAStatisics
      },
      {
        path: "personGAStatisics",
        name: "personGAStatisics",
        component: personGAStatisics
      },
      {
        path: "onlineTimeStatistics",
        name: "onlineTimeStatistics",
        component: onlineTimeStatistics
      },
      {
        path: "sysmailMange",
        name: "sysmailMange",
        component: sysmailMange
      },
      {
        path: "queryrobotinfo",
        name: "queryrobotinfo",
        component: queryrobotinfo
      },
 {
        path: "blackListlMange",
        name: "blackListlMange",
        component: blackListlMange
      },
 {
        path: "configurelMange",
        name: "configurelMange",
        component: configurelMange
      },

      {
        path: "superviserobotinfo",
        name: "superviserobotinfo",
        component: superviserobotinfo
      },
      {
        path: "robotinfostatistics",
        name: "robotinfostatistics",
        component: robotinfostatistics
      },
      {
        path: "onlineStatistics",
        name: "onlineStatistics",
        component: onlineStatistics
      },
      {
        path: "exchangelMange",
        name: "exchangelMange",
        component: exchangelMange
      },

      {
        path: "rechargeRecord",
        name: "rechargeRecord",
        component: rechargeRecord
      },
      {
        path: "personalScanCodeStatistics",
        name: "personalScanCodeStatistics",
        component: personalScanCodeStatistics
      },

      {
        path: "channelScanCodeStatistics",
        name: "channelScanCodeStatistics",
        component: channelScanCodeStatistics
      },
      {
        path: "sweepCodeRecording",
        name: "sweepCodeRecording",
        component: sweepCodeRecording
      },
      {
        path: "channelRechargeRecord",
        name: "channelRechargeRecord",
        component: channelRechargeRecord
      },
      {
        path: "channelConsumerRecord",
        name: "channelConsumerRecord",
        component: channelConsumerRecord
      },
      {
        path: "personalExchangeRecord",
        name: "personalExchangeRecord",
        component: personalExchangeRecord
      },
      {
        path: "channelExchangeRecord",
        name: "channelExchangeRecord",
        component: channelExchangeRecord
      },
      {
        path: "personlConsumerRecord",
        name: "personlConsumerRecord",
        component: personlConsumerRecord
      },

      {
        path: "personlRechargeRecord",
        name: "personlRechargeRecord",
        component: personlRechargeRecord
      },

      {
        path: "serverMange",
        name: "serverMange",
        component: serverMange
      },

      {
        path: "propsUse",
        name: "propsUse",
        component: propsUse
      },
      {
        path: "playerMessage",
        name: "playerMessage",
        component: playerMessage
      },
      {
        path: "gameRecord",
        name: "gameRecord",
        component: gameRecord
      },
      {
        path: "addUserStatistics",
        name: "addUserStatistics",
        component: addUserStatistics
      },
      {
        path: "expenseCalendar",
        name: "expenseCalendar",
        component: expenseCalendar
      },
      {
        path: "allData",
        name: "allData",
        component: allData
      },
      {
        path: "clickEventQuery",
        name: "clickEventQuery",
        component: clickEventQuery
      },
      {
        path: "propresource",
        name: "propresource",
        component: propresource
      },

      {
        path: "noticem",
        name: "noticem",
        component: noticem
      },
      {
        path: "userMange",
        name: "userMange",
        component: userMange
      },
      {
        path: "regisinfoquery",
        name: "regisinfoquery",
        component: regisinfoquery
      },
      // {
      // path:"balanceQuery",
      // name:"balanceQuery",
      // component:balanceQuery,
      // },
      {
        path: "gagMange",
        name: "gagMange",
        component: gagMange
      },
      {
        path: "freezeMange",
        name: "freezeMange",
        component: freezeMange
      },
      {
        path: "rechargeMange",
        name: "rechargeMange",
        component: rechargeMange
      },
      {
        path: "recordsConsumption",
        name: "recordsConsumption",
        component: recordsConsumption
      },
      //运营管理
      {
        path: "activityMange",
        name: "activityMange",
        component: activityMange
      },
      {
        path: "advertisementMange",
        name: "advertisementMange",
        component: advertisementMange
      },
      {
        path: "growUpMange",
        name: "growUpMange",
        component: growUpMange
      },

      {
        path: "mailMange",
        name: "mailMange",
        component: mailMange
      },

      {
        path: "noticeMange",
        name: "noticeMange",
        component: noticeMange
      },
      {
        path: "otherMange",
        name: "otherMange",
        component: otherMange
      },
      {
        path: "propDeploy",
        name: "propDeploy",
        component: propDeploy
      },
      {
        path: "propPackDeploy",
        name: "propPackDeploy",

        component: propPackDeploy
      },
      {
        path: "propArtDeploy",
        name: "propArtDeploy",
        component: propArtDeploy
      },
      {
        path: "pickedContent",
        name: "pickedContent",
        component: pickedContent
      },
      {
        path: "shoppingMange",
        name: "shoppingMange",
        component: shoppingMange
      },

      {
        path: "signMange",
        name: "signMange",
        component: signMange
      },
      {
        path: "vipRedeployMange",
        name: "vipRedeployMange",
        component: vipRedeployMange
      },
      {
        path: "advertConMange",
        name: "advertConMange",
        component: advertConMange
      },
      // {
      // 	path:"texasHoldem",
      // 	name:"texasHoldem",
      // 	component:texasHoldem,//德州扑克

      // },

      {
        path: "teIndianaManage",
        name: "teIndianaManage",
        component: teIndianaManage
      },
      {
        path: "teInromeManage",
        name: "teInromeManage",
        component: teInromeManage
      },
      {
        path: "teShopManage",
        name: "teShopManage",
        component: teShopManage
      },
      {
        path: "weeklyTitleRanking",
        name: "weeklyTitleRanking",
        component: weeklyTitleRanking
      },
      {
        path: "seasonRanking",
        name: "seasonRanking",
        component: seasonRanking
      },
      {
        path: "quaRomConfigure",
        name: "quaRomConfigure",
        component: quaRomConfigure
      },
      {
        path: "quaBasis",
        name: "quaBasis",
        component: quaBasis
      },
      {
        path: "daylyTitleRanking",
        name: "daylyTitleRanking",
        component: daylyTitleRanking
      },
      {
        path: "avatarReward",
        name: "avatarReward",
        component: avatarReward
      },
      {
        path: "rewardRules",
        name: "rewardRules",
        component: rewardRules
      },
      {
        path: "rewardNotice",
        name: "rewardNotice",
        component: rewardNotice
      },
      {
        path: "matchActManage",
        name: "matchActManage",
        component: matchActManage
      },

      {
        path: "jackpotManage",
        name: "jackpotManage",
        component: jackpotManage
      },
      {
        path: "anchorsManage",
        name: "anchorsManage",
        component: anchorsManage
      },

      //运营管理
      {
        path: "anchor",
        name: "anchor",
        component: anchor
      }
    ]
  }
];

const router = new Router({
  // mode: 'hash',
  base: __dirname,
  routes
});

let checkIsOwn = routename => {
  let opcode = routeopcode[routename];
  let menuoper = JSON.parse(getStore("MENUOPER"));
  if (!opcode) return true;
  return menuoper.some(item => item.opCode == opcode);
};

router.beforeEach((to, from, next) => {
  var { auth = true } = to.meta;
  let isLogin = Boolean(sessionStorage.getItem("isLogin"));

  if (isLogin) {
    if (!checkIsOwn(to.name)) {
      console.log("终止跳转");
      return;
    }
  }

  if (auth && isLogin == false && to.path !== "/login") {
    return next({ path: "/login" });
  }

  next();
});

export default router;
