<template>
  <section class="container">
    <h1>Memo</h1>
    <table>
      <tr>
        <th>Title</th>
        <td>
          <input
            v-model="title"
            type="text"
            name="title"
            class="title"
            size="40"
            @focus="set_flg"
          />
          <button @click="find">find</button>
        </td>
      </tr>
      <tr>
        <th>Memo</th>
        <td>
          <textarea
            v-model="content"
            name="content"
            class="content"
            cols="50"
            rows="5"
          ></textarea>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>
          <button @click="insert">save</button>
          <transition name="del">
            <button v-if="sel_flg != false" @click="remove">delete</button>
          </transition>
        </td>
      </tr>
    </table>
    <hr />
    <ul class="list">
      <li v-for="item in page_items" :key="item">
        <span @click="select(item)">{{ item.title }} ({{ item.created }})</span>
      </li>
    </ul>
    <hr />
    <div class="nav">
      <span @click="prev">&lt;prev</span>｜ <span @click="next">next&gt;</span>
    </div>
    <div>
      <nuxt-link to="/">戻る</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      content: '',
      num_per_page: 7,
      find_flg: false,
      sel_flg: false,
    }
  },
  computed: {
    memo() {
      return this.$store.state.memo.memo
    },
    page_items() {
      // 検索時のメモ配列
      if (this.find_flg) {
        const arr = []
        const data = this.$store.state.memo.memo
        data.forEach((element) => {
          if (element.title.toLowerCase().includes(this.title.toLowerCase())) {
            arr.push(element)
          }
        })
        return arr
        // 選択時のメモ配列
      } else if (this.sel_flg !== false) {
        return [this.sel_flg]
        // それ以外のメモ配列
      } else {
        return this.$store.state.memo.memo.slice(
          this.num_per_page * this.$store.state.memo.page,
          this.num_per_page * (this.$store.state.memo.page + 1)
        )
      }
    },
    page: {
      get() {
        return this.$store.state.memo.page
      },
      set(p) {
        // ページ番号がマイナスならず、最後のページよりも先の番号も使えないよう操作
        let pg =
          p > (this.$store.state.memo.memo.length - 1) / this.num_per_page
            ? Math.ceil(
                (this.$store.state.memo.memo.length - 1) / this.num_per_page
              ) - 1
            : p
        pg = pg < 0 ? 0 : pg
        this.$store.commit('memo/set_page', pg)
      },
    },
  },
  created() {
    this.$store.commit('memo/set_page', 0)
  },
  methods: {
    set_flg() {
      // 検索中か選択中の場合（元の状態に戻す）
      if (this.find_flg || this.sel_flg !== false) {
        this.find_flg = false
        this.sel_flg = false
        this.title = ''
        this.content = ''
      }
    },
    insert() {
      this.$store.commit('memo/insert', {
        title: this.title,
        content: this.content,
      })
      this.title = ''
      this.content = ''
    },
    select(item) {
      this.find_flg = false
      this.sel_flg = item
      this.title = item.title
      this.content = item.content
    },
    remove() {
      if (this.sel_flg === false) {
      } else {
        this.$store.commit('memo/remove', this.sel_flg)
        this.set_flg()
      }
    },
    find() {
      this.sel_flg = false
      this.find_flg = true
    },
    next() {
      this.page++
    },
    prev() {
      this.page--
    },
  },
}
</script>

<style scoped>
.container {
  padding: 5px 10px;
}
h1 {
  font-size: 60pt;
  color: #345980;
}
p {
  padding-top: 5px;
  font-size: 20pt;
}
div {
  font-size: 14pt;
}
pre {
  padding: 10px;
  font-size: 18pt;
  background-color: #efefef;
}
input {
  font-size: 14pt;
  margin: 5px;
}
textarea {
  font-size: 14pt;
  margin: 5px;
}
button {
  font-size: 14pt;
  padding: 1px 10px;
  margin: 5px;
}
hr {
  border-style: none;
  border-top: solid;
  border-width: 5px;
  border-color: #def;
  margin: 20px 0px 10px 0px;
}
li {
  font-size: 14pt;
  height: 32px;
}
th {
  background-color: #345980;
  color: white;
}
td {
  background-color: aliceblue;
  color: #345980;
  padding: 5px;
}
.nav {
  padding: 0px 10px;

  cursor: pointer;
}
.list {
  cursor: pointer;
}
.del-enter-active,
.del-leave-active {
  transition: opacity 0.5s;
}
.del-enter,
.del-leave-to {
  opacity: 0;
}
</style>
