document.getElementById('navbarToggle').addEventListener('click', function() {
    document.querySelector('.navbar-menu').classList.toggle('active');
});



document.addEventListener('DOMContentLoaded', () => {
    // Select all slider elements
    const sliders = document.querySelectorAll('.slider');

    // Iterate over each slider element
    sliders.forEach(slider => {
        // Select elements within the current slider
        const slides = slider.querySelector('.slides');
        const slide = slider.querySelectorAll('.slide');
        const prev = slider.querySelector('.prev');
        const next = slider.querySelector('.next');
        let index = 0;

        // Function to show a specific slide
        function showSlide(n) {
            if (n < 0) {
                // If index is less than 0, set it to the last slide
                index = slide.length - 1;
            } else if (n >= slide.length) {
                // If index is greater than or equal to the number of slides, set it to the first slide
                index = 0;
            } else {
                // Otherwise, set the index to the given value
                index = n;
            }
            // Move the slides container to show the current slide
            // (-index * 100 / 6) added +6 for removing blank spaces when clicking right btn (showing 6 img, 8 img in total)
            // --due to responsive screen I again made it from 12 to 6
            slides.style.transform = 'translateX(' + (-index * 100 / 6) + '%)';
        }

        // Event listener for the previous button
        prev.addEventListener('click', () => {
            showSlide(index - 1);
        });

        // Event listener for the next button
        next.addEventListener('click', () => {
            showSlide(index + 1);
        });
    });
});




document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('subscription-form');
    const emailInput = document.getElementById('email');
    const message = document.getElementById('subscription-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = emailInput.value;

        if (validateEmail(email)) {
            message.textContent = 'Thank you for subscribing!';
            message.style.color = 'green';
            emailInput.value = '';
        } else {
            message.textContent = 'Please enter a valid email address.';
            message.style.color = 'red';
        }
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
