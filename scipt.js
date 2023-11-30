function splitImage() {
    const input = document.getElementById('image-upload');
    const outputContainer = document.getElementById('output-container');
    const splitCount = parseInt(document.getElementById('split-count').value, 10);

    if (input.files.length === 0) {
        alert('Please select an image before splitting.');
        return;
    }

    const file = input.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('splitCount', splitCount);

    fetch('splitImage.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        displaySplitImages(data);
    })
    .catch(error => console.error('Error:', error));
}

function displaySplitImages(images) {
    const outputContainer = document.getElementById('output-container');
    outputContainer.innerHTML = '';

    images.forEach((imageData, index) => {
        const outputImage = new Image();
        outputImage.src = `data:image/jpeg;base64,${imageData}`;
        
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('output-image');
        outputDiv.appendChild(outputImage);

        outputContainer.appendChild(outputDiv);
    });

    // Add download button
    const downloadButton = document.createElement('button');
    downloadButton.textContent = 'Download All';
    downloadButton.addEventListener('click', function () {
        downloadAllImages(outputContainer);
    });
    outputContainer.appendChild(downloadButton);
}
