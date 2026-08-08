/* ─────────────────────────────────────────────────────────────
   SANATAN DHAM WEBSITE - JAVASCRIPT CONTROLLER
   Handles Navigation, FAQ Accordions, and Account Deletion Modal
   ───────────────────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons if loaded
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Sticky Navigation Scroll Effect
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (icon && navLinks.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
      } else if (icon) {
        icon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });

    // Close menu when clicking outside or link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // 3. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isActive = item.classList.contains('active');

      // Close all active items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 4. Account Deletion Request Handler
  const deleteForm = document.getElementById('accountDeleteForm');
  const deleteNotice = document.getElementById('deleteNotice');

  if (deleteForm) {
    deleteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('deleteEmail');
      const emailVal = emailInput ? emailInput.value.trim() : '';

      if (!emailVal) {
        alert('Please enter a valid registered phone number or email address.');
        return;
      }

      if (deleteNotice) {
        deleteNotice.style.display = 'block';
        deleteNotice.innerHTML = `
          <div style="padding: 16px; background: rgba(239, 68, 68, 0.15); border: 1px solid #EF4444; border-radius: 12px; color: #FCA5A5; text-align: left; margin-top: 20px;">
            <h4 style="color: #FFF; font-size: 1.05rem; margin-bottom: 6px;">📩 Account Deletion Request Submitted</h4>
            <p style="font-size: 0.9rem; margin-bottom: 0;">We have logged your deletion request for <strong>${emailVal}</strong>. A verification confirmation link will be dispatched to your registered email/SMS within 24 hours.</p>
          </div>
        `;
        deleteForm.reset();
      }
    });
  }
});
