import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, X, Calendar } from 'lucide-react';

export interface Experiencia {
  id: string;
  textContent: string;
  pensamento: string;
  sentimento: string;
  reacao: string;
  aprendizado: string;
  createdAt: string;
}

const STORAGE_KEY = 'fatos_experiencias';

export function loadExperiencias(): Experiencia[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Experiencia[]) : [];
  } catch {
    return [];
  }
}

export function saveExperiencia(exp: Experiencia): void {
  const existing = loadExperiencias();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([exp, ...existing]));
}

const SUMMARY_ITEMS = [
  { label: 'FATO',       key: 'textContent' as const, bg: '#FFC9BB' },
  { label: 'PENSEI',     key: 'pensamento'  as const, bg: '#F98F74' },
  { label: 'SENTI',      key: 'sentimento'  as const, bg: '#F96C48' },
  { label: 'REAGI',      key: 'reacao'      as const, bg: '#F34B21' },
  { label: 'APRENDI',    key: 'aprendizado' as const, bg: '#C23010' },
];

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

interface ExperienciaHistoricoProps {
  onBack: () => void;
}

export default function ExperienciaHistorico({ onBack }: ExperienciaHistoricoProps) {
  const [experiencias] = useState<Experiencia[]>(loadExperiencias);
  const [selected, setSelected] = useState<Experiencia | null>(null);

  return (
    <div className="px-6 pb-8">
      {/* Header */}
      <div className="flex flex-col items-center text-center border-t-2 border-t-[#f34b21] mt-5 py-4">
        <h1 className="text-xl font-bold text-[#f34b21] leading-none">Histórico de Experiências</h1>
      </div>

      {experiencias.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-center">
          <span className="text-5xl">📖</span>
          <p className="text-slate-500 text-sm italic">
            Você ainda não registrou nenhuma experiência. Comece agora!
          </p>
          <button
            onClick={onBack}
            className="bg-[#f34b21] text-white font-bold text-sm py-3 px-8 rounded-full mt-2"
          >
            Criar primeira experiência
          </button>
        </div>
      ) : (
        <div className="space-y-3 mt-2">
          {experiencias.map(exp => (
            <motion.button
              key={exp.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelected(exp)}
              className="w-full text-left bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-1"
            >
              <p className="font-semibold text-[#f34b21] text-sm line-clamp-2">{exp.textContent}</p>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Calendar className="w-3 h-3" />
                {formatDate(exp.createdAt)}
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              key="bd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setSelected(null)}
            />
            <motion.div
              key="detail"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-w-md mx-auto shadow-xl max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-[#f34b21] text-base">Detalhes da experiência</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3 h-3" />
                    {formatDate(selected.createdAt)}
                  </p>
                </div>
                <button onClick={() => setSelected(null)}>
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <div className="px-6 py-4 space-y-3 pb-8">
                {SUMMARY_ITEMS.map(({ label, key, bg }) => (
                  selected[key] ? (
                    <div key={key} className="flex items-start gap-3">
                      <div
                        className="rounded-full px-3 py-1 text-white text-xs font-bold shrink-0 mt-0.5"
                        style={{ backgroundColor: bg }}
                      >
                        {label}
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed flex-1">{selected[key]}</p>
                    </div>
                  ) : null
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
