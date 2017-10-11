export default class Build {
  constructor(params) {
    Object.assign(this, params)
  }

  get isRunning() {
    return ['running'].includes(this.status.name)
  }

  get isSuccessful() {
    return ['fixed', 'success', 'passed'].includes(this.status.name)
  }

  get isFailed() {
    return !this.isRunning && !this.isSuccessful
  }
}
