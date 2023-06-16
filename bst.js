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

    //builds tree
    buildTree(array) {
      this.array = [...new Set(array.sort((a, b) => a - b))];
      this.rootNode = this.split(this.array);
    },
    //function to return middle number, then recursively return middle of each side till end
    split(array) {
      if (array.length === 0) return null;
      if (array.length === 1) return nodeFactory(array[0], null, null);
      //if (array.length === 2) return nodeFactory(array[1], array[0], null);
      let root = Math.round(array.length / 2 - 1);
      let left = [],
        right = [];
      for (let x = 0; x < root; x++) left.push(array[x]);
      for (let y = root + 1; y < array.length; y++) right.push(array[y]);
      return nodeFactory(array[root], this.split(left), this.split(right));
    },

    //inserts into tree
    insert(input) {
      let tempNode = this.rootNode;
      const newNode = nodeFactory(input, null, null);
      while (true) {
        if (input > tempNode.value) {
          if (tempNode.rightChild === null) {
            tempNode.rightChild = newNode;
            return;
          } else tempNode = tempNode.rightChild;
        } else {
          if (tempNode.leftChild === null) {
            tempNode.leftChild = newNode;
            return;
          } else tempNode = tempNode.leftChild;
        }
      }
    },

    delete(input, node = this.rootNode) {
      //when node is null return
      if (node === null) return node;
      if (node.value === input) {
        //when both are null
        if (node.leftChild === null && node.rightChild === null) return null;
        //when only one node is null
        else if (node.rightChild === null) return node.leftChild;
        else if (node.leftChild === null) return node.rightChild;
        //when both are not null
        else {
          let currentNode = node.leftChild;
          while (currentNode.rightChild !== null) {
            currentNode = currentNode.rightChild;
          }
          node.value = currentNode.value;
          node.leftChild = this.delete(node.value, node.leftChild);
        }
      }
      //go down till you find node
      if (input < node.value)
        node.leftChild = this.delete(input, node.leftChild);
      else node.rightChild = this.delete(input, node.rightChild);
      return node;
    },

    find(input) {
      let currentNode = this.rootNode;
      while (currentNode.value !== input) {
        if (input > currentNode.value) {
          if (currentNode.rightChild === null) return "not found";
          else currentNode = currentNode.rightChild;
        } else if (input < currentNode.value) {
          if (currentNode.leftChild === null) return "not found";
          else currentNode = currentNode.leftChild;
        }
      }
      return currentNode;
    },

    levelOrder() {
      let queue = new Array();
      queue.push(this.rootNode);
      this.traverse(queue);
      return;
    },

    inorder() {
      let queue = new Array();
      if (this.rootNode.leftChild !== null) queue.push(this.rootNode.leftChild);
      this.traverse(queue);
      if (this.rootNode.rightChild !== null)
        queue.push(this.rootNode.rightChild);
      this.traverse(queue);
    },

    preorder(func) {
      let queue = new Array();
      console.log(this.rootNode.value);
      if (this.rootNode.leftChild !== null) queue.push(this.rootNode.leftChild);
      this.traverse(queue);
      if (this.rootNode.rightChild !== null)
        queue.push(this.rootNode.rightChild);
      this.traverse(queue);
    },

    postorder(func) {
      let queue = new Array();
      if (this.rootNode.leftChild !== null) queue.push(this.rootNode.leftChild);
      this.traverse(queue);
      if (this.rootNode.rightChild !== null)
        queue.push(this.rootNode.rightChild);
      this.traverse(queue);
      console.log(this.rootNode.value);
    },

    traverse(queue) {
      while (queue.length > 0) {
        let node = queue.shift();
        console.log(node.value);
        if (node.leftChild !== null) queue.push(node.leftChild);
        if (node.rightChild !== null) queue.push(node.rightChild);
      }
    },

    height(node = this.rootNode) {
      if (node === null) return 0;
      const returnRight = this.heightRecursive(node.rightChild);
      const returnLeft = this.heightRecursive(node.leftChild);
      return Math.max(returnRight, returnLeft) + 1;
    },

    depth(input, currentNode = this.rootNode) {
      if (currentNode === null) return;
      if (input > currentNode.value)
        return this.depth(input, currentNode.rightChild) + 1;
      else if (input < currentNode.value)
        return this.depth(input, currentNode.leftChild) + 1;
      else return 1;
    },

    isBalanced() {
      const result = this.isBalancedRecursive(this.rootNode);
      if (result < 0) console.log("unbalanced");
      else console.log("balanced");
    },
    isBalancedRecursive(currentNode) {
      if (currentNode === null) return 0;
      const left = this.isBalancedRecursive(currentNode.leftChild);
      if (left === -1) return -1;
      const right = this.isBalancedRecursive(currentNode.rightChild);
      if (right === -1) return -1;
      if (Math.abs(right - left) > 1) return -1;
      return Math.max(left, right) + 1;
    },

    rebalance() {
      let array = new Array();
      let queue = new Array();
      queue.push(this.rootNode);
      while (queue.length > 0) {
        let currentNode = queue.shift();
        array.push(currentNode.value);
        if (currentNode.leftChild !== null) queue.push(currentNode.leftChild);
        if (currentNode.rightChild !== null) queue.push(currentNode.rightChild);
      }
      this.buildTree(array.sort((a, b) => a - b));
    },
  };
}
//running through binary tree functions
let tree = treeFactory();
tree.buildTree(arrayOfRandom(100));
tree.isBalanced();
tree.inorder();
tree.postorder();
tree.levelOrder();
tree.preorder();

tree.insert(101);
tree.insert(102);
tree.insert(103);
tree.insert(104);
tree.insert(105);

tree.isBalanced();
tree.rebalance();
tree.isBalanced();

//function to print the tree
function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) return;
  prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.leftChild !== null)
    prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
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
