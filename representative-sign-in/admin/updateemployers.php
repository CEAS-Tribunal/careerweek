<?php

error_reporting(-1);
// set_include_path('/web/sites/www.tribunal.uc.edu/htdocs/careerweek/representative-sign-in/includes/');

require_once("../includes/mysqli.php");

$repId = 0;
$help = "";

$repId = (int)$_POST["repIdText"];
$help = mysqli_real_escape_string ($mysqli, $_POST["helpText"]);

$sql = "UPDATE representative_sign_in SET printed=1 WHERE id=" . $repId;

$mysqli->query($sql);

mysqli_close($mysqli);
exit();
?>


