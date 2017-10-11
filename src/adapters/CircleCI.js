import axios from 'axios'
import moment from 'moment'

import Build from '../models/Build'

export default class CircleCI {
  constructor() {
    this.client = axios.create({
      baseURL: 'https://circleci.com/api/v1.1',
      headers: {
        'Accept': 'application/json'
      }
    })
  }

    getStatus(repo) {
    return new Promise((resolve, reject) => {
      this.client.get(`/project/github/${ repo }`).then((response) => {
        resolve({
          status: response.data[0].status,
          number: response.data[0].build_num,
          url: `https://circleci.com/gh/${ repo }`
        })
      }).catch((error) => {
        reject(error)
      })
    })
  }


  getBuilds(repo) {
    return new Promise((resolve, reject) => {
      this.client.get(`/project/github/${ repo }`).then((response) => {
        let build, builds = []

        for (let build of response.data) {
          let commit = build.all_commit_details[0]

          let updatedAt = moment(build.author_date)

          if (build.start_time) {
            updatedAt = moment(build.start_time)
          }

          if (build.stop_time) {
            updatedAt = moment(build.stop_time)
          }

          builds.push(new Build({
            id: build.build_num,
            commit: {
              branch: commit.branch,
              message: commit.subject,
              commitedAt: moment(commit.committer_date)
            },
            number: build.build_num,
            status: {
              name: build.status,
              updatedAt: updatedAt
            },
            adapter: {
              name: 'CircleCI'
            },
            url: `https://circleci.com/gh/${ repo }/${ build.build_num }`
          }))
        }

        resolve(builds)
      }).catch((error) => {
        reject(error)
      })
    })
  }
}
