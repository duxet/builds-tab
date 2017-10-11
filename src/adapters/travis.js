import axios from 'axios'
import moment from 'moment'

import Build from '../models/Build'

export default class Travis {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.travis-ci.org',
      headers: {
        'Accept': 'application/vnd.travis-ci.2+json'
      }
    })
  }

  getStatus(repo) {
    return new Promise((resolve, reject) => {
      this.client.get(`/repos/${ repo }`).then((response) => {
        resolve({
          status: response.data.repo.last_build_state,
          number: response.data.repo.last_build_number,
          url: `https://travis-ci.org/${ repo }`
        })
      }).catch((error) => {
        reject(error)
      })
    })
  }

  getBuilds(repo) {
    return new Promise((resolve, reject) => {
      this.client.get(`/repos/${ repo }/builds`).then((response) => {
        let i, builds = []

        for (i in response.data.builds) {
          let build = response.data.builds[i]
          let commit = response.data.commits[i]

          builds.push(new Build({
            id: build.id,
            commit: {
              branch: commit.branch,
              message: commit.message,
              commitedAt: moment(commit.committed_at)
            },
            number: build.number,
            status: {
              name: build.state,
              updatedAt: moment()
            },
            url: `https://travis-ci.org/${ repo }/builds/${ build.id }`
          }))
        }

        resolve(builds)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
