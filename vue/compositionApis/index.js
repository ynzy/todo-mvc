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

const { createApp, reactive, ref, toRefs, computed, watchEffect, onMounted, onUnmounted } = Vue
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
		const todos = ref(storage.get())
		const input = ref('')
		const visibility = ref('all')
		const editingTodo = ref(null)
		const beforeEditText = ref('')
		const remaining = computed(() => filters.active(todos.value).length)
		const filteredTodos = computed(() => filters[visibility.value](todos.value))
		const allDone = computed({
			get: () => !remaining.value,
			set: value => {
				todos.value.forEach(todo => {
					todo.completed = value
				})
			}
		})
		// 自动收集依赖，调用一次回调，通过 Proxy 监视哪些被使用
		watchEffect(() => {
			storage.set(todos.value)
		})

		onMounted(() => {
			window.addEventListener('hashchange', onHashChange)
			onHashChange()
		})

		onUnmounted(() => {
			window.removeEventListener('hashchange', onHashChange)
		})

		const onHashChange = () => {
			const hash = window.location.hash.replace(/#\/?/, '')
			if (filters[hash]) {
				visibility.value = hash
			} else {
				visibility.value = 'all'
				window.location.hash = ''
			}
		}

		const addTodo = () => {
			const text = input.value
			if (!text) return
			todos.value.push({ id: todos.value.length + 1, text, completed: false })
			input.value = ''
		}

		const removeTodo = todo => {
			todos.value.splice(todos.value.indexOf(todo), 1)
		}

		const editTodo = todo => {
			editingTodo.value = todo
			beforeEditText.value = todo.text
		}

		const doneEdit = todo => {
			if (!editingTodo.value) return
			todo.text || removeTodo(todo)
			editingTodo.value = null
		}

		const cancelEdit = todo => {
			editingTodo.value = null
			state.text = beforeEditText.value
		}

		const removeCompleted = () => {
			todos.value = filters.active(todos.value)
		}

		const pluralize = count => {
			return count <= 1 ? 'item' : 'items'
		}

		return {
			todos,
			input,
			visibility,
			editingTodo,
			beforeEditText,
			remaining,
			filteredTodos,
			allDone,
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
