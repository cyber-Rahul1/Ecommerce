document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.email.value;
    const password = this.password.value;

    // Simulate authentication (replace with real authentication logic)
    if (email === "admin@example.com" && password === "password") {
        alert("Login successful!");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid credentials. Please try again.");
    }
}); 