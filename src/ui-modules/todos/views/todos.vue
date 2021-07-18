<template>
  <div>
    <h1>Todos list</h1>
    <button @click="$store.dispatch('todos/getTodos',true)">reload</button>
    <ul>
      <li v-for="(todo, i) in $store.state['todos'].todos" :key="i">
        <fancy-box :title="todo.title"/>
        <button @click="$router.push({name: 'TodosView',params: {id: todo.id,todo}})">Todos View</button>
      </li>
    </ul>
  </div>
</template>

<script>
import FancyBox from '../components/FancyBox'

export default {
  components: {
    FancyBox
  },
  mounted() {
    this.$store.dispatch('todos/getTodos')
  },
}
</script>