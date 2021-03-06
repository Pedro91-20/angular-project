import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
    public url:string;

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;
    }

    testService(){
        return 'Probando el servicio del Angular';
    }

    saveProject(project:Project): Observable<any>{
        let params = JSON.stringify(project);  // parametros de nuestro proyecto en JSON
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); // cabecera para enviar la informacion

        return this._http.post(this.url+'save project', params, {headers: headers});
    }
}

