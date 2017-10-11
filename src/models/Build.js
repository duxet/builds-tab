export default class Build {
  constructor(params) {
    Object.assign(this, params)
  }

  get isSuccessful() {
    return ['fixed', 'success', 'passed'].includes(this.status.name)
  }
}
