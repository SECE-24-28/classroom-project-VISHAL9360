
// Email Validation
function validateEmail(email) {
    return /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(email);
}

// Mobile Number Validation
function validateMobile(number) {
    return /^[0-9]{10}$/.test(number);
}

// Show error message
function showError(id, message) {
    document.getElementById(id).innerText = message;
}

// Clear error
function clearError(id) {
    document.getElementById(id).innerText = "";
}

// Login Validation
function validateLogin(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPass").value;

    let valid = true;

    if (!validateEmail(email)) {
        showError("loginEmailError", "Invalid email format");
        valid = false;
    } else {
        clearError("loginEmailError");
    }

    if (pass.length < 4) {
        showError("loginPassError", "Password must be at least 4 characters");
        valid = false;
    } else {
        clearError("loginPassError");
    }

    if (valid) {
        window.location.href = "dashboard.html";
    }
}

// Signup Validation
function validateSignup(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const pass = document.getElementById("signupPass").value;

    let valid = true;

    if (name.length < 3) {
        showError("signupNameError", "Name must be at least 3 characters");
        valid = false;
    } else clearError("signupNameError");

    if (!validateEmail(email)) {
        showError("signupEmailError", "Invalid email");
        valid = false;
    } else clearError("signupEmailError");

    if (pass.length < 4) {
        showError("signupPassError", "Password must be at least 4 characters");
        valid = false;
    } else clearError("signupPassError");

    if (valid) window.location.href = "dashboard.html";
}

// Recharge page dynamic summary
function updateRechargeSummary() {
    const mobile = document.getElementById("mobileNum").value;
    const operator = document.getElementById("operator").value;
    const amount = document.getElementById("amount").value;

    let summary = "";

    if (validateMobile(mobile)) {
        summary += "Mobile: " + mobile + "<br>";
    }
    if (operator.length > 0) {
        summary += "Operator: " + operator + "<br>";
    }
    if (amount > 0) {
        summary += "Recharge Amount: ₹" + amount;
    }

    document.getElementById("summaryBox").innerHTML = summary;
}

// Recharge Validation
function validateRecharge(event) {
    event.preventDefault();

    const mobile = document.getElementById("mobileNum").value;

    if (!validateMobile(mobile)) {
        showError("mobileError", "Enter a valid 10-digit mobile number");
        return;
    } else clearError("mobileError");

    alert("Recharge Successful!");
}
