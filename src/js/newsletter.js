document.getElementById("newsletter-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  const email = document.getElementById("email").value;

  if (email) {
    // Simulate saving the email (e.g., send it to a server or save it locally)
    console.log(`Newsletter subscription: ${email}`);

    // Show a success message
    const message = document.getElementById("newsletter-message");
    message.classList.remove("hide");

    // Clear the input field
    document.getElementById("email").value = "";
  }
});