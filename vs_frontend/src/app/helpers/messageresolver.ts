import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { WebdataService } from '../services/webdata.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class Messageresolver implements Resolve<any> {

    constructor(private web: WebdataService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.web.showMessageById(route.paramMap.get('id'));
    }
}
