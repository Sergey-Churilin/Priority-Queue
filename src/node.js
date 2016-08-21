class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left && this.right){
			if(!this.left.right){
				this.left.appendChild(node);
			}
			else{
				this.right.appendChild(node);
			}
			return;
		}
		if (this.left == null){
			this.left = node;
			node.parent = this;
		}
		else{
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {

		if(this.left == node){
			this.left = null;
			node.parent = null;
		}
		else if(this.right == node) {
			this.right = null;
			node.parent = null;
		}
		else{
			throw "Error in code!Passed node is not a child of this node";
		}
	}

	remove() {
		if(this.parent){
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(!this.parent) return;

		var parentParent = null;
		var parentLeft = null;
		var parentRight = null;
		var thisLeft = null;
		var thisRight = null;

		if(this.parent.parent){
			parentParent = this.parent.parent;
			this.parent.remove();
		}

		var parent = this.parent;
		if(parent.left && parent.left != this){
			parentLeft = parent.left;
			parent.removeChild(parentLeft);
		}

		if(parent.right && parent.right != this){
			parentRight = parent.right;
			parent.removeChild(parentRight);
		}

		if(this.left){
			thisLeft = this.left;
			this.removeChild(thisLeft);
		}
		if(this.right){
			thisRight = this.right;
			this.removeChild(thisRight);
		}

		this.remove();

		if(parentLeft){
			this.appendChild(parentLeft);
		}

		this.appendChild(parent);

		if(parentRight){
			this.appendChild(parentRight);
		}
		
		if(thisLeft){
			parent.appendChild(thisLeft);
		}
		if(thisRight){
			parent.appendChild(thisRight);
		}

		if(parentParent){
			parentParent.appendChild(this);
		}
		return this;
	}
}

module.exports = Node;
