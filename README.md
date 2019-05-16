# 概述：
在接触函数式编程时，我们会遇到怎么更好的链式调用函数；比如：`Array.map(...).sort(...).reverse();`就是一个很好的函数链式调用的例子。怎么样将这种链式调用推广到一般的函数呢？我参考Rxjs的pipe写了这个函数。全部源码就是下面这个函数：
```
/**
 * 
 * 该函数将从左到右依次执行给定的函数，第一个参数为原始参数数组。chainFunctions([1,2,3],f,g,h) <=> h(g(f(1,2,3)))。
 * 建议传入函数均为“纯函数”，无副作用，总是有返回值，给定相同参数每次的返回值均相同；当然非“纯函数”也能使用。
 * @param {Array} input 原始参数数组
 * @param  {...any} fns 需要依次执行的函数
 */
function chainFunctions(input: Array<any>, ...fns: Array<Function>){
    return fns.reduce((preResult: any, currentFn: Function, index: number) => {
        return index === 0 ? currentFn(...preResult) : currentFn(preResult);
    }, input);
}
```

# npm 安装：

npm i js-function-chain


# import方式：

+ import { chainFunctions } from './functionChain/functionChain.js'; // es6 或者 ts
+ let chainFunctions = require('./functionChain/functionChainNodejs.js').chainFunctions; // nodejs导入
+ window.chainFunctions; // 传统方式直接使用


# Demos
```
// demo1，普通使用
console.log(chainFunctions([1,2], (x,y) => x+y, (x) => x*2, (x) => x*x));

// demo2，使用柯里化(curry)函数
function createMessage(subject, msg){
    return `${subject} create message '${msg}'`;
}
function sendMessage(msg, object){
    return `${msg} send to ${object}`;
}
function concatMessage(msg1, msg2){
    return `${msg1} and ${msg2}`;
}
console.log(chainFunctions(['alice', 'hello'], createMessage, (msg) => concatMessage(msg,''), (msg) => sendMessage(msg, 'bob')));

// demo3，注意chainFunctions函数第一个参数是参数的数组，所以当参数是数组时，要在外面嵌套一层数组
function findMin3(numberArr){
    return chainFunctions([numberArr],   // 注意这里numberArr外嵌套了一层数组
                (arr) => arr.sort((a,b) => a-b),
                (arr) => arr.slice(0,3));
}
console.log(findMin3([24,42,12,23,52,2,7,31,3,234]));
```
