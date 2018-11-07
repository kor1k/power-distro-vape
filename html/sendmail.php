<?php

$name_field = check_input($_POST["name_field"]);
$mail_field = check_input($_POST["mail_field"]);
$phone_field = check_input($_POST["phone_field"]);
$prod_list = check_input($_POST["prCode_field"]);
$subject_field = check_input($_POST["subject_field"]);
$message_field = check_input($_POST["message_field"]);

$to = "mail@example.com";

if ($message_field!=="") {
    $subject = "Callback! From the site -Triablo- was sent an message!";
    $message = file_get_contents('templates/message.html');

    // Fill form
    $message = str_replace('{{ subject }}', $subject_field, $message);
    $message = str_replace('{{ name }}', $name_field, $message);
    $message = str_replace('{{ mail }}', $mail_field, $message);
    $message = str_replace('{{ message }}', $message_field, $message);
} else {
    $form = 'product-form';
    $subject = "Client order! From the site -Triablo- was sent an order!";
    $message = file_get_contents('templates/mail.html');

    // Fill form
    $message = str_replace('{{ name }}', $name_field, $message);
    $message = str_replace('{{ mail }}', $mail_field, $message);
    $message = str_replace('{{ phone }}', $phone_field, $message);

    // Add product list
    $tableRows = '';
    $products = json_decode($prod_list);
    foreach ($products as $index => $product) {
        $odd = $index % 2;

        if ($odd) {
            $background = 'bgcolor="#eeeeee"';
        } else {
            $background = '';
        }

        $item = '<tr '.$background.' align="center" style="border-bottom: 1px solid #eeeeee;">';
        $item .= '<td width="50%" style="border-right: 1px solid #eeeeee;"><p style="line-height: 52px; margin: 0; font-size: 12px; color: #363636;">'.$product->title.'</p></td>';
        $item .= '<td width="50%"><p style="line-height: 52px; margin: 0; font-size: 12px; color: #363636;">'.$product->code.'</p></td>';
        $item .= '</tr>';

        $tableRows .= $item;
    }

    $message = str_replace('{{ prodList }}', $tableRows, $message);
}

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

  
mail($to, $subject, $message, $headers);

function check_input($data, $problem = ""){
    $data = htmlentities(trim(strip_tags(stripslashes($data))), ENT_NOQUOTES, "UTF-8");

    if ($problem && strlen($data) == 0){
        show_error($problem);
    }

    return $data;
};

function show_error($myError) {
    echo $myError;
    exit();
}