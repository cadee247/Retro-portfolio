import React from 'react';
import '../css/contact.css';

export function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Let’s Connect</h2>
      <p>
        Whether you’ve got a bug to squash, a brand to build, or just want to talk pixel aesthetics—I’m all ears.
      </p>

      <form className="contact-form">
        <input type="text" name="name" placeholder="Your name" required />
        <input type="email" name="email" placeholder="Your email" required />
        <textarea name="message" placeholder="Your message" rows="5" required />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}
export default Contact;