<?php

error_reporting(-1);
// set_include_path('/web/sites/www.tribunal.uc.edu/htdocs/careerweek/representative-sign-in/includes/');

require_once("../includes/mysqli.php");

$sql = "SELECT id, name, company, title, boothLocation, `sign in time`, printed, location FROM representative_sign_in"; // add boothLocation

$result = $mysqli->query($sql);

$employer_data = array();

while ($row = $result->fetch_assoc()) {
	$employer_data[] = $row;
}

echo json_encode($employer_data);

$result->close();
mysqli_close($mysqli);
exit();
?>


