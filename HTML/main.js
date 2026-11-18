
// =================================
// 1. MOBILE NAVIGATION
// =================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";

    });

}


// =================================
// 2. CLOSE MENU AFTER CLICK
// =================================

if (navLinks) {

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            }

        });

    });

}


// =================================
// 3. AUTOMATIC COPYRIGHT YEAR
// =================================

const yearElement = document.getElementById("currentYear");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

console.log("Nayan IT Support Portfolio loaded successfully.");




// =================================
// 4. CONTACT FORM - EMAILJS
// =================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    const formStatus = document.getElementById("formStatus");
    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || !email || !subject || !message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        if (!emailPattern.test(email)) {
            formStatus.textContent = "Please enter a valid email address.";
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        formStatus.textContent = "Sending your message...";

        try {

            await emailjs.send(
                "service_cpq9q1y",
                "template_1zyhn6g",
                {
                    name: name,
                    email: email,
                    title: subject,
                    message: message
                }
            );

            formStatus.textContent =
                "Message sent successfully! Thank you for contacting me.";

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Message could not be sent. Please try again.";

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = "Send Message →";

        }

    });

}



// =================================
// 5. CERTIFICATE FILTER
// =================================

const certificateFilters = document.querySelectorAll(".certificate-filter");
const certificateCards = document.querySelectorAll(".certificate-card");
const certificateCount = document.getElementById("certificateCount");

if (certificateFilters.length > 0 && certificateCards.length > 0) {

    certificateFilters.forEach(function (filterButton) {

        filterButton.addEventListener("click", function () {

            const selectedCategory = filterButton.dataset.filter;
            let visibleCount = 0;

            certificateFilters.forEach(function (button) {
                button.classList.remove("active");
                button.setAttribute("aria-pressed", "false");
            });

            filterButton.classList.add("active");
            filterButton.setAttribute("aria-pressed", "true");

            certificateCards.forEach(function (card) {

                const cardCategory = card.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    selectedCategory === cardCategory;

                card.hidden = !shouldShow;

                if (shouldShow) {
                    visibleCount++;
                }

            });

            if (certificateCount) {
                certificateCount.textContent =
                    visibleCount + " Certificates";
            }

        });

    });

}


// =================================
// 6. CERTIFICATE IMAGE PREVIEW
// =================================

const certificateModal = document.getElementById("certificateModal");
const modalCertificateImage = document.getElementById("modalCertificateImage");
const modalTitle = document.getElementById("modalTitle");
const closeCertificateModal = document.getElementById("closeCertificateModal");

const viewCertificateButtons =
    document.querySelectorAll(".view-certificate");

if (certificateModal && modalCertificateImage && closeCertificateModal) {

    viewCertificateButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const imagePath = button.dataset.image;
            const certificateTitle = button.dataset.title;

            modalCertificateImage.src = imagePath;
            modalCertificateImage.alt = certificateTitle;
            modalTitle.textContent = certificateTitle;

            certificateModal.classList.add("show");
            certificateModal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

            closeCertificateModal.focus();

        });

    });


    function closeCertificatePreview() {

        certificateModal.classList.remove("show");
        certificateModal.setAttribute("aria-hidden", "true");

        modalCertificateImage.src = "";

        document.body.style.overflow = "";

    }


    closeCertificateModal.addEventListener("click", closeCertificatePreview);


    certificateModal.addEventListener("click", function (event) {

        if (event.target === certificateModal) {
            closeCertificatePreview();
        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" &&
            certificateModal.classList.contains("show")) {

            closeCertificatePreview();

        }

    });

}




