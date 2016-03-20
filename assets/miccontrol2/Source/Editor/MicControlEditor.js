	#pragma strict



	@CustomEditor (MicControl)

	class MicControlEditor extends Editor  {

	var ListenToMic = Selection.activeGameObject;
			
			
	/////////////////////////////////////////////////////////////////////////////////////////////////		
			function OnInspectorGUI() {
			
			
	var micInputValue=ListenToMic.GetComponent(MicControl).loudness;

	ProgressBar (micInputValue, "Loudness: "+ListenToMic.GetComponent(MicControl).loudness,18,18);
	
	//this button copy's the basic code to call the value, for quick acces.
	//use horizontal mapping incase we add more menu buttons later.
	EditorGUILayout.BeginHorizontal();
	
	//copy complete example code to clipboard
	 if(GUILayout.Button("Copy example code", GUILayout.Width(140) ) ){
	 		//Refresh the string each time the button is pressed, so the memory gest replaced on the clipboard
	 			var CopyCache:String="//Place here the 'controller' you want to call loudness from in the inspector \n var micController:GameObject;  \n \n function Update(){ \n//Use this in your script to call loudnes data from selected controller \n var ldness: float = micController.GetComponent(MicControl).loudness; \n }";

	 		
	 				//clear memory first
	 					EditorGUIUtility.systemCopyBuffer = null;
	 						//Then add the CopyCache string to fill up the memory with the desired example code
          						EditorGUIUtility.systemCopyBuffer = CopyCache;
		       
		         }
		         
		         //copy only the call string to the clipboard
		         	 if(GUILayout.Button("Copy only loudness code", GUILayout.Width(180) ) ){
	 					//Refresh the string each time the button is pressed, so the memory gest replaced on the clipboard
	 						var CopyCache2:String="//Use this in your script to call loudnes data from selected controller \n var ldness: float = micController.GetComponent(MicControl).loudness;";

	 		
	 							//clear memory first
	 								EditorGUIUtility.systemCopyBuffer = null;
	 									//Then add the CopyCache string to fill up the memory with the desired example code
          									EditorGUIUtility.systemCopyBuffer = CopyCache2;
		       
		      			   }
		      			   
		      			   //help button redirects to website
		         	 if(GUILayout.Button("help") ){
	 					Application.OpenURL ("http://markduisters.com/category/miccontrol2/");       
		      			   }
        
        EditorGUILayout.EndHorizontal();
        
        //this visually shows if the micrpohone is active or not
        	EditorGUILayout.BeginHorizontal();
        	
        	//if the application is focused (ingame) show a green circ
        	if(ListenToMic.GetComponent(MicControl).focused){
        	GUI.color = Color.green;
				GUILayout.Box("Microphone started");
				GUI.color = Color.white;        	
					}
        				else{
        				GUI.color = Color.red;
        					GUILayout.Box("Microphone stopped");
        					GUI.color = Color.white;
        						}
        	
        EditorGUILayout.EndHorizontal();



	GUILayout.Label("");
	GUILayout.Label("The microphone will only send data when the game window is active!");
	GUILayout.Label("Only a maximum of 6 different devices will be detected.");
	GUILayout.Label("");


	//show advanced variables
	ListenToMic.GetComponent(MicControl).advanced=GUILayout.Toggle(ListenToMic.GetComponent(MicControl).advanced,GUIContent ("Advanced settings","Reveal all tweakable variables"));


	if(ListenToMic.GetComponent(MicControl).advanced){
	
		ListenToMic.GetComponent(MicControl).maxFreq = EditorGUILayout.FloatField(GUIContent ("Frequency (Hz)","Set the quality of the received data: It is recommended but not required, to match this to your selected microphone's frequency."), ListenToMic.GetComponent(MicControl).maxFreq);
		ListenToMic.GetComponent(MicControl).amountSamples = EditorGUILayout.Slider(GUIContent ("Sample amount","Set the amount of samples per frame, it is best to leave this at default"), ListenToMic.GetComponent(MicControl).amountSamples,256,2048);

			ListenToMic.GetComponent(MicControl).sensitivity = EditorGUILayout.Slider(GUIContent ("Sensitivity","Set the sensitivity of your input: The higher the number, the more sensitive (higher) the -loudness- value will be (1 = raw input)"), ListenToMic.GetComponent(MicControl).sensitivity,0,10);
				ProgressBar (ListenToMic.GetComponent(MicControl).rawInput, "rawInput",18,7);
					ProgressBar (micInputValue, "loudness",18,7);



			

	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//only show 3D sound options in unity versions lower than 5.0 (5.0 supports 3D settings in the audio source).
	//Redirect 3D toggle
	ListenToMic.GetComponent(MicControl).ThreeD=GUILayout.Toggle(ListenToMic.GetComponent(MicControl).ThreeD,GUIContent ("Unity 4.x only! 3D sound","ONLY USE WITH UNITY VERSIONS OLDER THAN 5.0. Unity 5 supports 3D audio through the audioSource by setting (Spatial blend) to 3D! It is no longer required to set this  per clip.\nFor Unity 4.x the clip is generated realtime, so the 3D effect has to be faked manually:  Should the streamed audio be a 3D sound? (Only enable this if you are using the controller to stream sound"));
	//when 3D audio is enabled show the fall off settings
	if(ListenToMic.GetComponent(MicControl).ThreeD){
		ListenToMic.GetComponent(MicControl).VolumeFallOff = EditorGUILayout.FloatField(GUIContent ("Volume falloff","Set the rate at wich audio volume gets lowered. A lower value will have a slower falloff and thus hearable from a greater distance, while a higher value will make the audio degrate faster and dissapear from a shorter distance"), ListenToMic.GetComponent(MicControl).VolumeFallOff);
			ListenToMic.GetComponent(MicControl).PanThreshold = EditorGUILayout.FloatField(GUIContent ("PanThreshold","Set the rate at wich audio PanThreshold gets switched between left or right ear. A lower value will have a faster transition and thus a faster switch, while a higher value will make the transition slower and smoothly switch between the ears. Don't go to smooth though as this will turn your audio to mono channel"), ListenToMic.GetComponent(MicControl).PanThreshold);
				ListenToMic.GetComponent(MicControl).audioListener = EditorGUILayout.ObjectField (GUIContent ("Audio Listener","Place here the GameObject containing your AudioListener for correct panning and volume damping"), ListenToMic.GetComponent(MicControl).audioListener, Transform, true);
						}
	//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


	//Redirect Mute ingame
	ListenToMic.GetComponent(MicControl).Mute=GUILayout.Toggle(ListenToMic.GetComponent(MicControl).Mute,GUIContent ("Mute","Leave enabled when you only need the input value of your device. When dissabled you can listen to the playback of the device"));

	}


	//Redirect debug ingame
	ListenToMic.GetComponent(MicControl).debug=GUILayout.Toggle(ListenToMic.GetComponent(MicControl).debug,GUIContent ("Debug","This will write the gathered Loudness value to the console during playmode. This is handy if you want if statements to listen at a specific value."));

	//Redirect ShowDeviceName ingame
	//count devices
	var count:int=0;
		for(device in Microphone.devices){
				count++;
			}
	ListenToMic.GetComponent(MicControl).ShowDeviceName= EditorGUILayout.Foldout(ListenToMic.GetComponent(MicControl).ShowDeviceName,GUIContent ("Detected devices: "+count,"Show a list of all detected devices (1 is showed as default device in the drop down menu)"));

	 if(ListenToMic.GetComponent(MicControl).ShowDeviceName){
				if(Microphone.devices.Length>=0){
	 
						var i=0;
										//count amount of devices connected
											for(device in Microphone.devices){
											if(!device){
											Debug.LogError("No usable device detected! Try setting your device as the system's default.");
											return;
											}
														i++;
														if(i<=6){
														//catch the first device as this is system default and label it correclty
														if(i==1){
															GUILayout.Label("Slot "+i+" = "+device+" (system default)");
																}
																//list the remaining slots with the correct names
																	else{
																		GUILayout.Label("Slot "+i+" = "+device);
 																			}
														}
														
													}
												}
												//throw error when no device is found.
													else{
														Debug.LogError("No connected device detected! Connect at least one device.");	
														return;
															}
												
												
											}


	//EditorUtility.SetDirty(target);
	  this.Repaint();
			
		// Show default inspector property editor
		DrawDefaultInspector ();
		}

		
		
			// Custom GUILayout progress bar.
		function ProgressBar (value : float, label : String, scaleX : int, scaleY : int) {
			
			// Get a rect for the progress bar using the same margins as a textfield:
			var rect : Rect = GUILayoutUtility.GetRect (scaleX, scaleY, "TextField");
			EditorGUI.ProgressBar (rect, value, label);
			
			
			EditorGUILayout.Space ();
		}
		
	}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		