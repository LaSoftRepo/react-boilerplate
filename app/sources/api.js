
export default class Api {
  static Host = 'https://api.github.com'

  static users = {
    get() {
      return {
        method: 'get',
        url:    '/users',
      };
    },

    /*
    Example for post:
    post(data) {
      return {
        method: 'post',
        url:    '/users',
        data,
      };
    },
    */
  }

  static setHeaders(headers) {
    axios.defaults.headers.common = headers;
  }

  static request(config) {
    return axios({ ...config, baseURL: Api.Host });
  }
}
