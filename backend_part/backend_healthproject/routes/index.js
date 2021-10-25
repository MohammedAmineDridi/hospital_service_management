var express = require('express');
var router = express.Router();


var mysql = require('mysql');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aminedridi11",
  database: "health" // table = users .
});

// send mail function . 

function send_mail(from,Subject,destinataire,text_mail){

  var fs = require('fs');

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({

    service:'gmail',
    auth:{
      user:'amindridi447@gmail.com',
      pass:'Kaki1112'
    }

  });

  var mailoptions = {
    from:from,
    to:destinataire,
    subject:Subject,
    text:text_mail,
    
  };

  transporter.sendMail(mailoptions,function(error,info){

    if(error){
      console.log(error);
      var err = "verifier votre connexion";
      console.log(err);
    }
    else{
      var yes = "email sent to "+destinataire.toString();

      console.log("----> email sent to " + destinataire ) ;

      console.log(yes);
    }

  });
}





router.get('/api/', function(req, res, next) {
  res.json("hello") ;
});

// entity 1 : admin (crud) .
// login admin .


router.post('/api/login_admin', function(req, res, next) {
  
  var matricule = req.body.matricule ;
  var password = req.body.password ;
  
  
  let admin_req = "SELECT * FROM admin WHERE matricule = '"+matricule+"' AND password = '" + password+"' ";
  console.log(admin_req);
  
  con.query(admin_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no admin ! => login failed ");
          res.json("login failed");
              }
              else{
                console.log(" login accepted by : first_name = " + result[0]['first_name']) ;
                res.json(result);

              }
            }
          });
  
      });
    

// route 2 : add admin ( in register page ) :


router.post('/api/add_admin', function(req, res, next) {
  var first_name = req.body.first_name ;
  var last_name = req.body.last_name ;
  var age = req.body.age ;
  var cin = req.body.cin ;
  var matricule = req.body.matricule ;
  var password = req.body.password ;
  
  // insert into admin(first_name,last_name,age,cin,matricule,password) values ('','','','','','')
  
  let add_admin_req = "insert into admin (first_name,last_name,age,cin,matricule,password) values ('"+first_name+"','"+last_name+"','"+age+"','"+cin+"','"+matricule+"','"+password+"')";
  console.log(add_admin_req);
  
  con.query(add_admin_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log("new admin is insert");
      res.json("you're successfuly inserted , welcome " + first_name);
            }
          });
  
      });


// entity 2 : patient (crud) .
// route 3 : list of patients .


router.get('/api/list_patients', function(req, res, next) {
  
  
  let get_patient_req = "SELECT * FROM patients ";
  console.log(get_patient_req);
  
  con.query(get_patient_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no patient");
          res.json("empty list of patient");
              }
              else{
                console.log("list of patient exist") ;
                res.json(result); // list of patient .

              }
            }
          });
  

});


// route 4 : add patient .


router.post('/api/add_patient', function(req, res, next) {
  var matricule = req.body.matricule ;
  var first_name = req.body.first_name ;
  var last_name = req.body.last_name ;
  var age = req.body.age ;
  var room_number = req.body.room_number ;
  var bed_number = req.body.bed_number ;
  
  // insert into admin(first_name,last_name,age,cin,matricule,password) values ('','','','','','')
  
  let add_patient_req = "insert into patients (matricule,first_name,last_name,age,room_number,bed_number) values ('"+matricule+"','"+first_name+"','"+last_name+"','"+age+"','"+room_number+"','"+bed_number+"')";
  console.log(add_patient_req);
  
  con.query(add_patient_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log("new patient is insert");
      res.json("you're successfuly inserted " + first_name);
            }
          });
  
      });


// route 5 : delete patient by id .




router.get('/api/delete_patient/:id', function(req, res, next) {

  var id = req.params.id ;
  // insert into admin(first_name,last_name,age,cin,matricule,password) values ('','','','','','')
  
  let delete_patient_req = "delete from patients where id = " + id ;
  console.log(delete_patient_req);
  
  con.query(delete_patient_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log("patient is deleted ");
      res.json("you're successfuly deleted patient ");
            }
          });
      });


// route 6 : modifiy patient .


