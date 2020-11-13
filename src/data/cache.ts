class Cache<T extends Record<any, any>> {
  private cache: T = {} as T;

  public replace(store: T) {
    this.cache = store;
  }

  public get(key: keyof T) {
    return this.cache[key];
  }

  public getPaginated(key: keyof T, offset: number): T[keyof T] {
    return this.cache[key]?.slice(offset, offset + 500) || [];
  }

  public getNumberOfPages(key: string) {
    const length = this.cache[key]?.length;
    return length ? (10 * Math.ceil(length / 1000)) / 10 - 1 : -1;
  }

  public set(key: keyof T, value: T[keyof T]): void {
    this.cache[key] = value;
  }
}

export default Cache;
