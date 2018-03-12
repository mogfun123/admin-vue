import dateUtils from "@/date";
export const dateUtil = dateUtils;
export const delayfunction = function delayfunction(fn, time) {
  setTimeout(fn, time);
};
export const hsdateUtil = function(time) {
  if (typeof time == "string") {
    time = Number(time);
  }
  return time ? dateUtil.format(time, "yyyy-MM-dd HH:mm:ss") : "";
};
export const dateParseUtil = function(timestr) {
 
  return timestr ? Date.parse(timestr) : 0;
};
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  console.log("登陆");
  if (!name) return;
  if (typeof content !== "string") {
    content = JSON.stringify(content);
  }
  sessionStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return;
  return sessionStorage.getItem(name);
};

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return;
  let arr = name.split(" ");
  arr.forEach(name => {
    sessionStorage.removeItem(name);
  });
};
export const trim = string => {
  // if (!str) {
  // 	return ''
  // }else{
  // 	return str.replace(/\s/g,'')
  // }
  return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "");
};

/** 
 * 和PHP一样的时间戳格式化函数 
 * @param  {string} format    格式 
 * @param  {int}    timestamp 要格式化的时间 默认为当前时间 
 * @return {string}           格式化的时间字符串 
 */
export const format = function(times) {
  if (!times) return;
  let now = new Date(times);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  // return year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;
  return year + "-" + month + "-" + date;
};
