import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(){
        console.log(ascciArt1);
        // console.log("%c"+ascciArt1, "color: #ea74e3;");
        console.log("%c"+ascciArt2, "color: #00aeff;");
    }
}

const ascciArt1 = `

%%%%%   %%%%  %%      %%%%  %%%%%% %%%%%   %%%%   %%%%  
%%  %% %%  %% %%     %%  %%   %%   %%  %% %%  %% %%  %% 
%%  %% %%%%%% %%     %%%%%%   %%   %%%%%  %%%%%% %%     
%%  %% %%  %% %%     %%  %%   %%   %%  %% %%  %% %%  %% 
%%%%%  %%  %% %%%%%% %%  %% %%%%%% %%  %% %%  %%  %%%%  
                                                        
%%%%%  %%%%%% %%%%%%  %%%%   %%%%                       
%%  %%   %%   %%     %%     %%  %%                      
%%  %%   %%   %%%%   %% %%% %%  %%                      
%%  %%   %%   %%     %%  %% %%  %%                      
%%%%%  %%%%%% %%%%%%  %%%%   %%%%                       `;
                                                                              

const ascciArt2 = `                                
|   _ |_    |__|                            
|__(_||_)      |                                                                      
___ __     __                               
 | |__).  (_  _ | _    _| _  .    _ _  _  _ 
 | |   .  __)(_||(_|  (_|(-  ||_|(-(_)(_)_) 
                             /      _|       `;