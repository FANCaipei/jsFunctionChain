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