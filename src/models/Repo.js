export default class Repo {
  constructor(params) {
    Object.assign(this, params)
  }

  get fullName() {
    return `${ this.user }/${ this.name }`
  }
}
