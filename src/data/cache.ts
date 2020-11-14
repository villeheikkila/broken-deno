class Cache<T extends Record<any, any>> {
  private cache: T = {} as T;
  private counter = 0;

  public replace(store: T) {
    this.counter++;
    this.cache = store;
  }

  public get(key: keyof T) {
    return this.cache[key];
  }

  public getCounter() {
    return this.counter;
  }

  public getPaginated(key: keyof T, offset: number): T[keyof T] {
    if (this.isEmpty()) return [] as T[keyof T];
    return this.cache[key].slice(offset, offset + 500);
  }

  public getNumberOfPages(key: string) {
    if (this.isEmpty()) return 0;
    return roundTo(this.cache[key].length, 500) / 500;
  }

  public set(key: keyof T, value: T[keyof T]): void {
    this.cache[key] = value;
  }

  public getStats(): Record<string, number> {
    return Object.entries(this.cache).reduce(
      (current, [key]) => ({ ...current, [key]: this.cache[key].length }),
      {}
    );
  }

  public isEmpty(): boolean {
    return Object.keys(this.cache).length === 0;
  }
}

const roundTo = (value: number, nearest: number) =>
  nearest * Math.ceil(value / nearest);

export default Cache;
