import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import EnhancedScene3D from "./EnhancedScene3D";
import MagneticButton from "./MagneticButton";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const contactInfo = [
    {
      label: "Location",
      value: "Giza, Egypt",
      icon: "📍"
    },
    {
      label: "Email",
      value: "boodyabozena@gmail.com",
      icon: "✉️",
      link: "mailto:boodyabozena@gmail.com"
    },
    {
      label: "Phone",
      value: "01101489531",
      icon: "📱",
      link: "tel:01101489531"
    },
    {
      label: "Languages",
      value: "English, Chinese, Arabic",
      icon: "🌐"
    }
  ];

  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/abdelrahman",
      icon: "⚡"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/abdelrahman",
      icon: "💼"
    },
    {
      name: "Portfolio",
      url: "#",
      icon: "🎨"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Simulate form submission
    toast.success("Message sent successfully! I'll get back to you soon.");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Enhanced Background 3D Scene */}
      <div className="absolute inset-0 opacity-30">
        <EnhancedScene3D cameraPosition={[0, 0, 8]} showElements={false} intensity={0.8} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's <span className="glow-primary animate-text-shimmer bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-300%">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Let's discuss how we can work together 
            to create something <span className="text-accent glow-accent animate-pulse">amazing</span>.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="floating"
          >
            <Card className="glass-rainbow border-primary/30 p-8 neon-border hover:shadow-rainbow transition-all duration-300">
              <CardContent>
                <h3 className="text-2xl font-bold glow-accent mb-6 animate-rainbow-pulse">
                  Send Me a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="magnetic-element bg-muted/30 border-primary/20 focus:border-accent hover:border-secondary transition-all duration-300"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Email *
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="magnetic-element bg-muted/30 border-primary/20 focus:border-accent hover:border-secondary transition-all duration-300"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Project discussion, collaboration, etc."
                      className="magnetic-element bg-muted/30 border-primary/20 focus:border-accent hover:border-secondary transition-all duration-300"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project or idea..."
                      className="magnetic-element bg-muted/30 border-primary/20 focus:border-accent hover:border-secondary min-h-[120px] transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <MagneticButton 
                    onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
                    variant="primary"
                    className="w-full py-4 text-lg"
                  >
                    Send Message ✨
                  </MagneticButton>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="floating-slow"
            >
              <Card className="glass-rainbow border-secondary/30 p-8 neon-border hover:shadow-rainbow transition-all duration-300">
                <CardContent>
                  <h3 className="text-2xl font-bold glow-primary mb-6 animate-glow-pulse">
                    Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    {contactInfo.map((info, index) => (
                      <motion.div
                        key={info.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className="flex items-center space-x-4 p-4 rounded-lg glass-effect border border-accent/20 hover:border-primary/50 magnetic-element hover:animate-wiggle transition-all duration-300"
                      >
                        <span className="text-2xl">{info.icon}</span>
                        <div>
                          <p className="text-sm text-muted-foreground">{info.label}</p>
                          {info.link ? (
                            <a 
                              href={info.link}
                              className="font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="font-medium text-foreground">{info.value}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Card className="glass-effect border-border/50 p-8">
                <CardContent>
                  <h3 className="text-2xl font-bold text-accent glow-accent mb-6">
                    Connect Online
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {socialLinks.map((link, index) => (
                      <motion.a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                        className="flex flex-col items-center p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all group"
                      >
                        <span className="text-2xl mb-2 group-hover:animate-bounce">
                          {link.icon}
                        </span>
                        <span className="text-sm font-medium text-foreground group-hover:text-primary">
                          {link.name}
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-center text-sm text-primary">
                      <strong>Open to opportunities!</strong><br />
                      Freelance projects, full-time positions, and collaborations welcome.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;