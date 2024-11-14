<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize inputs
    $username = htmlspecialchars(trim($_POST['username'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $password = trim($_POST['password'] ?? ''); 

    // Hash the password before storing it
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Database configuration
    $host = 'localhost'; 
    $dbUsername = 'root'; 
    $dbPassword = ''; 
    $dbName = 'registration'; 

    // Connect to the database
    $conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare an SQL statement
    $stmt = $conn->prepare("INSERT INTO new (username, email, password) VALUES (?, ?, ?)");

    if (!$stmt) {
        die("Error preparing statement: " . $conn->error);
    }

    // Bind parameters (use hashed password)
    $stmt->bind_param("sss", $username, $email, $hashed_password);

    // Execute the query and check for errors
    if ($stmt->execute()) {
        echo "<script>location.replace('home.html');</script>";
    } else {
        echo "Error executing query: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>
