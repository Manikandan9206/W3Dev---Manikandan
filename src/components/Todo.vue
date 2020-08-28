<template>
  <div>
      <div class="todos-container">
          <v-text-field
            v-model="newTodo"
            label="Add ToDo's"
            append-outer-icon="mdi-plus"
            @click:append-outer="addTodo"
          ></v-text-field>
          <div class="todos-list">
              <div class="todo" v-for="todo in todos" :key="todo.name">
                  <p>{{ todo.name }}</p>
                  <v-spacer />
                  <v-btn icon @click="toggleRadio(todo)">
                      <v-icon v-if="todo.done">
                          mdi-radiobox-marked
                      </v-icon>
                      <v-icon v-else>
                          mdi-radiobox-blank
                      </v-icon>
                  </v-btn>
                  <v-btn icon @click="removeTodo(todo)">
                      <v-icon>
                          mdi-close
                      </v-icon>
                  </v-btn>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radio: 'mdi-radiobox-marked',
      newTodo: ''
      /* todos: [
        { name: 'hellllo', done: false }
      ] */
    }
  },
  created () {
    this.$store.dispatch('getTodosFromDB', this.user.email)
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    todos () {
      return this.$store.getters.todos
    }
  },
  watch: {
    todos () {
      console.log('watching')
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo) {
        console.log(this.newTodo)
        this.todos.push({ name: this.newTodo, done: false })
        this.newTodo = ''
        this.$store.dispatch('saveToDB', { email: this.user.email, todos: this.todos })
      }
    },
    removeTodo (todo) {
      console.log(todo)
      const index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
      this.$store.dispatch('saveToDB', { email: this.user.email, todos: this.todos })
    },
    toggleRadio (todo) {
      const index = this.todos.indexOf(todo)
      this.todos[index].done = !this.todos[index].done
      this.$store.dispatch('saveToDB', { email: this.user.email, todos: this.todos })
    }
  }
}
</script>

<style lang="scss">
.todos-container {
    max-width: 500px;
    margin: 4rem auto;
}
.todo {
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 10px rgba(92, 92, 92, 0.5);
    padding: 5px 10px;
    border-radius: 30px;
    margin: 1rem 0;

    p {
        transform: translate(10px, 30%);
    }
}
</style>
