document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const files = event.target.files;

    for (const file of files) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const gridSize = 3; // Ubah sesuai dengan jumlah grid yang diinginkan
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const width = img.width / gridSize;
                const height = img.height / gridSize;

                canvas.width = img.width;
                canvas.height = img.height;

                for (let row = 0; row < gridSize; row++) {
                    for (let col = 0; col < gridSize; col++) {
                        ctx.drawImage(
                            img,
                            col * width,
                            row * height,
                            width,
                            height,
                            col * width,
                            row * height,
                            width,
                            height
                        );
                    }
                }

                document.getElementById('photoGrid').appendChild(canvas);
            };
        };

        reader.readAsDataURL(file);
    }
}
