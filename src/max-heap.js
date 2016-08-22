const Node = require('./node');

class MaxHeap {
    constructor() {
        this.root = null;
        this.parentNodes = [];
    }

    push(data, priority) {
        var node = new Node();
        node.data = data;
        node.priority = priority;
        this.insertNode(node);
        this.shiftNodeUp(node);
    }

    pop() {
        if (this.isEmpty()) {
            return;
        }

        var maxNode = this.detachRoot();
        var lastInsertedNode = this.restoreRootFromLastInsertedNode(maxNode);
        this.shiftNodeDown(lastInsertedNode);

        return maxNode.data;
    }

    detachRoot() {
        var maxNode = this.root;

        if (maxNode.left || maxNode.right) {
            if (maxNode.left && maxNode.right) {
                if (maxNode.left.priority > maxNode.right.priority) {
                    this.root = maxNode.left;
                    this.root.appendChild(maxNode.right);
                    this.shiftNodeUp(maxNode.right);
                }
                else {
                    this.root = maxNode.right;
                    this.root.appendChild(maxNode.left);
                    this.shiftNodeUp(maxNode.left);
                }
            }
            else if (maxNode.left) {
                this.root = maxNode.left;
            }
            else {
                this.root = maxNode.right;
            }
        }
        else {
            this.root = null;
        }

        return maxNode;
    }

    restoreRootFromLastInsertedNode(detached) {
        if (this.root == null) return null;
        var oldRoot = this.root;
        var newRoot = null;
        if (oldRoot.left != null || oldRoot.right != null) {
            if (this.parentNodes.length > 0) {
                var indexToRemove = null;
                var lastInsertedNode = this.parentNodes[0];
                for (var i = 0; i < this.parentNodes.length; i++) {
                    if (lastInsertedNode.priority > this.parentNodes[i].priority) {
                        lastInsertedNode = this.parentNodes[i];
                    }
                    if (this.parentNodes[i] === oldRoot) {
                        indexToRemove = this.parentNodes[i];
                    }
                }
                if (indexToRemove != null) {
                    this.parentNodes.splice(indexToRemove, 1);
                }
                this.parentNodes.push(oldRoot);

                newRoot = lastInsertedNode;
                newRoot.remove();
                this.root = newRoot;
                this.root.appendChild(oldRoot);
            }
        }
        return this.root;
    }

    size() {
        var sum = 0;
        if (this.root != null) {
            sum++;
            calculateAllNodes(this.root);
        }

        function calculateAllNodes(node) {
            if (node.left) {
                sum++;
                calculateAllNodes(node.left);
            }
            if (node.right) {
                sum++;
                calculateAllNodes(node.right);
            }
        }

        return sum;
    }

    isEmpty() {
        return (this.parentNodes.length == 0 && this.root == null);
    }

    clear() {
        this.root = null;
        this.parentNodes = [];
    }

    insertNode(node) {
        if (this.isEmpty()) {
            this.root = node;
        }
        else {
            this.root.appendChild(node);
        }

        this.parentNodes.push(node);
        if (node.parent && node.parent.left && node.parent.right) {
            this.parentNodes.shift();
        }
    }

    shiftNodeUp(node) {
        if (node.parent) {
            if (node.parent.parent == null && node.parent.left != null && node.parent.right != null) {
                var leftParent = node.parent.left;
                if (node === node.parent.right && node.priority > leftParent.priority) {
                    node.parent.left = node;
                    node.parent.right = leftParent;
                }
            }

            if (node.parent.priority < node.priority) {
                node.swapWithParent();
                this.shiftNodeUp(node);
            }
        }
        else {
            var prevRoot = this.root;
            this.parentNodes.shift();
            this.parentNodes.unshift(prevRoot);
            this.root = node;
            var sortedArray = [];
            setInSortedOrder(this.root);

            function setInSortedOrder(node) {
                if (node.left) {
                    sortedArray.push(node.left);
                    if (node.right) {
                        sortedArray.push(node.right);
                    }
                    setInSortedOrder(node.left);
                }
            }

            this.parentNodes = sortedArray;
        }

    }

    shiftNodeDown(node) {
        if (!node) return;
        if (node.left != null) {
            if (node.left.priority > node.priority) {
                this.shiftNodeUp(node.left);
                this.shiftNodeDown(node);
            }
        }
        else {
            var maxPriorityNode = this.root ? this.root : this.parentNodes[0];
            for (var i = 0; i < this.parentNodes.length; i++) {
                if (this.parentNodes[i].priority > maxPriorityNode.priority) {
                    maxPriorityNode = this.parentNodes[i];
                }
            }
            this.root = maxPriorityNode;
            var sortedArray = [];
            setInSortedOrder(this.root);

            function setInSortedOrder(node) {
                if (node.left) {
                    sortedArray.push(node.left);
                    if (node.right) {
                        sortedArray.push(node.right);
                    }
                    setInSortedOrder(node.left);
                }
            }

            this.parentNodes = sortedArray;
        }
    }
}

module.exports = MaxHeap;
