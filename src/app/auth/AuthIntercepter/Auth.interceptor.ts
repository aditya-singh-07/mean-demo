import { Injectable } from '@angular/core';
import {  HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { AuthserviceService } from '../authservice.service';

@Injectable()
export class AuthIntercepter implements HttpInterceptor{
  constructor(private Authservice:AuthserviceService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const Authtoken=this.Authservice.getToken();
    const Authreq=req.clone({
      headers: req.headers.set('Authorization', "Bearer " + Authtoken)
    })
    return next.handle(Authreq);
  }

}
