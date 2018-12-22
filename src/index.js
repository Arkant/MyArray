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
  reduce(callback, start) {
    let res = start;
    res === undefined ? res = this[0] : start;

    for (let i = 0; i < this.length; i++) {
      res = callback(null, res, this[i], i, this);
    }
    return res;
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
  // spread
  * [Symbol.iterator]() {
    // let l = this.length;
    for (let i = 0; i < this.length; i++) {
      yield this[i];
    }
  }
}


export default MyArray;