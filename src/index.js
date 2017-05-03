let adapters = [
  new Travis()
]
let buildList, repoName

function addBuildsTab(status) {
  if ($('.reponav-builds').length) {
    return
  }

  const $buildsTab = `
    <a href="/${ repoName }/builds" class="reponav-item reponav-builds"
       data-selected-links="repo_graphs repo_contributors /sosedoff/travis-github/graphs">
      <svg aria-hidden="true" class="octicon octicon-checklist" height="16" version="1.1" viewBox="0 0 16 16" width="16">
        <path fill-rule="evenodd" d="M16 8.5l-6 6-3-3L8.5 10l1.5 1.5L14.5 7 16 8.5zM5.7 12.2l.8.8H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h7c.55 0 1 .45 1 1v6.5l-.8-.8c-.39-.39-1.03-.39-1.42 0L5.7 10.8a.996.996 0 0 0 0 1.41v-.01zM4 4h5V3H4v1zm0 2h5V5H4v1zm0 2h3V7H4v1zM3 9H2v1h1V9zm0-2H2v1h1V7zm0-2H2v1h1V5zm0-2H2v1h1V3z"></path>
      </svg>

      Builds

      <span class="Counter">${ status.number }</span>
    </a>
  `

  $('.js-repo-nav').append($buildsTab)
}

function getRepoName() {
  return window.location.pathname.split('/').slice(1, 3).join('/')
}

function loadBuilds(adapter) {
  $('.repository-content').html('<build-list />')
  buildList = riot.mount('build-list', { builds: [] })[0]

  $('.reponav-item').removeClass('selected')
  $('.reponav-builds').addClass('selected')

  adapter.getBuilds(repoName).then((builds) => {
    buildList.builds = builds
    riot.update()
  })
}

gitHubInjection(window, (err) => {
  if (!$('.repohead-details-container').length) {
    return
  }

  repoName = getRepoName()
  let adapter = adapters[0]

  adapter.getStatus(repoName).then((status) => {
    if (!status.number) {
      return
    }

    addBuildsTab(status)
  })

  $('body').on('click', '.reponav-builds', (event) => {
    event.preventDefault()

    history.pushState({}, '', `/${repoName}/builds`)
    loadBuilds(adapter)
  })
})
