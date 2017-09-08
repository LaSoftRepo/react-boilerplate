
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
    Just for example:
    post(data) {
      return {
        method: 'post',
        url:    '/users',
        data,
      };
    },
    */
  }

  static request(config) {
    return axios({ ...config, baseURL: Api.Host });
  }
}
