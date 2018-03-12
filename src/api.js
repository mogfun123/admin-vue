let API_URL = `/TitanGameCMS`;
const APIKEYS = {
  ApiDashboard: `${API_URL}/data/home/realTimeStatistic`,
  ApiTwistsStatisticPic: `${API_URL}/data/home/twistsStatisticPic`,
  Apilogin: `${API_URL}/admin/in`,
  ApicommongetChannelList: `${API_URL}/common/getChannelList`,
  Apicommongetenvironment: `${API_URL}/common/environment`,
  //用户成功进入主界面
  ApiSuccessMain: `${API_URL}/admin/main`,
  //修改密码
  ApiupdUserPwd: `${API_URL}/admin/user/updUserPwd`,
  //后台用户退出
  Apiadminout: `${API_URL}/admin/out`,
  //查询所有用户
  ApiQueryUserList: `${API_URL}/admin/user/queryUserList`,
  //添加用户
  ApiaddUser: `${API_URL}/admin/user/addUser`,
  //重置密码
  ApiresetUserPassword: `${API_URL}/admin/user/resetUserPassword`,
  //用户账号禁用/解禁
  ApiuserStatus: `${API_URL}/admin/user/userStatus`,
  //根据用户id 返回用户角色信息
  ApiuserRoleById: `${API_URL}/admin/user/userRoleById`,
  //设置用户角色
  ApiuserSetUserRole: `${API_URL}/admin/user/setUserRole`,
  //操作记录
  ApiqueryLogList: `${API_URL}/admin/log/queryLogList`,

  //查询游戏用户列表
  ApiqueryGameUserList: `${API_URL}/gameUser/queryGameUserList`,
  //查询游戏用户背包
  ApiqueryGameUserBackInfo: `${API_URL}/gameUser/queryGameUserBackInfo`,
  //查询用户余额
  ApiqueryGameUserWallet: `${API_URL}/gameUser/queryGameUserWallet`,
  //查询游戏用户禁言状态列表
  ApiqueryGameUserGagList: `${API_URL}/gameUser/queryGameUserOperateRecordList`,
  //游戏用户禁言
  ApigameUserGag: `${API_URL}/gameUser/gag/gameUserGag`,
  //游戏用户解禁
  ApiupdateGameUserGag: `${API_URL}/gameUser/gag/updateGameUserGag`,
  //查询游戏用户账号状态列表
  ApiqueryGameUserSealList: `${API_URL}/gameUser/seal/queryGameUserSealList`,
  //游戏用户账号封号
  ApigameUserSeal: `${API_URL}/gameUser/seal/gameUserSeal`,
  //游戏用户账号解封
  ApiupdateGameUserSeal: `${API_URL}/gameUser/seal/updateGameUserSeal`,
  //删除玩家
  ApigameUserdeletePlayer: `${API_URL}/gameUser/deletePlayer`,
  //恢复玩家
  ApigameUserrecoverPlayer: `${API_URL}/gameUser/recoverPlayer`,
  // 订单管理接口!!!!!!!!!!

  //查询充值订单
  ApiqueryRechargeOrder: `${API_URL}/order/queryRechargeOrder`,
  //订单管理-消费记录
  ApiqueryCustomdata: `${API_URL}/order/queryCustomData`,
  //订单管理-消费记录-总额
  ApiqueryCustomTotal: `${API_URL}/order/queryCustomTotal`,
  //----------------------------------运营管理接口------------
  //添加公告/公告修改
  ApisaveAnnouncement: `${API_URL}/gameOperation/bulletin/saveBulletin`,
  //公告查询
  ApiqueryAnnouncement: `${API_URL}/gameOperation/bulletin/queryBulletin`,
  //公告删除
  ApideleteAnnouncement: `${API_URL}/gameOperation/bulletin/deleteBulletin`,
  //公告推送
  ApipushBulletin: `${API_URL}/gameOperation/bulletin/pushBulletin`,
  //渠道
  Apiquerychannel: `${API_URL}/gameOperation/channel/queryChannel`,
  //添加渠道
  ApiquerysaveChannel: `${API_URL}/gameOperation/channel/saveChannel`,
  //删除渠道
  ApiquerydeleteChannel: `${API_URL}/gameOperation/channel/deleteChannel`,
  //更新渠道
  ApiupdateChannel: `${API_URL}/gameOperation/channel/updateChannel`,
  //添加商品
  ApicsaveCommodity: `${API_URL}/gameOperation/mall/saveMall`,
  //查询商品列表
  ApiqueryCommodity: `${API_URL}/gameOperation/mall/queryMall`,
  //商品上架下架
  ApiupdCommodityState: `${API_URL}/gameOperation/mall/updateGoodsState`,
  //--------------------------图片上传----------------
  ApiuploadImg: `${API_URL}/upload/uploadImg`,
  //删除商品
  ApideleteCommodity: `${API_URL}/gameOperation/mall/deleteGoods`,
  //查询活动
  ApiqueryActive: `${API_URL}/gameOperation/active/queryActive`,
  //删除活动
  ApideleteActive: `${API_URL}/gameOperation/active/deleteActive`,
  //修改活动
  ApisaveActive: `${API_URL}/gameOperation/active/saveActive`,
  //添加公告
  ApisaveBulletinLogin: `${API_URL}/gameOperation/bulletin/saveBulletinLogin`,
  //删除公告
  ApideleteBulletinLogin: `${API_URL}/gameOperation/bulletin/deleteBulletinLogin`,
  //查询公告
  ApiqueryBulletinLogin: `${API_URL}/gameOperation/bulletin/queryBulletinLogin`,

  //增加轮播式活动
  ApiaddActive: `${API_URL}/gameOperation/active/saveActive`,
  //选择任务类型
  ApisaveTaskActive: `${API_URL}/gameOperation/active/selectTaskType`,
  //查询id
  ApiActivequeryById: `${API_URL}/gameOperation/active/queryById`,

  //签到奖励接口 -查询活动
  ApiqueryReport: `${API_URL}/gameOperation/signAward/querySignAward`,
  //查询全局黑名单

  ApiqueryGlobalBlacklist: `${API_URL}/gameOperation/matchBlackWhite/queryGlobalBlacklist`,
  ApiaddGlobalBlacklist: `${API_URL}/gameOperation/matchBlackWhite/addGlobalBlacklist`,
  ApideleteGlobalBlacklist: `${API_URL}/gameOperation/matchBlackWhite/updGlobalBlacklist`,
  ApiaddMatchBlackOrWhite: `${API_URL}/gameOperation/matchBlackWhite/addMatchBlackOrWhite`,
  ApiupdMatchBlackWhite: `${API_URL}/gameOperation/matchBlackWhite/updMatchBlackWhite`,
  ApiqueryAwardConfigureList: `${API_URL}/gameOperation/matchBlackWhite/queryAwardConfigureList`,
  //增加活动
  ApisaveReport: `${API_URL}/gameOperation/signAward/saveSignAward`,
  //修改活动
  ApissaveReport: `${API_URL}/gameOperation/signAward/saveSignAward`,
  //删除活动
  ApideleteReport: `${API_URL}/gameOperation/signAward/deleteSignAward`,

  //广告管理-增加界面
  ApisaveUi: `${API_URL}/gameOperation/advert/saveAdvert`,
  //查询界面
  ApiqueryUi: `${API_URL}/gameOperation/advert/queryAdvert`,
  //添加/修改广告内容配置
  ApisaveAdvertContent: `${API_URL}/gameOperation/advert/saveAdvertContent`,
  //删除
  ApiAdvertdeleteAdvertById: `${API_URL}/gameOperation/advert/deleteAdvertById`,
  //查询页面id 模块
  ApiqueryAdvertContentByAid: `${API_URL}/gameOperation/advert/queryAdvertContentByAid `,

  ////根据id查询广告
  ApiqueryAdvertContentById: `${API_URL}/gameOperation/advert/queryAdvertContentById`,
  //查询广告
  ApiqueryAdvertContent: `${API_URL}/gameOperation/advert/queryAdvertContent`,
  //广告开启
  ApideleteAdvertContent: `${API_URL}/gameOperation/advert/isEnableAdvertContent `,
  //删除
  ApideleteAdvertContentById: `${API_URL}/gameOperation/advert/deleteAdvertContentById`,
  ////
  // ApisaveContent: `${API_URL}/gameOperation/saveContent`,

  //邮件管理
  //发送邮件
  ApiaddEmail: `${API_URL}/email/addEmail`,
  //查询邮件
  ApiemailQueryList: `${API_URL}/email/emailQueryList`,
  //查询系统邮件
  ApiquerySystemEmailList: `${API_URL}/email/querySystemEmailList`,
  //邮件发送给玩家
  ApiupdEmailStatus: `${API_URL}/email/updEmailStatus`,

  //VIP- 管理 /vip配置修改
  ApiupdateMember: `${API_URL}/gameOperation/vip/updateVip`,
  //VIP查询
  ApimemberQuery: `${API_URL}/gameOperation/vip/vipQuery`,
  //vip权限增加
  ApisaveMemberManage: `${API_URL}/gameOperation/vip/saveVipManage`,
  ///vip配置修改
  ApimemberManageQueryList: `${API_URL}/gameOperation/vip/vipManageQueryList`,
  //vip配置删除
  ApidelMemberManage: `${API_URL}/gameOperation/vip/delVipManage`,

  //敏感词增加/修改
  ApisaveSensitiveWord: `${API_URL}/gameOperation/other/saveSensitiveWord`,
  //敏感词删除
  ApidelWord: `${API_URL}/gameOperation/other/delSensitiveWord`,
  //敏感词查询
  ApiquerySensitiveWord: `${API_URL}/gameOperation/other/querySensitiveWord`,
  //5.9.2tip管理
  //添加提示/tips修改
  ApisaveTips: `${API_URL}/gameOperation/other/saveTips`,
  ///tips查询
  ApitipsQueryList: `${API_URL}/gameOperation/other/tipsQueryList`,
  ///tips删除
  ApidelTips: `${API_URL}/gameOperation/other/delTips`,

  //5102道具美术资源配置

  //增加道具/道具修改
  ApisaveProp: `${API_URL}/gameOperation/props/saveProps`,
  //道具查询
  ApipropQueryList: `${API_URL}/gameOperation/props/propsQueryList`,
  //道具删除
  ApidelProp: `${API_URL}/gameOperation/props/delProps`,
  //5.10.2道具美术资源配置
  //美术道具增加/修改
  ApisavePropArt: `${API_URL}/gameOperation/props/savePropsArt`,
  //删除美术道具
  ApideletePropArt: `${API_URL}/gameOperation/props/deletePropsArt`,

  //美术道具查询???
  ApiqueryPropArt: `${API_URL}/gameOperation/props/queryPropsArt`,
  //5.10.3礼包道具属性
  //礼包道具增加/修改
  ApisaveAward: `${API_URL}/gameOperation/props/saveGiftBagProps`,
  //礼包道具删除
  ApidelAward: `${API_URL}/gameOperation/props/delGiftBagProps`,
  //礼包道具查询
  ApiqueryAward: `${API_URL}/gameOperation/props/queryGiftBagProps`,

  // <----------------游戏管理接口------------------->
  //夺宝场
  //添加/修改房间
  ApisaveRoom: `${API_URL}/gameConfig/snatchSite/saveRoom`,
  //删除房间
  ApidelRoom: `${API_URL}/gameConfig/snatchSite/delRoom`,
  //查询所有房间
  ApiroomQueryPage: `${API_URL}/gameConfig/snatchSite/roomQueryPage`,

  ApiroomBySynopsisAll: `${API_URL}/gameConfig/snatchSite/roomBySynopsisAll`,
  //添加/修改商品
  ApisaveCommodity: `${API_URL}/gameConfig/snatchSite/saveGoods`,
  //删除商品
  ApidelCommodity: `${API_URL}/gameConfig/snatchSite/delGoods`,

  //查询所有商品信息
  ApicommodityQueryPage: `${API_URL}/gameConfig/snatchSite/goodsQueryPage`,

  //查询所有商品名称
  ApicommodityByNameAll: `${API_URL}/gameConfig/snatchSite/goodsNameAll`,

  //添加/修改夺宝活动
  ApisaveActivity: `${API_URL}/gameConfig/snatchSite/saveActivity`,

  //删除夺宝活动
  ApidelActivity: `${API_URL}/gameConfig/snatchSite/delActivity`,

  //查询夺宝活动
  ApiactivityQueryPage: `${API_URL}/gameConfig/snatchSite/activityQueryPage`,

  //---------主播赛场-----------------
  //添加/修改比赛活动
  ApisaveAnchorActivity: `${API_URL}/gameConfig/anchorMatch/saveAnchorActivity`,

  //删除比赛活动
  ApidelAnchorActivity: `${API_URL}/gameConfig/anchorMatch/delAnchorActivity`,

  //查询比赛活动
  ApianchorActivityQueryPage: `${API_URL}/gameConfig/anchorMatch/anchorActivityQueryPage`,

  //修改活动状态
  ApisetAnchorStatus: `${API_URL}/gameConfig/anchorMatch/setActivityStatus`,

  //----------------奖池管理------------------------
  ///
  //监控主播赛场的每场比赛列表
  ApiqueryAnchorList: `${API_URL}/gameConfig/anchorMatch/queryAnchorList`,
  //监控主播赛场的每场比赛列表
  ApianchorStatistics: `${API_URL}/gameConfig/anchorMatch/anchorStatistics`,
  //操作奖池设置
  ApioperationJackpot: `${API_URL}/gameConfig/anchorMatch/operationJackpot`,

  //查询奖池调整记录
  ApijackpotQueryList: `${API_URL}/gameConfig/anchorMatch/jackpotQueryList`,

  //添加奖励
  ApisaveReward: `${API_URL}/gameConfig/season/saveReward`,
  //删除奖励
  ApidelReward: `${API_URL}/gameConfig/season/delReward`,
  //查询奖励
  ApirewardQueryPage: `${API_URL}/gameConfig/season/rewardQueryPage`,
  //-------排位赛-------------
  //添加/修改排位信息
  APIsaveSeason: `${API_URL}/gameConfig/season/saveSeason`,
  //删除排位赛
  APIdelSeason: `${API_URL}/gameConfig/season/delSeason`,
  //查询排位赛
  APIseasonQueryPage: `${API_URL}/gameConfig/season/seasonQueryPage`,

  //-------------------每周精选--------------------
  ////获取每周精选列表
  APIgetWeekHandpickList: `${API_URL}/gameOperation/handpick/getWeekHandpickList`,
  //添加/修改每周精选
  APIsaveWeekHandpick: `${API_URL}/gameOperation/handpick/saveWeekHandpick`,
  //根据id获取每周精选
  APIgetWeekHandpickById: `${API_URL}/gameOperation/handpick/getWeekHandpickById`,
  ////根据id修改每周精选是否启用
  APIupdWeekHandpickById: `${API_URL}/gameOperation/handpick/updWeekHandpickById`,

  ////服务器 - 踢人
  APIkickOff: `${API_URL}/gameUser/kickOff `,
  ////查询服务器状态
  APIcheckServerState: `${API_URL}/gameServer/checkServerState`,
  //重载基础数据
  APIclearCache: `${API_URL}/gameServer/clearCache`,
  //关闭服务器
  APIshutdownServer: `${API_URL}/gameServer/shutdownServer`,
  //封禁用户
  APIblockPlayer: `${API_URL}/gameUser/blockPlayer`,
  //解封用户
  APIunblockPlayer: `${API_URL}/gameUser/unblockPlayer`,
  //设置服务器标示 开启或者关闭
  APIopenServerAccess: `${API_URL}/gameServer/openServerAccess`,
  //添加
  APIaddPlayerProp: `${API_URL}/compensate/addPlayerProp`,
  //发放
  APIsendPlayerProp: `${API_URL}/compensate/sendPlayerProp`,
  //删除
  APIdelPlayerProp: `${API_URL}/compensate/delPlayerProp`,
  //查询
  APIqueryPlayerProp: `${API_URL}/compensate/queryPlayerProp`,
  //查询充值记录
  APIqueryRechargeRecord: `${API_URL}/compensate/queryRechargeRecord`,
  //增加充值记录
  APIaddRechargeRecord: `${API_URL}/compensate/addRechargeRecord`,
  //充值
  APIconfimRecharge: `${API_URL}/compensate/confimRecharge`,

  //-----------------------[[添加角色-----------------

  //查询所有角色
  APIAdminRoleAll: `${API_URL}/admin/role/roleAll`,
  //查询单个角色包括权限
  APIAdminRoleByRid: `${API_URL}/admin/role/selOperationByRid`, //rid
  // 添加角色
  APIAdminARole: `${API_URL}/admin/role/addRole`, //AbRole role
  // 删除角色
  APIAdmindelRole: `${API_URL}/admin/role/delRole`, //rid
  // 查询所有权限
  APIAdminQueryAllOperation: `${API_URL}/admin/role/queryAllOperation`,
  // 添加权限
  APIAdminAddNoOperation: `${API_URL}/admin/role/addNoOperation`, //AbRole roleint roleId, int[] noOperationIds

  //-----------------------添加角色]]-----------------
  //押注赔率
  //查询押注赔率//gameType  Integer  游戏类型(1 德州扑克)
  APIqueryBetOddsPage: `${API_URL}/gameConfig/anchorMatch/queryBetOddsPage`,
  //添加/修改押注赔率
  //           id  Integer  押注赔率id
  // gameType  Integer  游戏类型(1 德州扑克)
  // betOptions  Integer  押注选项(1 玩家,2 高牌,3 对子)
  // odds  Double  赔率
  APIaddBetOdds: `${API_URL}/gameConfig/anchorMatch/addBetOdds`,
  //删除押注赔率
  //ids  Integer  押注赔率id
  APIdeleteBetOdds: `${API_URL}/gameConfig/anchorMatch/deleteBetOdds`,
  //根据id查询押注赔率
  //id  Integer  押注赔率id

  APIqueryBetOddsById: `${API_URL}/gameConfig/anchorMatch/queryBetOddsById`,
  //奖励预告配置
  //           查询奖励预告
  // creatorId  Integer  创建者
  // startTime  Integer  开始时间
  // endTime  Integer  结束时间
  APIqueryAwardPredictPage: `${API_URL}/gameConfig/anchorMatch/queryAwardPredictPage`,
  // 添加奖励预告
  // predictContent  String  奖励预告内容
  // predictDate  String  预告日期
  APIaddAwardPredict: `${API_URL}/gameConfig/anchorMatch/addAwardPredict`,
  //查询活动规则
  APIqueryActivityRulePage: `${API_URL}/gameConfig/anchorMatch/queryActivityRulePage`,
  //添加活动规则
  // ruleContent  String  规则内容
  // ruleType  Integer  规则类型
  APIaddActivityRule: `${API_URL}/gameConfig/anchorMatch/addActivityRule`,
  // 统计api
  //统计用户总计数据
  ApiqueryPlayerGeneralData: `${API_URL}/player/queryPlayerGeneralData`,
  //用户渠道总体概况
  ApiqueryPlayerChannelGeneral: `${API_URL}/player/queryPlayerChannelGeneral`,
  //统计点击消息
  ApiqueryClieckEventStatisticsl: `${API_URL}/data/queryClieckEventStatistics`,
  //修改点击事件名称
  ApiupdateClickEventName: `${API_URL}/data/clieckEvent/updateClickEventName`,
  //统计活跃用户
  ApiqueryActivePlayer: `${API_URL}/player/queryActivePlayer`,
  //统计用户留存
  ApiqueryRetainPlayer: `${API_URL}/player/queryRetainPlayer`,
  //统计新增用户
  ApiqueryNewPlayer: `${API_URL}/player/queryNewPlayer`,
  //充值总体概况
  ApiqueryGeneralRecharge: `${API_URL}/recharge/queryGeneralRecharge`,

  // String  date               日期
  // Long    rechargeAmount     充值金额
  // Long    rechargeChipQty    充值筹码量
  // Long    rechargeNumber     充值人数
  // Long    newRechargeNumber  新增充值人数
  // Long    rechargeCount      充值次数
  // String  rechargeARPU       充值ARPU值
  //区分类别充值情况
  ApiqueryDistinctionRecharge: `${API_URL}/recharge/queryDistinctionRecharge`,
  // String   region          地域
  // Integer  sex             性别
  // Long     registerPlayer  注册用户总数
  // Long     payPlayer       付费用户
  // Long     rechargePlayer  充值用户
  // Long     totalAmount     充值总金额
  // String   rechargeARPU    充值ARPU值
  // Integer  type            区分充值情况类型  1 性别  2 地域

  // 传入参数：
  // Integer  type  区分充值情况类型  1 性别  2 地域
  //
  //数据统计-充值统计-个人充值记录
  ApirechargeStatisticsplayer: `${API_URL}/data/query/rechargeStatistics/player`,
  //数据统计-充值统计-渠道充值记录
  ApirechargeStatisticschannel: `${API_URL}/data/query/rechargeStatistics/channel`,
  //订单管理-充值订单_总额
  ApiqueryRechargeTotal: `${API_URL}/order/queryRechargeTotal`,
  //订单管理-充值订单
  ApiqueryRechargePlayer: `${API_URL}/order/queryRechargeOrder`,
  //订单管理-充值订单-补充值
  ApiqueryRecruitRecharge: `${API_URL}/order/recruitRecharge`,
  //数据统计-消费统计-渠道消费
  ApiconsumeStatisticschannel: `${API_URL}/data/query/consumeStatistics/channel`,
  //数据统计-消费统计-个人消费
  ApiconsumeStatisticsplayer: `${API_URL}/data/query/consumeStatistics/player`,
  //   Long     playerId        玩家id
  // String   account         账号
  // String   nickname        昵称
  // Long     vipLevel        vip等级
  // Long     currentDiamond  当前钻石
  // Long     totalDiamond    总充钻石
  // Long     totalCount      总充次数
  // String   registerTime    注册时间
  // Long     loginCount      登录次数
  // String   totalOnline     累计在线时长

  // 传入参数：
  // String   nickname   玩家id、账号、昵称
  //订单管理
  ApiqueryRechargeOrder: `${API_URL}/recharge/queryRechargeOrder`,

  //   Long     playerId        玩家id
  // String   playerAccount   玩家账号
  // String   playerNickname  玩家昵称
  // Long     rechargeAmount  充值金额
  // Long     chip            筹码
  // String   orderNumber     订单号
  // Integer  orderStatus     订单状态
  // Integer  payChannel      支付渠道
  // Integer  gameType        游戏类型
  // Integer  orderType       订单类型
  // String   orderCreateTime 订单生成时间

  // 传入参数：
  // String   nickname   玩家id、账号、昵称
  // String   orderNo    订单号
  //消费记录
  ApiqueryCustomData: `${API_URL}/recharge/queryCustomData`,
  // String   date          时间
  // String   propName      道具名称
  // Long     incomeOutlay  收入/支出
  // String   source        来源
  // Long     quantity      数量
  // Integer  isLimitTime   是否限时

  // 传入参数：
  // String   propName   道具名称
  //筹码
  ApiqueryChip: `${API_URL}/currency/queryChip`,

  // String  date                  日期
  // Long    dayRechargeChipQty    当天用户充值筹码量
  // Long    totalRechargeChipQty  累计总充值筹码量
  // Long    dayPresentQty         当天系统赠送量
  // Long    surplusChipQty        剩余筹码量
  // Long    dayChipConsumption    当天筹码消耗量
  // Long    holdPlayerQty         持有用户量
  // Long    avgHoldChipQty        平均持有筹码量
  //钻石
  ApiqueryDiamond: `${API_URL}/currency/queryDiamond`,

  // String  date               日期
  // Long    dayRechargeQty     当天用户充值钻石量
  // Long    totalRechargeQty   累计总充值钻石量
  // Long    dayPresentQty      当天系统赠送量
  // Long    surplusDiamondQty  剩余钻石量
  // Long    dayConsumption     当天钻石消耗量
  // Long    holdPlayerQty      持有用户量
  // Long    avgHoldDiamondQty  平均持有钻石量
  //玩家各场次在线时间占比
  ApiqueryGamesOnline: `${API_URL}/player/queryGamesOnline`,
  // String  indiana       夺宝
  // String  qualifying    排位
  // String  anchor        主播
  //分时段新增用户数
  ApiqueryDayparting: `${API_URL}/player/queryDayparting`,
  // 0 今日，1 昨日，7 7天前，30 30天前
  // 00,04,08,12,16,20,24  表示时间点

  //新增用户单次使用时长
  ApiquerySingleLength: `${API_URL}/player/querySingleLength`,
  //新增用户游戏行为
  ApiqueryGamesBehavior: `${API_URL}/player/queryGamesBehavior`,
  // String  stayLength      停留时长
  // Long    avgPokerGames   平均进入牌局局数
  // Long    quitGames       最后离开场次
  //新增用户各场次在线时长
  ApiqueryNewAddGamesOnline: `${API_URL}/player/queryNewAddGamesOnline`,
  // String  indiana       夺宝
  // String  qualifying    排位
  // String  anchor        主播
  //分时段在线人数
  ApiqueryDaypartingOnline: `${API_URL}/player/queryDaypartingOnline`,
  // 0 今日，1 昨日，7 7天前，30 30天前
  // 00,04,08,12,16,20,24  表示时间点

  // 传入参数：
  // Integer   gameType   游戏类型( 夺宝, 主播, 排位, 其他)
  //用户属性
  ApiqueryProperty: `${API_URL}/player/queryProperty`,
  // 传入参数：
  // Integer   type   类型(0 性别,1 区域)
  //用户行为单次使用时长
  ApiquerySingleTimes: `${API_URL}/player/querySingleTimes`,
  //用户行为日启动次数
  ApiqueryDayStarts: `${API_URL}/player/queryDayStarts`,
  // 00,04,08,12,16,20,24  表示时间点
  //分时段充值人数、ARPU
  ApiqueryDaypartingRecharge: `${API_URL}/recharge/queryDaypartingRecharge`,
  // 0 今日，1 昨日，7 7天前，30 30天前
  // 00,04,08,12,16,20,24  表示时间点

  // 传入参数：
  // Integer   type   类型(0 人数,1 ARPU)
  //分时段筹码消耗数量、ARPU
  ApiqueryDaypartingChip: `${API_URL}/currency/queryDaypartingChip`,
  // 0 今日，1 昨日，7 7天前，30 30天前
  // 00,04,08,12,16,20,24  表示时间点

  // 传入参数：
  // Integer   type   类型(0 人数,1 ARPU)
  //分时段钻石消耗数量、ARPU
  ApiqueryDaypartingDiamond: `${API_URL}/currency/queryDaypartingDiamond`,

  // 0 今日，1 昨日，7 7天前，30 30天前
  // 00,04,08,12,16,20,24  表示时间点

  // 传入参数：
  // Integer   type   类型(0 人数,1 ARPU)
  //渠道总体概况
  ApiqueryGeneralChannel: `${API_URL}/channel/queryGeneralChannel`,

  // String  channelName          渠道名称
  // Long    totalCharge          总推广费用
  // Long    totalClicks          总点击量
  // Long    totalDownload        总下载量
  // Long    totalActivations     总激活量
  // Long    totalRegistrations   总注册量
  // Long    acquisitionCosts     单个用户获取成本
  // Long    payPlayers           付费用户数
  // Long    rechargeAmount       充值总金额
  // String  rechargeARPU         充值ARPU值

  //渠道效果
  ApiqueryChannelPurpose: `${API_URL}/channel/queryChannelPurpose`,

  // String  channelName          渠道名称
  // String  date               日期
  // Long    clicks             点击量
  // Long    download           下载量
  // Long    activations        激活量
  // Long    registrations      注册量
  // Long    acquisitionCosts   单个用户获取成本
  // Long    payPlayers         付费用户数
  // Long    payAmount          付费金额

  //渠道占比
  ApiqueryChannelRatio: `${API_URL}/channel/queryChannelRatio`,

  // 新增用户,活跃用户,累计用户    表示类别

  //版本占比
  ApiqueryVersionRatio: `${API_URL}/channel/queryVersionRatio`,

  // 新增用户,活跃用户,累计用户    表示类别

  //广告效果
  ApiqueryAdvertisement: `${API_URL}/channel/queryAdvertisement`,

  // String  advertisementName  广告名称
  // Long    exposures          曝光量
  // Long    clicks             点击量
  // String  clickRate          点击率
  // Long    download           下载量
  // Long    activations        激活量
  // Long    registrations      注册量
  // String    translateRate    转化率

  //用户道具使用
  ApiqueryqueryPropsStatistics: `${API_URL}/data/queryPropsStatistics`,
  //用户牌局记录
  ApiqueryPlayerHuntCountRecord: `${API_URL}/player/queryPlayerHandRecord`,
  // 用户基本信息
  ApiqueryBasicInformationPlayer: `${API_URL}/player/queryBasicInformationPlayer`,
  //用户充值记录
  ApiqueryPlayerRechargeRecord: `${API_URL}/player/queryPlayerRechargeRecord`,
  //财富改变记录
  ApiqueryTreasureChangeLog: `${API_URL}/recharge/queryTreasureChangeLog`,
  //数据统计/新增用户
  ApiuserStatisticsnewUser: `${API_URL}/data/query/userStatistics/newUser`,
  //生成兑换码
  ApigenerateCode: `${API_URL}/gameOperation/redeem/generateCode`,
  //查询兑换码
  ApiqueryRemeedList: `${API_URL}/gameOperation/redeem/queryRemeedList`,
  //查询渠道
  ApiquerycChannelList: `${API_URL}/gameOperation/redeem/queryChannelList`,
  //渠道兑换统计
  ApichannelpointsExchange: `${API_URL}/data/query/pointsExchange/channel`,
  //个人兑换统计
  ApiplayerpointsExchange: `${API_URL}/data/query/pointsExchange/player`,
  //积分兑换记录
  ApiqueryPointsExchangeData: `${API_URL}/order/queryPointsExchangeData`,
  //导出
  ApidownloadRemeedCodeFile: `${API_URL}/gameOperation/redeem/downloadRemeedCodeFile`,
  //分享统计
  ApishareSweepall: `${API_URL}/data/query/shareSweep/all`,
  //分享统计
  ApishareSweepplayer: `${API_URL}/data/query/shareSweep/player`,
  //分享统计
  ApishareSweepchannel: `${API_URL}/data/query/shareSweep/channel`,
  //分享统计
  ApionlineStatistic: `${API_URL}/data/user/onlineStatistic`,
  //分享统计
  ApiregisterStatistic: `${API_URL}/data/user/registerStatistic`,
  //分享统计
  ApionlineTimeStatistic: `${API_URL}/data/user/onlineTimeStatistic`,
  //分享统计
  ApisaveStatistic: `${API_URL}/data/user/saveStatistic`,
  //分享统计
  ApiplayerStatistic: `${API_URL}/data/growup/playerStatistic`,
  ApichannelStatistic: `${API_URL}/data/growup/channelStatistic`,
  //分享统计
  ApiinverseStatistic: `${API_URL}/data/user/inverseStatistic`,

  //统计api

  ApioverallDataStatistic: `${API_URL}/data/user/overallDataStatistic`,

  Apiorder: `${API_URL}/order`,
  ApiqueryCustomTotal: `${API_URL}/queryCustomTotal`
};

