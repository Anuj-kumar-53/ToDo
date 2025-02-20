<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "root", "", "Taskflow");

if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

$title = $_POST['title'];
$description = $_POST['description'];
$due_date = $_POST['due_date'];
$priority = $_POST['priority'];
$reminder_time = $_POST['reminder_time'];

$stmt = $conn->prepare("INSERT INTO tasks (title, description, due_date, priority, reminder_time) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $title, $description, $due_date, $priority, $reminder_time);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Task added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to add task"]);
}

$stmt->close();
$conn->close();
?>
