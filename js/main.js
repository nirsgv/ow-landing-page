document.addEventListener("DOMContentLoaded", function () {
  // lottie animations init

  const animations = [
    {
      id: "swords-animation",
      jsonPath: "../assets/lottie-files/swords.json",
      fallback: "swords.png",
    },
    {
      id: "anvil-animation",
      jsonPath: "../assets/lottie-files/anvil.json",
      fallback: "anvil.png",
    },
    {
      id: "server-animation",
      jsonPath: "../assets/lottie-files/server.json",
      fallback: "server.png",
    },
    {
      id: "megaphone-animation",
      jsonPath: "../assets/lottie-files/megaphone.json",
      fallback: "megaphone.png",
    },
    {
      id: "crystals-animation",
      jsonPath: "../assets/lottie-files/crystals.json",
      fallback: "crystals.png",
    },
  ];

  animations.forEach((anim) => {
    const lottieContainer = document.getElementById(anim.id);
    const fallbackImage = lottieContainer.nextElementSibling;

    lottie
      .loadAnimation({
        container: lottieContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: anim.jsonPath,
      })
      .addEventListener("data_failed", function () {
        lottieContainer.style.display = "none";
        fallbackImage.style.display = "block";
      });
  });

  // counter init

  const countElements = document.querySelectorAll(".count");

  const observerOptions = {
    threshold: 0.5,
  };

  const startCounting = (element) => {
    const targetValue = parseFloat(element.getAttribute("data-target"));

    if (isNaN(targetValue)) {
      console.error(
        `Error: data-target is not a number for element with ID: ${element.id}`
      );
      return;
    }

    const countUp = new CountUp(element.id, 0, targetValue);

    if (!countUp.error) {
      countUp.start();
    } else {
      console.error("CountUp error:", countUp.error);
    }
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounting(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  countElements.forEach((element) => {
    observer.observe(element);
  });

  // swiper init

  new Swiper(".swiper-container", {
    loop: false,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    slidesPerView: "auto",
    spaceBetween: 24,
    centeredSlides: false,
    initialSlide: 0,
    breakpoints: {
      768: {
        spaceBetween: 24,
      },
      1024: {
        spaceBetween: 24,
      },
    },
  });

  // section entrance animation init

  const sections = document.querySelectorAll(".should-animate-entrance"); // Select all sections
  console.log(sections);
  const sectionObserverOptions = {
    threshold: 0.1,
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("should-animate-entrance--visible");
        observer.unobserve(entry.target);
      }
    });
  }, sectionObserverOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
