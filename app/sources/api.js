
// TODO manage external token
export function request(config) {
  return axios(config);
}


export class Backend {
  static Version = 'v1'
  static Host    = ``// Example: `https://<your-service-provider>/api/${Backend.Version}`
}


export class Github {
  static Host = `https://api.github.com`

  static users = {
    get() {
      return {
        method: 'get',
        url:    '/users',

        baseURL: Github.Host,
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
