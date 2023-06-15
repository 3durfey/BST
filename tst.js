let x = true;
let y = false;
if (x ^ y) console.log(true);
else console.log(false);

let queue = new Array();

queue.push(3);
queue.push(45);
queue.push(453);

console.log(queue.shift());
console.log(queue.length);
while (queue.length > 0) {
  queue.shift();
  console.log("shift");
}
