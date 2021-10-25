import { Component, OnInit } from '@angular/core';
// import service 
import {Service} from '../service' ;
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  Services ;
  constructor(private service:Service) { }

  ngOnInit(): void {
    this.service.get_list_services().subscribe( (data)=>{
        console.log(data);
        this.Services = data ;
    });
  }


  patient_info(id){
    //  alert("id= " + id);
      // get patient by id and alert the infos .

      this.service.get_patient(id).subscribe( (data)=>{

          alert(" matricule = " + data[0]["matricule"] + " / first_name = " +
          data[0]['first_name'] + " / last_name = " + data[0]['last_name'] + " / age = "+
          data[0]['age'] + " / room number = " + data[0]['room_number'] + " / bed number = " + data[0]['bed_number']);
      });
  }

}
