<?php
	
	$newdata = $_POST["annoucement"];
	$file = "content.txt";
	$olddata = file_get_contents($file);

	if($newdata !== $olddata){
		file_put_contents($file, $newdata);
		echo "update";
	} 

?>