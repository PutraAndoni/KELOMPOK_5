function generateGrid() {
    const input = document.getElementById('image-upload');
    const outputContainer = document.getElementById('output-container');
    const downloadLink = document.getElementById('download-link');

    if (input.files.length === 0) {
        alert('Please select an image before generating the grid.');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;

        image.onload = function () {
            const totalWidth = image.width;
            const totalHeight = image.height;
            const gridWidth = totalWidth / 3;
            const gridHeight = totalHeight / 3;

            outputContainer.innerHTML = '';

            const zip = new JSZip();

            for (let row = 0; row < 3; row++) {
                for (let col = 0; col < 3; col++) {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    canvas.width = gridWidth;
                    canvas.height = gridHeight;

                    const startX = col * gridWidth;
                    const startY = row * gridHeight;

                    context.drawImage(image, startX, startY, gridWidth, gridHeight, 0, 0, gridWidth, gridHeight);

                    const outputImage = new Image();
                    outputImage.src = canvas.toDataURL('image/jpeg');

                    const outputDiv = document.createElement('div');
                    outputDiv.classList.add('grid-item');
                    outputDiv.appendChild(outputImage);

                    outputContainer.appendChild(outputDiv);

                    // Add image to zip file
                    zip.file(grid_image_${row * 3 + col + 1}.jpg, outputImage.src.substr(outputImage.src.indexOf(',') + 1), { base64: true });
                }
            }

            // Enable download link
            downloadLink.href = '#';
            downloadLink.download = 'grid_images.zip';
            downloadLink.addEventListener('click', function () {
                zip.generateAsync({ type: 'blob' }).then(function (content) {
                    saveAs(content, 'grid_images.zip');
                });
            });
            downloadLink.style.display = 'inline-block';
        };
    };

    reader.readAsDataURL(file);
}