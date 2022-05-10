<script  lang="ts">
import {  reactive, toRefs, computed, watchEffect, onMounted, onUnmounted, defineComponent } from "vue"

const storage = {
	get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
	set: value => localStorage.setItem('latest_todos', JSON.stringify(value))
}

const filters = {
	all: todos => todos,
	active: todos => todos.filter(todo => !todo.completed),
	completed: todos => todos.filter(todo => todo.completed)
}

export default defineComponent({
  setup(props) {
    const state = reactive({
			/* todos: [
				{ id: 1, text: '事项1', completed: false },
				{ id: 2, text: '事项2', completed: true },
				{ id: 3, text: '事项3', completed: false }
      ], */
			todos: storage.get(),
			input: '',
			visibility: 'all',
			editingTodo: null,
			beforeEditText: '',
			remaining: computed(() => filters.active(state.todos).length),
			filteredTodos: computed(() => filters[state.visibility](state.todos)),
			allDone: computed({
				get: () => !state.remaining,
				set: value => {
					state.todos.forEach(todo => {
						todo.completed = value
					})
				}
			})
		})
		// 自动收集依赖，调用一次回调，通过 Proxy 监视哪些被使用
		watchEffect(() => {
			storage.set(state.todos)
		})

		onMounted(() => {
			window.addEventListener('hashchange', onHashChange)
			onHashChange()
		})

		onUnmounted(() => {
			window.removeEventListener('hashchange', onHashChange)
		})

		const onHashChange = () => {
			const visibility = window.location.hash.replace(/#\/?/, '')
			if (filters[visibility]) {
				state.visibility = visibility
			} else {
				state.visibility = 'all'
				window.location.hash = ''
			}
		}

		const addTodo = () => {
			const text = state.input
			if (!text) return
			state.todos.push({ id: state.todos.length + 1, text, completed: false })
			state.input = ''
		}

		const removeTodo = todo => {
			state.todos.splice(state.todos.indexOf(todo), 1)
		}

		const editTodo = todo => {
			state.editingTodo = todo
			state.beforeEditText = todo.text
		}

		const doneEdit = todo => {
			if (!state.editingTodo) return
			todo.text || removeTodo(todo)
			state.editingTodo = null
		}

		const cancelEdit = todo => {
			state.editingTodo = null
			state.text = state.beforeEditText
		}

		const removeCompleted = () => {
			state.todos = filters.active(state.todos)
		}

		const pluralize = count => {
			return count <= 1 ? 'item' : 'items'
		}

		return {
			...toRefs(state),
			addTodo,
			removeTodo,
			editTodo,
			doneEdit,
			cancelEdit,
			removeCompleted,
			pluralize
		}
  },
	directives: {
		editFocus: (el, { value }) => value && el.focus()
	}
});
</script>

<template>
  <section class="todoapp">
			<header class="header">
				<h1>todos</h1>
				<input v-model.trim="input" @keyup.enter="addTodo" class="new-todo" placeholder="你需要做什么" autocomplete="off" autofocus />
			</header>
			<section class="main">
				<input v-model="allDone" id="toggle-all" class="toggle-all" type="checkbox" />
				<label for="toggle-all">点击完成所有事项</label>
				<ul class="todo-list">
					<li v-for="todo in filteredTodos" :key="todo.id" :class="{completed: todo.completed, editing: editingTodo == todo}">
						<div class="view">
							<input v-model="todo.completed" class="toggle" type="checkbox" />
							<label @dblclick="editTodo(todo)">{{todo.text}}</label>
							<button @click="removeTodo" class="destroy"></button>
						</div>
						<input v-model.trim="todo.text" v-edit-focus="editingTodo == todo" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.escape="cancelEdit(todo)" class="edit" type="text" />
					</li>
				</ul>
			</section>
			<footer class="footer">
				<span class="todo-count">进行中<strong>{{remaining}}</strong>{{pluralize(remaining)}} left </span>
				<ul class="filters">
					<li><a href="#/all" :class="{ selected: visibility === 'all' }">显示所有</a></li>
					<li><a href="#/active" :class="{ selected: visibility === 'active' }">进行中</a></li>
					<li><a href="#/completed" :class="{ selected: visibility === 'completed' }">已完成</a></li>
				</ul>
				<button v-show="todos.length > remaining" @click="removeCompleted" class="clear-completed">清除已完成</button>
			</footer>
		</section>
		<footer class="info">
			<p>双击编辑todo事项</p>
			<!-- Change this out with your name and url ↓ -->
			<p>创建者<a href="https://zce.me">zce</a></p>
			<p>编辑者<a href="http://evanyou.me">Evan You</a></p>
			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
		</footer>
</template>

<style>
/* @import './assets/base.css'; */
</style>
