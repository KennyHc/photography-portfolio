import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, X } from 'lucide-react';

// --- Sub-component: The Snackbar Notification ---
function Snackbar({ message, isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 bg-white text-black rounded-sm shadow-2xl"
        >
          <CheckCircle size={20} className="text-green-600" />
          <span className="font-medium">{message}</span>
          <button onClick={onClose} className="ml-4 text-gray-400 hover:text-black">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- Main Component: Contact Form ---
export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSnackbar(true);
      setFormState({ name: '', email: '', message: '' }); // Reset form

      // Auto-hide snackbar after 4 seconds
      setTimeout(() => setShowSnackbar(false), 4000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const inputClasses = "w-full bg-surface border border-white/10 p-4 text-white focus:outline-none focus:border-white/40 transition-colors rounded-sm placeholder:text-gray-600";

  return (
    <section className="py-32 px-6 bg-background border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16">
        
        {/* Left Column: Text */}
        <div>
          <h2 className="text-4xl font-light text-white mb-6">Let's create together.</h2>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Open for commissions and collaborations. <br />
            Based in New York, available worldwide.
          </p>
          <div className="space-y-2 text-gray-500 text-sm">
            <p>MAIL: hello@lumos.studio</p>
            <p>TEL: +1 (555) 000-0000</p>
          </div>
        </div>

        {/* Right Column: Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={formState.name}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formState.email}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>
          <div>
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              required
              value={formState.message}
              onChange={handleChange}
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
            <Send size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>

      {/* Snackbar Notification attached here */}
      <Snackbar 
        isVisible={showSnackbar} 
        message="Message sent successfully." 
        onClose={() => setShowSnackbar(false)} 
      />
    </section>
  );
}