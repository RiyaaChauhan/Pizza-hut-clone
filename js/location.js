const inputLocation = document.getElementById('input-location');
const suggestionsContainer = document.getElementById('suggestions');
const submitBtn = document.getElementById('submit-btn');

inputLocation.addEventListener('input', debounce(getSuggestions, 300));
suggestionsContainer.addEventListener('click', handleSuggestionClick);

submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    console.log("Submit button clicked"); // Optional: log to console for debugging
    // For now, it does nothing when clicked submit button
});

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function getSuggestions() {
    const query = inputLocation.value.trim();
    if (query.length < 2) {
        suggestionsContainer.innerHTML = '';
        return;
    }

    const apiKey = 'YOUR_OPENCAGE_API';  //Replace it with your OpenCage Api key, 'ea3be8a848af455e82b3a655cab9f391" you can use this for testing pupose
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=5`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const suggestions = data.results.map(result => result.formatted);
            displaySuggestions(suggestions);
        })
        .catch(error => console.error('Error fetching suggestions:', error));
}

function displaySuggestions(suggestions) {
    suggestionsContainer.innerHTML = suggestions.map(suggestion => 
        `<div class="suggestion">${suggestion}</div>`
    ).join('');
}

function handleSuggestionClick(event) {
    if (event.target.classList.contains('suggestion')) {
        inputLocation.value = event.target.textContent;
        suggestionsContainer.innerHTML = '';
    }
}
