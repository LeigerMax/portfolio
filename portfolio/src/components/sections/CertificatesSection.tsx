'use client';

import { motion } from 'framer-motion';
import { useTranslation, useLanguage } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { certificates } from '@/data/portfolio';
import { getTranslatedContent } from '@/data/translatedContent';
import { Award, Calendar, Building2, ExternalLink } from 'lucide-react';

export function CertificatesSection() {
  const t = useTranslation();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      {/* Décor diplôme rétro */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
        <motion.div
          className="relative"
          animate={{ 
            rotateZ: [0, 1, 0, -1, 0],
            scale: [1, 1.02, 1, 1.02, 1] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Diplôme vintage */}
          <div className="w-96 h-64 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg border-8 border-amber-600 relative shadow-2xl">
            {/* Bordures ornementales */}
            <div className="absolute inset-4 border-4 border-amber-500 rounded">
              <div className="absolute inset-2 border-2 border-amber-400 rounded">
                {/* Titre du diplôme */}
                <div className="flex flex-col items-center justify-center h-full text-amber-800">
                  <div className="text-2xl font-bold mb-2">CERTIFICAT</div>
                  <div className="w-32 h-1 bg-amber-600 mb-4"></div>
                  <div className="text-lg font-serif text-center leading-tight">
                    Attestation de<br/>Compétences
                  </div>
                  <div className="mt-4 text-sm opacity-70">
                    Formation Continue
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sceau */}
            <div className="absolute bottom-4 right-8">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                <Award className="text-white" size={32} />
              </div>
            </div>
            
            {/* Ruban */}
            <div className="absolute top-0 right-8 w-4 h-24 bg-gradient-to-b from-blue-600 to-red-600 rounded-b-full shadow-lg">
              <div className="w-4 h-4 bg-yellow-400 rounded-full mx-auto mt-2"></div>
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
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t.certificates.title}
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t.certificates.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
            >
              <Card hoverable glowColor="yellow" className="h-full group">
                <CardHeader>
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-full">
                      <Award className="text-yellow-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <CardTitle glowColor="yellow" className="text-lg group-hover:text-yellow-300 transition-colors leading-tight">
                        {certificate.title}
                      </CardTitle>
                    </div>
                  </div>
                  
                  {/* Informations de l'émetteur */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Building2 size={16} className="text-orange-400" />
                      <span className="font-medium">{certificate.issuer}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar size={16} className="text-cyan-400" />
                      <span>
                        {new Date(certificate.issueDate).toLocaleDateString('fr-FR', {
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <CardDescription className="mb-4">
                    {getTranslatedContent('certificates', certificate.id, language, 'description')}
                  </CardDescription>
                  
                  {/* Badge de certification */}
                  <div className="flex items-center justify-between">
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                      <span className="text-xs text-yellow-300 font-mono font-bold">
                        {t.certificates.certified}
                      </span>
                    </div>
                    
                    {certificate.credentialUrl && (
                      <motion.a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Section statistiques des certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-black/20 rounded-lg border border-gray-700 hover:border-yellow-400/50 transition-colors duration-300">
              <div className="text-3xl font-bold text-yellow-400 font-mono mb-2">
                {certificates.length}
              </div>
              <div className="text-gray-300 text-sm">{t.certificates.stats.certificates}</div>
            </div>
            
            <div className="text-center p-6 bg-black/20 rounded-lg border border-gray-700 hover:border-orange-400/50 transition-colors duration-300">
              <div className="text-3xl font-bold text-orange-400 font-mono mb-2">
                {new Set(certificates.map(cert => cert.issuer)).size}
              </div>
              <div className="text-gray-300 text-sm">{t.certificates.stats.organizations}</div>
            </div>
            
            <div className="text-center p-6 bg-black/20 rounded-lg border border-gray-700 hover:border-cyan-400/50 transition-colors duration-300">
              <div className="text-3xl font-bold text-cyan-400 font-mono mb-2">
                {Math.max(...certificates.map(cert => new Date().getFullYear() - parseInt(cert.issueDate.split('-')[0])))}+
              </div>
              <div className="text-gray-300 text-sm">Années d'expérience</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}