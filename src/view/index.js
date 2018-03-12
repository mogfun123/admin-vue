import admin from "./admin-manage/admin";
import operationRecord from "./admin-manage/operationRecord";
import anchor from "./admin-manage/anchoradmin";
import regisinfoquery from "./gameuser-manage/registrationInfoQuery";
import userBackpack from "./gameuser-manage/userBackpack";
// import balanceQuery from './gameuser-manage/balanceQuery'
import gagMange from "./gameuser-manage/gagMange";
import freezeMange from "./gameuser-manage/freezeMange";
import rechargeMange from "./order-manage/rechargeMange";
import recordsConsumption from "./order-manage/recordsConsumption";
import activityMange from "./operate-manage/activityMange";
import channelMange from "./operate-manage/channelMange";
import advertisementMange from "./operate-manage/advertisementMange";
import growUpMange from "./operate-manage/growUpMange";
import mailMange from "./mail-Mange/mailMange";
import sysmailMange from "./mail-Mange/sysmailMange";
import noticeMange from "./operate-manage/noticeMange";
import otherMange from "./operate-manage/otherMange";
import propDeploy from "./operate-manage/propDeploy";
import propArtDeploy from "./operate-manage/propArtDeploy";
import pickedContent from "./operate-manage/pickedContent";
import noticem from "./operate-manage/noticem";
import blackListlMange from "./operate-manage/indiana-win-Mange/blackListlMange";
import configurelMange from "./operate-manage/indiana-win-Mange/configurelMange";
import allData from "./data-statistics/allData";
import clickEventQuery from "./data-statistics/clickEventQuery";
import expenseCalendar from "./data-statistics/expenseCalendar";
import gameRecord from "./data-statistics/gameRecord";
import playerMessage from "./data-statistics/playerMessage";
import propsUse from "./data-statistics/propsUse";
import rechargeRecord from "./order-manage/rechargeRecord";
import addUserStatistics from "./data-statistics/userStatistics/addUserStatistics";
import onlineStatistics from "./data-statistics/userStatistics/onlineStatistics";
import registerStatistics from "./data-statistics/userStatistics/registerStatistics";

import backflowUserStatistics from "./data-statistics/userStatistics/backflowUserStatistics";
import onlineTimeStatistics from "./data-statistics/userStatistics/onlineTimeStatistics";
import retainedUserStatistics from "./data-statistics/userStatistics/retainedUserStatistics";

import sweepCodeRecording from "./data-statistics/shareStatistics/sweepCodeRecording";
import channelScanCodeStatistics from "./data-statistics/shareStatistics/channelScanCodeStatistics";
import personalScanCodeStatistics from "./data-statistics/shareStatistics/personalScanCodeStatistics";

import propPackDeploy from "./operate-manage/propPackDeploy";
import exchangelMange from "./operate-manage/exchangelMange";
import shoppingMange from "./operate-manage/shoppingMange";
import signMange from "./operate-manage/signMange";
import vipRedeployMange from "./operate-manage/vipRedeployMange";
import advertConMange from "./operate-manage/advertConMange";
// import texasHoldem from './game-manage/texasHoldem'
// import teActiveManage from './game-manage/subviews/teActiveManage'
import teIndianaManage from "./game-manage/indianas/teIndianaManage";
import teInromeManage from "./game-manage/indianas/teInromeManage";
import teShopManage from "./game-manage/indianas/teShopManage";
import avatarReward from "./game-manage/qualifying/avatarReward";
import daylyTitleRanking from "./game-manage/qualifying/daylyTitleRanking";
import quaBasis from "./game-manage/qualifying/quaBasis";
import quaRomConfigure from "./game-manage/qualifying/quaRomConfigure";
import seasonRanking from "./game-manage/qualifying/seasonRanking";
import weeklyTitleRanking from "./game-manage/qualifying/weeklyTitleRanking";
import anchorsManage from "./game-manage/stadium/anchorsManage";
import jackpotManage from "./game-manage/stadium/jackpotManage";
import matchActManage from "./game-manage/stadium/matchActManage";
import rewardNotice from "./game-manage/stadium/rewardNotice";
import rewardRules from "./game-manage/stadium/rewardRules";

import serverMange from "./server-mange/serverMange";
import userMange from "./gameuser-manage/userMange";
import propresource from "./order-manage/propresource";
import exchangeRecord from "./order-manage/exchangeRecord";
import channelRechargeRecord from "./data-statistics/records/channelRechargeRecord";
import personlRechargeRecord from "./data-statistics/records/personlRechargeRecord";
import channelExchangeRecord from "./data-statistics/exchangeStatistics/channelExchangeRecord";
import personalExchangeRecord from "./data-statistics/exchangeStatistics/personalExchangeRecord";
import channelConsumerRecord from "./data-statistics/consumerStatistics/channelConsumerRecord";
import personlConsumerRecord from "./data-statistics/consumerStatistics/personlConsumerRecord";
import queryrobotinfo from "./robot-mange/queryrobotinfo";
import makeIndianarobotinfo from "./robot-mange/makerobotinfo/makeIndianarobotinfo";
import makequalifyingrobotinfo from "./robot-mange/makerobotinfo/makequalifyingrobotinfo";
import makechampionshipsrobotinfo from "./robot-mange/makerobotinfo/makechampionshipsrobotinfo";
import superviserobotinfo from "./robot-mange/superviserobotinfo";
import robotinfostatistics from "./robot-mange/robotinfostatistics";
import channelGAStatisics from "./data-statistics/growthActivitieStatisics/channelGrowthActivitieStatisics";
import personGAStatisics from "./data-statistics/growthActivitieStatisics/personGrowthActivitieStatisics";

// 首页
import dashboard from "./dashboard";

export default {
  channelGAStatisics,
  personGAStatisics,
  userBackpack,
  retainedUserStatistics,
  backflowUserStatistics,
  onlineTimeStatistics,
  propresource,
  configurelMange,
  personlConsumerRecord,
  makechampionshipsrobotinfo,
  makequalifyingrobotinfo,
  makeIndianarobotinfo,
  queryrobotinfo,
  superviserobotinfo,
  robotinfostatistics,
  channelConsumerRecord,
  channelRechargeRecord,
  personlRechargeRecord,
  personalExchangeRecord,
  channelExchangeRecord,
  personalScanCodeStatistics,
  channelScanCodeStatistics,
  sweepCodeRecording,
  blackListlMange,
  sysmailMange,
  exchangeRecord,
  exchangelMange,
  channelMange,
  userMange,
  admin,
  noticem,
  operationRecord,
  anchor,
  addUserStatistics,
  regisinfoquery,
  // balanceQuery,
  gagMange,
  freezeMange,
  registerStatistics,
  rechargeMange,
  recordsConsumption,
  activityMange,
  advertisementMange,
  growUpMange,
  mailMange,
  noticeMange,
  otherMange,
  propDeploy,
  shoppingMange,
  signMange,
  vipRedeployMange,
  advertConMange,
  teInromeManage,
  pickedContent,
  serverMange,
  onlineStatistics,
  // texasHoldem,
  // teActiveManage,
  rechargeRecord,
  propsUse,
  playerMessage,
  gameRecord,
  expenseCalendar,
  allData,
  clickEventQuery,
  teIndianaManage,
  propPackDeploy,
  propArtDeploy,
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
  dashboard
};
