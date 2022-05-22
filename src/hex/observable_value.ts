export class ObservableValue<T> {
  private value: T;
  private callbacks: ((v: T) => void)[];
  private callbackIds: string[];

  constructor(initialValue: T) {
    this.value = initialValue;
    this.callbacks = [];
    this.callbackIds = [];
  }

  getValue() {
    return this.value;
  }

  onChange(callback: (v: T) => void, id: string) {
    this.callbacks.push(callback);
    this.callbackIds.push(id);
  }

  setValue(newValue: T) {
    this.value = newValue;
    this.callbacks.forEach((callback) => callback(this.value));
  }

  transformValue(transform: (v: T) => T) {
    this.setValue(transform(this.value));
  }

  unsubscribe(id: string) {
    const index = this.callbackIds.findIndex((i) => i === id);
    if (index >= 0) {
      this.callbackIds.splice(index, 1);
      this.callbacks.splice(index, 1);
    }
  }

  dispose() {
    this.callbacks = [];
    this.callbackIds = [];
  }
}