import Vue from "vue";
import { removeStore } from "@/utils";
const APIS = {};
let  message = null
Object.keys(APIKEYS).forEach(key => {
  APIS[key] = function(option) {
    return axios.post(APIKEYS[key], option).catch(function(error) {
      if (!error.response) {
        if (message.close) {message.close()}
        
       message = Vue.prototype.$message("请求超时,请重试");
        return;
      }
      if (
        error.response &&
        error.response.status &&
        error.response.status == 401
      ) {
        Vue.prototype.$msgbox({
          title: "提示",
          message: "您没有操作权限!"
        });

        let option = {};
        axios.post(APIKEYS.Apiadminout, option).then(res => {}, res => {});

        setTimeout(() => {
          Vue.$router.push({ name: "login" });
          removeStore("isLogin username");
        }, 100);
      } else {
      }
    });
  };
});

APIS.UPLOADURL = `${API_URL}/upload/uploadImg`;
APIS.UPLOADURLOVIDE = `${API_URL}/upload/uploadVideo`;

// if (process.env.NODE_ENV =='development') {
//         APIS.IP='http://10.1.1.222:8585'
//       }else{
//         APIS.IP=''
//       }

const post = function(api, option = {}) {
  return axios.post(api, option);
};
const get = function(api, option = {}) {
  return axios.get(api, { params: option });
};

export default APIS;
