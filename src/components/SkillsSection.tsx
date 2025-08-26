import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SkillsScene3D from "./SkillsScene3D";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React / React Native", level: 95 },
        { name: "Three.js / WebGL", level: 88 },
        { name: "TypeScript", level: 90 },
        { name: "HTML/CSS", level: 95 },
      ]
    },
    {
      title: "Backend Development", 
      skills: [
        { name: "Node.js", level: 85 },
        { name: "PHP", level: 90 },
        { name: "WordPress", level: 88 },
        { name: "Database Design", level: 82 },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git & GitHub", level: 92 },
        { name: "Problem Solving", level: 95 },
        { name: "UX/UI Design", level: 78 },
        { name: "Team Leadership", level: 80 },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            My <span className="text-primary glow-text">Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive set of technical skills developed through years of experience
            in web development, 3D graphics, and system design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="glass-effect border-border/50 p-4 h-[500px]">
              <CardContent className="h-full">
                <h3 className="text-xl font-semibold text-center mb-4 text-accent glow-accent">
                  Interactive Skills Map
                </h3>
                <div className="h-[420px] rounded-lg overflow-hidden">
                  <SkillsScene3D />
                </div>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Click and drag to explore • Hover over skills for details
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Progress Bars */}
          <div className="space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 + categoryIndex * 0.1 }}
              >
                <Card className="glass-effect border-border/50 p-6">
                  <CardContent>
                    <h3 className="text-xl font-semibold mb-6 text-primary glow-text">
                      {category.title}
                    </h3>
                    
                    <div className="space-y-6">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.5 + categoryIndex * 0.1 + skillIndex * 0.1 
                          }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-foreground">
                              {skill.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {skill.level}%
                            </span>
                          </div>
                          
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: "100%" } : {}}
                            transition={{ 
                              duration: 1, 
                              delay: 0.7 + categoryIndex * 0.1 + skillIndex * 0.1 
                            }}
                            className="w-full bg-muted/30 rounded-full h-2 overflow-hidden"
                          >
                            <motion.div
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${skill.level}%` } : {}}
                              transition={{ 
                                duration: 1.2, 
                                delay: 0.8 + categoryIndex * 0.1 + skillIndex * 0.1,
                                ease: "easeOut"
                              }}
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative overflow-hidden"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 animate-pulse" />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;