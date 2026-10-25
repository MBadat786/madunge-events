/* =========================================================
   MADUNGE EVENTS & PROJECTS
   Main JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const loader = document.getElementById("pageLoader");
    const header = document.getElementById("siteHeader");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const currentYear = document.getElementById("currentYear");



    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }



    
/* =====================================================
   PAGE LOADER
   ===================================================== */

window.addEventListener("load", () => {

    // Allow the logo assembly animation to finish
    setTimeout(() => {

        if (loader) {
            loader.classList.add("loaded");
        }

        // Reveal hero content after the loader begins fading
        setTimeout(() => {

            document
                .querySelectorAll(".hero .reveal")
                .forEach((element, index) => {

                    setTimeout(() => {
                        element.classList.add("visible");
                    }, index * 140);

                });

        }, 250);

    }, 1100);

});


    /* =====================================================
       NAVBAR ON SCROLL
       ===================================================== */

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });



    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            mobileMenu.classList.toggle("active");
            document.body.classList.toggle("menu-open");

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    menuToggle.classList.remove("active");
                    mobileMenu.classList.remove("active");
                    document.body.classList.remove("menu-open");

                });

            });

    }



    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal:not(.hero .reveal), .reveal-image"
        );


    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });



    /* =====================================================
       SERVICE ROW STAGGER
       ===================================================== */

    const serviceRows =
        document.querySelectorAll(".service-row");


    serviceRows.forEach((row, index) => {

        row.style.transitionDelay =
            `${Math.min(index * 60, 300)}ms`;

    });



    /* =====================================================
       VALUE STAGGER
       ===================================================== */

    const values =
        document.querySelectorAll(".value");


    values.forEach((value, index) => {

        value.style.transitionDelay =
            `${index * 100}ms`;

    });



    /* =====================================================
       SUBTLE HERO PARALLAX
       ===================================================== */

    const heroVideo =
        document.querySelector(".hero-video");

    const heroContent =
        document.querySelector(".hero-content");


    function heroParallax() {

        if (!heroVideo || !heroContent) return;

        const scrollPosition = window.scrollY;

        /*
         Only calculate while hero is visible.
        */

        if (scrollPosition < window.innerHeight) {

            heroVideo.style.transform =
                `scale(1.04) translateY(${scrollPosition * 0.08}px)`;

            heroContent.style.transform =
                `translateY(${scrollPosition * 0.035}px)`;

        }

    }


    window.addEventListener(
        "scroll",
        heroParallax,
        { passive: true }
    );



    /* =====================================================
       IMAGE PARALLAX
       ===================================================== */

    const editorialImage =
        document.querySelector(".editorial-image img");


    function imageParallax() {

        if (!editorialImage) return;

        const section =
            editorialImage.closest(".editorial-break");

        if (!section) return;

        const rect =
            section.getBoundingClientRect();

        if (
            rect.bottom > 0 &&
            rect.top < window.innerHeight
        ) {

            const progress =
                (window.innerHeight - rect.top) /
                (window.innerHeight + rect.height);

            const movement =
                (progress - 0.5) * 50;

            editorialImage.style.transform =
                `scale(1.07) translateY(${movement}px)`;

        }

    }


    window.addEventListener(
        "scroll",
        imageParallax,
        { passive: true }
    );



    /* =====================================================
       GALLERY MOVEMENT
       ===================================================== */

    const galleryTrack =
        document.querySelector(".gallery-track");


    function galleryMovement() {

        if (!galleryTrack) return;

        const section =
            galleryTrack.closest(".gallery-strip");

        if (!section) return;

        const rect =
            section.getBoundingClientRect();


        if (
            rect.bottom > 0 &&
            rect.top < window.innerHeight
        ) {

            const progress =
                (window.innerHeight - rect.top) /
                (window.innerHeight + rect.height);

            const movement =
                -3 - (progress * 7);

            galleryTrack.style.transform =
                `translateX(${movement}vw)`;

        }

    }


    window.addEventListener(
        "scroll",
        galleryMovement,
        { passive: true }
    );



    /* =====================================================
       MOUSE EFFECT ON CIRCLE BUTTON
       ===================================================== */

    const circleButton =
        document.querySelector(".circle-link");


    if (circleButton) {

        circleButton.addEventListener(
            "mousemove",
            event => {

                /*
                 Don't use magnetic movement on touch/mobile.
                */

                if (window.innerWidth <= 900) return;


                const rect =
                    circleButton.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                circleButton.style.transform =
                    `translate(${x * 0.12}px, ${y * 0.12}px)`;

            }
        );


        circleButton.addEventListener(
            "mouseleave",
            () => {

                circleButton.style.transform =
                    "translate(0, 0)";

            }
        );

    }



    /* =====================================================
       PREVENT EMPTY SOCIAL LINKS
       ===================================================== */

    document
        .querySelectorAll('a[href="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                }
            );

        });



    /* =====================================================
       REDUCED MOTION ACCESSIBILITY
       ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    if (reducedMotion.matches) {

        document
            .querySelectorAll(".reveal")
            .forEach(element => {

                element.classList.add("visible");

            });

    }

});
















/* =========================================================
   CUSTOM SELECT DROPDOWNS
   ========================================================= */

