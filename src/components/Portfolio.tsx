import { useEffect } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ExperienceSection from "./ExperienceSection";
import ContactSection from "./ContactSection";
import InteractiveCursor from "./InteractiveCursor";

const Portfolio = () => {
  useEffect(() => {
    // Add reveal animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    // Observe all elements with reveal-up class
    const elements = document.querySelectorAll(".reveal-up");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative">
      <InteractiveCursor />
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              © 2024 Abdelrahman Mohamed. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with React, Three.js, and Framer Motion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;