'use client';

import { motion } from 'framer-motion';
import { useTranslation, useLanguage } from '@/hooks/useLanguage';
import { useNaturalScroll } from '@/hooks/useNaturalScroll';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/portfolio';
import { getTranslatedContent } from '@/data/translatedContent';
import { ExternalLink, Github, Star } from 'lucide-react';
import Image from 'next/image';

export function ProjectsSection() {
  const t = useTranslation();
  const { language } = useLanguage();
  const { navigateToSection } = useNaturalScroll();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      {/* Décor console rétro */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <motion.div
          className="relative"
          animate={{ 
            rotateY: [0, -2, 0],
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Console de jeu vintage */}
          <div className="w-80 h-48 bg-gradient-to-b from-gray-600 to-gray-800 rounded-lg relative">
            {/* Écran */}
            <div className="absolute top-4 left-8 right-8 h-24 bg-black rounded border-2 border-gray-700">
              <motion.div
                className="w-full h-full bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded flex items-center justify-center font-mono text-green-400 text-xs"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                GAME OVER<br/>PRESS START
              </motion.div>
            </div>
            
            {/* Boutons */}
            <div className="absolute bottom-8 left-8 grid grid-cols-2 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded-full ${
                    i % 2 === 0 ? 'bg-red-600' : 'bg-blue-600'
                  }`}
                />
              ))}
            </div>
            
            {/* D-pad */}
            <div className="absolute bottom-8 right-12">
              <div className="relative w-12 h-12">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-t" />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-900 rounded-b" />
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-l" />
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-900 rounded-r" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-900" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
              {t.projects.title}
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </motion.div>

        {/* Projets en vedette */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center space-x-2">
            <Star className="text-yellow-400" size={24} />
            <span>{t.projects.featured}</span>
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.filter(p => p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
              >
                <Card hoverable glowColor="green" className="h-full group">
                  <CardHeader>
                    {/* Image placeholder */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 overflow-hidden">
                      {project.image ? (
                        <>
                          {/* next/image uses the parent as positioning context when using fill */}
                          <Image src={project.image} alt={project.title} fill className="object-cover" />
                          {/* subtle overlay so text/icons remain readable */}
                          <div className="absolute inset-0 bg-black/30" />
                        </>
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-cyan-500/20" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-30">🎮</div>
                          </div>
                        </>
                      )}

                      {/* Effet de glitch au hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/30 to-transparent opacity-0 group-hover:opacity-100"
                        animate={{ x: [-100, 300] }}
                        transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
                      />

                      {/* Badge featured */}
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold">
                        FEATURED
                      </div>
                    </div>
                    
                    <CardTitle glowColor="green" className="group-hover:text-green-300 transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="mb-4">
                      {getTranslatedContent('projects', project.id, language, 'description')}
                    </CardDescription>
                    
                    {/* Technologies */}
                    <div className="mb-6">
                      <p className="text-cyan-400 text-sm font-mono mb-2">{t.projects.technologies}:</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.span
                            key={tech}
                            className="px-2 py-1 bg-green-500/10 border border-green-500/30 rounded text-xs text-green-300 font-mono"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.2 + techIndex * 0.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Boutons d'action */}
                    <div className="flex flex-col space-y-3">
                      <div className="flex space-x-3">
                        {project.liveUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            glowColor="green"
                            className="flex-1"
                            onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                          >
                            <ExternalLink size={16} className="mr-2" />
                            {t.projects.viewProject}
                          </Button>
                        )}
                        
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            glowColor="cyan"
                            className="flex-1"
                            onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                          >
                            <Github size={16} className="mr-2" />
                            {t.projects.viewCode}
                          </Button>
                        )}
                      </div>
                      
                      {/* Textes d'accompagnement */}
                      <div className="flex justify-between text-xs text-gray-400 font-mono">
                        {project.liveUrl && (
                          <span className="flex items-center text-green-400">
                            <ExternalLink size={12} className="mr-1" />
                            {t.projects.liveIndicator}
                          </span>
                        )}
                        {project.githubUrl && (
                          <span className="flex items-center text-cyan-400">
                            <Github size={12} className="mr-1" />
                            {t.projects.openSourceIndicator}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Autres projets */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-pink-400 mb-6">{t.projects.other}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <Card hoverable glowColor="pink" className="group">
                  <CardHeader>
                    <CardTitle glowColor="pink" className="text-lg group-hover:text-pink-300 transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="mb-4 text-sm">
                      {getTranslatedContent('projects', project.id, language, 'description')}
                    </CardDescription>
                    
                    {/* Technologies (version compacte) */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-pink-500/10 border border-pink-500/30 rounded text-xs text-pink-300 font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-xs text-gray-500">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Boutons compacts */}
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        {project.liveUrl && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            glowColor="pink" 
                            className="text-xs flex-1"
                            onClick={() => window.open(project.liveUrl, '_blank', 'noopener,noreferrer')}
                          >
                            <ExternalLink size={14} className="mr-1" />
                            {t.projects.demoText}
                          </Button>
                        )}
                        
                        {project.githubUrl && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            glowColor="cyan" 
                            className="text-xs flex-1"
                            onClick={() => window.open(project.githubUrl, '_blank', 'noopener,noreferrer')}
                          >
                            <Github size={14} className="mr-1" />
                            {t.projects.codeText}
                          </Button>
                        )}
                      </div>
                      
                      {/* Indicateurs de disponibilité */}
                      <div className="flex justify-center space-x-4 text-xs text-gray-500">
                        {project.liveUrl && (
                          <span className="flex items-center text-pink-400">
                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-1 animate-pulse" />
                            Live
                          </span>
                        )}
                        {project.githubUrl && (
                          <span className="flex items-center text-cyan-400">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full mr-1 animate-pulse" />
                            Open Source
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">
            {t.projects.ctaText}
          </p>
          <Button 
            glowColor="purple" 
            size="lg"
            onClick={() => navigateToSection('contact')}
          >
            {t.projects.ctaSubtext}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}