const customSelects =
    document.querySelectorAll(".custom-select");

customSelects.forEach(select => {

    const trigger =
        select.querySelector(".custom-select-trigger");

    const triggerText =
        trigger.querySelector("span");

    const options =
        select.querySelectorAll(".custom-select-menu button");

    const inputId =
        select.dataset.input;

    const hiddenInput =
        document.getElementById(inputId);


    /* OPEN / CLOSE */

    trigger.addEventListener("click", event => {

        event.stopPropagation();

        customSelects.forEach(otherSelect => {

            if (otherSelect !== select) {
                otherSelect.classList.remove("open");
            }

        });

        select.classList.toggle("open");

    });


    /* SELECT OPTION */

    options.forEach(option => {

        option.addEventListener("click", event => {

            event.stopPropagation();

            const value =
                option.dataset.value;

            hiddenInput.value =
                value;

            triggerText.textContent =
                value;


            options.forEach(item =>
                item.classList.remove("selected")
            );

            option.classList.add("selected");

            select.classList.remove("open");

        });

    });

});


/* CLOSE WHEN CLICKING OUTSIDE */

document.addEventListener("click", () => {

    customSelects.forEach(select =>
        select.classList.remove("open")
    );

});













/* =========================================================
   CUSTOM DATE PICKER
   ========================================================= */

const datePicker =
    document.getElementById("customDatePicker");

