import { Component, OnInit } from '@angular/core';
// import service 
import {Service} from '../service' ;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  saleData = [
  
  ];

  filter_result = [];
  patients_info ;

  var_name ;
  var_value ;
   number_of_patients ;
   number_tasks_done ;
   number_tasks_not_done ;
  // inject service in constrcutor .
  constructor(private service:Service) { 
    
  }

  ngOnInit(): void {
    this.service.test().subscribe((data)=>{console.log(data) ;}) ;

    // get number of patients . 
      this.service.get_Number_Patients().subscribe( (number)=>{
        this.number_of_patients = number ;
        console.log("number of patients = " + this.number_of_patients);
      });

    // get number of tasks 'done' .
    
    this.service.get_Number_Tasks_Done().subscribe( (number_tasks_done)=>{
        this.number_tasks_done = number_tasks_done ;
    });

    // get number of tasks not done .

    this.service.get_Number_Tasks_Not_Done().subscribe( (number_tasks_not_done)=>{
      this.number_tasks_not_done = number_tasks_not_done ;
  });

  // get list of services . 
  
  this.service.get_service_patient().subscribe( (data)=>{
    this.filter_result = [];
      for( var j=0 ; j < data.length ; j++ ){
         // alert( data[j]['matricule'] + " / " + parseFloat(data[j]['date_time'].substring(11,16))  );
          this.filter_result.push({"name":"matricule = " +data[j]['matricule'] , "value": parseFloat(data[j]['date_time'].substring(11,16)) }) ;
      
        }
        this.saleData = [...this.filter_result];

  });

  }


  
  // form : datepicker chooser .

  date_func(f){
    
    // alert("b");
    var date = f.value['date_picker'];
    console.log("value of date = " + date) ;
    
      this.service.get_service_patient_filtred_date(date).subscribe( (data)=>{
        this.filter_result = [] ;
        // alert( data[0]['matricule'] + " / " + parseFloat(data[0]['date_time'].substring(11,16))  ) ;
        this.filter_result.push({"name":"matricule = " +data[0]['matricule'] , "value": parseFloat(data[0]['date_time'].substring(11,16)) }) ;
        this.saleData = [...this.filter_result];
      });
     
  }

  
}
