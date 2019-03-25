import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
const headers = new HttpHeaders({'Content-Type':  'application/json','Authorization': 'my-auth-token'})

@Injectable({
  providedIn: 'root'
})



export class PPTService {

  constructor(private http: HttpClient) {
    console.log('PPT Service Listo');
  }
  
 //_URL:string='http://localhost:51192/api/PPT/';
  _URL:string = 'https://api-ppt.azurewebsites.net/api/PPT/';

  getQuery( query: string ) {
    const url = `${this._URL}${ query }`;
    return this.http.get(url);
  }

  postQuery( body: string ) {
    const url = `${this._URL}${ body }`;
    return this.http.post(url,body,{headers});
  }

  //GETS
  getPlayers() {
    return this.getQuery('GetAllPlayers/');
  }

  getResultGames( ) {
    return this.getQuery('GetAllResultGames');
  }


  //POST
  postManvsMan(NameOnePlayer:string,Weapon1:number,NameSecondPlayer:string,Weapon2:number){
    return this.postQuery(`PlayGameMultiPlayer/${ NameOnePlayer }/${Weapon1}/${ NameSecondPlayer }/${Weapon2}`);
  }

  postManvsMachine(NameOnePlayer:string,Weapon:number){
    return this.postQuery(`PlayGameMachine/${ NameOnePlayer }/${Weapon}`);
  }
}
