import { Component, OnInit } from '@angular/core';
// import service 
import {Service} from '../service' ;
@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  patients ;
  patient_info  ;
  constructor(private service:Service) { }

  ngOnInit(): void {

    this.service.get_list_patients().subscribe( (data)=>{
        console.log("list patients");
        console.log(data);
        this.patients = data ;
        this.patient_info = data ;
    });
  
  }


  id ;
  edit_patient(id){
     //  alert("edit patient_id = " + id);
      this.id = id ;
      this.service.get_patient(id).subscribe( (data)=>{
        // alert(data[0]['first_name']);
        this.patient_info = data[0] ;
        console.log("waaaaaaaa");
        console.log(this.patient_info);
    });
  }

  edit_patient_pop_up(f1){

    var id_patient = this.id ;
   // alert("id patient = " + id_patient) ;
    // select * from patients where id = id_patient .

    this.service.get_patient(id_patient).subscribe( (data)=>{
       //  alert(data[0]['first_name']);
        this.patient_info = data[0] ;
    });
    

    var matricule = f1.value['matricule'];
    var first_name = f1.value['first_name'];
    var last_name = f1.value['last_name'];
    var age = f1.value['age'];
    var room_number = f1.value['room_number'];
    var bed_number = f1.value['bed_number'];

   // alert("edit");
   // alert(matricule+"/"+first_name+"/"+last_name+"/"+age+"/"+room_number+"/"+bed_number) ;

   // ==> update patient .

   this.service.edit_patient(id_patient,matricule,first_name,last_name,age,room_number,bed_number).subscribe( (data)=>{
        alert(data);
   });

  }

  delete_patient(id){
     // alert("delete patient_id = " + id) ;
      // delete patient .
      this.service.delete_patient_id(id).subscribe( (data)=>{
          alert(data);
      });
  }

  // add patient function .

  add_patient_pop_up(f){

    var matricule = f.value['matricule'];
    var first_name = f.value['first_name'];
    var last_name = f.value['last_name'];
    var age = f.value['age'];
    var room_number = f.value['room_number'];
    var bed_number = f.value['bed_number'];

   // alert(matricule+"/"+first_name+"/"+last_name+"/"+age+"/"+room_number+"/"+bed_number) ;


    // add patient .

    this.service.add_patient(matricule,first_name,last_name,age,room_number,bed_number).subscribe( (data)=>{
        alert(data);
    });

  }

}
