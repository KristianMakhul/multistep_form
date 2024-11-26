const form = document.querySelector(".form");
const steps = document.querySelectorAll(".step");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const submitButton = document.querySelector(".submit-btn");
const progressBar = document.querySelectorAll(".progress-bar");

let currentStep = 0;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  submitButton.textContent = "Submitting...";
  submitButton.classList.add("cursor-not-allowed");
  prevBtn.disabled = true;
  prevBtn.classList.add("cursor-not-allowed");

  setTimeout(() => {
    alert("Form was submitted successfully");
    location.reload();
  }, 3000);
});

function updateProgressBar() {
  progressBar.forEach((step, index) => {
    if (index <= currentStep) {
      step.classList.add("active");
    } else {
      step.classList.remove("active");
    }
  });
}

function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("hidden", i !== index);
  });

  prevBtn.classList.toggle("invisible", currentStep === 0);
  nextBtn.classList.toggle("invisible", currentStep === 3);

  updateProgressBar();
}

const isValidStep = () => {
  const fields = steps[currentStep].querySelectorAll("input");

  const radioArray = [...fields].filter((field) => field.type === "radio");

  if (radioArray.length > 0) {
    const groupRadios = [...new Set(radioArray.map((radio) => radio.name))];

    const isValid = groupRadios.every((elem) => {
      const groupChecked = steps[currentStep].querySelector(
        `input[name="${elem}"]:checked`,
      );
      return Boolean(groupChecked);
    });

    if (!isValid) {
      alert("Please select one option.");
      return false;
    }
  }

  return [...fields].every((field) => field.reportValidity());
};

nextBtn.addEventListener("click", () => {
  if (!isValidStep()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});
showStep(currentStep);