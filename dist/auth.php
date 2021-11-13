<?php 


require('vendor/autoload.php');

use Rakit\Validation\Validator;
use Twilio\Rest\Client;

header("Access-Control-Allow-Origin: http://localhost:4200");   
header("Content-Type: application/json; charset=UTF-8");    
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");    
header("Access-Control-Max-Age: 3600");    
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 
$validator = new Validator;
require_once('secret.php');


// make it
$validation = $validator->make($_POST + $_FILES, [
    'country_code' => 'required|max:3',
    'phone_number' => 'required|max:10',
]);

// then validate
$validation->validate();

if ($validation->fails()) {
    // handling errors
    $errors = $validation->errors();
    http_response_code(400);
    echo '{ "status" : 400 , "data" : { "msg" : "unvalid request" } }';
    exit ;
        
}



// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure



$twilio = new Client($sid, $token);
$code = $_POST['country_code'];
$phone = $_POST["phone_number"];

$verification = $twilio->verify->v2->services("VA1dec7d034f3907e3bfecdc22770b3e48")
                                   ->verifications
                                   ->create("+$code$phone", "sms");

print($verification->status);