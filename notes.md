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

# Grid Component

```html
<!-- component template -->
<script type="text/x-template" id="grid-template">
  <table>
    <thead>
      <tr>
        <th v-for="key in columns"
          @click="sortBy(key)"
          :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
</script>

<!-- demo root element -->
<div id="demo">
  <form id="search">
    Search <input name="query" v-model="searchQuery">
  </form>
<!-- a sub component -->
  <demo-grid
    :data="gridData"
    :columns="gridColumns"
    :filter-key="searchQuery">
  </demo-grid>
</div>
```

```js
// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders // sortOrders={'Name':1,"Power":1}
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey //''
      var filterKey = this.filterKey && this.filterKey.toLowerCase()// as a prop coming from father component
      var order = this.sortOrders[sortKey] || 1 // in case there is no sortKeys
      var data = this.data
      //using the filterkey to filter the text
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

// bootstrap the demo
var demo = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    gridColumns: ['name', 'power'],
    gridData: [
      { name: 'Chuck Norris', power: Infinity },
      { name: 'Bruce Lee', power: 9000 },
      { name: 'Jackie Chan', power: 7000 },
      { name: 'Jet Li', power: 8000 }
    ]
  }
})
```

