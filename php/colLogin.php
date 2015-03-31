<?php
	/**
	 * This is the php file that processes login request
	 * It only has a single correct user with following credentials:
	 * 	user name: aptus
	 * 	password : aptus
	 * It has following functionalities:
	 * 	1. Validate user  
	 */

	include 'col.php';
	
	$is_ajax = $_REQUEST['is_ajax'];
	if(isset($is_ajax) && $is_ajax)
	{
		// Get inputs from the user
		$username = $_POST["username"];
		$password = $_POST["password"];
		
		if($username === $dbname && $password ===$dbpass){

			// Create a response to indicate the login succeeds
			echo "success";
		} 
	}
?>