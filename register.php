<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "Arnavrealshot@35";
$dbname = "portfolio";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from AJAX request
$data = json_decode(file_get_contents("php://input"), true);

// Prepare and bind parameters to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO users (full_name, email, username, password, phone, occupation) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("ssssss", $fullName, $email, $username, $hashedPassword, $phone, $occupation);

// Assign data to variables
$fullName = $data['fullName'];
$email = $data['email'];
$username = $data['username'];
$hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
$phone = $data['phone'];
$occupation = $data['occupation'];

// Execute query and check if successful
if ($stmt->execute()) {
    echo "Registration successful!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
