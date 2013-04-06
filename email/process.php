<?php
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
} else {$name = 'No name entered';}

if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$email = stripslashes(strip_tags($_POST['email']));
} else {$email = 'No email entered';}

if ((isset($_POST['phone'])) && (strlen(trim($_POST['phone'])) > 0)) {
	$phone = stripslashes(strip_tags($_POST['phone']));
} else {$phone = 'No phone entered';}

$message = stripslashes(strip_tags($_POST['message']));

ob_start();
?>

Message Sent from Crivas.net.

Name: <?=$name;?>

Email: <?=$email;?>

Phone: <?=$phone;?>

Message: <?=$message;?>

	
<?
$body = ob_get_contents();

$to = 'chester.rivas@gmail.com';
$email = 'chester.rivas@gmail.com';
$fromaddress = "chester.rivas@gmail.com";
$fromname = "Online Contact";

require("phpmailer.php");

$mail = new PHPMailer();

$mail->From     = "chester.rivas@gmail.com";
$mail->FromName = "Contact Form";
//$mail->AddAddress("email_address@example.com","Name 1");
//$mail->AddAddress("another_address@example.com","Name 2");

$mail->WordWrap = 50;
$mail->IsHTML(false);

$mail->Subject  =  "Demo Form: Contact Form Submitted";
$mail->Body     =  $body;
$mail->AltBody  =  "This is the text-only body";

if(!$mail->Send()) {
	$recipient = 'chester.rivas@gmail.com';
	$subject = 'Contact Form Failed';
	$content = $body;	
  mail($recipient, $subject, $content, "From: chester.rivas@gmail.com\r\nReply-To: $email\r\nX-Mailer: DT_formmail");
  exit;
}
?>
