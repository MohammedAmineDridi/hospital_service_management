import { Component } from '@angular/core';
// import service 
import {Service} from './service' ;
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'healthProject';
  
  class_header_home ="none";
  class_header_about = "none" ;
  class_header_portfolio = "none";
  class_header_skills = "none" ;
  class_header_contact = "none" ;


  number_tasks_not_done ;
  tasks_not_done ;

  constructor(private service:Service) { }

  ngOnInit(): void {
    // number of tasks not done => in notifications field .
    this.service.get_Number_Tasks_Not_Done().subscribe( (data)=>{
        this.number_tasks_not_done = data ;
    });

    // get list of tasks not done .

    this.service.get_list_tasks_not_done().subscribe( (data)=>{
      console.log("tasks not done ==> : ") ;
      console.log(data) ;
      this.tasks_not_done = data ;
 });


  }

  
  class_dash = "";
  class_patient = "" ;
  class_service = "" ;
  test_active(id){
  
    
    if(id=="dash"){
        this.class_dash = "nav-item active";
        this.class_patient = "";
        this.class_service = "" ;
    }
    else if (id == "patient"){
        this.class_patient = "nav-item active";
        this.class_dash = "";
        this.class_service = "";
    }
    else if( id == "service" ){
        
        this.class_service = "nav-item active" ;
        this.class_dash = "";
        this.class_patient = "" ;

    }
    else{
      this.class_dash = "";
      this.class_patient = "" ;
      this.class_service = "" ;
    }

    }  

    // send mail function .
    send_mail_function(from,to,sub,msg){

      this.service.send_mail_function(from,to,sub,msg).subscribe( (data)=>{
           // alert(data) ;
      });

  }

      
    // chrono-meter .
    notify = '';

    handleEvent(e: CountdownEvent) {
      this.notify = e.action.toUpperCase();
      if (e.action === 'notify') {
        this.notify += ` - ${e.left} ms`;
      }
      console.log('Notify', e);
  
      if( this.notify.toString().toLowerCase() == "done" ){
        alert("you have surpassed 2 minutes for doing your task");
        // send mail .
        this.send_mail_function("amindridi447@gmail.com","amindridi447@gmail.com","service_department failure","the service departments don't do their tasks in time .");
      }
    }

    counter(e){

      
  // an trigger in numbe of tasks not done .

    this.service.get_Number_Tasks_Not_Done().subscribe((data)=>{
      if(!(data == "0") ){
          alert("you have some tasks to do !!!");
          this.handleEvent(e);
      }
      else{
         // alert("alert");
         document.getElementById("a").style.display = "none" ;
      }
  });

      
    }


 


}
