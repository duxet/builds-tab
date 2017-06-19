import CircleCI from './adapters/CircleCI'
import Travis from './adapters/Travis'

export default class AdapterProxy {
  constructor() {
    this.adapters = [
      new Travis(),
      new CircleCI()
    ]
  }

  getStatus(repo) {
    return new Promise((resolve, reject) => {
      let promises = this.adapters.map(adapter => adapter.getStatus(repo))

      Promise.all(promises).then((values) => {
        for (let value of values) {
          if (value.number) {
            resolve(value)
          }
        }

        reject()
      })
    })
  }

  getBuilds(repo) {
    return new Promise((resolve, reject) => {
      let promises = this.adapters.map(adapter => adapter.getBuilds(repo))

      Promise.all(promises).then((values) => {
        for (let value of values) {
          if (value.length) {
            resolve(value)
          }
        }

        reject()
      })
    })
  }
}
