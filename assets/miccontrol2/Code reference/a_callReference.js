#pragma strict

//in the inspector this is where you will drag the MicController of which you wish to receive loudness from
var micController:GameObject;


function Update () {

//Calls the loudness value of selected controller (in this case the controller in micController variable).
var getLoudness=micController.GetComponent(MicControl).loudness;
}