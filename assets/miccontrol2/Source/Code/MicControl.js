#pragma strict

import System.IO;


@script RequireComponent(AudioSource)

#if UNITY_EDITOR
@ExecuteInEditMode
#endif

//if false the below will override and set the mic selected in the editor
 //Select the microphone you want to use (supported up to 6 to choose from). If the device has number 1 in the console, you should select default as it is the first defice to be found.
enum Devices {Slot1, Slot2, Slot3, Slot4, Slot5, Slot6}

@HideInInspector
var ThreeD:boolean=false;

@HideInInspector
var advanced:boolean=false;

@HideInInspector
var VolumeFallOff:float=1;
@HideInInspector
var PanThreshold:float=1;

var InputDevice : Devices;
private var selectedDevice:String;
@HideInInspector
var audioListener:Transform;

@HideInInspector
var audioSource:AudioSource;
//The maximum amount of sample data that gets loaded in, best is to leave it on 256, unless you know what you are doing. A higher number gives more accuracy but 
//lowers performance allot, it is best to leave it at 256.
@HideInInspector
var amountSamples:float=256;

@HideInInspector
var loudness:float;
@HideInInspector
var rawInput:float;

@HideInInspector
var sensitivity:float=0.4;
private var minFreq: int;
@HideInInspector
 var maxFreq: int=44100;
 
 //this value is as reference for the unity 4 3D feature to calculate distance volume it is not relevant for Unity 5 users
@HideInInspector
var sourceVolume:float=100;

@HideInInspector
var Mute:boolean=true;
@HideInInspector
var debug:boolean=false;
@HideInInspector
var ShowDeviceName:boolean=true;
private var micSelected:boolean=false; 

private var recording:boolean=true; 

private var ListenerDistance:float;
private var ListenerPosition:Vector3;
@HideInInspector
var focused:boolean=false;
private var Initialised:boolean=false;

