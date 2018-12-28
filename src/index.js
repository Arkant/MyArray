class MyArray {
  constructor(...args) {
    if (args.length === 1 && typeof args[0] === 'number') {
      if (Number.isFinite(args[0]) && args[0] >= 0) {
        this.length = args[0];
      }
      else {
        throw new RangeError('Invalid length of array');
      }
    }
    else {
      for (let i = 0; i < args.length; i++) {
        this[i] = args[i];
      }

      this.length = args.length;
    }
  }

  // Method push to the end of arr
  push(...args) {
    for (let i = 0; i < args.length; i++) {
      this[this.length] = args[i];
      this.length += 1;
    }
    return this.length;
  }
  // Method pop, delete last el
  pop() {
    if (this.length === 0) {
      return undefined;
    }
    else {
      const returnedValue = this[this.length - 1];
      delete this[this.length - 1];
      this.length -= 1;
      return returnedValue;
    }
  }
  // Method callback on each
  forEach(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  }
  // Method map by callback
  map(callback, thisArg) {
    const arr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      arr.push(callback.call(thisArg, this[i], i, this));
    }
    return arr;
  }
  // Method filter by callback
  filter(callback, thisArg = this) {
    const arr = new MyArray();

    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        arr.push(this[i]);
      }
    }
    return arr;
  }
  // Method create arr from value
  static from(array, callback, thisArg) {
    const arr = new MyArray();

    if (array === undefined) {
      throw new TypeError('items is undefined');
    } else if (array === null) {
      throw new TypeError('items is null');
    }

    if (callback && thisArg) {
      for (let i = 0; i < array.length; i++) {
        arr.length += 1;
        arr[i] = callback.call(thisArg, array[i], i, array);
      }
    } else if (callback) {
      for (let i = 0; i < array.length; i++) {
        arr.length += 1;
        arr[i] = callback(array[i], i, array);
      }
    } else {
      for (let i = 0; i < array.length; i++) {
        arr.push(array[i]);
      }
    }
    return arr;
  }

  // Method reduce arr
  reduce(callback, initialValue) {
    let len = null;
    let accumulator = null;
    let i = 0;
    initialValue !== undefined ? (accumulator = initialValue, i = 0) : (accumulator = this[0], i = 1);
    this !== null ? len = this.length : len = 0;

    if (len === 0 && !initialValue) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    if (len === 1 && !initialValue) {
      return this[0];
    }

    if (len === 0 && initialValue) {
      return initialValue;
    }

    for (; i < len; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
  }
  // Method convert to string
  toString() {
    let str = String();

    if (this.length === 0 || this.length === undefined) {
      return str;
    }

    for (let i = 0; i < this.length; i++) {
      if (i === this.length - 1) {
        str += `${this[i]}`;
      }
      else {
        str += `${this[i]},`;
      }
    }
    return str;
  }
  // вставками + пузырьком
  sort(callback) {
    if (callback) {
      for (let i = 0; i < this.length - 1; i++) {
        for (let j = 0; j < this.length - 1; j++) {
          if (!(callback(this[j], this[j + 1]) <= 0)) {
            const max = this[j];
            this[j] = this[j + 1];
            this[j + 1] = max;
          }
        }
      }
    }
    else {
      for (let i = 1; i < this.length; i++) {
        const current = this[i];
        let j = i;

        while (j > 0 && `${this[j - 1]}` > `${current}`) {
          this[j] = this[j - 1];
          j -= 1;
        }
        this[j] = current;
      }
    }
    return this;
  }

  // find
  find(callback, thisArg) {
    for (let i = 0; i < this.length; i++) {
      if (callback.call(thisArg, this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
  }

  // slice
  slice(begin, end) {
    let arr = null;
    let size = this.length;
    let start = begin || 0;
    let upTo = (end) ? end : size;

    start = (start >= 0) ? start : size + start;
    (end < 0) ? upTo = size + end : true;
    size = upTo - start;
    (size > 0) ? arr = new MyArray(size) : true;

    if (this.charAt) {
      for (let i = 0; i < size; i++) {
        arr[i] = this.charAt(start + i);
      }
    } else {
      for (let i = 0; i < size; i++) {
        arr[i] = this[start + i];
      }
    }

    return arr;
  }

  // spread
  * [Symbol.iterator]() {
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}


export default MyArray;