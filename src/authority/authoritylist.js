import Vue from "vue";
let authortylist = [
  [
    //后台用户管理
    {
      routename: "admin",
      label: "后台用户管理",
      opCode: "0101"
    },
    {
      routename: "anchor",
      label: "后台角色管理",
      opCode: "0102"
    },
    {
      routename: "operationRecord",
      label: "操作记录",
      opCode: "0103"
    }
  ],
   
  [
    //游戏用户管理
    {
      routename: "regisinfoquery",
      label: "用户注册信息查询",
      opCode: "0301"
    },
    // {  routename:'balanceQuery',
    //     label:'用户余额查询',
    //       opCode:'0302',
    // },
    {
      routename: "gagMange",
      label: "用户操作记录",
      opCode: "0303"
    },

    {
      routename: "userMange",
      label: "用户操作",
      opCode: "0304"
    },
    {
      routename: "userBackpack",
      label: "用户背包",
      opCode: "0305"
    }
  ],
  [
    //运营管理

    { label: "公告管理", routename: "noticem", opCode: "0511" },
    { label: "跑马灯", routename: "noticeMange", opCode: "0501" },

    // {label:"商城管理",routename:'shoppingMange',opCode:'0502',},
    // {label:"活动管理",routename:'activityMange',opCode:'0503',},
    //  {label:"本周精选",routename:'pickedContent',opCode:'0504',},
    {
      label: "广告管理",
      routename: "advertisementMange",
      opCode: "0505",
      children: [
        { label: "广告界面管理", routename: "advertisementMange", opCode: "050501" },
        { label: "广告内容管理", routename: "advertConMange", opCode: "050502" }
      ]
    },
    // { label: "渠道管理", routename: "channelMange", opCode: "0512" },
    { label: "兑换码管理", routename: "exchangelMange", opCode: "0513" },
    { label: "中奖配置管理", routename: "blackListlMange", opCode: "0514" ,
   children: [
        { label: "黑名单管理", routename: "blackListlMange", opCode: "051401" },
        { label: "夺宝场中奖管理", routename: "configurelMange", opCode: "051402" }
      ]}
    // {label:"邮件管理",routename:'mailMange',opCode:'0506'},
    // {label:"签到奖励管理",routename:'signMange',opCode:'0507',},
    // {label:"Vip管理",routename:'vipRedeployMange',opCode:'0508'},
    // // {label:"成长指引系统配置",routename:'growUpMange'},
    //  {label:"道具配置",routename:"propDeploy",opCode:'0509',children:[{label:"道具属性",routename:"propDeploy",opCode:'050901'},
    //           {label:"道具美术资源",routename:"propArtDeploy",opCode:'050902'}, {label:"礼包道具",routename:"propPackDeploy",opCode:'050903'}]},

    //  {label:"其他配置",routename:'otherMange',opCode:'0510'},
  ],
  [
    //订单管理
    {
      routename: "rechargeMange",
      label: "充值订单管理",
      opCode: "0401"
    },
    {
      routename: "recordsConsumption",
      label: "消费记录查询",
      opCode: "0402"
    },
    {
      routename: "exchangeRecord",
      label: "兑换记录",
      opCode: "0404"
    },
    {
      routename: "propresource",
      label: "道具管理",
      opCode: "0403"
    },
    {
      routename: "rechargeRecord",
      label: "后台充值管理",
      opCode: "0405"
    }
  ],
  [
    //邮件管理
    {
      routename: "mailMange",
      label: "后台邮件",
      opCode: "0701"
    },
    {
      routename: "sysmailMange",
      label: "系统邮件",
      opCode: "0702"
    }
  ],
  [
    //数据统计

    {
      routename: "allData",
      label: "整体数据统计",
      opCode: "0809"
    },

    {
      routename: "",
      label: "充值统计",
      opCode: "0801",
      children: [
        {
          routename: "personlRechargeRecord",
          label: "个人充值统计",
          opCode: "080101"
        },
        {
          routename: "channelRechargeRecord",
          label: "渠道充值统计",
          opCode: "080102"
        }
      ]
    },
    {
      routename: "",
      label: "消费统计",
      opCode: "0802",
      children: [
        {
          routename: "personlConsumerRecord",
          label: "个人消费统计",
          opCode: "080201"
        },
        {
          routename: "channelConsumerRecord",
          label: "渠道消费统计",
          opCode: "080202"
        }
      ]
    },
    {
      routename: "",
      label: "通币兑换统计",
      opCode: "0807",
      children: [
        {
          routename: "personalExchangeRecord",
          label: "个人兑换统计",
          opCode: "080701"
        },
        {
          routename: "channelExchangeRecord",
          label: "渠道兑换统计",
          opCode: "080702"
        }
      ]
    },
    {
      routename: "",
      label: "用户统计",
      opCode: "0803",
      children: [
        {
          routename: "registerStatistics",
          label: "注册统计",
          opCode: "080303"
        },
        {
          routename: "addUserStatistics",
          label: "新增用户",
          opCode: "080301"
        },
        {
          routename: "onlineStatistics",
          label: "在线统计",
          opCode: "080302"
        },

        {
          routename: "onlineTimeStatistics",
          label: "在线时长统计",
          opCode: "080304"
        },
        {
          routename: "retainedUserStatistics",
          label: "留存统计",
          opCode: "080305"
        },
        {
          routename: "backflowUserStatistics",
          label: "回流统计",
          opCode: "080306"
        }

        //                         {
        //    routename:"channelRechargeRecord",
        //     label:'渠道充值统计',
        //     opCode:'080102',
        // }
      ]
    },
    {
      routename: "",
      label: "分享统计",
      opCode: "0808",
      children: [
        {
          routename: "sweepCodeRecording",
          label: "扫码记录",
          opCode: "080801"
        },
        {
          routename: "personalScanCodeStatistics",
          label: "个人分享统计",
          opCode: "080802"
        },
        {
          routename: "channelScanCodeStatistics",
          label: "渠道分享统计",
          opCode: "080803"
        }
      ]
    },
    {
      routename: "",
      label: "成长活动统计",
      opCode: "0810",
      children: [
        {
          routename: "personGAStatisics",
          label: "个人成长活动统计",
          opCode: "081001"
        },
        {
          routename: "channelGAStatisics",
          label: "渠道成长活动统计",
          opCode: "081002"
        }
      ]
    },

    {
      routename: "propsUse",
      label: "道具统计",
      opCode: "0805"
    },
    {
      routename: "clickEventQuery",
      label: "事件统计",
      opCode: "0806"
    }
  ],
  [
    //德州扑克
    {
      label: "夺宝场",
      routename: "teShopManage",
      opCode: "0601",
      children: [
        { label: "商品管理", routename: "teShopManage", opCode: "060101" },
        { label: "夺宝管理", routename: "", opCode: "060102" },
        { label: "房间管理", routename: "teInromeManage", opCode: "060103" }
      ]
    },
    {
      label: "排位赛",
      routename: "",
      opCode: "0602",
      children: [
        { label: "排位赛基础属性", routename: "quaBasis", opCode: "060201" },
        { label: "排位赛房间属性配置", routename: "quaRomConfigure", opCode: "060202" },
        { label: "赛季头衔奖励配置", routename: "avatarReward", opCode: "060203" },
        { label: "赛季排名奖励", routename: "seasonRanking", opCode: "060203" },
        { label: "周头衔排名", routename: "weeklyTitleRanking", opCode: "060203" },
        { label: "日头衔奖励", routename: "daylyTitleRanking", opCode: "060203" }
      ]
    },
    {
      label: "主播赛场",
      routename: "",
      opCode: "0603",
      children: [
        { label: "比赛活动管理", routename: "matchActManage", opCode: "060301" },
        // {label:"主播管理",routename:"anchorsManage"},
        { label: "奖池管理", routename: "jackpotManage", opCode: "060302" },
        { label: "奖励预告配置", routename: "rewardNotice", opCode: "060303" },
        { label: "活动规则配置", routename: "rewardRules", opCode: "060304" }
      ]
    }
  ],
  [
    //服务器管理
    {
      routename: "serverMange",
      label: "服务器",
      opCode: "0201"
    }
  ],
  [],
  [
    //机器人管理
    {
      routename: "queryrobotinfo",
      label: "机器人信息查询",
      opCode: "0201"
    },
    {
      routename: "makerobotinfo",
      label: "机器人配置",
      opCode: "0802",
      children: [
        { label: "夺宝场配置", routename: "makeIndianarobotinfo", opCode: "080201" },
        {
          label: "排位赛配置",
          routename: "makequalifyingrobotinfo",
          opCode: "080201"
        },
        {
          label: "锦标赛赛配置",
          routename: "makechampionshipsrobotinfo",
          opCode: "080201"
        }
        // {label:"夺宝场配置",routename:"makerobotinfo",opCode:'020101'},
      ]
    },
    {
      routename: "superviserobotinfo",
      label: "机器人监管",
      opCode: "0201"
    },
    {
      routename: "robotinfostatistics",
      label: "机器人统计",
      opCode: "0201"
    }
  ]
];

function isObject(val) {
  return val && {}.toString.call(val) === "[object Object]";
}
function isArray(val) {
  return val && {}.toString.call(val) === "[object Array]";
}

let list = {},
  routeopcode = {};

var ArrayToList = function(objOrarr) {
  if (isArray(objOrarr)) {
    objOrarr.forEach(item => {
      ArrayToList(item);
    });
  }

  if (isObject(objOrarr)) {
    if ("routename" in objOrarr) {
      routeopcode[objOrarr.routename] = objOrarr["opCode"];
    }
    if ("children" in objOrarr) {
      ArrayToList(objOrarr.children);
    }
  }
};
ArrayToList(authortylist);

export { routeopcode };

export default authortylist;
