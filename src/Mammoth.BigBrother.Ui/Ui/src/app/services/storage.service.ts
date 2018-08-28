import { Injectable } from '@angular/core';

export abstract class StorageService {

  protected constructor(
    private storage: Storage
  ) { }

  get<T>(key: string): T {
    const v = this.storage.getItem(key);
    let value: any;
    try {
      value = JSON.parse(v);
    } catch (e) {
      value = v;
    }
    return value as T;
  }

  set(key: string, value: any): void {
    const v = typeof value === "string" ? value : JSON.stringify(value);
    this.storage.setItem(key, v);
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

}

@Injectable()
export class LocalStorageService extends StorageService {

  constructor() {
    super(localStorage);
  }
}

@Injectable()
export class SessionStorageService extends StorageService {

  constructor() {
    super(sessionStorage);
  }
}
