<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
 
include_once '../config/database.php';
include_once '../objects/product.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$product = new Product($db);
 
// get keywords
$keywords = isset($_GET["s"]) ? $_GET["s"] : "";
 
// query products
$stmt = $product->search($keywords);
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0) {
 
    // products array
    $products_arr = array();
    $products_arr["records"] = array();
 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        
        extract($row);
 
        $product_item = array(
            "id" => $id,
            "name" => $name,
            "description" => html_entity_decode($description),
            "price" => $price
        );
 
        array_push($products_arr["records"], $product_item);
    }
    echo json_encode($products_arr);
	
} else {
    echo json_encode(
        array("message" => "No products found.")
    );
}
?>