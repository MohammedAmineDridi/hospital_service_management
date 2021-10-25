import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import service 
import {Service} from '../service' ;
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  id ;
  type ;
  description ;
  date_time ;
  patient_id ;
  status ;
  constructor(private route: ActivatedRoute , private service:Service) { }

  ngOnInit(): void {
    this.route.params.subscribe( (data_id) => {
          this.id = data_id['id']; 
        });
                                   
    this.service.get_service_by_id(this.id).subscribe( (data)=>{
        this.type =  data[0]['type'] ;
        this.description = data[0]['description'] ;
        this.date_time = data[0]['date_time'] ;
        this.patient_id = data[0]['patient_id'] ;
        this.status = data[0]['status'] ;
    });    

    }

   config="{ leftTime: 30 }" ;

   // edit service to => 'done'
    finish_task(){
      // not_done -> to -> done .
        this.service.edit_service_to_done(this.id).subscribe( (data)=>{
              alert(data);
        });
    }

  // config: CountdownConfig = { leftTime: 10, notify: [2, 5] };
  


  get_patient_info(){

    this.service.get_patient(this.patient_id).subscribe( (patient)=>{
        alert(" matricule = " +  patient[0]['matricule'] + " / first_name = " + patient[0]['first_name'] + " / "+
        " last_name = " + patient[0]['last_name'] + " / age = "+ patient[0]['age']
        + " / room number = " + patient[0]['room_number'] + " / bed number = " + patient[0]['bed_number']);
    });
  }

  }


