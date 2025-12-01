// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration is injected at build time via firebase-config.js
if (!window.firebaseConfig) {
    throw new Error("Missing Firebase configuration. Did you generate firebase-config.js?");
}

// Initialize Firebase
const app = initializeApp(window.firebaseConfig);
const db = getDatabase(app);

// Handle Form Submission
const form = document.getElementById('contactForm');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("Form submitted");

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const submitBtn = form.querySelector('button[type="submit"]');

        try {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            console.log("Preparing to save to database...");

            // Create a timeout promise
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Request timed out")), 10000)
            );

            // Reference to the contacts node in Realtime Database
            const contactsRef = ref(db, 'contacts');

            // Race the push against the timeout
            const newContactRef = await Promise.race([
                push(contactsRef, {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                }),
                timeout
            ]);

            console.log("Data saved with ID: ", newContactRef.key);
            alert("Message sent successfully!");
            form.reset();
        } catch (e) {
            console.error("Error saving data: ", e);
            alert("Error sending message: " + e.message);
        } finally {
            console.log("Resetting button state");
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        }
    });
}
