<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

session_start();

function sanitize($data) {
    return htmlspecialchars(trim($data));
}

$old_input = [];
$errors = [];
$fields = ['name', 'email', 'phone', 'date', 'time', 'guests', 'message', 'package'];

foreach ($fields as $field) {
    $old_input[$field] = sanitize($_POST[$field] ?? '');
}

if (empty($old_input['name'])) $errors['name'] = 'Name is required.';
if (empty($old_input['email']) || !filter_var($old_input['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Valid email is required.';
}
if (empty($old_input['phone'])) $errors['phone'] = 'Phone number is required.';
if (empty($old_input['date'])) $errors['date'] = 'Date is required.';
if (empty($old_input['time'])) $errors['time'] = 'Time is required.';
if (empty($old_input['guests']) || !filter_var($old_input['guests'], FILTER_VALIDATE_INT, ["options" => ["min_range"=>1, "max_range"=>20]])) {
    $errors['guests'] = 'Please enter a guest number between 1 and 20.';
}

if (!empty($errors)) {
    $_SESSION['errors'] = $errors;
    $_SESSION['old_input'] = $old_input;
    header('Location: ' . $_SERVER['HTTP_REFERER']);
    exit;
}

// Send email via PHPMailer
$mail = new PHPMailer(true);
try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com'; // Use your SMTP provider
    $mail->SMTPAuth   = true;
    $mail->Username   = 'larunprasathp11054@gmail.com'; // Your Gmail address
    $mail->Password   = 'ynnuvuxifepczepr'; // Use App Password, not Gmail password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($old_input['email'], $old_input['name']);
    $mail->addAddress('larunprasathp11054@gmail.com', 'Booking Admin'); // Your destination email

    // Content
    $mail->isHTML(false);
    $mail->Subject = 'New Booking Request';
    $mail->Body    = "Full Name: {$old_input['name']}\n"
        . "Email: {$old_input['email']}\n"
        . "Phone: {$old_input['phone']}\n"
        . "Date: {$old_input['date']}\n"
        . "Time: {$old_input['time']}\n"
        . "Guests: {$old_input['guests']}\n"
        . "Package: {$old_input['package']}\n"
        . "Special Requests: {$old_input['message']}";
    echo $mail->Body;
    $mail->send();
    echo "<script>
    alert('Thank you! Your booking has been submitted.');
    window.location.href = 'pakages.php';
    </script>";
    exit;
} catch (Exception $e) {
    echo "<script>
    alert('Error sending email: {$mail->ErrorInfo}');
    window.history.back();
     </script>";  
}
