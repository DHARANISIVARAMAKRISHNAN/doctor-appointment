/* =========================================
   MEDCARE DOCTOR APPOINTMENT
   JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("show")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close mobile menu after clicking */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   HERO CAROUSEL
========================================= */

const heroSlides =
    document.querySelectorAll(".hero-slide");

const heroDotsContainer =
    document.getElementById("heroDots");

const heroPrev =
    document.getElementById("heroPrev");

const heroNext =
    document.getElementById("heroNext");

const heroDoctorImage =
    document.getElementById("heroDoctorImage");

const heroDoctorName =
    document.getElementById("heroDoctorName");

const heroDoctorSpeciality =
    document.getElementById("heroDoctorSpeciality");


const heroDoctors = [

    {
        image: "images/doctor1.jpg",
        name: "Dr. Praganya",
        speciality: "General Medicine"
    },

    {
        image: "images/doctor2.jpg",
        name: "Dr. Prabakaran",
        speciality: "Cardiology"
    },

    {
        image: "images/doctor3.jpg",
        name: "Dr. Sivaramakrishnan",
        speciality: "Neurology"
    },

    {
        image: "images/doctor4.jpg",
        name: "Dr. Banumathi",
        speciality: "Gynecology"
    },

    {
        image: "images/doctor5.jpg",
        name: "Dr. Karthick",
        speciality: "Orthopedic"
    },

    {
        image: "images/doctor6.jpg",
        name: "Dr. Devadharshini",
        speciality: "Pediatrics"
    },

    {
        image: "images/doctor7.jpg",
        name: "Dr. Lalitha",
        speciality: "Dermatology"
    },

    {
        image: "images/doctor8.jpg",
        name: "Dr. Dharani",
        speciality: "General Medicine"
    }

];


let currentSlide = 0;


/* Create dots */

heroSlides.forEach((slide, index) => {

    const dot = document.createElement("span");

    dot.classList.add("hero-dot");

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {

        currentSlide = index;

        showHeroSlide(currentSlide);

    });

    heroDotsContainer.appendChild(dot);

});


const heroDots =
    document.querySelectorAll(".hero-dot");


function showHeroSlide(index) {

    heroSlides.forEach(slide => {

        slide.classList.remove("active");

    });

    heroDots.forEach(dot => {

        dot.classList.remove("active");

    });


    heroSlides[index].classList.add("active");

    heroDots[index].classList.add("active");


    const doctor = heroDoctors[index];

    heroDoctorImage.src = doctor.image;

    heroDoctorName.textContent = doctor.name;

    heroDoctorSpeciality.textContent =
        doctor.speciality;

}


function nextHeroSlide() {

    currentSlide++;

    if (currentSlide >= heroSlides.length) {
        currentSlide = 0;
    }

    showHeroSlide(currentSlide);

}


function previousHeroSlide() {

    currentSlide--;

    if (currentSlide < 0) {
        currentSlide = heroSlides.length - 1;
    }

    showHeroSlide(currentSlide);

}


heroNext.addEventListener("click", nextHeroSlide);

heroPrev.addEventListener("click", previousHeroSlide);


/* Auto slide */

let heroTimer = setInterval(
    nextHeroSlide,
    5000
);


/* =========================================
   DOCTOR SEARCH
========================================= */

function searchDoctors() {

    const searchValue =
        document.getElementById("doctorSearch")
        .value
        .toLowerCase()
        .trim();

    const doctorCards =
        document.querySelectorAll(".doctor-card");

    let found = false;


    doctorCards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const speciality =
            card.dataset.speciality.toLowerCase();

        if (
            name.includes(searchValue) ||
            speciality.includes(searchValue) ||
            searchValue === ""
        ) {

            card.classList.remove("hidden");

            found = true;

        } else {

            card.classList.add("hidden");

        }

    });


    if (!found) {

        alert(
            "No doctor found. Please try another name or specialization."
        );

    }


    document.getElementById("doctors")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* Search on Enter */

document
    .getElementById("doctorSearch")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            searchDoctors();

        }

    });


/* =========================================
   FAVORITE BUTTON
========================================= */

