"use client";

import { Mail, Linkedin, Github, FileText } from "lucide-react";

export function ContactButtons() {
  const contacts = [
    { icon: <Linkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/in/maxime-allemeersch/" },
    { icon: <Github size={20} />, label: "GitHub", href: "https://github.com/LeigerMax#" },
    { icon: <Mail size={20} />, label: "Email", href: "mailto:max.allemeersch@gmail.com" },
    { icon: <FileText size={20} />, label: "CV", href: "#" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {contacts.map((contact, index) => (
        <a
          key={index}
          href={contact.href}
          className="flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all group"
        >
          <span className="text-purple-400 group-hover:scale-110 transition-transform">
            {contact.icon}
          </span>
          <span className="text-white font-medium">{contact.label}</span>
        </a>
      ))}
    </div>
  );
}
