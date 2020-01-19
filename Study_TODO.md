### Decarator

> source：https://hacpai.com/article/1538213987275

- JS 使用的装饰器(Decorator)很像 Java 的@annotation，其目的是可以在运行时改变类或者改变类的属性。
- 装饰器的其本质上就是一个函数,可以装饰类，也可以装饰类函数
- 为什么说 Decorator 可以在运行时修改类或类的属性？主要是通过装饰器函数的返回值决定的。


### 箭头函数

> https://www.cnblogs.com/fundebug/p/6904753.html

**箭头函数看上去只是语法的变动，其实也影响了this的作用域。**

```javascript
function funcName(params) {
  return params+2;
}
funcName(2);
//4

var funcName=(params)=>params+2;
funcName(2);
//4
```

箭头函数的语法：
```javascript
常规: (params)=>{statement}
无参:       ()=>{statement}
一参:   params=>{statement}
```

没有局部this的绑定（有机会再详细了解）

### ES6
import 单例，值引用，静态编译分析
