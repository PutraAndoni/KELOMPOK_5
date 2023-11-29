function splitImage() {
    const input = document.getElementById('image-upload');
    const outputContainer = document.getElementById('output-container');
    const splitCount = parseInt(document.getElementById('split-count').value, 10);

    if (input.files.length === 0) {
        alert('Please select an image before splitting.');
        return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const image = new Image();
        image.src = e.target.result;

        image.onload = function () {
            const totalWidth = image.width;
            const width = totalWidth / splitCount;
            const height = image.height;

            outputContainer.innerHTML = '';

            for (let i = 0; i < splitCount; i++) {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');

                canvas.width = width;
                canvas.height = height;

                const startX = i * width;
                context.drawImage(image, startX, 0, width, height, 0, 0, width, height);

                const outputImage = new Image();
                outputImage.src = canvas.toDataURL('image/jpeg');

                const outputDiv = document.createElement('div');
                outputDiv.classList.add('output-image');
                outputDiv.appendChild(outputImage);

                outputContainer.appendChild(outputDiv);
            }

            // Add download button
            const downloadButton = document.createElement('button');
            downloadButton.textContent = 'Download All';
            downloadButton.addEventListener('click', function () {
                downloadAllImages(outputContainer);
            });
            outputContainer.appendChild(downloadButton);
        };
    };

    reader.readAsDataURL(file);
}

function downloadAllImages(container) {
    const images = container.querySelectorAll('.output-image img');
    images.forEach((image, index) => {
        const link = document.createElement('a');
        link.href = image.src;
        link.download = `split_image_${index + 1}.jpg`;
        link.click();
    });
}
