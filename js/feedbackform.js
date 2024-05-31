document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('feedbackForm');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Clear previous errors
        clearErrors();

        // Validate the form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        let isValid = true;

        if (name === '') {
            showError('nameError', 'Name is required.');
            isValid = false;
        }

        if (email === '') {
            showError('emailError', 'Email is required.');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('emailError', 'Email is not valid.');
            isValid = false;
        }

        if (message === '') {
            showError('messageError', 'Message is required.');
            isValid = false;
        }

        if (isValid) {
            // If valid, send the data (for demo, we'll just log it)
            console.log({
                name: name,
                email: email,
                message: message
            });

            // You can replace the above with an actual submission logic
            // e.g., using fetch() to send data to the server

            alert('Feedback submitted successfully!');
            form.reset();
        }
    });

    function showError(elementId, errorMessage) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = errorMessage;
    }

    function clearErrors() {
        document.getElementById('nameError').textContent = '';
        document.getElementById('emailError').textContent = '';
        document.getElementById('messageError').textContent = '';
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
