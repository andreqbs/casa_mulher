import React from 'react';
import { motion } from 'motion/react';
import { Phone, MessageSquare, Shield, HeartPulse } from 'lucide-react';

export default function EmergencyView() {
  const contacts = [
    {
      number: "190",
      title: "Polícia (emergência)",
      icon: <Shield className="w-6 h-6 text-red-600" />,
      bgColor: "bg-brand-pink",
      type: "call"
    },
    {
      number: "180",
      title: "Apoio à mulher",
      icon: <Phone className="w-6 h-6 text-brand-purple" />,
      bgColor: "bg-brand-purple-light",
      type: "call"
    },
    {
      number: "SOS Mulher",
      title: "(mensagem)",
      icon: <MessageSquare className="w-6 h-6 text-orange-600" />,
      bgColor: "bg-brand-yellow",
      type: "message"
    },
    {
      number: "188",
      title: "Apoio emocional",
      icon: <HeartPulse className="w-6 h-6 text-rose-600" />,
      bgColor: "bg-slate-100",
      type: "call"
    }
  ];

  return (
    <div className="px-6 py-4 space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 leading-tight">
          Você não está exagerando ao buscar ajuda.
        </h2>
        <p className="text-slate-500 text-sm">
          Muitas vezes, esse é o primeiro passo para proteger a sua vida.
        </p>
      </div>

      <div className="space-y-4">
        {contacts.map((contact, index) => (
          <motion.div
            key={contact.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileTap={{ scale: 0.98 }}
            className="bg-slate-50 p-4 rounded-3xl flex items-center gap-4 group cursor-pointer"
          >
            <div className={`${contact.bgColor} w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm`}>
              {contact.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 text-lg">
                {contact.number} — <span className="font-medium text-slate-600">{contact.title}</span>
              </h3>
            </div>
            <div className="text-slate-300 group-hover:text-brand-purple transition-colors">
              {contact.type === 'call' ? <Phone className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-slate-400 font-medium italic">
          Mas só de dar esse passo já é muito.
        </p>
      </div>
    </div>
  );
}
