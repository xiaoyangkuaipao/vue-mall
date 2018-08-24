import * as axios from "axios";

const prefix = 'https://www.iamyangqi.cn/wx-new-mall';

export class All {      // 所有的api
  getTickets(q, page) {
    return axios
      .get(`${prefix}/getTickets.php`, { params: { q, page } })
      .then(r => r.data)
  }
  getTicketLink(url, pic, title) {
    return axios
      .get(`${prefix}/convertLink.php`, { params: { url, pic, title } })
      .then(r => r.data)
  }
  getRecommend(q) {
    return axios
      .get(`${prefix}/getRecommends.php`, { params: { q } })
      .then(r => r.data)
  }
  superSearch(token) {
    return axios
      .get('https://www.iamyangqi.cn/wx-new-mall/superSearch.php', { params: { token } })
      .then(r => r.data)
  }
}

export default new All();
