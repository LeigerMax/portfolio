'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { experiences, education } from '@/data/portfolio';
import { Briefcase, GraduationCap, Calendar, MapPin } from 'lucide-react';

export function ExperienceSection() {
  const t = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      {/* Décor étagère rétro */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <motion.div
          className="relative"
          animate={{ 
            rotateY: [0, 1, 0],
            scale: [1, 1.01, 1] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Étagère */}
          <div className="w-96 h-80 relative">
            {/* Planches */}
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-4 bg-gradient-to-r from-amber-800 to-amber-900 rounded"
                style={{ top: `${i * 70 + 60}px` }}
              />
            ))}
            
            {/* Supports verticaux */}
            <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-b from-amber-700 to-amber-800 rounded" />
            <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-b from-amber-700 to-amber-800 rounded" />
            
            {/* Objets sur les étagères */}
            {/* Livres */}
            <div className="absolute top-16 left-8 space-x-1 flex">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-12 ${
                    ['bg-red-700', 'bg-blue-700', 'bg-green-700', 'bg-purple-700', 'bg-yellow-700', 'bg-pink-700'][i]
                  } rounded-t-sm`}
                />
              ))}
            </div>
            
            {/* Diplômes encadrés */}
            <div className="absolute top-86 left-12 w-16 h-12 bg-yellow-600 border-2 border-yellow-700 rounded" />
            <div className="absolute top-86 left-32 w-16 h-12 bg-yellow-600 border-2 border-yellow-700 rounded" />
            
            {/* Trophées */}
            <div className="absolute top-156 left-16">
              <div className="w-4 h-8 bg-yellow-500 rounded-t-full" />
              <div className="w-6 h-2 bg-yellow-600 -mt-1 mx-auto rounded" />
            </div>
            
            <div className="absolute top-156 right-16">
              <div className="w-4 h-8 bg-silver-500 rounded-t-full" />
              <div className="w-6 h-2 bg-gray-400 -mt-1 mx-auto rounded" />
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
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              {t.experience.title}
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Mon parcours professionnel et académique dans l'univers du développement web
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Expériences professionnelles */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-orange-400 mb-8 flex items-center space-x-3">
              <Briefcase size={32} />
              <span>Expérience Professionnelle</span>
            </h3>

            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <Card hoverable glowColor="cyan" className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-3 top-6 w-6 h-6 bg-orange-500 rounded-full border-4 border-black flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    
                    <CardHeader>
                      <CardTitle glowColor="orange" className="text-xl">
                        {experience.position}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{experience.company}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>
                            {formatDate(experience.startDate)} - {experience.endDate ? formatDate(experience.endDate) : t.experience.present}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <CardDescription className="mb-4">
                        {experience.description}
                      </CardDescription>
                      
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 bg-orange-500/10 border border-orange-500/30 rounded text-xs text-orange-300 font-mono"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.2 + techIndex * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Formation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-3xl font-bold text-green-400 mb-8 flex items-center space-x-3">
              <GraduationCap size={32} />
              <span>{t.experience.education}</span>
            </h3>

            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                >
                  <Card hoverable glowColor="green" className="relative">
                    {/* Timeline dot */}
                    <div className="absolute -left-3 top-6 w-6 h-6 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    
                    <CardHeader>
                      <CardTitle glowColor="green" className="text-xl">
                        {edu.degree}
                      </CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <MapPin size={14} />
                          <span>{edu.institution}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={14} />
                          <span>
                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : t.experience.present}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    {edu.description && (
                      <CardContent>
                        <CardDescription>
                          {edu.description}
                        </CardDescription>
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Certifications et apprentissage continu */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="mt-12"
            >
              <Card hoverable glowColor="purple" className="relative">
                <div className="absolute -left-3 top-6 w-6 h-6 bg-purple-500 rounded-full border-4 border-black flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                
                <CardHeader>
                  <CardTitle glowColor="purple" className="text-xl">
                    Apprentissage Continu
                  </CardTitle>
                  <div className="text-sm text-gray-400">
                    En cours - Toujours en évolution
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription>
                    Veille technologique constante, participation à des projets open source, 
                    et exploration de nouvelles technologies comme l'IA, Web3, et les frameworks émergents.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline connectrice */}
        <div className="hidden lg:block absolute left-1/2 top-32 bottom-32 w-px bg-gradient-to-b from-orange-500 via-green-500 to-purple-500 transform -translate-x-1/2 opacity-30" />

        {/* Stats de parcours */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: "Années d'expérience dans l'informatique", value: "10+", color: "orange" },
            { label: "Tasses de café", value: "∞", color: "green" },
            { label: "Projets menés", value: "5+", color: "cyan" },
            { label: "Technologies maîtrisées", value: "12+", color: "purple" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className={`text-center p-4 bg-black/20 rounded-lg border border-${stat.color}-500/30 hover:border-${stat.color}-400/50 transition-colors duration-300`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.1 }}
            >
              <div className={`text-2xl font-bold text-${stat.color}-400 font-mono mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}