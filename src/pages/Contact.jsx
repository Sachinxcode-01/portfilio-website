import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import { SOCIAL_LINKS } from '../constants/socialLinks';

import "../CSS/Contact.css"
import '../index.css' 

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Per-field validation
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.contact.trim()) {
      newErrors.contact = "Email or phone is required.";
    } else {
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      const phonePattern = /^[+]?[\d\s\-]{10,}$/;
      const isEmail = emailPattern.test(form.contact);
      const isPhone = phonePattern.test(form.contact);
      if (!isEmail && !isPhone) {
        newErrors.contact = "Please enter a valid email or phone number.";
      }
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setStatus("");
      return;
    }

    setErrors({});
    setStatus("Sending...");
    setSending(true);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          contact_info: form.contact,
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setStatus("✅ Message sent successfully!");
          setForm({ name: "", contact: "", subject: "", message: "" });
          setSending(false);
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus("❌ Failed to send. Try again later.");
          setSending(false);
        }
      );
  };

  const quickLinks = SOCIAL_LINKS;

  return (
    <section className="contact-section">
      <motion.h1
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="contact-title"
      >
        Let’s Connect & Collaborate 🤝
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="contact-subtitle"
      >
        Whether it’s a new project, a collaboration, or just to say hi — I’d love to hear from you!
      </motion.p>

      {/* Quick Links */}
      <motion.div className="contact-links">
        {quickLinks.map((item, i) => (
          <motion.a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-item"
            whileHover={{ scale: 1.1, y: -4 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <motion.img
              src={item.img}
              alt={item.title}
              className="social-icon"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + i * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <span className="social-link-label">{item.title}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="contact-form"
      >
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required aria-label="Your name" />
        {errors.name && <span className="field-error">{errors.name}</span>}
        <input type="text" name="contact" placeholder="Your Email or Phone" value={form.contact} onChange={handleChange} required aria-label="Your email or phone number" />
        {errors.contact && <span className="field-error">{errors.contact}</span>}
        <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required aria-label="Subject" />
        {errors.subject && <span className="field-error">{errors.subject}</span>}
        <textarea name="message" placeholder="Your Message..." value={form.message} onChange={handleChange} rows="5" required aria-label="Your message" />
        {errors.message && <span className="field-error">{errors.message}</span>}
        <motion.button type="submit" className="contact-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={sending}>
          🚀 Send Message
        </motion.button>

        {status && <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="contact-status">{status}</motion.p>}
      </motion.form>
    </section>
  );
}
