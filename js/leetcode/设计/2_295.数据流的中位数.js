// 295. 数据流的中位数
// 中位数是有序列表中间的数。如果列表长度是偶数，中位数则是中间两个数的平均值。

// 例如，

// [2,3,4] 的中位数是 3

// [2,3] 的中位数是 (2 + 3) / 2 = 2.5

// 设计一个支持以下两种操作的数据结构：

// void addNum(int num) - 从数据流中添加一个整数到数据结构中。
// double findMedian() - 返回目前所有元素的中位数。
// 示例：

// addNum(1)
// addNum(2)
// findMedian() -> 1.5
// addNum(3) 
// findMedian() -> 2

/**
 * initialize your data structure here.
 */

// 超时
var MedianFinder = function () {
  this.nums = [];
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.nums.push(num);
  this.nums.sort((a, b) => a - b);
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  let n = this.nums.length;
  if (n == 0) return 0;
  if (n % 2 == 0) {
    let index = n >> 1;
    return (this.nums[index] + this.nums[index - 1]) / 2;
  } else {
    let index = n >> 1;
    return this.nums[index];
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// 下面方法使用两个堆优化

/**
 * initialize your data structure here.
 */
class MaxHeap {
  constructor(comparer) {
    this.comparer = comparer;

    this.data = [];
  }

  leftChild(index) {
    return index * 2 + 1;
  }

  rightChild(index) {
    return index * 2 + 2;
  }

  parent(index) {
    return (index - 1) >> 1;
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.size() == 0;
  }

  swap(i, j) {
    let temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  // 堆中添加元素
  offer(num) {
    this.data.push(num);
    this.__siftUp(this.size() - 1);
  }

  __siftUp(index) {
    while (this.parent(index) >= 0 && this.data[this.parent(index)] < this.data[index]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  // 取出堆顶元素
  poll() {
    let ret = this.data[0];
    this.swap(0, this.size() - 1);
    this.data.pop();
    this.__siftDown(0);
    return ret;
  }

  __siftDown(index) {
    while (this.leftChild(index) < this.size()) {
      let maxIndex = this.leftChild(index);
      if (this.rightChild(index) < this.size() && this.data[this.rightChild(index)] > this.data[maxIndex]) {
        maxIndex = this.rightChild(index);
      }

      if (this.data[index] > this.data[maxIndex]) {
        break;
      }

      this.swap(index, maxIndex);
      index = maxIndex;
    }
  }

  // 查看堆顶元素
  peek() {
    return this.data[0];
  }
}

class MinHeap {
  constructor(comparer) {
    this.comparer = comparer;

    this.data = [];
  }

  leftChild(index) {
    return index * 2 + 1;
  }

  rightChild(index) {
    return index * 2 + 2;
  }

  parent(index) {
    return (index - 1) >> 1;
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.size() == 0;
  }

  swap(i, j) {
    let temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  // 堆中添加元素
  offer(num) {
    this.data.push(num);
    this.__siftUp(this.size() - 1);
  }

  __siftUp(index) {
    while (this.parent(index) >= 0 && this.data[this.parent(index)] > this.data[index]) {
      this.swap(index, this.parent(index));
      index = this.parent(index);
    }
  }

  // 取出堆顶元素
  poll() {
    let ret = this.data[0];
    this.swap(0, this.size() - 1);
    this.data.pop();
    this.__siftDown(0);
    return ret;
  }

  __siftDown(index) {
    while (this.leftChild(index) < this.size()) {
      let minIndex = this.leftChild(index);
      if (this.rightChild(index) < this.size() && this.data[this.rightChild(index)] < this.data[minIndex]) {
        minIndex = this.rightChild(index);
      }

      if (this.data[index] < this.data[minIndex]) {
        break;
      }

      this.swap(index, minIndex);
      index = minIndex;
    }
  }

  // 查看堆顶元素
  peek() {
    return this.data[0];
  }
}

var MedianFinder = function () {
  // 存放中间位置左边元素的大顶堆
  this.small = new MaxHeap();
  // 存放中间位置右边元素的小顶堆
  this.large = new MinHeap();
};

/** 
 * @param {number} num
 * @return {void}
 */

MedianFinder.prototype.addNum = function (num) {
  let small = this.small;
  let large = this.large;

  // 如果存放小元素的大顶堆元素更多,则添加至存放大元素的小顶堆
  // 往大顶堆加元素,要先把元素加入小顶堆,在把小顶堆堆顶的元素加入大顶堆
  // 反之亦然
  if (small.size() >= large.size()) {
    small.offer(num);
    large.offer(small.poll());
  } else {
    large.offer(num);
    small.offer(large.poll());
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {
  let small = this.small;
  let large = this.large;
  if (small.size() > large.size()) {
    return small.peek();
  } else if (large.size() > small.size()) {
    return large.peek();
  }
  return (small.peek() + large.peek()) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */


 