router.post('/api/modify_patient/:id', function(req, res, next) {

  var id = req.params.id ;

  var matricule = req.body.matricule ;
  var first_name = req.body.first_name ;
  var last_name = req.body.last_name ;
  var age = req.body.age ;
  var room_number = req.body.room_number ;
  var bed_number = req.body.bed_number ;
  
  // insert into admin(first_name,last_name,age,cin,matricule,password) values ('','','','','','')
  
  let modify_patient_req = "UPDATE patients SET matricule = '"+matricule+"' ,first_name = '"+first_name+"' ,last_name = '"+last_name+"' ,age = '"+age+"' , room_number ='"+room_number+"' ,bed_number = '"+bed_number+"' where id = " + id;
  console.log(modify_patient_req);
  
  con.query(modify_patient_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log(" patient is modified");
      res.json("you're successfuly modified " + first_name);
            }
          });
  
      });


// entity 3 : service (crud)
// 1 - list of services .
// 2 - add : created by the patient .
// 3 - delete by admin when the service demanded by the patient is done .
// modify 'status' of service : not_done => done .




// route 1 : get list of services .




router.get('/api/list_services', function(req, res, next) {
  
  
  let get_services_req = "SELECT * FROM service ";
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no service");
          res.json("empty list of services");
              }
              else{
                console.log("list of services exist") ;
                res.json(result); // list of patient .

              }
            }
          });
});



// route 2 : add service .



router.post('/api/add_service', function(req, res, next) {

  var type = req.body.type ;
  var description = req.body.description ;
  var date_time = req.body.date_time ;
  var patient_id = req.body.patient_id ;
  var status = req.body.status ;

  let add_service_req = "insert into service (type,description,date_time,patient_id,status) values ('"+type+"','"+description+"','"+date_time+"','"+patient_id+"','"+status+"')";
  console.log(add_service_req);
  
  con.query(add_service_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log("new service is inserted");
      res.json("you're successfuly inserted a service ");
            }
          });
  
      });


// route 3 : delete service by id .



router.get('/api/delete_service/:id', function(req, res, next) {

  var id = req.params.id ;
  // insert into admin(first_name,last_name,age,cin,matricule,password) values ('','','','','','')
  
  let delete_service_req = "delete from service where id = " + id ;
  console.log(delete_service_req);
  
  con.query(delete_service_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log("service is deleted ");
      res.json("you're successfuly deleted a service ");
            }
          });
      });




// route 4 : modify the status of service .

// from 'not_done' => to 'done' .


router.get('/api/modify_service_status/:id', function(req, res, next) {

  var id = req.params.id ;
  
  
  // insert into admin(first_name,last_name,age,cin,matricule,password) values ('','','','','','')
  
  let modify_service_status_req = "UPDATE service SET status = 'done' where id = " + id;
  console.log(modify_service_status_req);
  
  con.query(modify_service_status_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log(" service is modified to done");
      res.json("thank you for doing your tasks :) ");
            }
          });  
      });



// email route . 

router.get('/api/send_mail/:from/:destinataire/:subject/:text_mail', function(req, res, next) {
  
  var from = req.params.from ;
  var to = req.params.destinataire ;
  var subject = req.params.subject ;
  var text_mail = req.params.text_mail ;

  send_mail(from,subject,to,text_mail) ;

  res.json("mail is sended successfuly") ;

});


// route 10 : get number of patients .


router.get('/api/number_of_patients', function(req, res, next) {
  
  
  let get_services_req = "SELECT count(*) AS 'c' from patients";
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no patients");
          res.json("empty patients");
              }
              else{
                console.log("number of patients = " + result) ;
                
                res.json(result[0]['c']); // list of patient .

              }
            }
          });
});


// route 11 : number of tasks done .



router.get('/api/number_service_done', function(req, res, next) {
  
  
  let get_services_req = "SELECT count(*) AS 'c' from service where status = 'done'";
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no services done");
          res.json("empty services done");
              }
              else{
                console.log("number of services done = " + result) ;
                res.json(result[0]['c']); // list of patient .

              }
            }
          });
});


// route 12 : number of tasks not done .


router.get('/api/number_service_not_done', function(req, res, next) {
  
  
  let get_services_req = "SELECT count(*) AS 'c' from service where status = 'not_done'";
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no services not done");
          res.json("empty services not done");
              }
              else{
                console.log("number of services not done = " + result) ;
                res.json(result[0]['c']); // list of patient .

              }
            }
          });
});




// route 13 : list of services'taks' filtred by date .


router.post('/api/number_service_date', function(req, res, next) {
  
  var date_service = req.body.date_service ;
  
  let get_services_req = "SELECT * from service where date_time like '"+date_service+"%'";
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no services filtred exist  ");
          res.json("empty services filtred ");
              }
              else{
                console.log("services filtred by date exist") ;
                res.json(result); // list of patient .

              }
            }
          });
});


