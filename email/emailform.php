<?php
// Email Submit
// Note: filter_var() requires PHP >= 5.2.0
if (isset($_POST['email']) && isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['phonenumber']) && isset($_POST['text']) && filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {

    // detect & prevent header injections
    $test = "/(content-type|bcc:|cc:|to:)/i";
    foreach ($_POST as $key => $val)
    {
        if (preg_match($test, $val)) {
            exit;
        }
    }

    function clean_string($string)
    {
        $bad = array("content-type", "bcc:", "to:", "cc:", "href");
        return str_replace($bad, "", $string);
    }

    $emailTo = "chester.rivas@gmail.com";
    $emailSubject = "Message From Crivas.net";
    $firstName = $_POST['firstname']; // required
    $lastName = $_POST['lastname']; // required
    $emailFrom = $_POST['email']; // required
    $phonenumber = $_POST['phonenumber']; // not required
    $comments = $_POST['text']; // required

    $emailMessage = "";
    $emailMessage .= "First Name: " . clean_string($firstName) . "\n";
    $emailMessage .= "Last Name: " . clean_string($lastName) . "\n";
    $emailMessage .= "Email: " . clean_string($emailFrom) . "\n";
    $emailMessage .= "Telephone: " . clean_string($phonenumber) . "\n";
    $emailMessage .= "Comments: " . clean_string($comments) . "\n";

    $header = "From:" . $_POST['email'];


    //send email
    mail($emailTo, $emailSubject, $emailMessage, $header);

}
?>