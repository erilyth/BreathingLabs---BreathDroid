#pragma strict

var micController:GameObject;
var speed = 0.0;
var angle = 0.0;
var baseX = 0.0;
var baseZ = 0.0;
var radius = 0.0;
var gameOver = 0;
var explosion:GameObject;
var finalParent:GameObject;
var crateshort:GameObject;
var cratelong:GameObject;
var crate:GameObject;
var goal:GameObject;
var flame:GameObject;
var victory:GameObject;
var finalset = 0;
var gameStarted = 0;

var camera1:GameObject;
var camera2:GameObject;
var camera3:GameObject;

function Start () {
	var i=0;
	camera1.active = true;
	camera2.active = false;
	camera3.active = false;
	for(i=20;i<330;i++){
		var delay = Mathf.Floor(Random.Range(5.0,25.0));
		i+=delay;
		var which = Mathf.Floor(Random.Range(1.0,3.99));
		if (which == 1){
			Instantiate(crate, Vector3(510*Mathf.Cos(i*3.14/180), 50, 510*Mathf.Sin(i*3.14/180)), Quaternion.identity);
			Instantiate(crate, Vector3(510*Mathf.Cos(i*3.14/180), 24-100, 510*Mathf.Sin(i*3.14/180)), Quaternion.identity);
		}
		if (which == 2){
			Instantiate(crateshort, Vector3(510*Mathf.Cos(i*3.14/180), 50, 510*Mathf.Sin(i*3.14/180)), Quaternion.identity);
			Instantiate(crateshort, Vector3(510*Mathf.Cos(i*3.14/180), 24-100, 510*Mathf.Sin(i*3.14/180)), Quaternion.identity);
		}
		if (which == 3){
			Instantiate(cratelong, Vector3(510*Mathf.Cos(i*3.14/180), 50, 510*Mathf.Sin(i*3.14/180)), Quaternion.identity);
			Instantiate(cratelong, Vector3(510*Mathf.Cos(i*3.14/180), 24-100, 510*Mathf.Sin(i*3.14/180)), Quaternion.identity);
		}
	}
	Instantiate(goal, Vector3(510*Mathf.Cos(355*3.14/180), 24-100, 510*Mathf.Sin(355*3.14/180)), Quaternion.identity);
	speed = 0.6;
	angle = 0.0;
	radius = 510;
	baseX = 0.0;
	baseZ = 0.0;
	gameOver = 0;
	finalset = 0;
	transform.Rotate(0,45,0);
	transform.position = Vector3(baseX, -80, baseZ);
}

function OnCollisionEnter (col: Collision) {
	if(finalset == 0){
		//camera3.transform.position = Vector3((radius-50)*Mathf.Cos(angle*3.14/180), 50, (radius-50)*Mathf.Sin(angle*3.14/180));
		//camera3.transform.Rotate(0,(angle/3.14)*180+45,0);
		finalset = 1;
  	}
  	if (col.gameObject.tag == "enemy"){
    	Debug.Log('You Die');
    	gameOver = 1;
    	EndLevel(0);
    	//Instantiate(explosion, transform.position, Quaternion.identity);
    	//Instantiate(flame, transform.position, Quaternion.identity);
    	//camera3.active = true;
    	//camera1.active = false;
    	//camera2.active = false;
  		//Destroy(GetComponent.<Rigidbody>());
  		//GetComponent.<Camera>().transform.parent = finalParent.transform;
  		//Destroy(gameObject);
  	}
  	if (col.gameObject.tag == "goal"){
    	Debug.Log('You Win, Congratulations!');
    	gameOver = 1;
    	EndLevel(1);
    	//Instantiate(victory, transform.position, Quaternion.identity);
    	//camera3.active = true;
    	//camera1.active = false;
    	//camera2.active = false;
  		//Destroy(GetComponent.<Rigidbody>());
  		//GetComponent.<Camera>().transform.parent = finalParent.transform;
  		//Destroy(gameObject);
  	}
}

function EndLevel(status){
    yield WaitForSeconds (2);
    if(status==0){
		Application.LoadLevel("LevelFinish");
	}
	else{
		Application.LoadLevel("Win");
	}
}

function Update () {
	var getLoudness=micController.GetComponent(MicControl).loudness;
	//Debug.Log (getLoudness);

	//scales the gameObject heigt based on input stream gathered from MicControl.loudness
	//transform.localScale=Vector3(1+getLoudness,1+getLoudness,1+getLoudness);
	//Debug.Log(getLoudness);
	
	if(Input.GetMouseButtonUp(0)){
		if(camera1.active == true){
			camera1.active = false;
			camera3.active = false;
			camera2.active = true;
		}
		else{
			camera1.active = true;
			camera2.active = false;
			camera3.active = false;
		}
	}
	
	if(gameOver){
		GetComponent.<Rigidbody>().useGravity = true;
	}
	
	if (!gameOver){
		angle += 0.002;
		
		transform.position = Vector3(baseX + radius*Mathf.Cos(angle),transform.position.y, baseZ+ radius*Mathf.Sin(angle));
		transform.Rotate(0,-(0.002/3.14)*180,0);
		
		if(transform.position.y>=40){
			Debug.Log('You Die');
	    	gameOver = 1;
	    	EndLevel(0);
	    	//Instantiate(explosion, transform.position, Quaternion.identity);
	  		//Destroy(GetComponent.<Rigidbody>());
		}
		
		//Debug.Log(Input.GetMouseButton(0));
		
		if((getLoudness>=0.1) && transform.position.y<=60){
			transform.position = Vector3(transform.position.x,transform.position.y + 0.8, transform.position.z);
		}
		else if(transform.position.y>=-70){
			Debug.Log(speed);
			transform.position = Vector3(transform.position.x,transform.position.y - speed, transform.position.z);
		}
	}
}