<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$configs = require_once('../config/config.php');  
include_once '../config/database.php';
include_once '../config/Economic.php';
include_once '../objects/Account.php';
 
$agreementGrantToken = $configs['agreementGrantToken'];
$appSecretToken = $configs['appSecretToken'];

$ec = new Economic($agreementGrantToken, $appSecretToken);  
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// prepare account object
$account = new Account($db);
 
// get account number
$data = json_decode(file_get_contents("php://input"));
 
// set account number to be deleted
$account->number = $data->number;
 
if($ec->deleteAccount($account->number) == 'success') {
	$account->delete();
    echo '{';
        echo '"message": "Account was deleted."';
    echo '}';
} else {
    echo '{';
        echo '"message": "Unable to delete account"';
    echo '}';
}
?>