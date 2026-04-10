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
  const [quizScore, setQuizScore] = useState(0);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'home') setCurrentView('home');
    if (tab === 'para-voce') setCurrentView('para-voce');
    if (tab === 'sos') setCurrentView('sos');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            onStartQuiz={() => setCurrentView('quiz')}
            onViewJuliana={() => setCurrentView('education')}
            onLearnMore={() => setCurrentView('learn-more')}
            onOpenFlora={() => setCurrentView('flora')}
          />
        );
      case 'para-voce':
        return <CareToolsView onNavigate={(view) => setCurrentView(view as ViewState)} />;
      case 'breath':
        return <BreathView onBack={() => setCurrentView('para-voce')} />;
      case 'checkin':
        return <CheckinView onBack={() => setCurrentView('para-voce')} />;
      case 'flora':
        return <FloraView onBack={() => setCurrentView('home')} />;
      case 'experiencias':
        return <ExperienciasView onBack={() => setCurrentView('para-voce')} />;
      case 'sos':
        return <EmergencyView />;
      case 'quiz':
        return (
          <QuizView 
            onComplete={(score) => {
              setQuizScore(score);
              setCurrentView('result');
            }}
            onCancel={() => setCurrentView('home')}
          />
        );
      case 'result':
        return (
          <ResultView 
            score={quizScore} 
            onReset={() => setCurrentView('quiz')}
            onViewContacts={() => {
              setActiveTab('sos');
              setCurrentView('learn-more')
            }}
          />
        );
      case 'education':
        return <EducationView />;
      case 'learn-more':
        return <LearnMore onBack={() => setCurrentView('home')} />;
      default:
        return <HomeView onStartQuiz={() => setCurrentView('quiz')} onViewJuliana={() => setCurrentView('education')} onLearnMore={() => setCurrentView('learn-more')} />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'home': return "Casa da Mulher Brasileira";
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
      showBack={!['home', 'para-voce', 'sos', 'breath', 'checkin', 'flora', 'experiencias'].includes(currentView)}
      onBack={() => setCurrentView('home')}
      showClose={currentView === 'quiz' || currentView === 'result'}
      onClose={() => setCurrentView('home')}
    >
      {renderContent()}
    </Layout>
  );
}
