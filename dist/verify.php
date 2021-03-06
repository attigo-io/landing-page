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


$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = $guser;
$mail->Password   = $gpassword;

$mail->IsHTML(true);
$mail->AddAddress("grmalave@yupa.io", "Yupa.io");
$mail->SetFrom("yupaioservice@gmail.com", "yupa.io service gmail");
$mail->Subject = "Yupa.io request";
$content = $table ;

$mail->MsgHTML($content); 



$res = $mail->Send();

ob_end_clean();
header('Content-Type: application/json; charset=utf-8');

if(!$res) {
  echo '{ "status" : 500 , "data" : { "msg" : "an error accured" } }';
} else {
  echo '{ "status" : 200 , "data" : { "msg" : "succesfull" } }';
}

