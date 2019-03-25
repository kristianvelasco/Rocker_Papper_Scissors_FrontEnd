import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PPTService } from '../../services/PPTService';

@Component({
  selector: 'app-man-vs-man',
  templateUrl: './man-vs-man.component.html',
  styleUrls: ['./man-vs-man.component.css']
})
export class ManVsManComponent {

  playerName1: string = "";
  playerName2: string = ""
  error:boolean=false;
  mensajeError:string="";
  option1:number;
  option2:number;
  _result:boolean=false;
  _messageresult:string="";
  weapon:number = -1;
  loading: boolean;
  
  gamesSummary: any[]= [];
  Round:number=1;
  _resultTable:boolean=false;

  @ViewChild('txtPlayerName1') txtPlayerName1: ElementRef;
  @ViewChild('txtPlayerName2') txtPlayerName2: ElementRef;

  constructor(private router: ActivatedRoute , private _PPTService:PPTService ) {
  }
    playerOne(option:number){
      if (this.txtPlayerName1.nativeElement.value == "") {
        this.error = true;
        this.mensajeError = "Player name is required";
        this.txtPlayerName1.nativeElement.focus();
        return;
      }else{
        this.error=false;
        this.mensajeError = "";
        this.playerName1 = this.txtPlayerName1.nativeElement.value.trim();
        this.option1  = option;
      }
}
    playerTwo(option:number){
     
      if (this.txtPlayerName2.nativeElement.value == "") {
        this.error = true;
        this.mensajeError = "Player name is required";
        this.txtPlayerName2.nativeElement.focus();
        return
        }
        else{
          this.error=false;
          this.mensajeError = "";
          this.playerName2 = this.txtPlayerName2.nativeElement.value.trim();
          this.option2 = option;
          this.loading = true;
          this.ManVsManMatch();
        }
        this.showResult();
    }

    ManVsManMatch(){
      this._PPTService.postManvsMan( this.playerName1,this.option1,this.playerName2,this.option2 )
      .subscribe( (result:any) => {
        console.log(result);
    
        setTimeout( () => {
          this.loading = false;
          this._result = true;
          if(result.NameWinPlayer == ""){
            this._messageresult = "Tied , try again" ;
            result.Round = this.Round ;
      result.NameWinPlayer="Tied";
          }else{
          this._messageresult = "The Winner is the player :" + result.NameWinPlayer + " with the Weapon";
          this.weapon = result.Weapon;
          result.Round = this.Round ;
          }
    
        },  500 );
        this._result = false;
        this.Round += 1;
        this.gamesSummary.push(result);
      });

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
