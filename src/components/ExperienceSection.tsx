import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Web Developer",
      company: "Egensolve",
      type: "PHP & WordPress Developer",
      period: "2020 - 2022",
      description: "Built secure PHP backends and custom WordPress solutions for various client projects.",
      achievements: [
        "Developed custom WordPress plugins and themes",
        "Implemented secure authentication systems",
        "Optimized database performance and queries",
        "Created RESTful APIs for client applications"
      ],
      technologies: ["PHP", "WordPress", "MySQL", "JavaScript", "CSS"]
    },
    {
      title: "React Native/JS Developer",
      company: "CrossOver (Remote)",
      type: "Mobile & Web Development",
      period: "2022 - 2023",
      description: "Developed mobile and web applications using React ecosystem for international clients.",
      achievements: [
        "Built responsive mobile apps for iOS and Android",
        "Implemented real-time features with WebSocket",
        "Collaborated with global development teams",
        "Maintained 95%+ code coverage with unit tests"
      ],
      technologies: ["React Native", "React.js", "TypeScript", "Redux", "Firebase"]
    },
    {
      title: "Open Source Contributor",
      company: "Various Projects",
      type: "Community Contributions",
      period: "2021 - Present",
      description: "Contributed to 15+ large GitHub projects, focusing on React, PHP, and JavaScript libraries.",
      achievements: [
        "Contributed to popular open-source libraries",
        "Reviewed and merged pull requests",
        "Mentored new contributors",
        "Maintained project documentation"
      ],
      technologies: ["React", "PHP", "JavaScript", "Git", "Documentation"]
    },
    {
      title: "Technical Trainer",
      company: "Egyptian Chinese University",
      type: "Education & Workshops",
      period: "2023 - Present",
      description: "Teaching data structures, development skills, and conducting Git/GitHub workshops for students.",
      achievements: [
        "Taught data structures to 200+ students",
        "Conducted Git/GitHub workshops",
        "Developed curriculum for web development",
        "Mentored students in competitive programming"
      ],
      technologies: ["C++", "Git", "GitHub", "Data Structures", "Teaching"]
    }
  ];

  const education = [
    {
      institution: "Egyptian Chinese University",
      location: "Cairo, Egypt",
      degree: "Computer Science Studies",
      period: "2019 - 2023"
    }
  ];

  const courses = [
    { name: "C++ Programming", provider: "Adel Nasim" },
    { name: "HTML & CSS Fundamentals", provider: "Elzero Web School" },
    { name: "PHP Laravel Framework", provider: "PHP Anonymos" },
    { name: "Artificial Intelligence", provider: "Orange Digital Center Egypt" }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Professional <span className="text-primary glow-text">Experience</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A journey through diverse roles in web development, from backend systems 
            to mobile applications and open-source contributions.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8 mb-20">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
            >
              <Card className="glass-effect border-border/50 p-8 relative overflow-hidden">
                {/* Timeline connector */}
                {index < experiences.length - 1 && (
                  <div className="absolute left-4 top-full w-0.5 h-8 bg-gradient-to-b from-primary to-transparent" />
                )}
                
                {/* Timeline dot */}
                <div className="absolute left-2 top-8 w-3 h-3 bg-primary rounded-full animate-glow-pulse" />
                
                <CardContent className="ml-8">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{experience.title}</h3>
                      <p className="text-lg text-primary glow-text font-medium">{experience.company}</p>
                      <p className="text-sm text-accent">{experience.type}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/50 text-primary self-start">
                      {experience.period}
                    </Badge>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {experience.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-semibold text-accent mb-3">Key Achievements</h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, achievementIndex) => (
                          <motion.li
                            key={achievementIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ 
                              duration: 0.5, 
                              delay: 0.5 + index * 0.1 + achievementIndex * 0.1 
                            }}
                            className="flex items-start space-x-3 text-muted-foreground"
                          >
                            <span className="text-primary mt-1.5 text-xs">▸</span>
                            <span>{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-accent mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.7 + index * 0.1 + techIndex * 0.05 
                            }}
                          >
                            <Badge 
                              variant="secondary" 
                              className="bg-secondary/50 border border-primary/20 hover:border-primary/50 transition-all"
                            >
                              {tech}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Education & Courses */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="glass-effect border-border/50 p-8">
              <CardContent>
                <h3 className="text-2xl font-bold text-primary glow-text mb-6">Education</h3>
                {education.map((edu, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="text-xl font-semibold text-foreground">{edu.institution}</h4>
                    <p className="text-accent">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                    <Badge variant="outline" className="border-primary/50 text-primary">
                      {edu.period}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Courses */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <Card className="glass-effect border-border/50 p-8">
              <CardContent>
                <h3 className="text-2xl font-bold text-accent glow-accent mb-6">Certifications & Courses</h3>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 1.1 + index * 0.1 }}
                      className="p-4 rounded-lg bg-muted/30 border border-border/30"
                    >
                      <h4 className="font-semibold text-foreground">{course.name}</h4>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;