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

type ViewState = 'home' | 'para-voce' | 'sos' | 'quiz' | 'result' | 'education';

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
              setCurrentView('sos');
            }}
          />
        );
      case 'education':
        return <EducationView />;
      default:
        return <HomeView onStartQuiz={() => setCurrentView('quiz')} onViewJuliana={() => setCurrentView('education')} />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'home': return "Casa da Mulher";
      case 'para-voce': return "Ferramentas de Cuidado";
      case 'sos': return "Canais de Apoio";
      case 'quiz': return "Questionário";
      case 'result': return "Resultado";
      case 'education': return "Biblioteca";
      default: return "Casa da Mulher";
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
