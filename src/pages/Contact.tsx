import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Background from '@/components/ui/Background';
import CardDots from '@/components/ui/CardDots';
import useMobile from '@/hooks/use-mobile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGithub, 
  faLinkedin, 
  faTwitter, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faMapMarkerAlt, 
  faPhone,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {
  const { isMobile } = useMobile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  const socialLinks = [
    { icon: faGithub, url: "https://github.com/kunalpro379", label: "GitHub" },
    { icon: faLinkedin, url: "https://linkedin.com/in/kunalpatil", label: "LinkedIn" },
    { icon: faTwitter, url: "https://twitter.com/kunalpatil", label: "Twitter" },
    { icon: faInstagram, url: "https://instagram.com/kunal.patil", label: "Instagram" }
  ];

  const contactInfo = [
    { icon: faEnvelope, text: "kunal.patil@example.com", label: "Email" },
    { icon: faPhone, text: "+91 987-654-3210", label: "Phone" },
    { icon: faMapMarkerAlt, text: "Mumbai, India", label: "Location" }
  ];

  return (
    <div className="min-h-screen w-full p-3 md:p-6">
      <div className="fixed inset-0 z-0">
        <Background />
      </div>
      <div className="relative z-10">
        <div className="text-xl md:text-3xl font-semibold text-[#02d8fc] border-b-2 border-blue-900/30 pb-3 md:pb-4 mb-4 md:mb-6">
          Contact Me
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Contact Form */}
          <motion.div 
            className="cyber-card p-4 md:p-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CardDots />
            <div className="relative z-10">
              <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                <span className="text-xl">📝</span> Get in Touch
              </h2>
              
              {submitSuccess ? (
                <motion.div 
                  className="bg-green-900/30 text-green-400 p-4 rounded-md mb-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thank you for your message! I'll get back to you soon.
                </motion.div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-[#02d8fc] mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-blue-900/20 text-white border border-blue-900/50 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02d8fc]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-[#02d8fc] mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-blue-900/20 text-white border border-blue-900/50 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02d8fc]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-[#02d8fc] mb-1">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full bg-blue-900/20 text-white border border-blue-900/50 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02d8fc]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-[#02d8fc] mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-blue-900/20 text-white border border-blue-900/50 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02d8fc]"
                      required
                    />
                  </div>
                  
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#02d8fc] to-[#0066ff] text-white px-6 py-3 rounded-md font-medium hover:shadow-lg hover:shadow-[#02d8fc]/20 transition-all duration-300 w-full md:w-auto disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          /> 
                          Processing...
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <div className="space-y-4 md:space-y-6">
            {/* Contact Info */}
            <motion.div 
              className="cyber-card p-4 md:p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <CardDots />
              <div className="relative z-10">
                <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-xl">📞</span> Contact Information
                </h2>
                
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-blue-900/30 rounded-full">
                        <FontAwesomeIcon icon={item.icon} className="text-[#02d8fc]" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">{item.label}</div>
                        <div className="text-blue-300">{item.text}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              className="cyber-card p-4 md:p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CardDots />
              <div className="relative z-10">
                <h2 className="text-[#02d8fc] text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-xl">🔗</span> Find Me Online
                </h2>
                
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center gap-2 bg-blue-900/30 p-4 rounded-lg hover:bg-blue-900/50 transition-colors"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      whileHover={{ y: -5, scale: 1.05 }}
                    >
                      <FontAwesomeIcon icon={social.icon} size="2x" className="text-[#02d8fc]" />
                      <span className="text-blue-300 text-sm">{social.label}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Response Time */}
            <motion.div 
              className="cyber-card p-4 md:p-8 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <CardDots />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                  <div className="text-blue-300">Usually responds within 24 hours</div>
                </div>
                <div className="text-gray-400 text-sm">
                  I'm always open to new opportunities, collaborations, or just a friendly chat. Feel free to reach out!
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;