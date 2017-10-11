<options>
  <form oninput={ saveOptions }>
      <label>Travis-CI.com token</label>
      <input type="text" ref="travisToken" />
  </form>

  <script>
    this.options = {
      travisToken: ''
    }

    let storage = chrome.storage.sync

    storage.get('options', (options) => {
      this.options = options.options || this.options
      this.refs.travisToken.value = this.options.travisToken
    })

    saveOptions(event) {
      let fieldName = event.target.getAttribute('ref')
      let fieldValue = event.target.value.trim()

      this.options[fieldName] = fieldValue

      storage.set({ options: this.options })
    }
  </script>
</options>
