

function josephus(items,k){
  //your code here;
  let rslt = [];
  let cnt = 0;
  if (!items.length || k === 1) {
    return items;
  }
  for (let i = 0; i <= items.length; i++) {
    cnt++;
    if (items.length === 1) {
      return [...rslt, items[0]];
    }
    if (i === items.length) {
      i = 0;
    }
    if(cnt === k) {
      rslt = [...rslt, items[i]];
      items = [...items.slice(0, i), ...items.slice(i+1)];
      cnt = 1;

      if (i === items.length) {
        i = 0;
      } 
    }
    
  }
}

josephus([1,2,3,4,5,6,7,8,9,10],1);// [3, 6, 2, 7, 5, 1, 4]
josephus([1,2,3,4,5,6,7,8,9,10],2)
josephus(["C","o","d","e","W","a","r","s"],4)// ['e', 's', 'W', 'o', 'C', 'd', 'r', 'a']
josephus([1,2,3,4,5,6,7],3); // [3, 6, 2, 7, 5, 1, 4]
function add(a){
  // Let the currying begin!
  let currentSum = a;

  function f(b) {
    currentSum += b;
    return f;
  }

  f.toString = function() {
    return currentSum;
  };

  return f;
}

add(1)(3)(5);

let str = 'aaabbbaaaacczzccccccccz';
const strArr = str.split('');
let rslt = [];

for (let i = 0; i < str.length; i++) {
  if (str[i] !== str[i+1]) {  
    rslt = [...rslt, str.slice(0, i+1)];
    str = str.slice(i+1);
    i = 0;
  }
}

let newStr = rslt[0];
for (let i = 0; i < rslt.length; i++) {
  if (rslt[i].length > newStr.length) {
    newStr = rslt[i];
  }
}

function findUniq(arr) {
  // do magic
  const parsedArr = arr.map(str => str.replace(/ /g, '').toLowerCase()).filter(str => str)
    
  const filteredArr = parsedArr.map(string => {
      const elAr = string.split('');
      return elAr.sort().join('');
    });
  
  filteredArr.sort()
  
  if (filteredArr.length === 1) return filteredArr[0]
  const rslt = filteredArr[0][0] === filteredArr[1][0] ? filteredArr.pop() : filteredArr[0];
  const findStr = arr.find((str) => {
    const newStr = str.toLowerCase();
    const newarr = newStr.split('');
    const cur = newarr.sort().join('').replace(/ /g, '');
    if (cur === rslt) {
      return str;
    }
  });

  return findStr;
}

findUniq([ 'Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a' ]) // BbBb
findUniq([ 'abc', 'acb', 'bac', 'foo', 'bca', 'cab', 'cba' ]) // foo
findUniq([ 'silvia', 'vasili', 'victor' ]) // victor
findUniq([ 'Tom Marvolo Riddle', 'I am Lord Voldemort', 'Harry Potter' ]) //'Harry Potter'
findUniq([ '    ', 'a', ' ' ]) //a


/* function findUniq1(arr) { 
  var mySet = [...new Set(arr)];   
  console.log(mySet);
  return arr.filter(x => x === mySet[0]).length === 1 ? mySet[0] : mySet[1];
}

findUniq1([ 1, 1, 1, 2, 1, 1 ])
findUniq1([ 4, 4, 'foo', 4 ]) */