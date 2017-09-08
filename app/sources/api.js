
// TODO manage external token
export function request(config) {
  return axios(config);
}


export class BackendApi {
  static Version = 'v1'
  static Host    = ``
}


export class GithubApi {
  static Host = `https://api.github.com`

  static users = {
    get() {
      return {
        method: 'get',
        url:    '/users',

        baseURL: GithubApi.Host,
      };
    },

    /*
    Just for example:
    post(data) {
      return {
        method: 'post',
        url:    '/users',
        data,

        baseURL: GithubApi.Host,
      };
    },
    */
  }
}
