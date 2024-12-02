class MultiStepForm {
  constructor(formSelector, currentStep) {
    this.form = document.querySelector(formSelector);
    this.steps = document.querySelectorAll(".step");
    this.nextBtn = document.querySelector(".next-btn");
    this.prevBtn = document.querySelector(".prev-btn");
    this.submitButton = document.querySelector(".submit-btn");
    this.progressBar = document.querySelectorAll(".progress-bar");
    this.currentStep = currentStep;

    this.validationRules = {
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
        message:
          "Company name is required and must be less than 15 characters.",
      },
    };

    this.init(this.currentStep);
  }

  init(curStep) {
    this.showStep(curStep);
    this.nextBtn.addEventListener("click", this.handleNext.bind(this));
    this.prevBtn.addEventListener("click", this.handlePrev.bind(this));
    this.form.addEventListener("submit", this.handleSubmit.bind(this));
  }

  validateField(field, rules) {
    const value = field.value.trim();
    const { required, maxlength, minlength, pattern, message } = rules;

    const hasError = [
      required && !value,
      maxlength && value.length > maxlength,
      minlength && value.length < minlength,
      pattern && !pattern.test(value),
    ].includes(true);
    hasError && alert(message);
    return !hasError;
  }

  validateRadioButtons(fields) {
    const radioArray = [...fields].filter((field) => field.type === "radio");

    if (radioArray.length > 0) {
      const [groupName] = [...new Set(radioArray.map((radio) => radio.name))];

      const checkedRadio = this.steps[this.currentStep].querySelector(
        `input[name="${groupName}"]:checked`,
      );

      if (!checkedRadio) {
        alert("Please select an option.");
        return false;
      }
    }

    return true;
  }

  isValidStep() {
    const fields = this.steps[this.currentStep].querySelectorAll("input");

    for (const field of fields) {
      if (field.type !== "radio") {
        const rules = this.validationRules[field.id];
        if (!this.validateField(field, rules)) {
          return false;
        }
      }
    }

    return this.validateRadioButtons(fields);
  }

  updateProgressBar() {
    this.progressBar.forEach((step, index) => {
      step.classList.toggle("active", index <= this.currentStep);
    });
  }

  showStep(index) {
    this.steps.forEach((step, i) => {
      step.classList.toggle("hidden", i !== index);
    });

    this.prevBtn.classList.toggle("invisible", this.currentStep === 0);
    this.nextBtn.classList.toggle("invisible", this.currentStep === 3);

    this.updateProgressBar();
  }

  handleNext() {
    if (!this.isValidStep()) return;

    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.showStep(this.currentStep);
    }
  }

  handlePrev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.showStep(this.currentStep);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.isValidStep()) return;

    this.submitButton.textContent = "Submitting...";
    this.submitButton.classList.add("cursor-not-allowed");
    this.prevBtn.disabled = true;
    this.prevBtn.classList.add("cursor-not-allowed");

    setTimeout(() => {
      alert("Form was submitted successfully");
      location.reload();
    }, 3000);
  }
}

new MultiStepForm(".form", 0);
