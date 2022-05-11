import type { App } from 'vue';
import { provide, inject } from 'vue';

//定义一个用于状态共享的hook函数的标准接口
export interface FunctionalStore<T extends object> {
  (...args: any[]): T;
  token?: symbol;
  root?: T;
}

//对原生provide进行封装

//由于inject函数只会从父组件开始查找，所以useProvider默认返回hook函数的调用结果，以防同组件层级需要使用
export function useProvider<T extends object>(func: FunctionalStore<T>, app?: App | null): T {
  !func.token && (func.token = Symbol('functional store')); // 设置默认token
  const depends = func();
  if (app) {
    app.provide(func.token, depends);
  } else {
    provide(func.token, depends);
  }
  return depends;
}
// 可以一次传入多个hook函数， 统一管理
export function useProviders(funcs: FunctionalStore<any>[], app: App | null) {
  funcs.forEach((func) => {
    !func.token && (func.token = Symbol('functional store'));
    if (app) {
      app.provide(func.token, func());
    } else {
      provide(func.token, func());
    }
  });
}

//对原生inject进行封装

type InjectType = 'root' | 'optional';

//接收第二个参数，'root'表示直接全局使用；optional表示可选注入，防止父组件的provide并未传入相关hook
export function useInjector<T extends object>(
  input: FunctionalStore<T> | symbol,
  type?: InjectType
) {
  let token: symbol,
    func: FunctionalStore<T> | undefined,
    root: T | undefined,
    name: string | undefined;

  if (typeof input === 'symbol') {
    token = input;
  } else {
    func = input;
    token = input.token as symbol;
    input.root && (root = input.root);
    name = input.name;
  }

  switch (type) {
    default: {
      const res = inject<T>(token);
      if (res) return res;
      if (root) return root;
      throw new Error(`状态钩子函数${name}未在上层组件通过调用useProvider提供`);
    }

    case 'optional': {
      return inject<T>(token) || root || null;
    }

    case 'root': {
      if (!root && func) {
        func.root = func();
      }
      return func && func.root;
    }
  }
}
