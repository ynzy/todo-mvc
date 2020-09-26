/**
 注意：todos数据使用storage进行存储
 功能描述：
 * 头部：
    * //1. 点击输入框可以添加todo事项
    * // 2. 点击左侧下拉菜单可以完成所有todo(有todos时显示)
  * todos列表：
    * // 1. 显示所有todos事项列表
    * // 2. 点击待办事项按钮，完成代办事项(completed)
    * // 3. todo和completed事项可以删除
    * // 4. 双击事项可以修改内容(按enter，blur，escape键修改内容)
    * // 注：li上的状态：‘’进行中 completed已完成 editing编辑
  * 底部：
    * // 1. 显示todo事项条数(多条显示items，一条显示item)
    * // 2. 切换显示状态(所有、进行中、已完成)
    * //3. 清空completed事项
 */

const storage = {
	get: () => JSON.parse(localStorage.getItem('latest_todos') || '[]'),
	set: value => localStorage.setItem('latest_todos', JSON.stringify(value))
}

const filters = {
	all: todos => todos,
	active: todos => todos.filter(todo => !todo.completed),
	completed: todos => todos.filter(todo => todo.completed)
}

new Vue({
	el: '#app',
	data: () => ({
		/* todos: [
			{ id: 1, text: '事项1', completed: false },
			{ id: 2, text: '事项2', completed: true },
			{ id: 3, text: '事项3', completed: false }
		], */
		todos: storage.get(),
		input: '',
		visibility: 'all', // 切换显示
		editingTodo: null, // 编辑项
		beforeEditText: '' // 编辑前的text
	}),
	computed: {
		//剩下要做的
		remaining() {
			return filters.active(this.todos).length
		},
		// 过滤显示todos
		filteredTodos() {
			return filters[this.visibility](this.todos)
		},
		// 完成所有项
		allDone: {
			get() {
				return !this.remaining
			},
			set(value) {
				this.todos.forEach(todo => {
					todo.completed = value
				})
			}
		}
	},

	watch: {
		todos(val) {
			storage.set(this.todos)
		}
	},

	mounted() {
		window.addEventListener('hashchange', this.onHashChange)
		this.onHashChange()
	},
	unmounted() {
		window.removeEventListener('hashchange', this.onHashChange)
	},
	methods: {
		onHashChange() {
			// console.log(window.location.hash)
			const visibility = window.location.hash.replace(/#\/?/, '')
			if (filters[visibility]) {
				this.visibility = visibility
			} else {
				this.visibility = 'all'
				window.location.hash = ''
			}
		},

		addTodo() {
			const text = this.input
			if (!text) return
			this.todos.push({ id: this.todos.length + 1, text, completed: false })
			this.input = ''
		},

		removeTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1)
		},

		editTodo(todo) {
			this.editingTodo = todo
			this.beforeEditText = todo.text
		},

		doneEdit(todo) {
			if (!this.editingTodo) return
			// 如果text为空，删除todo
			todo.text || this.removeTodo(todo)
			this.editingTodo = null
		},

		cancelEdit(todo) {
			this.editingTodo = null
			todo.text = this.beforeEditText
		},

		removeCompleted() {
			this.todos = filters.active(this.todos)
		},

		pluralize(count) {
			return count <= 1 ? 'item' : 'items'
		}
	},
	directives: {
		editFocus: (el, { value }) => value && el.focus()
	}
})
