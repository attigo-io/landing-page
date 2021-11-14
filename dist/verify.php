<?php 


require('vendor/autoload.php');

use Rakit\Validation\Validator;
use Twilio\Rest\Client;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


header('Content-Type: application/json; charset=utf-8');

$validator = new Validator;

// make it
$validation = $validator->make($_POST , [
    'code' => 'required',
    'phone_number' => 'required|max:10',
    'country_code' => 'required|max:3',
    "name" => "required" ,
    "company_name" => "required" ,
    "email" => "required|email",
    "request" => "required"
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


require('secret.php');


$twilio = new Client($sid, $token);

$code = $_POST['code'];
$phone = $_POST["phone_number"];
$countryCode = $_POST['country_code'];
$email = $_POST["email"];
$name = $_POST["name"];
$company = $_POST["company_name"];
$request = $_POST["request"];

require('table.php');





$verification_check = $twilio->verify->v2->services("VA1dec7d034f3907e3bfecdc22770b3e48")
                                         ->verificationChecks
                                         ->create("$code", // code
                                                  ["to" => "+$countryCode$phone"]
                                         );



if($verification_check->status != 'approved'){
    http_response_code(403);
    echo '{ "status" : 403 , "data" : { "msg" : "Unvalid code" } }';
    exit ;
}


$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Mailer = "smtp";


$mail->SMTPDebug  = 1;  
$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = "abdoubentegar@gmail.com";
$mail->Password   = "THE1201panda2000";

$mail->IsHTML(true);
$mail->AddAddress("s_bentegar@enst.dz", "sid ahmed abdelillah");
$mail->SetFrom("abdoubentegar@gmail.com", "abdou bentegar");
$mail->Subject = "Yupa.io request";
$content = $table ;

$mail->MsgHTML($content); 
if(!$mail->Send()) {
  echo "Error while sending Email.";
  var_dump($mail);
} else {
  echo "Email sent successfully";
}

