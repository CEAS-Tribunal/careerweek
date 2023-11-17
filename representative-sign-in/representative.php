<?php

error_reporting(-1);
// set_include_path('/web/sites/www.tribunal.uc.edu/htdocs/careerweek/representative-sign-in/includes/');

require_once("./includes/mysqli.php");

$name="";
$company="";
$title="";
$email="";
$printed = 0;
$location = "";

$name = mysqli_real_escape_string ($mysqli, $_POST["nameText"]);
$company = mysqli_real_escape_string ($mysqli, $_POST["companyText"]);
$title = mysqli_real_escape_string ($mysqli, $_POST["titleText"]);
$email = mysqli_real_escape_string ($mysqli, $_POST["emailText"]);
$location = mysqli_real_escape_string ($mysqli, $_POST["locationText"]);

$sql ="INSERT INTO representative_sign_in (name, company, title, email, printed, location)
	VALUES ('".$name."','".$company."','".$title."','".$email."','".$printed."','".$location."')";

if (!$mysqli->query($sql)) {
	echo "Failed";
} else {
	echo "Success";
}

mysqli_close($mysqli);
exit();
?>


