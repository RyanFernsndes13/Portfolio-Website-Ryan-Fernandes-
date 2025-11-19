document.addEventListener('DOMContentLoaded', function() {
  console.log('main.js loaded');

  // Image fallback logic
  var fallback = 'ryan-2.png';
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      if (img.dataset._failed) return;
      console.warn('Image failed to load, replacing with fallback:', img.src);
      img.dataset._failed = '1';
      img.src = fallback;
    });
    img.addEventListener('load', function () {
      if (!img.dataset._failed) console.log('Image loaded:', img.src);
    });
  });

  // EmailJS integration
  try {
    if (typeof emailjs !== 'undefined') {
      // Initialize EmailJS with your public key (replace with your actual public key)
      emailjs.init('E2A_gnfSaPzGx7LDx');
      console.log('EmailJS initialized');

      var contactForm = document.getElementById('contactForm');
      if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          console.log('Form submitted, sending email...');

          emailjs.sendForm('service_8n9cl7g', 'template_qhs0ioc', this)
            .then(() => {
              document.getElementById('statusMsg').innerHTML = 'Message sent successfully!';
              console.log('Email sent successfully');
              this.reset();
            }, (error) => {
              document.getElementById('statusMsg').innerHTML = 'Failed to send message!';
              console.error('EmailJS error:', error);
            });
        });
      } else {
        console.warn('Contact form with id "contactForm" not found');
      }
    } else {
      console.warn('EmailJS SDK not loaded');
    }
  } catch (ex) {
    console.error('Error in EmailJS setup:', ex);
  }
});