class MyArray {
  constructor(...a) {
    if (a.length === 0) {
      this.length = 0;
    } else if (a.length === 1 && typeof a[0] === 'number') {
      if (Number.isFinite(a[0]) && a[0] >= 0) {
        this.length = a[0];
      }
      else {
        throw new RangeError('Invalid length of array');
      }
    }
    else {
      for (let i = 0; i < a.length; i++) {
        this[i] = a[i];
      }

      this.length = a.length;
    }
  }
  // Method push to the end of arr
  push(...a) {
    for (let i = 0; i < a.length; i++) {
      this[this.length] = a[i];
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
      const returned = this[this.length - 1];
      delete this[this.length - 1];
      this.length -= 1;
      return returned;
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
  filter(callback, thisArg) {
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

    if (array === undefined || array.length === 0) {
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
    initialValue !== undefined ? accumulator = initialValue : accumulator = this[0];
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

        while (j > 0 && String(this[j - 1]) > String(current)) {
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
    const len = this.length;
    let size = this.length;
    let start = begin || 0;
    start = (start >= 0) ? start : len + start;

    let upTo = (end) ? end : len;

    if (end < 0) {
      upTo = len + end;
    }

    size = upTo - start;


    if (size > 0) {
      arr = new MyArray(size);

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
  }

  // spread
  * [Symbol.iterator]() {
    // let l = this.length;
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}


export default MyArray;