import * as axios from "axios";
import { Indicator } from 'mint-ui';

const prefix = 'https://www.iamyangqi.cn/wx-new-mall';

axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  Indicator.close();
  Indicator.open('网络错误,请重试');
  setTimeout(function() {
    Indicator.close();
  }, 1000)
  return Promise.reject(error)
});

export class All {      // 所有的api
  getTickets(q, page) {
    return axios
      .get(`${prefix}/getTickets.php`, { params: { q, page }, timeout: 3000 })
      .then(r => r.data)
  }
  getTicketLink(url, pic, title) {
    return axios
      .get(`${prefix}/convertLink.php`, { params: { url, pic, title }, timeout: 3000 })
      .then(r => r.data)
  }
  getRecommend(q) {
    return axios
      .get(`${prefix}/getRecommends.php`, { params: { q }, timeout: 3000 })
      .then(r => r.data)
  }
  superSearch(token) {
    return axios
      .get('https://www.iamyangqi.cn/wx-new-mall/superSearch.php', { params: { token }, timeout: 3000 })
      .then(r => r.data)
  }
}

export default new All();
