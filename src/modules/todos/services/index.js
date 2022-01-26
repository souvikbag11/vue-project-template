import vue from 'vue';

const getAllTodos = async () => {
    const res = await vue.axios.get('/todos');
    return res.data;
}

const getTodoById = async (id) => {
    const res = await vue.axios.get(`/todos/${id}`);
    return res.data;
}

export {
    getAllTodos,
    getTodoById
}