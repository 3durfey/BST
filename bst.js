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
      let parent = this.rootNode;
      let side = "none";
      while (true) {
        if (input === tempNode.value) {
          //when both are null
          if (tempNode.leftChild === null && tempNode.rightChild === null) {
            if (side === "left") {
              parent.leftChild = null;
            } else {
              parent.rightChild = null;
            }
            //when only one node is null
          } else if (
            (tempNode.leftChild === null) ^
            (tempNode.rightChild === null)
          ) {
            let child;
            tempNode.leftChild !== null
              ? (child = tempNode.leftChild)
              : (child = tempNode.rightChild);
            if (side === "right") {
              parent.rightChild = child;
            } else {
              parent.leftChild = child;
            }
          } else {
            //when both nodes aren't null
            parent = tempNode;
            tempNode = tempNode.leftChild;
            tempNodeParent = tempNode;
            let travel = false;
            while (!(tempNode.rightChild === null)) {
              travel = true;
              tempNodeParent = tempNode;
              tempNode = tempNode.rightChild;
            }
            let temp = tempNode.value;
            parent.value = tempNode.value;
            if (tempNode.leftChild !== null) {
              parent.leftChild = tempNode.leftChild;
            } else if (travel) {
              tempNodeParent.rightChild = null;
            } else {
              parent.leftChild = null;
            }
          }
          return;
        } else if (input > tempNode.value) {
          if (tempNode.rightChild === null) {
            return "not found";
          } else {
            parent = tempNode;
            tempNode = tempNode.rightChild;
            side = "right";
          }
        } else if (input < tempNode.value) {
          if (tempNode.leftChild === null) {
            return "not found";
          } else {
            parent = tempNode;
            tempNode = tempNode.leftChild;
            side = "left";
          }
        }
      }
    },
    find(input) {
      let currentNode = this.rootNode;
      while (currentNode.value !== input) {
        if (input > currentNode.value) {
          if (currentNode.rightChild === null) {
            return "not found";
          } else {
            currentNode = currentNode.rightChild;
          }
        } else if (input < currentNode.value) {
          if (currentNode.leftChild === null) {
            return "not found";
          } else {
            currentNode = currentNode.leftChild;
          }
        }
      }
      return currentNode.value + " found";
    },
    levelOrder(func) {
      let queue = new Array();
      queue.push(this.rootNode);
      while (queue.length > 0) {
        let node = queue.shift();
        func(node);
        if (node.leftChild !== null) queue.push(node.leftChild);
        if (node.rightChild !== null) queue.push(node.rightChild);
      }
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
tree.buildTree(mergeSort([1, 2, 3, 23, 33, 42, 55, 66, 70, 89]));

//prettyPrint(tree.rootNode);
let count = 0;
function func(input) {
  count++;
  console.log(count);
}
tree.levelOrder(func);
//function to print the tree
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

//functions for random number
function arrayOfRandom(size) {
  let array = new Array(size);
  for (let x = 0; x < size; x++) {
    let temp = Math.round(Math.random() * 100 + 1);
    array[x] = temp;
  }
  return array;
}

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
