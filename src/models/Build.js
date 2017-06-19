export default class Build {
  constructor(params) {
    Object.assign(this, params)
  }

  get isSuccessful() {
    return this.status.name === 'passed'
  }
}
