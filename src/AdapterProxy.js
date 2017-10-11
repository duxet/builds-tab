import CircleCI from './adapters/CircleCI'
import Travis from './adapters/Travis'

export default class AdapterProxy {
  constructor() {
    this.adapters = [
      new Travis(),
      new CircleCI()
    ]

    chrome.storage.sync.get('options', (options) => {
      if (options && options.options && options.options.travisToken) {
        this.adapters.push(new Travis(options.options.travisToken))
      }
    })
  }

  getStatus(repo) {
    return new Promise((resolve, reject) => {
      let promises = this.adapters.map(adapter => adapter.getStatus(repo))

      for (let promise of promises) {
        promise.then(value => resolve(value), e => e)
      }
    })
  }

  getBuilds(repo) {
    return new Promise((resolve, reject) => {
      let promises = this.adapters.map(adapter =>adapter.getBuilds(repo))

      promises = promises.map(promise => promise.catch(e => e))

      Promise.all(promises).then((values) => {
        let builds = []

        for (let value of values) {
          if (value instanceof Array) {
            builds = builds.concat(value)
          }
        }

        builds.sort((a, b) => {
          return b.status.updatedAt - a.status.updatedAt
        })

        resolve(builds)
      })
    })
  }
}
