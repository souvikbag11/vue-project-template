<template>
  <div>
    <h1>Todos View {{ message }}</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: "sfasdf",
    }
  },
  async mounted() {
    const {todo, id} = this.$route.params;
    if (todo)
      this.message = todo;
    else
      this.message = await this.$store.dispatch('todos/getTodosById', id);
  }
}
</script>