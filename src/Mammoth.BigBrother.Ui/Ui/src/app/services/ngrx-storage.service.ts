import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class NgrxStorageService {

  constructor(
    private storageService: StorageService,
    private store: Store<IAppState>
  ) {
    window.addEventListener("beforeunload", () => {
      this.saveState();
    });
  }

  public saveState() {
    this.store.subscribe(state => this.storageService.set("ngrxstate", state)).unsubscribe();
  }
}
