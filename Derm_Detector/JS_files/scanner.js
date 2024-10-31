// function startScan() {
//     const fileInput = document.getElementById('fileInput');
//     const file = fileInput.files[0];
//     if (file) {
//         const formData = new FormData();
//         formData.append('image', file);

//         // Replace 'your-model-endpoint' with the actual endpoint of your machine learning model
//         fetch('your-model-endpoint', {
//             method: 'POST',
//             body: formData
//         })
//         .then(response => response.json())
//         .then(data => {
//             document.getElementById('results').innerHTML = `
//                 <h3>Detected Results:</h3>
//                 <p>${data.results}</p>
//                 <p>Recommendation: ${data.recommendation}</p>
//             `;
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     } else {
//         alert('Please upload an image.');
//     }
// }


// Preview image on file selection
function previewImage(event) {
    const file = event.target.files[0];
    displayImage(file);
}

// Handle drag-and-drop events
function dropHandler(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    displayImage(file);
}

function dragOverHandler(event) {
    event.preventDefault();
}

// Display selected image
function displayImage(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgElement = document.getElementById('selected-image');
        imgElement.src = e.target.result;
        imgElement.style.display = 'block';
        
        // Show the remove button
        const removeElement = document.getElementById('remove-image');
        removeElement.style.display = 'block';

        // Add an event listener to remove the image and hide the button
        removeElement.onclick = function(event) {
            event.preventDefault(); // Prevents following the link
            imgElement.src = '';
            imgElement.style.display = 'none';
            removeElement.style.display = 'none';
            $("#prediction-list").empty();
        };
    };
    reader.readAsDataURL(file);
}




async function startScan() {
    const imageElement = document.getElementById('selected-image');
    if (imageElement.src) {
        const tensor = tf.browser.fromPixels(imageElement)
            .resizeNearestNeighbor([224, 224])
            .toFloat()
            .sub(tf.scalar(127.5))
            .div(tf.scalar(127.5))
            .expandDims();

        // Call model prediction and process results
        const predictions = await model.predict(tensor).data();
        displayPredictions(predictions);
    } else {
        alert("Please upload an image first.");
    }
}

// // Display the prediction results
function displayPredictions(predictions) {
    const topPredictions = Array.from(predictions)
        .map((probability, index) => ({ className: TARGET_CLASSES[index], probability }))
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 3);

    const predictionList = document.getElementById("prediction-list");
    predictionList.innerHTML = "";
    topPredictions.forEach(prediction => {
        const listItem = document.createElement("li");
        listItem.textContent = `${prediction.className}: ${prediction.probability.toFixed(3)}`;
        predictionList.appendChild(listItem);
    });
}

