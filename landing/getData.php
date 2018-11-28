<?php
$fk_merchant_id = '103253'; //merchant_id ID мазагина в free-kassa.ru http://free-kassa.ru/merchant/cabinet/help/
$fk_merchant_key = '61ylluzl'; //Секретное слово http://free-kassa.ru/merchant/cabinet/profile/tech.php

if (isset($_GET['prepare_once'])) {
	$hash = md5($fk_merchant_id.":".$_GET['oa'].":".$fk_merchant_key.":".$_GET['l']);
	// echo "{'hash':'$hash', 'merchant':'$fk_merchant_id','key':'$fk_merchant_key'}";
	echo json_encode(array('hash'=>$hash,'merchant'=>$fk_merchant_id,'key:'=>$fk_merchant_key));
	exit;
}

if(isset($_GET['get_sum'])){
	$fname = $_GET['fname'];
	$sname = $_GET['sname'];
	$phone = $_GET['phone'];
	$ex = $_GET['ex'];

	$host='localhost';
	$username='mysql';
	$password='mysql';
	$db='pobedaplus';
	$charset='utf-8';


	$sum = 0;
    //Заполняем суммы
	switch ($ex) {
		case '17':
		$sum = 1000;
		break;
		case '3':
		$sum = 2000;
		break;
		case '5':
		$sum = 4000;
		break;
		case '10':
		$sum = 8000;
		break;
		default:
		break;
	}
	$mysqli = new mysqli($host,$username,$password,$db);
	$mysqli->query("SET NAMES utf8");
	$result = $mysqli->query("SELECT id FROM clients WHERE fname='$fname' AND sname='$sname'");
	if($result->num_rows==0){
		$result = $mysqli->query("INSERT INTO clients (fname,sname,phone) VALUES ('$fname','$sname','$phone')");
		$sum = $sum/2;
	}
	echo $sum;
}
?>