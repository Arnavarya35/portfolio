<?php
// Database configuration
$servername = "localhost"; // Change if necessary
$username = "root"; // Your MySQL username
$password = "Arnavrealshot@35"; // Your MySQL password
$dbname = "portfolio"; // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get data from the AJAX request
$data = json_decode(file_get_contents("php://input"), true);

$fullName = $conn->real_escape_string($data['fullName']);
$email = $conn->real_escape_string($data['email']);
$username = $conn->real_escape_string($data['username']);
$password = password_hash($data['password'], PASSWORD_DEFAULT); // Hash the password
$phone = $conn->real_escape_string($data['phone']);
$occupation = $conn->real_escape_string($data['occupation']);

// SQL to insert data
$sql = "INSERT INTO users (full_name, email, username, password, phone, occupation) VALUES ('$fullName', '$email', '$username', '$password', '$phone', '$occupation')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>
