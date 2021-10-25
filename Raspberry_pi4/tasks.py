
from time import sleep
import requests
import os

r = requests.get('http://192.168.137.1:3000/api/number_service_done')
print("number of tasks done = " + str(r.content.decode("utf-8") ) )


s = requests.get('http://192.168.137.1:3000/api/number_service_not_done')
print("number of tasks not done = " + str(s.content.decode("utf-8") ) )


if ( str(s.content.decode("utf-8") ) == "0" ):
        print("number of tasks not done ===  0")
        sleep(1)
else :
        print("number of tasks > 0 ")
	# buzzer = 1 .
        command ='python buzzer.py'
        os.system(command)	
	# led = 1
	command_led = 'python led.py'
	os.system(command_led)
	
