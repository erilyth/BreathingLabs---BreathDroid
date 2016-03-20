	#pragma strict

	var micController:GameObject;
	var amplify:int;


function Update () {

	//Calls the loudness value of selected controller (in this case the controller in micController variable).
		//var thrust=micController.GetComponent(MicControl).loudness;
		//Use this in your script to call loudnes data from selected controller 
		 var thrust: float = micController.GetComponent(MicControl).loudness;


	//for each rigidbody, add force through loudness. This will mimic blowing objects away, like a super hero!
		var obj:Rigidbody[]= FindObjectsOfType(Rigidbody);
			
			for(var rb:Rigidbody in obj){
					rb.AddForce(transform.up * (thrust*amplify));
				
					}
		
	
}
