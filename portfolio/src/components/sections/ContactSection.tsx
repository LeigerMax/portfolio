'use client';

import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useLanguage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { contactInfo } from '@/data/portfolio';
import { Mail, Phone, Linkedin, Github, Twitter, MessageCircle, Send, Clock, MapPin } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const t = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pourriez intégrer un service de formulaire comme Formspree, Netlify Forms, etc.
    console.log('Form submitted:', formData);
    alert(t.contact.form.successMessage);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      color: 'cyan',
      description: t.contact.methods.emailDesc
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'Maxime Allemeersch',
      href: contactInfo.linkedin,
      color: 'blue',
      description: t.contact.methods.linkedinDesc
    },
    {
      icon: Github,
      label: 'GitHub',
      value: '@LeigerMax',
      href: contactInfo.github,
      color: 'purple',
      description: 'Code et projets'
    }
  ];

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-20">
      {/* Décor téléphone rétro */}
      <div className="absolute inset-0 flex items-center justify-center opacity-15">
        <motion.div
          className="relative"
          animate={{ 
            rotateY: [0, -1, 0],
            scale: [1, 1.02, 1] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          {/* Téléphone vintage */}
          <div className="w-32 h-48 bg-gradient-to-b from-red-800 to-red-900 rounded-lg relative">
            {/* Combiné */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-red-700 rounded-full" />
            
            {/* Écran */}
            <div className="absolute top-8 left-4 right-4 h-16 bg-black rounded border border-gray-700">
              <motion.div
                className="w-full h-full bg-green-500/20 rounded flex items-center justify-center font-mono text-green-400 text-xs"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                CALL ME
              </motion.div>
            </div>
            
            {/* Cadran */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gray-800 rounded-full relative">
              {[...Array(10)].map((_, i) => {
                const angle = (i * 36) - 90;
                const x = Math.cos(angle * Math.PI / 180) * 20;
                const y = Math.sin(angle * Math.PI / 180) * 20;
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`
                    }}
                  />
                );
              })}
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
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t.contact.title}
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold text-purple-400 mb-8 flex items-center space-x-3">
              <MessageCircle size={32} />
              <span>{t.contact.stayConnected}</span>
            </h3>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                >
                  <Card hoverable glowColor={method.color as any} className="group">
                    <CardContent className="p-6">
                      <motion.a
                        href={method.href}
                        target={method.href?.startsWith('http') ? '_blank' : undefined}
                        rel={method.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-center space-x-4 group-hover:scale-105 transition-transform duration-300"
                        whileHover={{ x: 5 }}
                      >
                        <div className={`
                          p-3 rounded-full border-2 
                          ${method.color === 'cyan' && 'border-cyan-400 bg-cyan-400/10 text-cyan-400'}
                          ${method.color === 'green' && 'border-green-400 bg-green-400/10 text-green-400'}
                          ${method.color === 'blue' && 'border-blue-400 bg-blue-400/10 text-blue-400'}
                          ${method.color === 'purple' && 'border-purple-400 bg-purple-400/10 text-purple-400'}
                        `}>
                          <method.icon size={24} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-white font-semibold mb-1">{method.label}</h4>
                          <p className={`
                            font-mono text-sm mb-1
                            ${method.color === 'cyan' && 'text-cyan-300'}
                            ${method.color === 'green' && 'text-green-300'}
                            ${method.color === 'blue' && 'text-blue-300'}
                            ${method.color === 'purple' && 'text-purple-300'}
                          `}>
                            {method.value}
                          </p>
                          <p className="text-gray-400 text-xs">{method.description}</p>
                        </div>
                      </motion.a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Informations supplémentaires */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 space-y-4"
            >

              <Card className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 border-pink-400/30">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3 text-pink-300">
                    <MapPin size={20} />
                    <div>
                      <p className="font-semibold">Localisation</p>
                      <p className="text-sm text-gray-400">Belgique - France / Remote friendly</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card hoverable glowColor="pink" className="h-full">
              <CardHeader>
                <CardTitle glowColor="pink" className="text-2xl flex items-center space-x-3">
                  <Send size={28} />
                  <span>{t.contact.sendMessage}</span>
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        {t.contact.form.name} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                        placeholder="Votre nom"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                    >
                      <label className="block text-sm font-medium text-pink-400 mb-2">
                        {t.contact.form.email} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                        placeholder="votre@email.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="block text-sm font-medium text-pink-400 mb-2">
                      {t.contact.form.subject} *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                      placeholder="Sujet de votre message"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                  >
                    <label className="block text-sm font-medium text-pink-400 mb-2">
                      {t.contact.form.message} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-black/20 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 resize-none"
                      placeholder={t.contact.form.placeholder}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <Button
                      type="submit"
                      glowColor="pink"
                      size="lg"
                      className="w-full"
                    >
                      <Send size={20} className="mr-2" />
                      {t.contact.form.send}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-400 mb-4">
            © 2024 Maxime Allemeersch. Créé avec ❤️ et beaucoup de café ☕
          </p>
          <p className="text-sm text-gray-500 font-mono">
            Portfolio rétro-futuriste powered by Next.js 
          </p>
        </motion.div>
      </div>
    </div>
  );
}