'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Calendar } from 'lucide-react'
import { contactInfo } from '@/lib/data/portfolio'

export default function Contact() {
  return (
    <section id="contact" className="py-24 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="md3-headline-large mb-4">
            Get In Touch
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="md3-headline-medium mb-6">Contact Information</h3>

            <div className="space-y-4">
              <motion.a
                href={`mailto:${contactInfo.email}`}
                whileHover={{ scale: 1.02 }}
                className="md3-card flex items-center gap-4 p-4"
              >
                <div className="w-12 h-12 bg-[var(--md-sys-color-primary-container)] rounded-lg flex items-center justify-center">
                  <Mail className="text-[var(--md-sys-color-on-primary-container)]" size={20} />
                </div>
                <div>
                  <p className="md3-title-medium">Email</p>
                  <p className="md3-body-medium md3-on-surface-variant">{contactInfo.email}</p>
                </div>
              </motion.a>

              <div className="md3-card flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-[var(--md-sys-color-secondary-container)] rounded-lg flex items-center justify-center">
                  <MapPin className="text-[var(--md-sys-color-on-secondary-container)]" size={20} />
                </div>
                <div>
                  <p className="md3-title-medium">Location</p>
                  <p className="md3-body-medium md3-on-surface-variant">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="md3-headline-medium mb-6">Connect With Me</h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/ismail-kattakath"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full md3-label-large shadow-md hover:shadow-lg transition-shadow flex-1"
                  style={{ backgroundColor: '#0a66c2', color: '#ffffff' }}
                >
                  <Github size={20} />
                  GitHub
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/ismailkattakath"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full md3-label-large shadow-md hover:shadow-lg transition-shadow flex-1"
                  style={{ backgroundColor: '#0a66c2', color: '#ffffff' }}
                >
                  <Linkedin size={20} />
                  LinkedIn
                </motion.a>
              </div>
              <motion.a
                href="https://calendar.app.google/yqSPTMV9VXkMvpAL6"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full md3-label-large shadow-md hover:shadow-lg transition-shadow justify-center"
                style={{ backgroundColor: '#0a66c2', color: '#ffffff' }}
              >
                <Calendar size={20} />
                Schedule a Meeting
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}