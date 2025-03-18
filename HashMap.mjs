import LinkedList from "./linked-list/LinkedList.mjs";

export default class HashMap {
  constructor() {
    this.buckets = new Array(16);
    this.loadFactor = 0.75;
    this.capacity = this.buckets.length;
    this.entryCount = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  #updateBuckets() {
    this.capacity = this.capacity * 2;
    this.entryCount = 0;

    const oldBuckets = this.buckets;
    const newBuckets = new Array(this.capacity * 2);
    this.buckets = newBuckets;

    for (let i = 0; i < oldBuckets.length; i++) {
      if (!oldBuckets[i]) {
        continue;
      }

      let node = oldBuckets[i].head;
      while (node) {
        this.set(node.key, node.value);
        node = node.next;
      }
    }
  }

  set(key, value) {
    if (this.entryCount === this.capacity * this.loadFactor) {
      this.#updateBuckets();
    }

    const hashCode = this.hash(key);
    if (!this.buckets[hashCode]) {
      this.buckets[hashCode] = new LinkedList();
      this.buckets[hashCode].append(key, value);
      this.entryCount++;
      return;
    }

    // there exist a hash
    const node = this.buckets[hashCode].at(this.buckets[hashCode].find(key));
    if (node) {
      node.value = value;
    } else {
      this.buckets[hashCode].append(key, value);
      this.entryCount++;
    }
  }

  get(key) {
    const hashCode = this.hash(key);
    if (!this.buckets[hashCode]) {
      return null;
    }

    const index = this.buckets[hashCode].find(key);

    return this.buckets[hashCode].at(index) !== undefined
      ? this.buckets[hashCode].at(index).value
      : null;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  remove(key) {
    const hashCode = this.hash(key);
    if (!this.buckets[hashCode].removeAt(this.buckets[hashCode].find(key)))
      return true;
    return false;
  }

  length() {
    return this.entryCount;
  }

  clear() {
    this.buckets = new Array(16);
    this.capacity = this.buckets.length;
    this.entryCount = 0;
  }

  keys() {
    const keyArray = new Array();
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }

      let node = this.buckets[i].head;
      while (node) {
        keyArray.push(node.key);
        node = node.next;
      }
    }

    return keyArray;
  }

  values() {
    const valueArray = new Array();
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }

      let node = this.buckets[i].head;
      while (node) {
        valueArray.push(node.value);
        node = node.next;
      }
    }

    return valueArray;
  }

  entries() {
    const entryArray = new Array();
    for (let i = 0; i < this.buckets.length; i++) {
      if (!this.buckets[i]) {
        continue;
      }

      let node = this.buckets[i].head;
      while (node) {
        entryArray.push([node.key, node.value]);
        node = node.next;
      }
    }

    return entryArray;
  }
}
