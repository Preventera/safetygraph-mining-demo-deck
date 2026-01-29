
import React, { useState, useCallback, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  MessageSquare, 
  Monitor, 
  Info,
  Layers,
  Zap,
  HardHat,
  Menu,
  X,
  Clock,
  Mic,
  MousePointer2,
  RefreshCw
} from 'lucide-react';
import { SLIDES } from './constants';
import SlideRenderer from './components/SlideRenderer';

type PresentationDuration = 3 | 7 | 12;

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [duration, setDuration] = useState<PresentationDuration>(7);
  const [viewMode, setViewMode] = useState<'standard' | 'run-of-show'>('run-of-show');
  const [isPlaying, setIsPlaying] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  
  const currentSlide = SLIDES[currentSlideIndex];
  const currentRunOfShow = currentSlide.runOfShow.find(r => r.duration === duration) || currentSlide.runOfShow[0];

  const parseMmSs = (s: string) => {
    const [m, sec] = s.trim().split(':').map(Number);
    if (Number.isNaN(m) || Number.isNaN(sec)) return 0;
    return m * 60 + sec;
  };

  const getSlideSeconds = () => {
    const t = (currentRunOfShow?.timing || '').split('-').map(x => x.trim());
    if (t.length !== 2) return 30; // fallback
    const start = parseMmSs(t[0]);
    const end = parseMmSs(t[1]);
    const dur = Math.max(5, end - start);
    return dur || 30;
  };

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, SLIDES.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key.toLowerCase() === 'p') setIsPlaying((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);


  // Autoplay (auto-advance based on the selected run-of-show timing)
  useEffect(() => {
    if (!isPlaying) {
      setSecondsLeft(null);
      return;
    }

    const slideSeconds = getSlideSeconds();
    setSecondsLeft(slideSeconds);

    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => (prev === null ? prev : Math.max(0, prev - 1)));
    }, 1000);

    const timeout = window.setTimeout(() => {
      if (currentSlideIndex >= SLIDES.length - 1) {
        setIsPlaying(false);
      } else {
        nextSlide();
      }
    }, slideSeconds * 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [isPlaying, currentSlideIndex, duration, viewMode, nextSlide]);


  return (
    <div className="flex flex-col h-screen bg-slate-950 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 shrink-0 shadow-lg z-30">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
            <HardHat className="text-slate-950 w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white leading-none">SafetyGraph Mining</h1>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">AgenticX5 • SCIAN 21</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-800 rounded-lg p-1 border border-slate-700">
            <button 
              onClick={() => setShowNotes(!showNotes)}
              className={`p-2 rounded-md transition-all ${showNotes ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-750'}`}
              title="Afficher les notes d'orateur"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button 
              className="p-2 text-slate-400 hover:bg-slate-750 rounded-md"
              title="Mode Présentation Plein Écran"
            >
              <Monitor className="w-5 h-5" />
            </button>
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-slate-400 hover:bg-slate-800 rounded-md md:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex flex-1 overflow-hidden">
        {/* Navigation Sidebar (Desktop) */}
        <aside className="hidden md:flex w-64 flex-col bg-slate-900/50 border-r border-slate-800 shrink-0">
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-10">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Plan de la présentation</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all flex items-center gap-3 group ${
                  idx === currentSlideIndex 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <span className={`w-5 text-center font-mono text-xs ${idx === currentSlideIndex ? 'text-emerald-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <span className="truncate font-medium">{s.title}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 p-6 md:p-12 overflow-y-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 scrollbar-hide">
            <SlideRenderer slide={currentSlide} />
            
            {/* Pause Indicators */}
            {[4, 8].includes(currentSlideIndex) && (
              <div className="mt-8 flex items-center gap-4 p-5 bg-yellow-500/5 border border-yellow-500/20 rounded-2xl animate-in slide-in-from-bottom-4 duration-500">
                 <div className="bg-yellow-500/10 p-3 rounded-xl">
                    <Pause className="text-yellow-500 w-6 h-6" />
                 </div>
                 <div>
                    <span className="text-yellow-500 font-bold text-lg">PAUSE : Questions & Réponses</span>
                    <p className="text-sm text-yellow-500/60 mt-0.5">Moment privilégié pour approfondir les points techniques de l'IA.</p>
                 </div>
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <footer className="h-20 bg-slate-900 border-t border-slate-800 px-6 flex items-center justify-between shrink-0 shadow-2xl z-20">
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">Progression</span>
                <div className="flex items-center gap-3">
                   <span className="text-sm font-bold text-slate-300 w-8">{Math.round(((currentSlideIndex + 1) / SLIDES.length) * 100)}%</span>
                   <div className="h-1.5 w-24 md:w-32 bg-slate-800 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(16,185,129,0.5)]" 
                      style={{ width: `${((currentSlideIndex + 1) / SLIDES.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="hidden sm:block h-8 w-px bg-slate-800 mx-2" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">Position</span>
                <p className="text-xs md:text-sm text-emerald-400 font-bold tracking-tight">
                  Diapositive {currentSlideIndex + 1} / {SLIDES.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsPlaying((p) => !p)}
                className={`group flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl transition-all active:scale-95 shadow-lg border ${
                  isPlaying 
                    ? 'bg-slate-800 text-emerald-400 border-emerald-500/30 hover:bg-slate-750' 
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
                }`}
                title={isPlaying ? "Pause (P)" : "Lecture automatique (P)"}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span className="hidden sm:inline font-bold text-sm">{isPlaying ? 'Pause' : 'Auto'}</span>
                {secondsLeft !== null && (
                  <span className="hidden md:inline text-[10px] font-mono font-bold text-slate-400 ml-1">
                    {secondsLeft}s
                  </span>
                )}
              </button>
              <button 
                onClick={prevSlide}
                disabled={currentSlideIndex === 0}
                className="group flex items-center gap-2 px-3 md:px-4 py-2 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl transition-all active:scale-95 shadow-lg"
                title="Diapositive précédente (←)"
              >
                <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                <span className="hidden sm:inline font-bold text-sm">Précédent</span>
              </button>
              
              <button 
                onClick={nextSlide}
                disabled={currentSlideIndex === SLIDES.length - 1}
                className="group flex items-center gap-2 px-4 md:px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/40 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed border border-emerald-500/20"
                title="Diapositive suivante (→, Espace)"
              >
                <span className="hidden sm:inline text-sm">Suivant</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </footer>
        </div>

        {/* Speaker Notes & Run-of-Show (Right Panel) */}
        {showNotes && (
          <aside className="hidden lg:flex w-96 flex-col bg-slate-900 border-l border-slate-800 shrink-0 animate-in slide-in-from-right duration-300">
            <div className="flex flex-col h-full overflow-hidden">
              <div className="p-4 bg-slate-850/50 flex flex-col border-b border-slate-800 gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div className="bg-emerald-500/10 p-1.5 rounded-lg">
                      <Clock className="w-4 h-4 text-emerald-400" />
                     </div>
                     <h3 className="text-xs font-bold text-white uppercase tracking-widest">Run-of-Show</h3>
                  </div>
                  <button onClick={() => setShowNotes(false)} className="text-slate-500 hover:text-slate-300">
                     <X className="w-4 h-4" />
                  </button>
                </div>
                
                {/* Duration Selector */}
                <div className="flex items-center gap-1 bg-slate-950/50 p-1 rounded-xl border border-slate-800 shadow-inner">
                  {[3, 7, 12].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d as PresentationDuration)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                        duration === d 
                        ? 'bg-emerald-600 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {d} min
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 bg-slate-800/50 p-1 rounded-lg">
                  <button 
                    onClick={() => setViewMode('standard')}
                    className={`flex-1 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${viewMode === 'standard' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
                  >
                    Notes
                  </button>
                  <button 
                    onClick={() => setViewMode('run-of-show')}
                    className={`flex-1 py-1 rounded-md text-[10px] uppercase font-bold transition-all ${viewMode === 'run-of-show' ? 'bg-emerald-600/20 text-emerald-400' : 'text-slate-500'}`}
                  >
                    Run of Show
                  </button>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                {viewMode === 'standard' ? (
                  <>
                    <section>
                      <h4 className="text-[10px] font-black text-emerald-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
                        <MessageSquare className="w-3 h-3" /> Script de Narration
                      </h4>
                      <div className="text-slate-300 text-sm leading-relaxed bg-slate-800/40 p-5 rounded-2xl italic border-l-4 border-emerald-600 shadow-sm">
                        "{currentSlide.speakerNotes}"
                      </div>
                    </section>
                    {currentSlide.demoSteps && (
                      <section>
                        <h4 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 tracking-widest">
                          <Zap className="w-3 h-3" /> Guide Démo
                        </h4>
                        <div className="space-y-3">
                          {currentSlide.demoSteps.map((step, idx) => (
                            <div key={idx} className="group flex gap-3 text-xs bg-slate-800/20 p-3.5 rounded-xl border border-slate-700/50">
                              <span className="font-mono text-[10px] font-bold text-blue-400 bg-blue-500/10 w-5 h-5 flex items-center justify-center rounded-lg shrink-0 border border-blue-500/20">{idx + 1}</span>
                              <span className="text-slate-400">{step}</span>
                            </div>
                          ))}
                        </div>
                      </section>
                    )}
                  </>
                ) : (
                  <>
                    <section className="animate-in fade-in duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[10px] font-black text-emerald-400 uppercase flex items-center gap-2 tracking-widest">
                          <Mic className="w-3 h-3" /> Téléprompteur ({duration}m)
                        </h4>
                        <span className="text-[10px] font-mono font-bold bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                          {currentRunOfShow.timing}
                        </span>
                      </div>
                      <div className="text-white text-base leading-relaxed bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-inner font-medium">
                        {currentRunOfShow.script}
                      </div>
                    </section>

                    <section className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-75">
                      <h4 className="text-[10px] font-black text-blue-400 uppercase mb-3 flex items-center gap-2 tracking-widest">
                        <MousePointer2 className="w-3 h-3" /> Actions à l'écran
                      </h4>
                      <div className="space-y-2">
                        {currentRunOfShow.actions.map((action, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
                            <Zap className="w-3 h-3 text-blue-500" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </section>

                    {currentRunOfShow.transition && (
                      <section className="animate-in fade-in slide-in-from-bottom-2 duration-300 delay-150">
                        <h4 className="text-[10px] font-black text-yellow-500 uppercase mb-3 flex items-center gap-2 tracking-widest">
                          <RefreshCw className="w-3 h-3" /> FAQ Éclair
                        </h4>
                        <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-2xl">
                          <p className="text-xs text-yellow-200/90 leading-relaxed font-medium">
                            {currentRunOfShow.transition}
                          </p>
                        </div>
                      </section>
                    )}
                  </>
                )}

                <div className="mt-auto pt-8">
                  <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 p-4 rounded-2xl border border-slate-700/50 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shadow-inner">
                       <Monitor className="w-6 h-6 animate-pulse" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Visionneuse Active</div>
                      <div className="text-xs text-slate-200 font-medium">Capture d'écran Ready</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 md:hidden flex flex-col p-6 animate-in fade-in zoom-in duration-200 backdrop-blur-sm">
           <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                 <HardHat className="text-emerald-500 w-6 h-6" />
                 <h2 className="text-xl font-bold text-white">Sommaire</h2>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="bg-slate-800 p-2 rounded-full">
                 <X className="w-6 h-6 text-slate-300" />
              </button>
           </div>
           <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => { setCurrentSlideIndex(idx); setSidebarOpen(false); }}
                  className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all border ${
                    idx === currentSlideIndex 
                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className={`font-mono text-xs opacity-50 ${idx === currentSlideIndex ? 'text-white' : ''}`}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </span> 
                  <span className="font-bold flex-1 truncate">{s.title}</span>
                </button>
              ))}
           </div>
           <div className="mt-6 pt-6 border-t border-slate-800 text-center">
              <p className="text-xs text-slate-500">© 2024 SafetyGraph Mining • AgenticX5</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default App;
