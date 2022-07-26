/**
 * 封装操作localstorage本地存储的方法
 */
export const storage = {
  //存储
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  //取出数据
  get(key) {
    const value = localStorage.getItem(key);
    if (value && value != 'undefined' && value != 'null') {
      return JSON.parse(value);
    }
  },
  // 删除数据
  remove(key) {
    localStorage.removeItem(key);
  }
};
