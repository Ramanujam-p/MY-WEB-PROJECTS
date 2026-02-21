const a = [1, 2]
const b = a;
b.push(3)
console.log(a) // [1, 2, 3]
//direct copy of an array
const c = [...a]
c.push(4)
console.log(a) // [1, 2, 3]
console.log(c) // [1, 2, 3, 4]