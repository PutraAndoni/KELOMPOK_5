<?php

// Pastikan formulir telah di-submit
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Pastikan file telah di-upload
    if (isset($_FILES["image"]) && $_FILES["image"]["error"] == UPLOAD_ERR_OK) {
        // Path tempat menyimpan file sementara
        $tmpFilePath = $_FILES["image"]["tmp_name"];

        // Ambil nilai derajat rotasi dari formulir (default: 0 derajat)
        $rotationDegree = isset($_POST['rotation_degree']) ? intval($_POST['rotation_degree']) : 0;

        // Path tempat menyimpan file hasil rotasi
        $outputFilePath = 'output_rotated.jpg';

        // Eksekusi perintah ImageMagick untuk rotasi
        $command = 'convert ' . $tmpFilePath . ' -rotate ' . $rotationDegree . ' ' . $outputFilePath;
        exec($command, $output, $returnCode);

        // Tampilkan pesan berhasil atau gagal
        if ($returnCode === 0 && file_exists($outputFilePath)) {
            // Set header untuk membuat file diunduh
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . basename($outputFilePath) . '"');
            header('Content-Length: ' . filesize($outputFilePath));

            // Baca file dan keluarkan ke output
            readfile($outputFilePath);

            // Hapus file upload dan file yang telah diputar
            unlink($tmpFilePath);
            unlink($outputFilePath);

            // Hentikan eksekusi script
            exit;
        } else {
            // Tampilkan pesan gagal
            echo 'Failed to rotate the image.';
        }
    } else {
        // Tampilkan pesan jika tidak ada file yang di-upload
        echo 'Please select an image file.';
    }
}

?>
