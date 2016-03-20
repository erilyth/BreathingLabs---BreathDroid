#pragma strict

//Place here the 'controller' you want to call loudness from in the inspector 
 var micController:GameObject; 
 var amplify:float=10; 
 
 function Update(){ 
//Use this in your script to call loudnes data from selected controller 
 var ldness: float = micController.GetComponent(MicControl).loudness; 
 
 transform.GetComponent(Light).intensity=ldness*amplify;
 }