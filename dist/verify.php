<?php 


require('vendor/autoload.php');

use Rakit\Validation\Validator;
use Twilio\Rest\Client;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';

header('Content-Type: application/json; charset=utf-8');

$validator = new Validator;

// make it
$validation = $validator->make($_POST + $_FILES, [
    'code' => 'required|max:3',
    'phone_number' => 'required|max:10',
    "name" => "required" ,
    "company_name" => "required" ,
    "email_address" => "required|email",
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


$verification_check = $twilio->verify->v2->services("VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                         ->verificationChecks
                                         ->create("123456", // code
                                                  ["to" => "+15017122661"]
                                         );

if($verification_check->status != false){
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
$mail->AddAddress("recipient-email@domain", "recipient-name");
$mail->SetFrom("from-email@gmail.com", "from-name");
$mail->AddReplyTo("reply-to-email@domain", "reply-to-name");
$mail->AddCC("cc-recipient-email@domain", "cc-recipient-name");
$mail->Subject = "Test is Test Email sent via Gmail SMTP Server using PHP Mailer";
$content = "<b>This is a Test Email sent via Gmail SMTP Server using PHP mailer class.</b>";

$mail->MsgHTML($content); 
if(!$mail->Send()) {
  echo "Error while sending Email.";
  var_dump($mail);
} else {
  echo "Email sent successfully";
}