// get patient by id .


router.get('/api/patient/:id', function(req, res, next) {
  
  var id = req.params.id ;

  let get_services_req = "SELECT * FROM patients where id = " + id ;
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no patient");
          res.json(" patient dont exist ");
              }
              else{
                console.log("patient exist exist") ;
                res.json(result); // list of patient .

              }
            }
          });
});


// select service.date_time , patients.matricule from service inner join patients on service.patient_id = patients.id  where date_time like '2021-03-03%'




router.get('/api/patients_services', function(req, res, next) {


  let get_services_req = "select service.date_time , patients.matricule from service inner join patients on service.patient_id = patients.id " ;
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no patient");
          res.json(" patient dont exist ");
              }
              else{
                console.log("patient exist exist") ;
                res.json(result); // list of patient .

              }
            }
          });
});

// select the joining table and filtering by date .

// select service.date_time , patients.matricule from service inner join patients on service.patient_id = patients.id  where date_time like '2021-03-03%'



router.get('/api/patients_services_filtering_date/:date_req', function(req, res, next) {

  var date_req = req.params.date_req ;
  let get_services_req = "select service.date_time , patients.matricule from service inner join patients on service.patient_id = patients.id  where date_time like '"+date_req+"%'" ;
  console.log(get_services_req);
  
  con.query(get_services_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no patient");
          res.json(" patient dont exist ");
              }
              else{
                console.log("patient exist exist") ;
                res.json(result); // list of patient .

              }
            }
          });
});

// get list of none-done tasks .

router.get('/api/list_services_not_done', function(req, res, next) {
  
  let get_patient_req = "SELECT * FROM service where status ='not_done' ";
  console.log(get_patient_req);
  
  con.query(get_patient_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no tasks not done ");
          res.json("empty list of tasks ");
              }
              else{
                console.log("list of tasks exist") ;
                res.json(result); // list of patient .
              }
            }
          });
  

});


// get service by id .



router.get('/api/get_service/:id', function(req, res, next) {
  
    var id = req.params.id ;

  let get_service_id = "SELECT * FROM service where id = "+id;
  console.log(get_service_id);
  
  con.query(get_service_id, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no services ");
          res.json("empty list of services ");
              }
              else{
                res.json(result); // list of patient .
              }
            }
          });
  

});

// function : to ge the current date and time .



function getCurrentDate_Time(){

  let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

// current hours
let hours = date_ob.getHours();

// current minutes
let minutes = date_ob.getMinutes();

// current seconds
let seconds = date_ob.getSeconds();

// prints date in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);

// prints date & time in YYYY-MM-DD HH:MM:SS format
console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

// prints time in HH:MM format
console.log(hours + ":" + minutes);

var full_date = year + "-" + month + "-" + date + "/" + hours + "." + minutes ;

return full_date ;
}


// add service => web service to python (add service ) .

// get current date and time .

router.get('/api/get_current_date_time', function(req, res, next) {

      var date_time = getCurrentDate_Time() ;

      res.json(date_time) ;

});

// add service . 


router.get('/api/add_service_not_done/:type/:description/:patient_id', function(req, res, next) {

  var date_and_time = getCurrentDate_Time() ;

  var type = req.params.type ;  // service_type = service_number .
  var description = req.params.description ;
  var date_time = date_and_time ;
  var patient_id = req.params.patient_id ;


  let add_service_req = "insert into service (type,description,date_time,patient_id,status) values ('"+type+"','"+description+"','"+date_time+"','"+patient_id+"','not_done')";
  console.log(add_service_req);
  
  con.query(add_service_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      console.log("new service is inserted");
      res.json("you're successfuly inserted a service ");
            }
          });
      });


// get patient_id by first_name



router.get('/api/patient_first_name/:first_name', function(req, res, next) {
  
  var first_name = req.params.first_name ;
  
  let get_patient_req = "SELECT id  AS 'pat_id'  FROM patients where first_name = '"+first_name+"'";
  console.log(get_patient_req);
  
  con.query(get_patient_req, function (err, result, fields) {
    if (err) {
      //console.log(err);
      console.log("error mysql ");
      res.json("error mysql") ;
    }
    else{
      if(result==""){
        console.log("no patient");
          res.json("empty list of patient");
              }
              else{
                console.log("list of patient exist") ;
                res.json(result[0]['pat_id']); // list of patient .

              }
            }
          });
  
});



module.exports = router;


