import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',  // le service partagable dans tt l'app .
  })


  export class Service {


    constructor(private http: HttpClient) { }

     // test route 


     test() {
      const url_test_route = "/api/" ;
  
        return this.http.get<any>(url_test_route) ; // observable object
     }


 
     
 // GET List of services (tasks) .

 get_list_services()  : Observable<any> {
  const url_list_services = "/api/list_services" ;

    return this.http.get<any>(url_list_services) ; // observable object
 }

 // GET NUMBER OF PATIENTs .

      get_Number_Patients()  : Observable<any> {
  const url_number_patients = "/api/number_of_patients" ;

    return this.http.get<any>(url_number_patients) ; // observable object
 }

 // get number of tasks are 'done' .

 get_Number_Tasks_Done()  : Observable<any> {
  const url_number_tasks_done = "/api/number_service_done" ;

    return this.http.get<any>(url_number_tasks_done) ; // observable object
 }

 // get number of tasks are 'done' .

 get_Number_Tasks_Not_Done()  : Observable<any> {
  const url_number_tasks_not_done = "/api/number_service_not_done" ;

    return this.http.get<any>(url_number_tasks_not_done) ; // observable object
 }



 // get list of tasks 'service' to display in => dashboards .

 get_Number_Tasks()  : Observable<any> {
  const url_list_services = "/api/list_services" ;

    return this.http.get<any>(url_list_services) ; // observable object
 }

 // get filtred services 'tasks' by date .


 get_filtred_service_date(date_service) : Observable<any> {

  const url_filtred_services = "/api/number_service_date";
          
  return this.http.post(url_filtred_services,{
    date_service : date_service 
  });

 }


 // get patient by id .


 get_patient(id)  : Observable<any> {
  const url_get_patient = "/api/patient/"+id ;

    return this.http.get<any>(url_get_patient) ; // observable object
 }

 // get_service_patient .



 get_service_patient()  : Observable<any> {
  const url_get_patient_service = "/api/patients_services" ;

    return this.http.get<any>(url_get_patient_service) ; // observable object
 }


 // get service patient filtred with date .

 get_service_patient_filtred_date(date)  : Observable<any> {
  const url_get_patient_service_filter_date = "/api/patients_services_filtering_date/"+date ;

    return this.http.get<any>(url_get_patient_service_filter_date) ; // observable object
 }
        
 //  get list of patients .

 get_list_patients()  : Observable<any> {
  const url_list_patients = "/api/list_patients" ;

    return this.http.get<any>(url_list_patients) ; // observable object
 }

 // add patient .

 add_patient(matricule,first_name,last_name,age,room_number,bed_number) : Observable<any> {

    const url_add_patient = "/api/add_patient";
            
    return this.http.post(url_add_patient,{
      matricule : matricule,
      first_name : first_name,
      last_name : last_name ,
      age : age ,
       room_number : room_number ,
       bed_number : bed_number
    });

}

// edit patient by id .


 edit_patient(id ,matricule,first_name,last_name,age,room_number,bed_number) : Observable<any> {

    const url_add_patient = "/api/modify_patient/"+id;
            
    return this.http.post(url_add_patient,{
      matricule : matricule,
      first_name : first_name,
      last_name : last_name ,
      age : age ,
       room_number : room_number ,
       bed_number : bed_number
    });

}



delete_patient_id(id) : Observable<any>{

  const url_delete_patient = "/api/delete_patient/"+id ;

  return this.http.get<any>(url_delete_patient) ;
}

// get list of tasks not done . 

get_list_tasks_not_done() : Observable<any>{

  const url_tasks_not_done = "/api/list_services_not_done" ;

  return this.http.get<any>(url_tasks_not_done) ;
}

// get service by id  . 

get_service_by_id(id) : Observable<any>{

  const url_service_id = "/api/get_service/"+id ;

  return this.http.get<any>(url_service_id) ;
}

// update status of serivce : to 'not_done'=> 'done' .
// /api/modify_service_status/:id


edit_service_to_done(id) : Observable<any>{

  const url_service_id = "/api/modify_service_status/"+id ;

  return this.http.get<any>(url_service_id) ;
}

send_mail_function(from,to,subject,msg){
  const url_send_mail = "/api/send_mail/"+from+"/"+to+"/"+subject+"/"+msg ;

  return this.http.get<any>(url_send_mail) ;
}


}







