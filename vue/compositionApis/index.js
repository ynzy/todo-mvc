/**
 注意：todos数据使用storage进行存储
 功能描述：
 * 头部：
    * // 1. 点击输入框可以添加todo事项
    * // 2. 点击左侧下拉菜单可以完成所有todo(有todos时显示)
  * todos列表：
    * // 1. 显示所有todos事项列表
    * // 2. 点击待办事项按钮，完成代办事项(completed)
    * // 3. todo和completed事项可以删除
    * // 4. 双击事项可以修改内容(按enter，blur，escape键修改内容)
    * // 注：li上的状态：‘’进行中 completed已完成 editing编辑
  * 底部：
    * 1. 显示todo事项条数(多条显示items，一条显示item)
    * 2. 切换显示状态(所有、进行中、已完成)
    * 3. 清空completed事项
 */

const { createApp, reactive, toRefs, computed, watchEffect, onMounted, onUnmounted } = Vue
// import { createApp, reactive, toRefs, computed, watchEffect, onMounted, onUnmounted } from 'https://unpkg.com/vue@next/dist/vue.esm-browser.js'

const storage = {
	get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
	set: value => localStorage.setItem('latest_todos', JSON.stringify(value))
}

const filters = {
	all: todos => todos,
	active: todos => todos.filter(todo => !todo.completed),
	completed: todos => todos.filter(todo => todo.completed)
}

createApp({
	setup() {
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
}).mount('#app')
