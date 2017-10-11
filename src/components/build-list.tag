<build-list>
  <div class="Subhead">
    <h2 class="Subhead-heading">CI Builds</h2>
    <div class="Subhead-actions">
      <a href="https://travis-ci.org/" class="btn right">Go to Travis</a>
    </div>
  </div>

  <ul class="border-top border-right border-bottom border-left table-list js-navigation-container js-active-navigation-container">
    <li class="table-list-item Box-row Box-row--focus-gray p-0 js-navigation-item"
        data-is="build" each={ build in builds } build={ build } />
  </ul>
</build-list>
