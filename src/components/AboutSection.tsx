import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    "React JS", "Node.js", "Three.js", "TypeScript", "PHP", 
    "WordPress", "Git & GitHub", "Problem Solving", "UX Design"
  ];

  const languages = [
    { name: "English", level: "Fluent" },
    { name: "Chinese", level: "Conversational" },
    { name: "Arabic", level: "Native" }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
          <motion.div
            ref={ref}
            className="text-center mb-16"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.8,
                  staggerChildren: 0.2
                }
              }
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h2 
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 }
              }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              About <span className="glow-primary animate-text-shimmer bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-300% animate-text-shimmer">Me</span>
            </motion.h2>
            <motion.p 
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
            >
              I'm a passionate web developer from <span className="text-accent glow-accent">Giza, Egypt</span>, with expertise in creating 
              advanced web applications and immersive <span className="text-secondary glow-secondary">3D experiences</span>. My journey spans from 
              backend development with PHP to cutting-edge frontend technologies.
            </motion.p>
          </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="floating-slow"
          >
            <Card className="glass-rainbow border-primary/30 p-8 neon-border hover:shadow-rainbow transition-all duration-300">
              <CardContent className="space-y-6">
                <h3 className="text-2xl font-semibold glow-accent mb-4 animate-rainbow-pulse">
                  My Journey
                </h3>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Started my journey at <strong className="text-foreground">Egensolve</strong>, 
                    where I built secure PHP backends and custom WordPress solutions, 
                    developing a strong foundation in server-side development.
                  </p>
                  
                  <p>
                    Transitioned to <strong className="text-foreground">CrossOver</strong> as a 
                    React Native/JS Developer, where I developed mobile and web applications 
                    using the React ecosystem, expanding my frontend expertise.
                  </p>
                  
                  <p>
                    As an <strong className="text-foreground">Open Source Contributor</strong>, 
                    I've contributed to 15+ large GitHub projects, collaborating with 
                    global developers and learning cutting-edge practices.
                  </p>
                  
                  <p>
                    Currently focused on combining traditional web development with 
                    <strong className="text-primary"> Three.js and 3D technologies</strong> 
                    to create immersive digital experiences.
                  </p>
                </div>

                <div className="pt-4">
                  <h4 className="text-lg font-semibold text-accent mb-3">Education</h4>
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Egyptian Chinese University, Cairo</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Technical training and workshops in modern development practices
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Skills & Languages */}
          <div className="space-y-8">
            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="floating"
            >
              <Card className="glass-rainbow border-secondary/30 p-8 neon-border hover:shadow-rainbow transition-all duration-300">
                <CardContent>
                  <h3 className="text-2xl font-semibold glow-primary mb-6 animate-glow-pulse">
                    Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="px-4 py-2 text-sm font-medium glass-rainbow border border-primary/30 hover:border-accent/60 hover:animate-wiggle transition-all magnetic-element"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="floating-fast"
            >
              <Card className="glass-rainbow border-accent/30 p-8 neon-border hover:shadow-rainbow transition-all duration-300">
                <CardContent>
                  <h3 className="text-2xl font-semibold glow-accent mb-6 animate-rainbow-pulse">
                    Languages
                  </h3>
                  <div className="space-y-4">
                    {languages.map((language, index) => (
                      <motion.div
                        key={language.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="flex justify-between items-center p-4 rounded-lg glass-effect border border-primary/20 hover:border-accent/50 magnetic-element hover:animate-wiggle transition-all duration-300"
                      >
                        <span className="font-medium text-foreground">{language.name}</span>
                        <Badge variant="outline" className="border-primary/50 text-primary glow-primary animate-pulse">
                          {language.level}
                        </Badge>
                      </motion.div>
                    ))}
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

export default AboutSection;