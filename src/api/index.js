// 请求接口的方法

import axios from 'axios'

// 接口地址
import base from './base'

// 引入md5
import md5 from 'md5-js'

// 请求方法
const api = {
    // 病毒信息获取
    getCovInfo() {
        // axios.get('http://api.tianapi.com/ncov/index?key=4497cc3c0740e75c9749ed3523ff2b57')
        return axios.get(base.host+base.covInfo);
    },

    // 获取国内各省疫情数据--地图
    getChinaData() {
        return axios.get('https://vyps.api.storeapi.net/api/94/219?format=json&appid=15127&sign=43365cae8000fe79a6dafe4f6645e6ba');
    },
    
    // 或取世界各国疫情数据 --地图
    getWorldData() {
        return axios.get('https://vyps.api.storeapi.net/api/94/220?format=json&appid=15127&sign=43365cae8000fe79a6dafe4f6645e6ba');
    },

    // 获取城市接口
    // 参数：format=json&appid=15127&city_name=城市名称&sign=md5加密字符串
    getCity(city_name) {
        
        // 该接口md5加密规则：sign = md5('appid15127city_name北京formatjson秘钥')
        // 上述md5后得到 ： 325d6f47283e7ebbd1e43757549f9580，密钥不需要键名，请直接跟上32位的密钥

        // 步骤1：安装 npm i md5-js -s
        // 步骤2：引入md-5模块
        // 步骤3：使用加密处理
        let sign = md5('appid15127city_name'+city_name+'formatjson89b07e7773a29eb6ee0e9a407a9593e2');
        let canshu = 'format=json&appid=15127&city_name='+city_name+'&sign='+sign;
        // console.log(sign);
        return axios.get(base.baseUrl+'/api/94/221?'+canshu)
    },

    // 轮播图数据
    getSwiperBanner() {
        return axios.get('http://iwenwiki.com/wapicovid19/ncovimg.php')
    },

    // 出行城市
    getTravel() {
        return axios.get(base.travel)
    },
    // 城市出行政策
    /* 
    &from=10191&to=10349
    axios.get('url?xx=xx&xx=xx)
    axios.get('url',{
        params: {
            参数: xx,
            ...
        }
    })
    */
    getTravelQuery(params) { //params={from: '', to: ''}
        return axios.get(base.travelQuery, {
            params
        })
    },

    // 城市选择
    getCity2() {
        return axios.get(base.getcity)
    }
} 

export default api