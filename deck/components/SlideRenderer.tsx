import React, { useEffect, useMemo, useState } from 'react';
import { SlideContent } from '../types';
import { RISK_PROFILES } from '../constants';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  AlertTriangle,
  ShieldCheck,
  Zap,
  TrendingUp,
  Map as MapIcon,
  Activity,
  Cpu,
  Database,
  Maximize2,
  X
} from 'lucide-react';

interface Props {
  slide: SlideContent;
}

const SlideRenderer: React.FC<Props> = ({ slide }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  useEffect(() => {
    setMediaError(false);
  }, [slide.id]);

  const hasMedia = useMemo(() => !!slide.media && !mediaError, [slide.media, mediaError]);

  const renderMedia = () => {
    const m = slide.media;
    if (!m) return null;

    if (m.kind === 'image') {
      return (
        <img
          src={m.src}
          alt={m.alt ?? slide.title}
          onError={() => setMediaError(true)}
          className="w-full h-full object-contain rounded-xl"
        />
      );
    }

    if (m.kind === 'video') {
      return (
        <video
          src={m.src}
          poster={m.poster}
          onError={() => setMediaError(true)}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          className="w-full h-full object-contain rounded-xl"
        />
      );
    }

    if (m.kind === 'iframe') {
      return (
        <iframe
          src={m.src}
          title={m.title ?? slide.title}
          className="w-full h-full rounded-xl"
          style={{ border: 0 }}
          allow="fullscreen"
        />
      );
    }

    return null;
  };

  const renderVisual = (isModal: boolean = false) => {
    // ✅ Priorité au média si présent
    if (hasMedia) {
      return (
        <div className={`w-full h-full ${isModal ? 'min-h-[60vh]' : ''}`}>
          {renderMedia()}
        </div>
      );
    }

    // Sinon : comportement actuel (visualType)
    switch (slide.visualType) {
      case 'dashboard':
        return (
          <div className={`grid grid-cols-2 gap-4 h-full ${isModal ? 'p-8' : ''}`}>
            <div className="bg-slate-800/50 p-4 border border-slate-700 rounded-lg flex flex-col justify-center items-center">
              <TrendingUp className={`${isModal ? 'w-24 h-24' : 'w-16 h-16'} text-emerald-400 mb-4 transition-all`} />
              <div className={`${isModal ? 'text-5xl' : 'text-3xl'} font-bold text-emerald-400`}>92.3%</div>
              <div className="text-slate-400 text-sm">Indice de Confiance</div>
            </div>
            <div className="bg-slate-800/50 p-4 border border-slate-700 rounded-lg flex flex-col justify-center items-center">
              <Database className={`${isModal ? 'w-24 h-24' : 'w-16 h-16'} text-blue-400 mb-4 transition-all`} />
              <div className={`${isModal ? 'text-5xl' : 'text-3xl'} font-bold text-blue-400`}>7 ans</div>
              <div className="text-slate-400 text-sm">Historique de Données</div>
            </div>
            <div className="col-span-2 bg-slate-800/50 p-4 border border-slate-700 rounded-lg flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2 text-yellow-400">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Prévisions ECCC (7j)</span>
              </div>
              <div className={`flex justify-between ${isModal ? 'text-lg' : 'text-xs'} text-slate-400`}>
                <span>Lun: +2°C</span>
                <span>Mar: -5°C</span>
                <span>Mer: Neige</span>
                <span>Jeu: Verglas</span>
                <span>Ven: -12°C</span>
              </div>
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className={`${isModal ? 'h-[70vh]' : 'h-64 sm:h-80'} w-full mt-4`}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RISK_PROFILES} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" hide />
                <YAxis dataKey="type" type="category" stroke="#94a3b8" width={isModal ? 200 : 150} fontSize={isModal ? 16 : 12} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                  {RISK_PROFILES.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      case 'xai':
        return (
          <div className={`flex flex-col gap-4 p-6 bg-slate-800/80 border border-emerald-500/30 rounded-xl ${isModal ? 'w-full max-w-4xl' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Cpu className="text-emerald-400 w-8 h-8" />
                <span className={`${isModal ? 'text-2xl' : 'text-lg'} font-bold`}>Moteur SHAP Explain</span>
              </div>
              <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold border border-emerald-500/50">
                Confiance: 92.3%
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[70%] shadow-[0_0_10px_rgba(239,68,68,0.5)]" title="Humidité relative"></div>
                </div>
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                  <span>Variable: Humidité Rel.</span>
                  <span className="text-red-400 font-bold">+12% Risque</span>
                </div>
              </div>
              <div>
                <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[40%] shadow-[0_0_10px_rgba(59,130,246,0.5)]" title="Ancienneté opérateur"></div>
                </div>
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                  <span>Variable: Expérience équipe</span>
                  <span className="text-blue-400 font-bold">-5% Risque</span>
                </div>
              </div>
              {isModal && (
                <div>
                  <div className="h-4 w-full bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-[25%]" title="Type de roche"></div>
                  </div>
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>Variable: Type de Roche (Sulfures)</span>
                    <span className="text-yellow-400 font-bold">+8% Risque</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'map':
        return (
          <div className={`flex items-center justify-center h-full bg-slate-800 rounded-lg relative overflow-hidden group/map`}>
            <MapIcon className={`${isModal ? 'w-64 h-64' : 'w-32 h-32'} text-slate-700 group-hover/map:text-blue-500 transition-all duration-700`} />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40">
              <div className={`${isModal ? 'text-2xl px-8 py-4' : 'px-4 py-2'} bg-blue-600 rounded-lg font-bold shadow-lg animate-pulse`}>
                SÉLECTION : ABITIBI
              </div>
              {isModal && <p className="mt-4 text-slate-300">Zone de forage active - Surveillance géotechnique accrue</p>}
            </div>
          </div>
        );

      case 'warning':
        return (
          <div className="flex flex-col items-center justify-center h-full p-8 border-2 border-dashed border-red-500 rounded-xl bg-red-900/10">
            <AlertTriangle className={`${isModal ? 'w-32 h-32' : 'w-20 h-20'} text-red-500 mb-4 animate-bounce`} />
            <h3 className={`${isModal ? 'text-4xl' : 'text-xl'} font-bold text-red-500 text-center uppercase`}>
              Validation Humaine Requise
            </h3>
            <p className={`${isModal ? 'text-xl' : 'text-sm'} text-slate-400 text-center mt-4 italic max-w-lg`}>
              "Cet outil n'est pas une vérité absolue mais une boussole prédictive. L'expertise terrain reste prioritaire."
            </p>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <ShieldCheck className="w-32 h-32 text-slate-700" />
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-slate-400 font-medium mt-1">{slide.subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
        <div className="space-y-4">
          <ul className="space-y-4">
            {slide.bullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 group">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform" />
                <span className="text-lg text-slate-200">{bullet}</span>
              </li>
            ))}
          </ul>

          {slide.type === 'faq' && (
            <div className="mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
                <span>Conformité & Audit</span>
              </div>
              <p className="text-sm text-slate-400">
                Système certifiable ISO 45001 et auditable pour la Loi 25 québécoise.
              </p>
            </div>
          )}

          {slide.type === 'cta' && (
            <div className="mt-8">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Démarrer le pilote de 30 jours
              </button>
            </div>
          )}
        </div>

        {/* Visual Container with Interactive Zoom */}
        <div
          onClick={() => setIsZoomed(true)}
          className="group/visual bg-slate-900/50 rounded-2xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden min-h-[300px] cursor-zoom-in hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="h-full transition-transform duration-500 ease-out group-hover/visual:scale-[1.03]">
            {renderVisual()}
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            {slide.type === 'demo' && (
              <div className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-500/50 flex items-center gap-2">
                <Zap className="w-3 h-3" />
                INTERACTIF
              </div>
            )}
            <div className="opacity-0 group-hover/visual:opacity-100 bg-slate-800/80 p-2 rounded-full text-white backdrop-blur-sm border border-slate-600 transition-opacity">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detailed View */}
      {isZoomed && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
          <button
            onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}
            className="absolute top-6 right-6 p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-colors z-[70] shadow-xl border border-slate-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-full max-w-6xl flex flex-col items-center">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">{slide.title}</h2>
              <p className="text-slate-400 italic">Vue détaillée des indicateurs SafetyGraph</p>
            </div>

            <div className="w-full bg-slate-900/40 rounded-3xl p-8 border border-slate-800 shadow-inner">
              {renderVisual(true)}
            </div>

            <p className="mt-8 text-slate-500 text-sm animate-pulse">
              Cliquez n'importe où ou sur le bouton de fermeture pour revenir à la présentation
            </p>
          </div>

          <div className="absolute inset-0 -z-10" onClick={() => setIsZoomed(false)} />
        </div>
      )}
    </div>
  );
};

export default SlideRenderer;
