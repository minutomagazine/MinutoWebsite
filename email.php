<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $products = $_POST['products'] ?? '';
    $total = $_POST['total'] ?? '0.00';

    $to = "boxpost@boxpost.mk";
    $subject = "New Magazine Purchase";
    $message = "A new magazine purchase has been made. Details:\n\n";
    $message .= "Products: " . $products . "\n";
    $message .= "Total: €" . $total . "\n";
    $headers = "From: info@minuto.mk";

    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully";
    } else {
        echo "Failed to send email";
    }
} else {
    echo "Invalid request";
}
?>
