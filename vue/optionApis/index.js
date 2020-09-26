/**
 功能描述：
  * 头部：
    * //1. 点击输入框可以添加todo事项
    * 2. 点击左侧下拉菜单可以完成所有todo(有todos时显示)
  * todos列表：
    * 1. 显示所有todos事项列表
    * 2. 点击待办事项按钮，完成代办事项(completed)
    * 3. todo和completed事项可以删除
    * 4. 双击事项可以修改内容
    * 注：li上的状态：‘’进行中 completed已完成 editing编辑
  * 底部：
    * 1. 显示todo事项条数(多条显示items，一条显示item)
    * 2. 切换显示状态(所有、进行中、已完成)
    * 3. 清空completed事项
 */
Vue.createApp({
	data: () => ({
		todos: [
			{ text: '事项1', completed: false },
			{ text: '事项2', completed: true },
			{ text: '事项3', completed: false }
		],
		input: '',
		visibility: 'all'
	}),
	methods: {
		addTodo() {
			const text = this.input
			if (!text) return
			this.todos.push({ text, completed: false })
			this.input = ''
		}
	}
}).mount('#app')
