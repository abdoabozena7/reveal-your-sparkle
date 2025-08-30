import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import FloatingCards3D from "./FloatingCards3D";
import InspiredShowcase3D from "./InspiredShowcase3D";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const skillsData = [
    {
      id: "frontend",
      title: "Frontend Development",
      description: "React, TypeScript, Next.js, Tailwind CSS",
      color: "#00ff88",
      icon: "🌐"
    },
    {
      id: "3d",
      title: "3D Development",
      description: "Three.js, React Three Fiber, Blender",
      color: "#44ff99",
      icon: "🎨"
    },
    {
      id: "design",
      title: "UI/UX Design", 
      description: "Figma, Adobe Creative Suite, Prototyping",
      color: "#66ffaa",
      icon: "✨"
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Node.js, Python, Database Design",
      color: "#88ffdd",
      icon: "🗄️"
    },
    {
      id: "mobile",
      title: "Mobile Development",
      description: "React Native, Flutter, iOS & Android",
      color: "#aaffbb",
      icon: "📱"
    }
  ];

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
      {/* 3D Skills Background */}
      <div className="absolute inset-0 opacity-20">
        <FloatingCards3D showCards={true} intensity={0.4} />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-nature">
            My <span className="text-primary">Technical Universe</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A comprehensive set of technical skills developed through years of experience
            in web development, 3D graphics, and system design.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Interactive 3D Showcase */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <Card className="glass-rainbow border-primary/30 p-4 h-[500px] neon-border">
              <CardContent className="h-full">
                <h3 className="text-xl font-semibold text-center mb-4 glow-nature">
                  Nature-Inspired Skills Universe
                </h3>
                <div className="h-[420px] rounded-lg overflow-hidden">
                  <InspiredShowcase3D 
                    items={skillsData}
                    selectedId={selectedSkill}
                    onSelect={setSelectedSkill}
                  />
                </div>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Click on any floating card to explore skills • Drag to rotate view
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Selected Skill Details */}
          <div className="space-y-6">
            {/* Skill selection prompt or details */}
            {!selectedSkill ? (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="glass-effect border-border/50 p-8 text-center">
                  <CardContent>
                    <h3 className="text-2xl font-bold mb-4 glow-secondary">
                      Explore My Technical Universe
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Click on any floating 3D card to dive deep into my expertise areas and see detailed skill breakdowns.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {skillsData.map((skill, index) => (
                        <motion.button
                          key={skill.id}
                          onClick={() => setSelectedSkill(skill.id)}
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="glass-rainbow p-4 rounded-lg hover:scale-105 transition-transform duration-300 neon-border"
                          style={{ borderColor: skill.color }}
                        >
                          <div className="text-2xl mb-2">
                            {skill.id === 'frontend' && '⚛️'}
                            {skill.id === '3d' && '🌐'}
                            {skill.id === 'design' && '🎨'}
                            {skill.id === 'backend' && '🗄️'}
                            {skill.id === 'mobile' && '📱'}
                          </div>
                          <p className="text-sm font-medium">{skill.title}</p>
                        </motion.button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key={selectedSkill}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {(() => {
                  const skill = skillsData.find(s => s.id === selectedSkill);
                  if (!skill) return null;
                  return (
                    <>
                      <Card className="glass-rainbow border-primary/30 p-8 neon-border">
                        <CardContent>
                          <div className="flex items-center justify-between mb-6">
                            <h3 className="text-3xl font-bold glow-primary">
                              {skill.title}
                            </h3>
                            <button
                              onClick={() => setSelectedSkill("")}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-lg text-muted-foreground mb-8">
                            {skill.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Skill-specific details */}
                            {selectedSkill === 'frontend' && (
                              <>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">⚛️</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-secondary">React Ecosystem</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• Advanced hooks & context patterns</li>
                                    <li>• Performance optimization</li>
                                    <li>• Server-side rendering (Next.js)</li>
                                    <li>• State management (Redux, Zustand)</li>
                                  </ul>
                                </div>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">🎨</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-accent">Modern Styling</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• Tailwind CSS mastery</li>
                                    <li>• CSS Grid & Flexbox</li>
                                    <li>• Advanced animations</li>
                                    <li>• Responsive design patterns</li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {selectedSkill === '3d' && (
                              <>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">🌐</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-secondary">Three.js Mastery</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• WebGL & shader programming</li>
                                    <li>• Physics simulations</li>
                                    <li>• Advanced lighting techniques</li>
                                    <li>• Performance optimization</li>
                                  </ul>
                                </div>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">🔧</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-accent">3D Pipeline</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• Blender modeling & texturing</li>
                                    <li>• GLTF optimization</li>
                                    <li>• React Three Fiber</li>
                                    <li>• Interactive experiences</li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {selectedSkill === 'design' && (
                              <>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">🎯</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-secondary">User Experience</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• User research & personas</li>
                                    <li>• Wireframing & prototyping</li>
                                    <li>• Usability testing</li>
                                    <li>• Information architecture</li>
                                  </ul>
                                </div>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">✨</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-accent">Visual Design</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• Typography & color theory</li>
                                    <li>• Brand identity design</li>
                                    <li>• Design systems</li>
                                    <li>• Motion graphics</li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {selectedSkill === 'backend' && (
                              <>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">🗄️</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-secondary">Database Design</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• MongoDB & PostgreSQL</li>
                                    <li>• Database optimization</li>
                                    <li>• Redis caching</li>
                                    <li>• Data modeling</li>
                                  </ul>
                                </div>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">🔗</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-accent">API Development</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• RESTful API design</li>
                                    <li>• GraphQL implementation</li>
                                    <li>• Real-time with WebSockets</li>
                                    <li>• Microservices architecture</li>
                                  </ul>
                                </div>
                              </>
                            )}
                            {selectedSkill === 'mobile' && (
                              <>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">📱</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-secondary">Cross-Platform</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• React Native expertise</li>
                                    <li>• Flutter development</li>
                                    <li>• iOS & Android optimization</li>
                                    <li>• App store deployment</li>
                                  </ul>
                                </div>
                                <div className="glass-effect p-6 rounded-lg">
                                  <div className="text-4xl mb-4">🔧</div>
                                  <h4 className="text-xl font-semibold mb-3 glow-accent">Native Features</h4>
                                  <ul className="space-y-2 text-muted-foreground">
                                    <li>• Camera & media integration</li>
                                    <li>• GPS & location services</li>
                                    <li>• Push notifications</li>
                                    <li>• Offline capabilities</li>
                                  </ul>
                                </div>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  );
                })()}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;