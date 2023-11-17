<?php

error_reporting(-1);
// set_include_path('/web/sites/www.tribunal.uc.edu/htdocs/careerweek/representative-sign-in/includes/');

require_once("./includes/mysqli.php");

$sql = "SELECT location FROM careerfair_locations";

$result = $mysqli->query($sql);

$majors = array();

while ($row = $result->fetch_assoc()) {
	$majors[] = $row['location'];
}

echo json_encode($majors);

$result->close();
mysqli_close($mysqli);
exit();
?>


