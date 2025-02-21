<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);


$conn = new mysqli("localhost", "root", "", "Taskflow");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $title = $_POST['title'];
    $description = $_POST['description'];
    $due_date = $_POST['due_date'];
    $priority = $_POST['priority'];
    $reminder_time = $_POST['reminder_time'];


    $sql = "INSERT INTO tasks (title, description, due_date, priority, reminder_time) 
            VALUES ('$title', '$description', '$due_date', '$priority', '$reminder_time')";

    if ($conn->query($sql) === TRUE) {
        echo "Task saved successfully!";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>
