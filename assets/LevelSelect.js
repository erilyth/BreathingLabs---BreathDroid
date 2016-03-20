#pragma strict

var buttonVal = 0;

function Start () {
}

function OnMouseUp(){
	if(buttonVal==1){
		Application.LoadLevel("Level");
	}
	if(buttonVal==2){
		Application.Quit();
	}
}

function Update () {
}