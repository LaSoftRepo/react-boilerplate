
export default class Api {
  static HOST = 'https://api.github.com'

  static entries = {
    users: '/users',
  }

  static fetchUsers() {
    return axios.get(Api.entries.users, { baseURL: Api.HOST });
  }
}
