const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-btn");
const prevBtns = document.querySelectorAll(".prev-btn");
let currentStep = 0;

const steps2 = document.querySelectorAll(".progress-bar");

function updateProgressBar() {
  steps2.forEach((step, index) => {
    const circle = step.querySelector(".rounded-full");
    const line = step.querySelector(".progress");

    if (index <= currentStep) {
      circle.classList.add("bg-primary", "text-tertiary-100");
      circle.classList.remove("bg-tertiary-300", "text-tertiary-600");

      if (line) {
        line.classList.add("bg-primary");
        line.classList.remove("bg-tertiary-300");
      }
    } else {
      circle.classList.add("bg-tertiary-300", "text-tertiary-600");
      circle.classList.remove("bg-primary", "text-tertiary-100");

      if (line) {
        line.classList.add("bg-tertiary-300");
        line.classList.remove("bg-primary");
      }
    }
  });
}

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("hidden", i !== index);
    step.classList.toggle("active", i === index);
  });
  updateProgressBar();
}

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  });
});
showStep(currentStep);