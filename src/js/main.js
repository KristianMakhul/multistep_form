const steps = document.querySelectorAll(".step");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
let currentStep = 0;

const progressBar = document.querySelectorAll(".progress-bar");

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

  if (currentStep === 0) {
    prevBtn.classList.add("invisible");
  } else {
    prevBtn.classList.remove("invisible");
  }
  
  if (currentStep === 3) {
    nextBtn.classList.add("invisible");
  } else {
    nextBtn.classList.remove("invisible");
  }
  
  updateProgressBar();
}

nextBtn.addEventListener("click", () => {
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