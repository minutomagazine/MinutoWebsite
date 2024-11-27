<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $fullName = htmlspecialchars($_POST['fullName']);
    $email = htmlspecialchars($_POST['email']);
    $source = htmlspecialchars($_POST['source']);
    $adSpace = htmlspecialchars($_POST['adSpace']);

    // Save data to a file
    $file = fopen("submissions.txt", "a");
    fwrite($file, "Full Name: $fullName\nEmail: $email\nSource: $source\nAdvertising Space: $adSpace\n\n");
    fclose($file);

    echo "Thank you, $fullName. Your information has been saved.";
    exit();
}
?>