#pragma strict
import UnityEditor;
import System.IO;

@MenuItem ("GameObject/Audio/MicControl",false,-16)



static function SpawnMicController () {

var MicController:GameObject= new GameObject("MicController");
MicController.AddComponent(MicControl);
MicController.transform.position=Camera.current.transform.position;



}

