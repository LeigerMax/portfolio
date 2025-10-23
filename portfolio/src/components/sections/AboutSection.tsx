'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollableSection } from '@/components/ScrollableSection';
import { personalInfo } from '@/data/portfolio';
import { Code, Coffee, Lightbulb, User } from 'lucide-react';

export function AboutSection() {
  const t = useTranslation();

  const skillCategories = [
    {
      title: "Langages de programmation",
      skills: ["Java", "Python", "JavaScript", "TypeScript", "PHP", "C#", "Haskell"],
      icon: "💻",
      color: "cyan"
    },
    {
      title: "Frameworks & Technologies Web", 
      skills: ["React", "Node.js", "Next.js", "Angular", "jQuery", "Flutter", "HTML", "CSS"],
      icon: "🌐",
      color: "pink"
    },
    {
      title: "Bases de données",
      skills: ["MySQL", "PostgreSQL"],
      icon: "🗄️",
      color: "green"
    },
    {
      title: "Outils & Environnements",
      skills: ["Git", "GitHub", "Linux", "Docker", "Jira", "WordPress"],
      icon: "🛠️",
      color: "purple"
    },
    {
      title: "Systèmes & Réseaux",
      skills: ["Windows", "Linux", "Windows Server", "Administration réseau", "Packet Tracer"],
      icon: "🖥️",
      color: "yellow"
    },
    {
      title: "Méthodologies",
      skills: ["Agile", "Scrum", "OOP", "REST API", "Tailwind CSS"],
      icon: "�",
      color: "orange"
    }
  ];

  return (
    <ScrollableSection>
      <div className="w-full max-w-7xl mx-auto">
        {/* Décor de bureau vintage */}
        <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
          <motion.div
            className="relative"
            animate={{ 
              rotateY: [0, 2, 0],
              scale: [1, 1.01, 1] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            {/* Bureau */}
          <div className="w-96 h-64 bg-gradient-to-b from-amber-900 to-amber-800 rounded-lg relative">
            {/* Livres empilés */}
            <div className="absolute top-4 left-4 space-y-1">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-20 h-3 ${
                    i % 2 === 0 ? 'bg-red-700' : 'bg-blue-700'
                  } rounded-sm`}
                />
              ))}
            </div>
            
            {/* Plante */}
            <div className="absolute top-8 right-8">
              <div className="w-6 h-6 bg-green-600 rounded-full" />
              <div className="w-1 h-8 bg-green-700 mx-auto" />
              <div className="w-8 h-4 bg-amber-700 rounded-b-full mx-auto" />
            </div>
            
            {/* Tasse de café */}
            <div className="absolute bottom-12 left-12">
              <div className="w-8 h-6 bg-gray-800 rounded-b-lg" />
              <div className="w-10 h-1 bg-gray-700 -mt-1 rounded" />
              <motion.div
                className="w-1 h-4 bg-gray-300 opacity-60"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              {t.about.title}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Présentation personnelle */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card hoverable glowColor="cyan" className="h-full">
              <CardHeader>
                <CardTitle glowColor="cyan" className="flex items-center space-x-3">
                  <User className="text-cyan-400" size={24} />
                  <span>Qui suis-je ?</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {personalInfo.bio}
                </p>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Coffee size={16} />
                  <span className="text-sm font-mono">Alimenté par le café et la créativité</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Philosophie */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card hoverable glowColor="pink" className="h-full">
              <CardHeader>
                <CardTitle glowColor="pink" className="flex items-center space-x-3">
                  <Lightbulb className="text-pink-400" size={24} />
                  <span>{t.about.philosophy}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed italic">
                  "{personalInfo.philosophy}"
                </p>
                <div className="mt-4 text-right">
                  <span className="text-pink-400 font-mono text-sm">- Maxime Allemeersch</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Compétences */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-3xl font-bold text-center text-white mb-8 flex items-center justify-center space-x-3">
            <Code className="text-green-400" size={32} />
            <span className="text-green-400">{t.about.skills}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              >
                <Card 
                  hoverable 
                  glowColor={category.color as "cyan" | "pink" | "green" | "purple" | "yellow" | "orange"} 
                  className="h-full text-center"
                >
                  <CardHeader>
                    <CardTitle 
                      glowColor={category.color as "cyan" | "pink" | "green" | "purple" | "yellow" | "orange"}
                      className="flex items-center justify-center space-x-3"
                    >
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-sm">{category.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill}
                          className={`
                            px-2 py-1 rounded-full text-xs font-mono border 
                            ${category.color === 'cyan' && 'border-cyan-400/30 bg-cyan-400/10 text-cyan-300'}
                            ${category.color === 'pink' && 'border-pink-400/30 bg-pink-400/10 text-pink-300'}
                            ${category.color === 'green' && 'border-green-400/30 bg-green-400/10 text-green-300'}
                            ${category.color === 'purple' && 'border-purple-400/30 bg-purple-400/10 text-purple-300'}
                            ${category.color === 'yellow' && 'border-yellow-400/30 bg-yellow-400/10 text-yellow-300'}
                            ${category.color === 'orange' && 'border-orange-400/30 bg-orange-400/10 text-orange-300'}
                          `}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1 + index * 0.2 + skillIndex * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

       
        </div>
      </div>
    </ScrollableSection>
  );
}