document.querySelectorAll(".favorite-btn")
.forEach(button => {

    button.addEventListener("click", function() {

        this.classList.toggle("liked");

        const icon =
            this.querySelector("i");

        if (this.classList.contains("liked")) {

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

        } else {

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

        }

    });

});


/* =========================================
   SELECT DOCTOR
========================================= */

function selectDoctor(doctorName) {

    const doctorSelect =
        document.getElementById("doctorSelect");

    doctorSelect.value = doctorName;

}


/* =========================================
   DATE MINIMUM
========================================= */

const appointmentDate =
    document.getElementById("appointmentDate");

const today =
    new Date().toISOString().split("T")[0];

appointmentDate.min = today;


/* =========================================
   APPOINTMENT FORM
========================================= */

const appointmentForm =
    document.getElementById("appointmentForm");


appointmentForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const patientName =
        document.getElementById("patientName").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const doctor =
        document.getElementById("doctorSelect").value;

    const date =
        document.getElementById("appointmentDate").value;


    if (!patientName || !mobile || !email || !doctor || !date) {

        alert("Please fill all required fields.");

        return;

    }


    /* Mobile validation */

    const mobilePattern =
        /^[0-9]{10}$/;

    if (!mobilePattern.test(mobile)) {

        alert(
            "Please enter a valid 10-digit mobile number."
        );

        return;

    }


    /* Generate appointment number */

    const randomNumber =
        Math.floor(
            10000 + Math.random() * 90000
        );

    const appointmentNumber =
        "MED" + randomNumber;


    document.getElementById("appointmentNumber")
        .textContent = appointmentNumber;


    document.getElementById("successMessage")
        .textContent =
        `Thank you ${patientName}. Your appointment request with ${doctor} has been submitted successfully.`;


    document.getElementById("successModal")
        .classList.add("show");


    /* Save demo appointment */

    const appointmentData = {

        number: appointmentNumber,
        name: patientName,
        mobile: mobile,
        email: email,
        doctor: doctor,
        date: date

    };


    localStorage.setItem(
        "medcareAppointment",
        JSON.stringify(appointmentData)
    );


    appointmentForm.reset();

});


/* =========================================
   CLOSE MODAL
========================================= */

function closeModal() {

    document.getElementById("successModal")
        .classList.remove("show");

}


/* Close modal when clicking outside */

document.getElementById("successModal")
.addEventListener("click", function(event) {

    if (event.target === this) {

        closeModal();

    }

});


/* =========================================
   CHECK APPOINTMENT
========================================= */

function checkAppointment() {

    const search =
        document.getElementById("appointmentSearch")
        .value
        .toLowerCase()
        .trim();


    const result =
        document.getElementById("appointmentResult");


    if (!search) {

        result.innerHTML = `
            <div class="result-card">
                Please enter your appointment number,
                name or mobile number.
            </div>
        `;

        return;

    }


    const saved =
        localStorage.getItem("medcareAppointment");


    if (!saved) {

        result.innerHTML = `
            <div class="result-card">
                <strong>No appointment found.</strong>
                Please book an appointment first.
            </div>
        `;

        return;

    }


    const appointment =
        JSON.parse(saved);


    const match =
        appointment.number.toLowerCase().includes(search) ||
        appointment.name.toLowerCase().includes(search) ||
        appointment.mobile.includes(search);


    if (!match) {

        result.innerHTML = `
            <div class="result-card">
                <strong>No matching appointment found.</strong>
                Please check your details and try again.
            </div>
        `;

        return;

    }


    result.innerHTML = `

        <div class="result-card">

            <p>
                <strong>Appointment Number:</strong>
                ${appointment.number}
            </p>

            <p>
                <strong>Patient Name:</strong>
                ${appointment.name}
            </p>

            <p>
                <strong>Doctor:</strong>
                ${appointment.doctor}
            </p>

            <p>
                <strong>Appointment Date:</strong>
                ${appointment.date}
            </p>

            <p>
                <strong>Status:</strong>
                Appointment request submitted
            </p>

        </div>

    `;

}


/* =========================================
   NAV ACTIVE LINK
========================================= */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});