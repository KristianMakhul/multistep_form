const form = document.querySelector(".form");
const steps = document.querySelectorAll(".step");
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");
const submitButton = document.querySelector(".submit-btn");
const progressBar = document.querySelectorAll(".progress-bar");

let currentStep = 0;

const validationRules = {
  name: {
    required: true,
    maxlength: 15,
    message: "Name is required and must be less than 15 characters.",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Please enter a valid email address.(example@gmail.com)",
  },
  tel: {
    required: true,
    minlength: 6,
    maxlength: 12,
    pattern: /^[0-9]*$/,
    message: "Phone number must be between 6 and 12 digits.",
  },
  company: {
    required: true,
    maxlength: 15,
    message: "Company name is required and must be less than 15 characters.",
  },
};

const validateField = (field, rules) => {
  const value = field.value.trim();
  const { required, maxlength, minlength, pattern, message } = rules;

  if (required && !value) {
    alert(message);
    return false;
  }

  if (maxlength && value.length > maxlength) {
    alert(message);
    return false;
  }

  if (minlength && value.length < minlength) {
    alert(message);
    return false;
  }

  if (pattern && !pattern.test(value)) {
    alert(message);
    return false;
  }

  return true;
};

const validateRadioButtons = (fields) => {
  const radioArray = [...fields].filter((field) => field.type === "radio");

  if (radioArray.length > 0) {
    const groupNames = [...new Set(radioArray.map((radio) => radio.name))];

    const isValid = groupNames.every((name) => {
      const checkedRadio = steps[currentStep].querySelector(
        `input[name="${name}"]:checked`,
      );
      return Boolean(checkedRadio);
    });

    if (!isValid) {
      alert("Please select an option.");
      return false;
    }
  }

  return true;
};

const isValidStep = () => {
  const fields = steps[currentStep].querySelectorAll("input");

  for (const field of fields) {
    if (field.type !== "radio") {
      const rules = validationRules[field.id];
      if (!validateField(field, rules)) {
        return false;
      }
    }
  }

  return validateRadioButtons(fields);
};

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

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isValidStep()) return;

  submitButton.textContent = "Submitting...";
  submitButton.classList.add("cursor-not-allowed");
  prevBtn.disabled = true;
  prevBtn.classList.add("cursor-not-allowed");

  setTimeout(() => {
    alert("Form was submitted successfully");
    location.reload();
  }, 3000);
});

showStep(currentStep);