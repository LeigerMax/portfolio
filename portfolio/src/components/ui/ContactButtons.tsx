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
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-5 p-5 bg-white/[0.02] border card-border rounded-lg transition-all group hover:bg-white/[0.04] hover:border-white/20"
        >
          <div className="p-2.5 bg-white/[0.03] border card-border rounded-lg text-gray-500 group-hover:text-amber-200/60 transition-colors">
            {contact.icon}
          </div>
          <span className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px] group-hover:text-white transition-colors">{contact.label}</span>
        </a>
      ))}
    </div>
  );
}
