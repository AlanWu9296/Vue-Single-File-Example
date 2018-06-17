# Markdown
```html
<script src="https://unpkg.com/marked@0.3.6"></script>
<script src="https://unpkg.com/lodash@4.16.0"></script>

<div id="editor">
  <textarea :value="input" @input="update"></textarea>
   // use v-html to render the raw html
  <div v-html="compiledMarkdown"></div>
</div>
```

```js
new Vue({
  el: '#editor',
  data: {
    input: '# hello'
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true })
    }
  },
  methods: {
      // the updata method could be replaced by the v-model. however this manuel method could give a rending processing effect to the user
    update: _.debounce(function (e) {
      this.input = e.target.value
    }, 300)
  }
})
```



# Github

```html
<div id="demo">
  <h1>Latest Vue.js Commits</h1>
  <template v-for="branch in branches">
    <input type="radio"
      :id="branch"
      :value="branch"
      name="branch"
      v-model="currentBranch">
    <label :for="branch">{{ branch }}</label>
  </template>
  <p>vuejs/vue@{{ currentBranch }}</p>
  <ul>
    <li v-for="record in commits">
      <a :href="record.html_url" target="_blank" class="commit">{{ record.sha.slice(0, 7) }}</a>
      - <span class="message">{{ record.commit.message | truncate }}</span><br>
      by <span class="author"><a :href="record.author.html_url" target="_blank">{{ record.commit.author.name }}</a></span>
      at <span class="date">{{ record.commit.author.date | formatDate }}</span>
    </li>
  </ul>
</div>
```



```js
var demo = new Vue({

  el: '#demo',

  data: {
    branches: ['master', 'dev'],
    currentBranch: 'master',
    commits: null
  },
// life cycle hook must follow a function
  created: function () {
    this.fetchData()
  },
// { [key: string]: string | Function | Object | Array } so here is using a function name
  watch: {
    currentBranch: 'fetchData'
  },

  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > 0 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },

  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      // in the Ajax request, the keyword 'this' is bind to the xhr object thus here use the self to bind to the Vue object
      var self = this
      xhr.open('GET', apiURL + self.currentBranch)
      xhr.onload = function () {
        self.commits = JSON.parse(xhr.responseText)
        console.log(self.commits[0].html_url)
      }
      xhr.send()
    }
  }
})
```