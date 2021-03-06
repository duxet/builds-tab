import axios from 'axios'
import moment from 'moment'

import Build from '../models/Build'

export default class Travis {
  constructor(token = null) {
    this.domain = 'travis-ci.org'
    let headers = {
      'Accept': 'application/vnd.travis-ci.2+json'
    }

    if (token) {
      this.domain = 'travis-ci.com'
      headers['Authorization'] = `token ${ token }`
    }

    this.client = axios.create({
      baseURL: `https://api.${ this.domain }`,
      headers: headers
    })
  }

  getStatus(repo) {
    return new Promise((resolve, reject) => {
      this.client.get(`/repos/${ repo }`).then((response) => {
        resolve({
          status: response.data.repo.last_build_state,
          number: response.data.repo.last_build_number,
          url: `https://${ this.domain }/${ repo }`
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

          let updatedAt = moment(commit.committed_at)

          if (build.started_at) {
            updatedAt = moment(build.started_at)
          }

          if (build.finished_at) {
            updatedAt = moment(build.finished_at)
          }

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
              updatedAt: updatedAt
            },
            adapter: {
              name: 'Travis'
            },
            url: `https://${ this.domain }/${ repo }/builds/${ build.id }`
          }))
        }

        resolve(builds)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
