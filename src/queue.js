const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = 30;
		if(maxSize){
			this.maxSize = maxSize;
		}
		this.heap = new MaxHeap();
	}

	push(data, priority) {
			this.heap.push(data,priority);
			var size = this.size();
			if(size > this.maxSize) {{
				throw new Error("Error in code! Heap size more or equal maxSize"); //;
			}}
	}

	shift() {
		if(this.isEmpty()){
			throw "Error in code! Queue must not be empty";
		}
		var data = this.heap.pop().data;
		if(!data){
			return 0;
		}
		return data;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
