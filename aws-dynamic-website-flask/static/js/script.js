// Add an event listener for the 'submit' event on the form with the ID 'filterForm'
document.getElementById('filterForm').addEventListener('submit', function(e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the value of the 'category' input field
    const category = document.getElementById('category').value;
    // Get the value of the 'max_price' input field
    const maxPrice = document.getElementById('max_price').value;
    // Get the value of the 'min_price' input field
    const minPrice = document.getElementById('min_price').value;
    // Get the value of the 'rating' input field
    const rating = document.getElementById('rating').value;

    // Fetch the filtered products from the server with the provided filters
    fetch(`/filter?category=${category}&max_price=${maxPrice}&min_price=${minPrice}&rating=${rating}`)
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Get the element with the ID 'results' where the results will be displayed
            const results = document.getElementById('results');
            // Clear any existing content in the 'results' element
            results.innerHTML = '';

            // Check if no products were found
            if (data.length === 0) {
                // Display a message if no products were found
                results.innerHTML = '<li>No products found</li>';
            } else {
                // Iterate over each product in the filtered data
                data.forEach(item => {
                    // Create a new 'div' element for the slide
                    const slide = document.createElement('div');
                    slide.className = 'slide';

                    // Create a new 'div' element for the image
                    const imageDiv = document.createElement('div');
                    imageDiv.className = 'image';
                    // Create a new 'img' element for the product image
                    const img = document.createElement('img');
                    // Set the source of the image to the path of the product image
                    img.src = item['image-url']; // Use the image URL from the response data
                    img.alt = item.name; // Set the alt text to the product name
                    // Append the 'img' element to the 'image' div
                    imageDiv.appendChild(img);

                    // Create a new 'div' element for the text information
                    const textImgDiv = document.createElement('div');
                    textImgDiv.className = 'text-img';

                    // Create a new 'span' element for the title
                    const titleImgSpan = document.createElement('span');
                    titleImgSpan.className = 'title-img';
                    // Create two 'p' elements for the product name and additional info
                    const titleP1 = document.createElement('p');
                    titleP1.textContent = item.name; // Set the product name
                    const titleP2 = document.createElement('p');
                    titleP2.textContent = 'Additional Info'; // Replace with actual info if needed
                    // Append the 'p' elements to the 'title-img' span
                    titleImgSpan.appendChild(titleP1);
                    titleImgSpan.appendChild(titleP2);

                    // Create a new 'span' element for the price information
                    const priceImgSpan = document.createElement('span');
                    priceImgSpan.className = 'price-img';
                    // Create two 'span' elements for the amount and currency
                    const amountImgSpan = document.createElement('span');
                    amountImgSpan.className = 'amount-img';
                    amountImgSpan.textContent = item.price + ' AZN'; // Set the product price
                    const currencyImgSpan = document.createElement('span');
                    currencyImgSpan.className = 'currency-img';
                    currencyImgSpan.textContent = 'AZN'; // Set the currency
                    // Append the 'amount-img' and 'currency-img' spans to the 'price-img' span
                    priceImgSpan.appendChild(amountImgSpan);
                    priceImgSpan.appendChild(currencyImgSpan);

                    // Create a new 'span' element for the delivery information
                    const deliveryImgSpan = document.createElement('span');
                    deliveryImgSpan.className = 'delivery-img';
                    // Create two 'p' elements for the delivery information
                    const deliveryP1 = document.createElement('p');
                    deliveryP1.textContent = 'Çatdırılma:'; // Delivery text
                    const deliveryP2 = document.createElement('p');
                    deliveryP2.textContent = 'Var'; // Replace with actual delivery info if needed
                    // Append the 'p' elements to the 'delivery-img' span
                    deliveryImgSpan.appendChild(deliveryP1);
                    deliveryImgSpan.appendChild(deliveryP2);

                    // Append the 'title-img', 'price-img', and 'delivery-img' spans to the 'text-img' div
                    textImgDiv.appendChild(titleImgSpan);
                    textImgDiv.appendChild(priceImgSpan);
                    textImgDiv.appendChild(deliveryImgSpan);

                    // Append the 'image' div and the 'text-img' div to the 'slide' div
                    slide.appendChild(imageDiv);
                    slide.appendChild(textImgDiv);

                    // Append the 'slide' div to the 'results' element
                    results.appendChild(slide);
                });
            }
        });
});

// Add an event listener for the 'click' event on the element with the ID 'navbarToggle'
document.getElementById('navbarToggle').addEventListener('click', function() {
    // Toggle the 'active' class on the element with the class 'navbar-menu'
    document.querySelector('.navbar-menu').classList.toggle('active');
});


// Function to initialize sliders
function initializeSliders() {
    // Select all elements with the class 'slider'
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
}

// Function to initialize form
function initializeForm() {
    // Select the form with the ID 'subscription-form'
    const form = document.getElementById('subscription-form');
    // Select the input field with the ID 'email'
    const emailInput = document.getElementById('email');
    // Select the element with the ID 'subscription-message'
    const message = document.getElementById('subscription-message');

    // Add an event listener for the 'submit' event on the form
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Get the value of the email input field
        const email = emailInput.value;

        // Validate the email address
        if (validateEmail(email)) {
            // Display a success message if the email is valid
            message.textContent = 'Thank you for subscribing!';
            message.style.color = 'green';
            // Clear the email input field
            emailInput.value = '';
        } else {
            // Display an error message if the email is not valid
            message.textContent = 'Please enter a valid email address.';
            message.style.color = 'red';
        }
    });

    // Function to validate the email address
    function validateEmail(email) {
        // Regular expression for validating an email address
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Test the email against the regular expression
        return re.test(String(email).toLowerCase());
    }
}

// Add an event listener for the 'DOMContentLoaded' event
document.addEventListener('DOMContentLoaded', () => {
    initializeSliders();
    initializeForm();
});

// Create a MutationObserver to monitor changes in the document
const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            // Re-initialize sliders and form when a new child is added to the DOM
            initializeSliders();
            initializeForm();
        }
    }
});

// Start observing the document for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});
