<?php

error_reporting(-1);
set_include_path('/web/sites/www.tribunal.uc.edu/htdocs/careerweek/student-sign-in/includes/');

require_once("mysqli.php");

$name="";
$major="";
$objective="";

$name = mysqli_real_escape_string ($mysqli, $_POST["nameText"]);
$major = mysqli_real_escape_string ($mysqli, $_POST["majorText"]);
$objective = mysqli_real_escape_string ($mysqli, $_POST["typeText"]);

$sql ="INSERT INTO student_sign_in (name, major, objective)
	VALUES ('".$name."','".$major."','".$objective."')";
	
if (!$mysqli->query($sql)) {
	echo "Failed";
} else {
	echo "Success";
}

mysqli_close($mysqli);
exit();
?>


