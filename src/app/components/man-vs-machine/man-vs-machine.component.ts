import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PPTService } from '../../services/PPTService';
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-man-vs-machine',
  templateUrl: './man-vs-machine.component.html',
  styleUrls: ['./man-vs-machine.component.css']
})
export class ManVsMachineComponent   {

  error:boolean=false;
  messageError:string="";
  playerName:string;
  _result:boolean=false;
  _messageresult:string="";
  weapon:number = -1;
  loading: boolean;
  gamesSummary: any[]= [];
  Round:number=1;
  _resultTable:boolean=false;

  @ViewChild('txtPlayerName1') txtPlayerName: ElementRef;


  constructor(private router: ActivatedRoute, private _PPTService:PPTService ) {

  }

PlayVsMachine(option:number){
  if (this.txtPlayerName.nativeElement.value == "") {
    this.error = true;
    this.messageError = "Player name is required";
    this.txtPlayerName.nativeElement.focus();
    return;
  }else{
  this.error=false;
  this.messageError = "";
  this.playerName = this.txtPlayerName.nativeElement.value.trim();
  this.loading = true;

  this._PPTService.postManvsMachine( this.playerName,option )
  .subscribe( (result:any) => {
    console.log(result);

    setTimeout( () => {
  this.loading = false;
      this._result = true;
      if(result.NameWinPlayer == ""){
        this._messageresult = "Tied , try again" ;
      this.weapon = result.Weapon;

      result.Round = this.Round ;
      result.NameWinPlayer="Tied";
      }else{
      this._messageresult = "The Winner is the player: " + result.NameWinPlayer + " with the Weapon";
      this.weapon = result.Weapon;
      result.Round = this.Round ;
      }

      this.Round += 1;
      this.gamesSummary.push(result);
    }, 500 );
    
    
  });
  }
  this.showResult();

}

showResult(){
  
    if(this.Round == 5){
      this._resultTable=true;
      this._result = false;
    }else{
      this._resultTable=false;
      this._result = false;
    }

}

Reset(){
  this._resultTable=false;
      this._result = false;
      this.gamesSummary = [];
      this.Round = 1;
}

}
