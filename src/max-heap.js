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
        return maxNode.data;
    }

    detachRoot() {
        var maxNode = this.root;

        if (maxNode.left) {
            this.root = maxNode.left;
            if (maxNode.right) {
                var maxNodeRight = maxNode.right;
                this.root.appendChild(maxNodeRight);
                this.shiftNodeUp(maxNodeRight);
                if(maxNodeRight.left === this.root  || maxNodeRight.right === this.root){
                    this.root = maxNodeRight;
                }
            }
        }
        else {
            this.root = null;
        }
        return maxNode;
    }

    restoreRootFromLastInsertedNode(detached) {
        var lastInsertedNode = null;
        
        if(detached){
            findLastInsertedNode(detached);
        }

        function findLastInsertedNode(){
            if(detached.left){
                lastInsertedNode = findLastInsertedNode(detached.left);
            }
            else {
                if(detached.right){
                    lastInsertedNode = findLastInsertedNode(detached.right);
                }
            }
            return lastInsertedNode;
        }

        this.root = lastInsertedNode;
    }

    size() {
        var sum = 0;
        var calculateAllNode =  function(node){
            if(node.left){
                sum++;
                calculateAllNode(node.left);
            }
            if(node.right){
                sum++;
                calculateAllNode(node.right);
            }
        }
        if(this.root){
            sum++;
            calculateAllNode(this.root);
        }


        return sum;
    }

    isEmpty() {
        if (this.parentNodes.length == 0 && this.root == null) {
            return true;
        }
        else {
            return false;
        }
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
            if (node.parent.priority < node.priority) {
                node.swapWithParent();
                /*				if (node.parent) {
                 var nodeForChange = this.parentNodes.shift();
                 var swappedNode = this.parentNodes.pop();
                 this.parentNodes.push(nodeForChange);
                 this.parentNodes.unshift(swappedNode);
                 }*/
                this.shiftNodeUp(node);
            }
            /*else {
             if(node.parent.parent){
             //this.shiftNodeUp(node.parent);
             }

             }*/
        }
        else {
            var prevRoot = this.root;
            this.parentNodes.shift();//this shifted node == node;
            this.parentNodes.unshift(prevRoot);
            this.root = node;
            //console.log("this.parentNodes = "+this.parentNodes);
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
        if (node.left) {
            if (node.left.priority > node.priority) {
                this.shiftNodeUp(node.left);
                this.shiftNodeDown(node);
            }
            /* else{
             if(node.left.left)
             this.shiftNodeDown(node.left);
             }*/
        }
        else {
            var maxPriorityNode = this.root;
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
