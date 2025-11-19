// main.js — small helper for site-wide behaviour
// - logs that the script loaded
// - adds an image error handler to replace broken images with a fallback

document.addEventListener('DOMContentLoaded', function () {
  console.log('main.js loaded');

  // Choose a local fallback image that exists in the project
  var fallback = 'ryan-2.png';

  document.querySelectorAll('img').forEach(function (img) {
    // If image fails to load, replace with fallback and mark for debugging
    img.addEventListener('error', function () {
      if (img.dataset._failed) return; // avoid infinite loop
      console.warn('Image failed to load, replacing with fallback:', img.src);
      img.dataset._failed = '1';
      img.src = fallback;
    });

    // Optionally log successful loads for debugging
    img.addEventListener('load', function () {
      // Only log if the image wasn't the fallback
      if (!img.dataset._failed) console.log('Image loaded:', img.src);
    });
  });

  // -------------------------------
  // EmailJS integration (contact form)
  // Replace the placeholder strings below with your real EmailJS IDs:
  // - emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
  // - serviceID: 'YOUR_SERVICE_ID'
  // - templateID: 'YOUR_TEMPLATE_ID'
  // See https://www.emailjs.com/docs/ for details.
  // -------------------------------

  try {
    if (typeof emailjs !== 'undefined' && emailjs.init) {
      // Initialize EmailJS - replace with your public key
      emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

      var contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
          e.preventDefault();

          // Replace with your EmailJS service and template IDs
          var serviceID = 'YOUR_SERVICE_ID';
          var templateID = 'YOUR_TEMPLATE_ID';

          // sendForm accepts either the form element or the form selector
          emailjs.sendForm(service_8n9cl7g, template_qhs0ioc, this)
            .then(function () {
              // Success — give the user feedback
              alert('Message sent — thank you!');
              contactForm.reset();
            }, function (err) {
              // Failure — show error and log details
              alert('Failed to send message. Check console for details.');
              console.error('EmailJS error:', err);
            });
        });
      }
    } else {
      console.warn('EmailJS SDK not found; contact form email sending is disabled.');
    }
  } catch (ex) {
    console.error('Error initializing EmailJS integration:', ex);
  }
});
