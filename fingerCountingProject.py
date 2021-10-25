# -*- coding: utf-8 -*-
"""
Created on Sat Apr  3 23:09:19 2021

@author: amine gasa
"""
import sys
import cv2
import time
import handTrackingModule as htm
import requests

def getNumber(ar):
    s=""
    for i in ar:
       s+=str(ar[i]);
       
    if(s=="00000"):
        return (0)
    elif(s=="01000"):
        return(1)
    elif(s=="01100"):
        return(2) 
    elif(s=="01110"):
        return(3)
    elif(s=="01111"):
        return(4)
    elif(s=="11111"):
        return(5) 
    elif(s=="01001"):
        return(6)
    elif(s=="01011"):
        return(7)      
 
wcam,hcam=640,480
cap=cv2.VideoCapture(0)
cap.set(3,wcam)
cap.set(4,hcam)
pTime=0
detector = htm.handDetector(detectionCon=0.75)
while True:
    success,img=cap.read()
    img = detector.findHands(img, draw=True )
    lmList=detector.findPosition(img,draw=False)
    cv2.putText(img, str(sys.argv[1]) ,(45,120),cv2.FONT_HERSHEY_SCRIPT_SIMPLEX,
                                     5,(255,0,0),5)
    #print(lmList)
    tipId=[4,8,12,16,20]
    if(len(lmList)!=0):
        fingers=[]
        #thumb
        if(lmList[tipId[0]][1]>lmList[tipId[0]-1][1]):
                fingers.append(1)
        else :
                fingers.append(0)
        #4 fingers
        for id in range(1,len(tipId)):
            
            if(lmList[tipId[id]][2]<lmList[tipId[id]-2][2]):
                fingers.append(1)
            
            else :
                fingers.append(0)
        
           
        cv2.rectangle(img,(20,255),(170,425),(0,255,0),cv2.FILLED)   
        cv2.putText(img,str(getNumber(fingers)),(45,375),cv2.FONT_HERSHEY_PLAIN,
                                     10,(255,0,0),20)  
        
        if( str(getNumber(fingers)) == "0" ) :
                print("finger = 0")
                print("waiting for demand ...")
                cv2.waitKey(1)
                # add service 0 .
                
                
        elif( str(getNumber(fingers)) == "1" ) :
                print("finger = 1") 
                # add service 1 
                # get 'patient_id' by 'first_name'
                r = requests.get('http://localhost:3000/api/patient_first_name/'+str(sys.argv[1]))
                print("response = patient_id " + str(r.content.decode("utf-8") ) )
                
                patient_id = str(r.content.decode("utf-8") )
                r = requests.get('http://localhost:3000/api/add_service_not_done/1/description_service_1/'+patient_id)
                print( "reponse add service = " + str(r.content.decode("utf-8") )  )
                
                
                cv2.waitKey(3000)
                
                
        elif( str(getNumber(fingers)) == "2" ) :
                print("finger = 2")
                # add service 2 
                # get 'patient_id' by 'first_name'
                r = requests.get('http://localhost:3000/api/patient_first_name/'+str(sys.argv[1]))
                print("response = patient_id " + str(r.content.decode("utf-8") ) )
                
                patient_id = str(r.content.decode("utf-8") )
                r = requests.get('http://localhost:3000/api/add_service_not_done/2/description_service_2/'+patient_id)
                print( "reponse add service = " + str(r.content.decode("utf-8") )  )
                
                
                cv2.waitKey(3000)
                
                
        elif( str(getNumber(fingers)) == "3" ) :
                print("finger = 3")
                # add service 3
                # get 'patient_id' by 'first_name'
                r = requests.get('http://localhost:3000/api/patient_first_name/'+str(sys.argv[1]))
                print("response = patient_id " + str(r.content.decode("utf-8") ) )
                
                patient_id = str(r.content.decode("utf-8") )
                r = requests.get('http://localhost:3000/api/add_service_not_done/3/description_service_3/'+patient_id)
                print( "reponse add service = " + str(r.content.decode("utf-8") )  )
                
                
                cv2.waitKey(3000)
                
                
                
        elif( str(getNumber(fingers)) == "4" ) :
                print("finger = 4")
                # add service 4
                # get 'patient_id' by 'first_name'
                r = requests.get('http://localhost:3000/api/patient_first_name/'+str(sys.argv[1]))
                print("response = patient_id " + str(r.content.decode("utf-8") ) )
                
                patient_id = str(r.content.decode("utf-8") )
                r = requests.get('http://localhost:3000/api/add_service_not_done/4/description_service_4/'+patient_id)
                print( "reponse add service = " + str(r.content.decode("utf-8") )  )
                
                
                cv2.waitKey(3000)
                
                
        elif( str(getNumber(fingers)) == "5" ) :
                print("finger = 5")
                print("waiting for demand ...")
                cv2.waitKey(1) 
                # add service 5 
                
                
        else :
            print(" finger = none ")
     
    
    cTime=time.time()
    fps=1/(cTime-pTime)
    pTime=cTime
    #cv2.putText(img, f'FPS: {int(fps)}',(400,70),cv2.FONT_HERSHEY_COMPLEX,1,(255,255,0),3)
    cv2.imshow("image patient",img)
    if(cv2.waitKey(1) & 0xFF== ord('q')):
        break


