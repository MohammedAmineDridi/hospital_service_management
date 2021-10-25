import os
import tkinter as tk
from tkinter import ttk

# part 1 : if combobo x value is selected 



     


# part 2  : database with ' mysql ' .

import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Aminedridi11",
  database="health"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT * FROM patients")

myresult = mycursor.fetchall()




  
# Creating tkinter window
window = tk.Tk()
window.title(' List of Patients ')
window.geometry('500x250')
  
# label text for title
ttk.Label(window, text = " List of patients " , foreground ="blue", 
          font = ("Times New Roman", 15)).grid(row = 0, column = 1)
  
# label
ttk.Label(window, text = "          Select Matricule :",
          font = ("Times New Roman", 10)).grid(column = 0,
          row = 5, padx = 10, pady = 25)
  
# Combobox creation
n = tk.StringVar()
patient_chosen = ttk.Combobox(window, width = 27, textvariable = n , state="readonly", )

# Adding combobox drop down list
patient_chosen['values'] = ()


for x in myresult:
  matricule = x[1]
  f_name = x[2]  
  l_name = x[3]  
  print("f_name = " +  str(f_name) + " l_name =  " + str( l_name ) )
  patient_chosen['values'] += ( matricule ,)

patient_chosen.grid(column = 1, row = 5)
patient_chosen.current(0)

# matricule label .
labelvar_matricule = tk.StringVar()
labelvar_matricule.set("")

label_matricule  = ttk.Label(window, textvariable =  labelvar_matricule , foreground ="black", 
          font = ("Times New Roman", 10)).grid(row = 6, column = 1)


# first name label .
labelvar_fname = tk.StringVar()
labelvar_fname.set("")

label_fname  = ttk.Label(window, textvariable =  labelvar_fname , foreground ="black", 
          font = ("Times New Roman", 10)).grid(row = 7, column = 1)

# last name label .
labelvar_lname = tk.StringVar()
labelvar_lname.set("")

label_lname  = ttk.Label(window, textvariable =  labelvar_lname , foreground ="black", 
          font = ("Times New Roman", 10)).grid(row = 8, column = 1)

# age label .
labelvar_age = tk.StringVar()
labelvar_age.set("")

label_age  = ttk.Label(window, textvariable =  labelvar_age , foreground ="black", 
          font = ("Times New Roman", 10)).grid(row = 9, column = 1)

# room number label .
labelvar_room_number = tk.StringVar()
labelvar_room_number.set("")

label_room_number  = ttk.Label(window, textvariable =  labelvar_room_number , foreground ="black", 
          font = ("Times New Roman", 10)).grid(row = 10, column = 1)

# bed number label .
labelvar_bed_number = tk.StringVar()
labelvar_bed_number.set("")

label_bed_number  = ttk.Label(window, textvariable =  labelvar_bed_number , foreground ="black", 
          font = ("Times New Roman", 10)).grid(row = 11, column = 1)


#creation button
n = tk.StringVar()
n.set(" ok ")
patient_btn  = ttk.Button(window, textvariable = n ) 
patient_btn.grid(row = 12, column = 1)


def callbackFunc(event):
     print("New Element Selected = " + str( patient_chosen.get()) )
     
     mycursor2 = mydb.cursor()
     query = "SELECT * FROM patients where matricule = '"+ str( patient_chosen.get()) + "' "; 
     print(query)
     mycursor2.execute(query)
     myresult2 = mycursor.fetchall()

     for info in myresult2 :
         print(info)    
         
     labelvar_matricule.set( "Matricule = " + str( info[1]) )
     labelvar_fname.set( "First Name = " + str( info[2] ) )
     labelvar_lname.set( "Last Name = " + str( info[3] ) )
     labelvar_age.set( "Age = " +  str( info[4] ) )
     labelvar_room_number.set( "Room Number = " + str( info[5] ) )
     labelvar_bed_number.set( "Bed Number = " + str( info[6] ) )
         

def btn_ok(event) :
    # patient_chosen.get()
    
    print("btn ok")
    print("patient = " + str(patient_chosen.get()))
    
    # get patient first and last name .
    
    
    mycursor = mydb.cursor()

    mycursor.execute("SELECT * FROM patients where matricule = '"+str(patient_chosen.get())+"' ")

    myresult = mycursor.fetchall()
    
    fname = ""
    lname = ""
    
    for y in myresult :
            fname = y[2]
            lname = y[3]
            print("patient ==> fname = " + str(fname) + " / lname = " + str(lname)) 
    
    os.system('cmd /k "python Finger-Counter-using-Hand-Tracking-And-Open-cv-main/fingerCountingProject.py " ' + str( fname ) ) 
    window.destroy()
    
    

patient_chosen.bind("<<ComboboxSelected>>", callbackFunc)
patient_btn.bind("<Button-1>", btn_ok)

window.mainloop()

     
     
     


