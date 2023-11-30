<?php
$uploadDir = 'uploads/';
$splitCount = $_POST['splitCount'];

if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$imageData = file_get_contents($_FILES['image']['tmp_name']);
$base64Image = base64_encode($imageData);

list($type, $base64Image) = explode(';', $base64Image);
list(, $base64Image)      = explode(',', $base64Image);

$decodedImage = base64_decode($base64Image);

$originalImage = imagecreatefromstring($decodedImage);
$width = imagesx($originalImage);
$height = imagesy($originalImage);
$splitWidth = $width / $splitCount;

$splitImages = [];

for ($i = 0; $i < $splitCount; $i++) {
    $startX = $i * $splitWidth;
    $splitImage = imagecrop($originalImage, ['x' => $startX, 'y' => 0, 'width' => $splitWidth, 'height' => $height]);
    
    ob_start();
    imagejpeg($splitImage);
    $splitImages[] = base64_encode(ob_get_clean());
}

imagedestroy($originalImage);

header('Content-Type: application/json');
echo json_encode($splitImages);
?>
