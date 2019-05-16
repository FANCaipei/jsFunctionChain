/**
 * author CaipeiFAN; 
 * email 2272946937@qq.com;
 * createTime 2019/05/16;
 **/

/**
 * 
 * 该函数将从左到右依次执行给定的函数，第一个参数为原始参数数组。chainFunctions([1,2,3],f,g,h) <=> h(g(f(1,2,3)))。
 * 建议传入函数均为“纯函数”，无副作用，总是有返回值，给定相同参数每次的返回值均相同；当然非“纯函数”也能使用。
 * @param {Array} input 原始参数数组
 * @param  {...any} fns 需要依次执行的函数
 */
function chainFunctions(input, ...fns){
    return fns.reduce((preResult, currentFn, index) => {
        return index === 0 ? currentFn(...preResult) : currentFn(preResult);
    }, input);
}

if (!window.chainFunctions){
    window.chainFunctions = chainFunctions;
}

export { chainFunctions }; // es6 export