/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Layout from './components/Layout';
import HomeView from './components/HomeView';
import EmergencyView from './components/EmergencyView';
import QuizView from './components/QuizView';
import ResultView from './components/ResultView';
import EducationView from './components/EducationView';
import CareToolsView from './components/CareToolsView';
import LearnMore from './components/LearnMore';
import BreathView from './components/BreathView';
import CheckinView from './components/CheckinView';
import FloraView from './components/FloraView';
import ExperienciasView from './components/ExperienciasView';

type ViewState = 'home' | 'para-voce' | 'sos' | 'quiz' | 'result' | 'education' | 'learn-more' | 'breath' | 'checkin' | 'flora' | 'experiencias';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [prevView, setPrevView] = useState<ViewState>('home');
  const [quizScore, setQuizScore] = useState(0);

  /** Navegação para frente: salva a tela atual como "anterior" antes de trocar. */
  function navigateTo(next: ViewState) {
    setPrevView(currentView);
    setCurrentView(next);
  }

  /** Botão Voltar do header: retorna à tela anterior salva. */
  function handleBack() {
    setCurrentView(prevView);
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home')      { setPrevView(currentView); setCurrentView('home'); }
    if (tab === 'para-voce') { setPrevView(currentView); setCurrentView('para-voce'); }
    if (tab === 'sos')       { setPrevView(currentView); setCurrentView('sos'); }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            onStartQuiz={() => navigateTo('quiz')}
            onViewJuliana={() => navigateTo('education')}
            onLearnMore={() => navigateTo('learn-more')}
            onOpenFlora={() => navigateTo('flora')}
          />
        );
      case 'para-voce':
        return <CareToolsView onNavigate={(view) => navigateTo(view as ViewState)} />;
      case 'breath':
        return <BreathView onBack={handleBack} />;
      case 'checkin':
        return <CheckinView onBack={handleBack} />;
      case 'flora':
        return <FloraView onBack={handleBack} />;
      case 'experiencias':
        return <ExperienciasView onBack={handleBack} />;
      case 'sos':
        return <EmergencyView />;
      case 'quiz':
        return (
          <QuizView
            onComplete={(score) => {
              setQuizScore(score);
              navigateTo('result');
            }}
            onCancel={handleBack}
          />
        );
      case 'result':
        return (
          <ResultView
            score={quizScore}
            onReset={() => navigateTo('quiz')}
            onViewContacts={() => navigateTo('learn-more')}
          />
        );
      case 'education':
        return <EducationView />;
      case 'learn-more':
        return <LearnMore onBack={handleBack} />;
      default:
        return <HomeView onStartQuiz={() => navigateTo('quiz')} onViewJuliana={() => navigateTo('education')} onLearnMore={() => navigateTo('learn-more')} />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'home': return "Casa da Mulher";
      case 'para-voce': return "Ferramentas de Cuidado";
      case 'sos': return "Canais de Apoio";
      case 'quiz': return "Questionário";
      case 'result': return "Casa da Mulher Brasileira";
      case 'education': return "Casa da Mulher Brasileira";
      case 'learn-more': return "Casa da Mulher Brasileira";
      case 'breath': return "Respiração Guiada";
      case 'checkin': return "Prática do Dia";
      case 'flora': return "Chat com a Flora";
      case 'experiencias': return "Minhas Experiências";
      default: return "Casa da Mulher Brasileira";
    }
  };

  return (
    <Layout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      title={getTitle()}
      showLogo={currentView === 'home'}
      showBack={!['home', 'para-voce', 'sos', 'breath', 'checkin', 'flora', 'experiencias'].includes(currentView)}
      onBack={handleBack}
      hideHeader={['breath', 'checkin', 'flora', 'experiencias'].includes(currentView)}
      showClose={currentView === 'quiz' || currentView === 'result'}
      onClose={() => navigateTo('home')}
    >
      {renderContent()}
    </Layout>
  );
}
