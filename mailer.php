<?php
//Check $_POST 
if($_SERVER['REQUEST_METHOD'] == "POST"){
	
	$name = strip_tags(trim($_POST['name']));
	$email = filter_var(trim($_POST['email']),FILTER_SANITIZE_EMAIL);
	$message = trim($_POST['message']);
	$recipient = $_POST['recipient'];
	$subject = $_POST['subject'];
	
	if(empty($name) or empty($message) or empty($email)){
		//Set a 400 (bad request) response code and exit.
		http_response_code(400);
	    echo "Please check your form fields";
		exit();
	}
	
	//Build Message
	$message = "Name: $name\n";
	$message .= "Email: $email\n\n";
	$message .= "Message: \n$message\n";
	
	//Build headers
	$headers = "From: $name <$email>";
	
	//Send Email
	if(mail($recipient, $subject, $message, $headers)){
		//Set 200 Response (success)
		http_response_code(200);
	    echo "Thank you: Your message has been sent";
	}else{
		//Set 500 Response (internam server error)
		http_response_code(500);
	    echo "Error: There was a error sending your message";
	}
	
}else{
	
	//Set 403 response (forbidden)
	http_response_code(403);
	echo "There was aproblem with your submission, please try again";
}

?>