function Start () {
//return and throw error if no device is connected
 if(Microphone.devices.Length==0){
 	Debug.LogError("No connected device detected! Connect at least one device.");
 		Debug.LogError("No usable device detected! Try setting your device as the system's default.");
 			return;
		 		}
		 		
   	// Request permission to use both webcam and microphone.
 	if(Application.isWebPlayer){
		yield Application.RequestUserAuthorization (UserAuthorization.Microphone);
		if (Application.HasUserAuthorization(UserAuthorization.Microphone)){
			InitMic();
				Initialised=true;
					}
		else{
			return;
		}
  }
  else{
  InitMic();
  Initialised=true;
  }
  
  

}

 
//apply the mic input data stream to a float;
function Update () {
//pause everything when not focused on the app and then re-initialize.
if (!1){
			StopMicrophone();
			Initialised=false;
			if(debug){
				Debug.Log("mic stopped");
					}
			return;
			
		}
		if (!1) {
		//don't stop the microphone if you are clicking inside the editor
			StopMicrophone();
				Initialised=false;
						if(debug){
							Debug.Log("mic stopped");
								}
					return;
		}
		
		if(1){
			if(!Initialised){
					InitMic();
					if(debug){
				 Debug.Log("mic started");
				 }
						Initialised=true;
		
					}
		}
		
		
if(1){

if(Microphone.IsRecording(selectedDevice)){
  loudness = GetDataStream()*sensitivity/*(sourceVolume/10)*/;
  rawInput = GetDataStream()/*(sourceVolume/10)*/;

  }
   if(debug){
   Debug.Log(loudness);
  }
  
  //the source volume
  if (sourceVolume > 1){
       sourceVolume = 1;
 }
 
  if (sourceVolume < 0){
   sourceVolume = 0;
   }
   
   //when 3D is enabled adjust the volume based on distance.
   if(ThreeD){
   
    ListenerDistance = Vector3.Distance(transform.position,audioListener.position);
    ListenerPosition = audioListener.InverseTransformPoint(transform.position);
    
   GetComponent.<AudioSource>().volume = (sourceVolume/(ListenerDistance*VolumeFallOff));
   GetComponent.<AudioSource>().panStereo= (ListenerPosition.x/PanThreshold);
  
   }
   else{
  GetComponent.<AudioSource>().volume = (sourceVolume);
 }
 
 }

}
 
 
function GetDataStream(){
if(Microphone.IsRecording(selectedDevice)){
 
   var dataStream: float[]  = new float[amountSamples];
       var audioValue: float = 0;
        GetComponent.<AudioSource>().GetOutputData(dataStream,0);
 
        for(var i in dataStream){
            audioValue += Mathf.Abs(i);
        }
        return audioValue/amountSamples;
        }
 
 
  
}
 
 
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Initialize microphone
private  function InitMic(){
//select audio source
if(!audioSource){
  audioSource = transform.GetComponent(AudioSource);
	} 
 
 //only Initialize microphone if a device is detected
if(Microphone.devices.Length>=0){

var i=0;
//count amount of devices connected
for(device in Microphone.devices){
i++;
/*
if(ShowDeviceName){
Debug.Log ("Devices number "+i+" Name"+"="+device);
 
}*/
}



//select the device if possible else give error
if(InputDevice==Devices.Slot1){
if(i>=1){
selectedDevice= Microphone.devices[0];
}
else{
Debug.LogError ("No device detected on this slot. Check Detected devies for slot numbers");
return;
}
 
}
 
 
if(InputDevice==Devices.Slot2){
if(i>=2){
selectedDevice= Microphone.devices[1];
}
else{
Debug.LogError ("No device detected on this slot. Check Detected devies for slot numbers");
return;}
 
}
 
 
 
if(InputDevice==Devices.Slot3){
if(i>=3){
selectedDevice= Microphone.devices[2];
}
else{
Debug.LogError ("No device detected on this slot. Check Detected devies for slot numbers");
return;
}
}
 
 
if(InputDevice==Devices.Slot4){
if(i>=4){
selectedDevice= Microphone.devices[2];
}
else{
Debug.LogError ("No device detected on this slot. Check Detected devies for slot numbers");
return;
}
}
if(InputDevice==Devices.Slot5){
if(i>=5){
selectedDevice= Microphone.devices[2];
}
else{
Debug.LogError ("No device detected on this slot. Check Detected devies for slot numbers");
return;
}
}
 
if(InputDevice==Devices.Slot6){
if(i>=6){
selectedDevice= Microphone.devices[2];
}
else{
Debug.LogError ("No device detected on this slot. Check Detected devies for slot numbers");
return;
}
}
 


//detect the selected microphone
GetComponent.<AudioSource>().clip = new Microphone.Start(selectedDevice, true, 10, maxFreq);

	
//loop the playing of the recording so it will be realtime
GetComponent.<AudioSource>().loop = true;
//if you only need the data stream values  check Mute, if you want to hear yourself ingame don't check Mute. 
GetComponent.<AudioSource>().mute = Mute;

//don't do anything until the microphone started up
while (!(Microphone.GetPosition(selectedDevice) > 0)){
if(debug){
Debug.Log("Awaiting connection");
}
}
if(debug){
Debug.Log("Connected");
}
 
//Put the clip on play so the data stream gets ingame on realtime
GetComponent.<AudioSource>().Play();
recording=true; 
 }
 
 }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
 
 
 
    //for the above control the mic start or stop
 

 public function StartMicrophone () {
         GetComponent.<AudioSource>().clip = Microphone.Start(selectedDevice, true, 10, maxFreq);//Starts recording
         while (!(Microphone.GetPosition(selectedDevice) > 0)){} // Wait until the recording has started
         GetComponent.<AudioSource>().Play(); // Play the audio source!
 
    }
 
 
 public function StopMicrophone () {
         GetComponent.<AudioSource>().Stop();//Stops the audio
         Microphone.End(selectedDevice);//Stops the recording of the device  
 
    }
 
      function GetMicCaps () {
         Microphone.GetDeviceCaps(selectedDevice,  minFreq,  maxFreq);//Gets the frequency of the device
         if ((minFreq + maxFreq) == 0)//These 2 lines of code are mainly for windows computers
             maxFreq = 44100;
 
    }
    
    
   

 
 //flush the data through a custom created audio clip, this controls the data flow of that clip
 // Creates a 1 sec long audioclip, with a 440hz sinoid
private	var position: int = 0;
	
	function OnAudioSetPosition(newPosition:int){
		position = newPosition;
	}
    

    
        
	 //start or stop the script from running when the state is paused or not.
    function OnApplicationFocus(focus: boolean) {
		focused = focus;
	}
	
	function OnApplicationPause(focus: boolean) {
		focused = focus;
	}
	
	function OnApplicationExit(focus: boolean) {
		focused = focus;
	}
	
	

	#if UNITY_EDITOR
			
	   //draw the gizmo
 function OnDrawGizmos () {
 if(Application.isEditor)
		Gizmos.DrawIcon (transform.position, "MicControlGizmo.tif", true);
		
					
			
			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//if gizmo folder does not exist create it
	if (!Directory.Exists(Application.dataPath+"/Gizmos")){
		Directory.CreateDirectory(Application.dataPath+"/Gizmos");
			}
	//then copy the gizmo into the folder
	var info = new DirectoryInfo(Application.dataPath+"/Gizmos");
	var fileInfo = info.GetFiles();
	
		if(!File.Exists(Application.dataPath+"/Gizmos/MicControlGizmo.tif")){
			File.Copy(Application.dataPath+"/MicControl2/Source/MicControlGizmo.tif",Application.dataPath+"/Gizmos/MicControlGizmo.tif");
				}
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
		
	}
	
	#endif
    
    