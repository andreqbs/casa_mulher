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

type ViewState = 'home' | 'para-voce' | 'sos' | 'quiz' | 'result' | 'education' | 'learn-more';

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
          />
        );
      case 'para-voce':
        return <CareToolsView />;
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
      default: return "Casa da Mulher Brasileira";
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      onTabChange={handleTabChange}
      title={getTitle()}
      showBack={currentView !== 'home' && currentView !== 'para-voce' && currentView !== 'sos'}
      onBack={() => setCurrentView('home')}
      showClose={currentView === 'quiz' || currentView === 'result'}
      onClose={() => setCurrentView('home')}
    >
      {renderContent()}
    </Layout>
  );
}
