import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() {}
  private _url: string;

  get url() {
    return this._url;
  }


}
