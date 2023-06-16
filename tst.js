function recursion(input = 40) {
  if (input === 50) return 0;
  else {
    return 1 + recursion(++input);
  }
}
console.log(recursion());
