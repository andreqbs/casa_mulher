import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, BookOpen } from 'lucide-react';

interface InicioFatosProps {
  onCriar: (texto: string) => void;
  onHistorico: () => void;
}

export default function InicioFatos({ onCriar, onHistorico }: InicioFatosProps) {
  const [showModal, setShowModal] = useState(false);
  const [texto, setTexto] = useState('');
  const [erro, setErro] = useState('');

  const handleCriar = () => {
    const trimmed = texto.trim();
    if (!trimmed) {
      setErro('Por favor, preencha o campo sobre sua vivência.');
      return;
    }
    if (trimmed.length < 3) {
      setErro('Por favor, descreva com pelo menos 3 caracteres.');
      return;
    }
    onCriar(trimmed);
    setTexto('');
    setShowModal(false);
    setErro('');
  };

  const handleClose = () => {
    setShowModal(false);
    setTexto('');
    setErro('');
  };

  return (
    <div className="px-6 pb-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center border-t-2 border-t-[#f34b21] mt-5 py-4">
        <h1 className="text-xl font-bold text-[#f34b21] leading-none">
          Minhas Experiências
        </h1>
      </div>

      {/* Illustration */}
      <div className="flex justify-center">
        <div className="w-28 h-28 rounded-full bg-[#f34b21]/10 flex items-center justify-center">
          <span className="text-5xl">🌱</span>
        </div>
      </div>

      {/* Main message */}
      <h2 className="text-2xl font-bold text-center text-[#f34b21] leading-snug">
        Escrever sobre suas vivências ajuda a entender suas emoções e a crescer com elas.
      </h2>

      <p className="text-sm text-slate-500 text-center italic">
        Fatos agradáveis e desagradáveis acontecem a todo momento, pausar e refletir sobre eles é a
        chave para tomada de decisões mais assertivas e maduras.
      </p>

      {/* Actions */}
      <div className="space-y-3 pt-2">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center gap-2 border-2 border-[#f34b21] text-[#f34b21] font-bold text-sm py-3 px-4 rounded-2xl hover:bg-[#f34b21]/5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Descreva o fato vivenciado
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onHistorico}
          className="w-full flex items-center justify-center gap-2 text-[#f34b21]/70 font-medium text-sm py-2"
        >
          <BookOpen className="w-4 h-4" />
          Ver histórico de experiências
        </motion.button>
      </div>

      {/* Modal — describe the fact */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/40 z-40"
            />

            {/* Sheet */}
            <motion.div
              key="sheet"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl px-6 pt-5 pb-8 shadow-xl max-w-md mx-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#f34b21] text-base leading-tight">
                  Conte em poucas palavras o que você vivenciou
                </h3>
                <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <textarea
                value={texto}
                onChange={e => { setTexto(e.target.value); setErro(''); }}
                placeholder="Descreva sua experiência..."
                maxLength={500}
                rows={5}
                className="w-full border-2 border-[#f34b21] rounded-2xl p-3 text-sm text-[#f34b21] placeholder-[#f34b21]/40 outline-none resize-none"
              />

              {erro && (
                <p className="text-red-500 text-xs mt-1">{erro}</p>
              )}

              <div className="flex items-center justify-between mt-2 mb-4">
                <span className="text-xs text-slate-400">{texto.length}/500</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleCriar}
                disabled={texto.trim().length < 3}
                className="w-full bg-[#f34b21] text-white font-bold py-3 rounded-full disabled:opacity-40 transition-opacity"
              >
                COMEÇAR
              </motion.button>

              <button
                onClick={handleClose}
                className="w-full text-center text-[#f34b21] text-sm font-medium mt-3"
              >
                Cancelar
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
