import HashMap from "./HashMap.mjs";

const test = new HashMap(); 
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("lion", "mikul");
test.set("moon", "silver");
test.set("moond", "silver");

console.log(test.length());
console.log(test.entries());
