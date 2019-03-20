import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() {}
  private _url = 'http://' + '192.168.1.4:3000';

  get url() {
    return this._url;
  }


}
