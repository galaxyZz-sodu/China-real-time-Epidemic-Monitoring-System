// 公共请求接口
const base = {
    host: 'http://api.tianapi.com', //天行数据 --疫情病毒接口前缀
    covInfo: '/ncov/index?key=4497cc3c0740e75c9749ed3523ff2b57', //疫情的病毒信息 --后缀

    baseUrl:'https://vyps.api.storeapi.net', //挖数据 --地图数据
    chinaData: '/api/94/219?format=json&appid=15127&sign=43365cae8000fe79a6dafe4f6645e6ba',
    worldData: '/api/94/220?format=json&appid=15127&sign=43365cae8000fe79a6dafe4f6645e6ba',

    city: '/api/94/221', //城市接口
    // format=json&appid=15127&city_name=城市名称&sign=md5加密字符串

    swiperBanner: 'http://iwenwiki.com/wapicovid19/ncovimg.php',
    travel: '/api/springTravel/citys?key=d34c1cd1d316fdb9a4553c974427ee05',
    travelQuery: '/api/springTravel/query?key=d34c1cd1d316fdb9a4553c974427ee05', //城市疫情&from=10191&to=10349
    // 360接口地址：https://bang.360.cn/aj/getcitycode
    getcity: '/foo/aj/getcitycode'

}

export default base