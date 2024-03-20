
function toggleProject(projectId) {
    var project = document.getElementById(projectId);
    var button = document.querySelector('[onclick="toggleProject(\'' + projectId + '\')"]');
    var icon = button.querySelector('.icon');
    var buttonContainer = button.closest('.project'); // Target the closest parent container with the class 'project'
    var imageContainer = buttonContainer.querySelector('.button-image-container'); // Find the image container

    // Toggle the project visibility
    if (project.style.display === "none" || project.style.display === "") {
        project.style.display = "block";
        icon.src = "assets/images/university/minus_icon.png"; // Change to minus icon
        icon.alt = "Collapse Icon";

        // Show the image container
        if (imageContainer) {
            imageContainer.style.display = 'none'; //modified this one
        }
    } else {
        imageContainer.style.display = 'block';
        project.style.display = "none";
        icon.src = "assets/images/university/plus_icon.png"; // Change to plus icon
        icon.alt = "Expand Icon";

        // Don't hide the image container when collapsing the project content
        // The visibility of the container should remain unchanged
    }
}

// Highlight the project
document.addEventListener("DOMContentLoaded", function() {
    var currentPage = window.location.pathname;
    console.log("Current Page:", currentPage); // Debugging output

    // Add active class to the corresponding link
    if (currentPage === "/") {
        document.querySelector("nav a.about-me").classList.add("active");
    } else if (currentPage === "/cv.html") {
        document.querySelector("nav a.cv").classList.add("active");
    } else if (currentPage === "/projects.html") {
        document.querySelector("nav a.projects").classList.add("active");
    } else if (currentPage === "/thesis-bachelor.html" || currentPage === "/thesis-master.html") {
        document.querySelector("nav a.thesis").classList.add("active");
    }
});


/* IMAGE FULLSCREEN ON CLICK*/
// Get all image links
/*
const imageLinks = document.querySelectorAll('.image-link');

// Get the modal and close button
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');

// Add click event listeners to image links
imageLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const imageUrl = link.getAttribute('href');
        openModal(imageUrl);
    });
});

// Open the modal
function openModal(imageUrl) {
    const modalContent = document.createElement('img');
    modalContent.src = imageUrl;
    modal.innerHTML = ''; // Clear previous content
    modal.appendChild(modalContent);
    modal.style.display = 'block';
}

// Close the modal when the close button is clicked
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close the modal when the user clicks anywhere outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
*/