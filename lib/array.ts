export {};

declare global {
  interface Array<T> {
    remove(...forDeletion: T[]): Array<T>;
  }
}

Array.prototype.remove = function (...forDeletion: any[]): any[] {
  return this.filter((item) => !forDeletion.includes(item));
};
