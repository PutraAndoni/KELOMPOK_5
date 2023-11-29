document.getElementById('generateGrid').addEventListener('click', generateGrid);

function generateGrid() {
    const files = document.getElementById('fileInput').files;
    const gridColumns = parseInt(document.getElementById('gridColumns').value);

    if (files.length === 0) {
        alert('Please select an image.');
        return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const img = new Image();
        img.src = e.target.result;

        img.onload = function () {
            const container = document.getElementById('photoGrid');
            container.innerHTML = ''; // Clear previous content

            const width = img.width / gridColumns;
            const height = img.height / Math.ceil(img.height / width);

            for (let row = 0; row < Math.ceil(img.height / height); row++) {
                for (let col = 0; col < gridColumns; col++) {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    canvas.width = width;
                    canvas.height = height;

                    ctx.drawImage(
                        img,
                        col * width,
                        row * height,
                        width,
                        height,
                        0,
                        0,
                        width,
                        height
                    );

                    container.appendChild(canvas);
                }
            }

            // Show download button
            document.getElementById('downloadLink').style.display = 'block';
        };
    };

    reader.readAsDataURL(file);
}

document.getElementById('downloadButton').addEventListener('click', downloadGrid);

function downloadGrid() {
    const container = document.getElementById('photoGrid');
    const canvasList = container.getElementsByTagName('canvas');

    const finalCanvas = document.createElement('canvas');
    const finalCtx = finalCanvas.getContext('2d');

    finalCanvas.width = container.clientWidth;
    finalCanvas.height = container.clientHeight;

    let offsetX = 0;
    let offsetY = 0;

    for (const canvas of canvasList) {
        finalCtx.drawImage(canvas, offsetX, offsetY);
        offsetX += canvas.width + 10; // 10px gap
        if (offsetX + canvas.width > finalCanvas.width) {
            offsetX = 0;
            offsetY += canvas.height + 10; // 10px gap
        }
    }

    // Convert final canvas to data URL
    const dataURL = finalCanvas.toDataURL();

    // Create a link and trigger the download
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = dataURL;
    downloadLink.click();
}
