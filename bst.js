function nodeFactory(input, left, right) {
  return {
    value: input,
    leftChild: left,
    rightChild: right,
  };
}
function treeFactory() {
  return {
    array: null,
    rootNode: null,

    buildTree(array) {
      this.array = array;
      this.rootNode = split(this.array);
    },
    insert(input) {
      let tempNode = this.rootNode;
      let nullFound = false;
      while (!nullFound) {
        if (input > tempNode.value) {
          if (tempNode.rightChild === null) {
            nullFound = true;
            tempNode.rightChild = nodeFactory(input, null, null);
          } else {
            tempNode = tempNode.rightChild;
          }
        } else if (input < tempNode.value) {
          if (tempNode.leftChild === null) {
            nullFound = true;
            tempNode.leftChild = nodeFactory(input, null, null);
          } else {
            tempNode = tempNode.leftChild;
          }
        }
      }
    },
    delete(input) {
      let tempNode = this.rootNode;
      while (true) {
        if (input === tempNode.value) {
          return tempNode;
        } else if (input > tempNode.value) {
          if (tempNode.rightChild === null) {
            return "not found";
          } else {
            tempNode = tempNode.rightChild;
          }
        } else if (input < tempNode.value) {
          if (tempNode.leftChild === null) {
            return "not found";
          } else {
            tempNode = tempNode.leftChild;
          }
        }
      }
    },
    find(input) {
      return;
    },
    levelOrder(func) {
      return;
    },
    inorder(func) {
      return;
    },
    preorder(func) {
      return;
    },
    postorder(func) {
      return;
    },
    height(node) {
      return;
    },
    depth(node) {
      return;
    },
    isBalanced() {
      return;
    },
    rebalance() {
      return;
    },
  };
}

let tree = treeFactory();
tree.buildTree(mergeSort([1, 2, 3, 4]));
tree.insert(666);
tree.insert(0);
tree.insert(10);
console.log(tree.delete(90));

prettyPrint(tree.rootNode);
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}
//console.log(tree.rootNode);
console.log(tree.array);
//functions for random number
function arrayOfRandom(size) {
  let array = new Array(size);
  for (let x = 0; x < size; x++) {
    let temp = Math.round(Math.random() * 100 + 1);
    array[x] = temp;
  }
  return array;
}
//let n = split(mergeSort(arrayOfRandom(5)));
//console.log(n);
//function to return middle number, then recursively return middle of each side till end
function split(array) {
  if (array.length === 0) return null;
  if (array.length === 1) return nodeFactory(array[0], null, null);
  //if (array.length === 2) return nodeFactory(array[1], array[0], null);
  let root = Math.round(array.length / 2 - 1);
  let left = [],
    right = [];
  for (let x = 0; x < root; x++) left.push(array[x]);
  for (let y = root + 1; y < array.length; y++) right.push(array[y]);
  return nodeFactory(array[root], split(left), split(right));
}

//functions to sort array
function mergeSort(unsorted) {
  let array1, array2;
  if (unsorted.length > 1) {
    array1 = mergeSort(unsorted.slice(0, unsorted.length / 2));
    array2 = mergeSort(unsorted.slice(unsorted.length / 2));
  } else return unsorted;
  return merge(array1, array2);
}
function merge(insertArray, array) {
  let index = 0;
  for (x in insertArray) {
    while (insertArray[x] > array[index]) index++;
    if (insertArray[x] !== array[index])
      array = [...array.slice(0, index), insertArray[x], ...array.slice(index)];
  }
  return array;
}
