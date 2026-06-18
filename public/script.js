const glow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  statusText.textContent = "Sending...";

  try {
    const response = await fetch("/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      statusText.textContent = "Message sent successfully.";
      form.reset();
    } else {
      statusText.textContent = "Something went wrong. Try again.";
    }
  } catch (error) {
    statusText.textContent = "Server error. Please try later.";
  }
});