#pragma strict

var micController:GameObject;


function Update () {

//Calls the loudness value of selected controller (in this case the controller in micController variable).
var getLoudness=micController.GetComponent(MicControl).loudness;

	Debug.Log (getLoudness);

//scales the gameObject heigt based on input stream gathered from MicControl.loudness
transform.localScale=Vector3(1+getLoudness,1+getLoudness,1+getLoudness);
}