if (datePicker) {

    const dateTrigger =
        document.getElementById("dateTrigger");

    const calendarPanel =
        document.getElementById("calendarPanel");

    const calendarMonth =
        document.getElementById("calendarMonth");

    const calendarDays =
        document.getElementById("calendarDays");

    const selectedDateText =
        document.getElementById("selectedDate");

    const hiddenDateInput =
        document.getElementById("eventDate");

    const prevMonthButton =
        document.getElementById("prevMonth");

    const nextMonthButton =
        document.getElementById("nextMonth");

    const clearDateButton =
        document.getElementById("clearDate");


    const today = new Date();

    today.setHours(0, 0, 0, 0);


    let currentMonth =
        today.getMonth();

    let currentYear =
        today.getFullYear();

    let selectedDate = null;


    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    function renderCalendar() {

        calendarDays.innerHTML = "";

        calendarMonth.textContent =
            `${monthNames[currentMonth]} ${currentYear}`;


        const firstDay =
            new Date(currentYear, currentMonth, 1).getDay();

        const daysInMonth =
            new Date(
                currentYear,
                currentMonth + 1,
                0
            ).getDate();


        /* EMPTY SPACES */

        for (let i = 0; i < firstDay; i++) {

            const empty =
                document.createElement("span");

            empty.className =
                "calendar-day empty";

            calendarDays.appendChild(empty);

        }


        /* DAYS */

        for (let day = 1; day <= daysInMonth; day++) {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "calendar-day";

            button.textContent =
                day;


            const thisDate =
                new Date(
                    currentYear,
                    currentMonth,
                    day
                );

            thisDate.setHours(0, 0, 0, 0);


            /* TODAY */

            if (
                thisDate.getTime() ===
                today.getTime()
            ) {

                button.classList.add("today");

            }


            /* DISABLE PAST DATES */

            if (thisDate < today) {

                button.classList.add("disabled");

            }


            /* SELECTED */

            if (
                selectedDate &&
                thisDate.getTime() ===
                selectedDate.getTime()
            ) {

                button.classList.add("selected");

            }


            /* SELECT DATE */

            button.addEventListener(
                "click",
                () => {

                    if (
                        button.classList.contains(
                            "disabled"
                        )
                    ) {
                        return;
                    }


                    selectedDate =
                        thisDate;


                    const formattedDisplay =
                        selectedDate.toLocaleDateString(
                            "en-ZA",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            }
                        );


                    selectedDateText.textContent =
                        formattedDisplay;


                    const year =
                        selectedDate.getFullYear();

                    const month =
                        String(
                            selectedDate.getMonth() + 1
                        ).padStart(2, "0");

                    const date =
                        String(
                            selectedDate.getDate()
                        ).padStart(2, "0");


                    hiddenDateInput.value =
                        `${year}-${month}-${date}`;


                    renderCalendar();

                    datePicker.classList.remove(
                        "open"
                    );

                }
            );


            calendarDays.appendChild(
                button
            );

        }


        /* PREVENT NAVIGATING TO PAST MONTHS */

        const firstOfDisplayedMonth =
            new Date(
                currentYear,
                currentMonth,
                1
            );

        const firstOfCurrentMonth =
            new Date(
                today.getFullYear(),
                today.getMonth(),
                1
            );


        prevMonthButton.disabled =
            firstOfDisplayedMonth <=
            firstOfCurrentMonth;

    }


    /* OPEN CALENDAR */

    dateTrigger.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            document
                .querySelectorAll(
                    ".custom-select"
                )
                .forEach(select =>
                    select.classList.remove(
                        "open"
                    )
                );


            datePicker.classList.toggle(
                "open"
            );

        }
    );


    calendarPanel.addEventListener(
        "click",
        event => {

            event.stopPropagation();

        }
    );


    /* PREVIOUS MONTH */

    prevMonthButton.addEventListener(
        "click",
        () => {

            currentMonth--;

            if (currentMonth < 0) {

                currentMonth = 11;
                currentYear--;

            }

            renderCalendar();

        }
    );


    /* NEXT MONTH */

    nextMonthButton.addEventListener(
        "click",
        () => {

            currentMonth++;

            if (currentMonth > 11) {

                currentMonth = 0;
                currentYear++;

            }

            renderCalendar();

        }
    );


    /* CLEAR DATE */

    clearDateButton.addEventListener(
        "click",
        () => {

            selectedDate = null;

            hiddenDateInput.value = "";

            selectedDateText.textContent =
                "Select event date";

            renderCalendar();

        }
    );


    /* CLOSE OUTSIDE */

    document.addEventListener(
        "click",
        () => {

            datePicker.classList.remove(
                "open"
            );

        }
    );


    renderCalendar();

}


/* =========================================================
   MADUNGE ENQUIRY FORM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const projectForm = document.getElementById("projectForm");

    if (!projectForm) return;


    projectForm.addEventListener("submit", (event) => {

        event.preventDefault();


        /* -----------------------------------------
           VALIDATE FORM
        ----------------------------------------- */

        if (!projectForm.checkValidity()) {

            projectForm.reportValidity();

            return;

        }


        /* -----------------------------------------
           GET FORM DETAILS
        ----------------------------------------- */

        const name =
            document.getElementById("name").value.trim();

        const company =
            document.getElementById("company").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const eventType =
            document.getElementById("eventType").value;

        const eventDate =
            document.getElementById("eventDate").value;

        const eventLocation =
            document.getElementById("eventLocation").value.trim();

        const guests =
            document.getElementById("guests").value;

        const message =
            document.getElementById("message").value.trim();


        /* -----------------------------------------
           EMAIL SUBJECT
        ----------------------------------------- */

        const subject =
            `New Project Enquiry - ${name}`;


        /* -----------------------------------------
           BUILD EMAIL
        ----------------------------------------- */

        let emailBody =
`Hello Madunge Events,

I'd like to enquire about a project.

PROJECT DETAILS

Project Type: ${eventType || "Not specified"}
Event Date: ${eventDate || "Not specified"}
Event Location: ${eventLocation || "Not specified"}
Approximate Guests: ${guests || "Not specified"}

CONTACT DETAILS

Name: ${name}
Company / Organisation: ${company || "Not specified"}
Email: ${email}
Phone: ${phone || "Not specified"}

PROJECT DESCRIPTION

${message}

Kind regards,
${name}`;


        /* -----------------------------------------
           OPEN EMAIL
        ----------------------------------------- */

        const madungeEmail =
            "sales@madunge.co.za";


        const mailtoURL =
            `mailto:${madungeEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;


        window.location.href = mailtoURL;

    });

});