import React, { useState, useRef } from 'react';
import { 
  BookOpen, Brain, Volume2, History, FileText, 
  ChevronRight, ChevronLeft, Play, Pause, RotateCcw,
  Check, X, Award, Clock
} from 'lucide-react';

// ===== 數據結構 - 易於擴充 =====
const chapterData = {
  1: {
    id: 1,
    title: "The Notary Public Office",
    subtitle: "Fundamentals of notary public duties and responsibilities",
    estimatedStudyTime: "15-20 min",
    difficulty: "Beginner",
    isAvailable: true,
    legalCodes: [
      {
        id: 1,
        code: "GC §8201.1",
        title: "Notary Public Duties",
        content: "A notary public is a public officer who performs notarial acts including taking acknowledgments, administering oaths and affirmations, and witnessing signatures as authorized by law.",
        keyPoints: ["Public officer", "Acknowledgments", "Oaths & affirmations", "Witness signatures"]
      },
      {
        id: 2,
        code: "GC §8205", 
        title: "Appointment Process",
        content: "The Secretary of State appoints notaries public. Applicants must meet age, residency, and education requirements as specified by law.",
        keyPoints: ["Secretary of State", "Age requirement", "Residency", "Education"]
      }
    ],
    keyFacts: [
      {
        id: 1,
        fact: "Notary commission lasts 4 years",
        category: "Commission",
        importance: "high"
      },
      {
        id: 2,
        fact: "Must be 18+ years old and California resident",
        category: "Requirements",
        importance: "high"
      }
    ],
    questions: [
      {
        id: 1,
        question: "How long does a notary commission last?",
        options: ["2 years", "3 years", "4 years", "5 years"],
        correct: 2,
        explanation: "According to California law, a notary public commission is valid for 4 years from the date of appointment."
      }
    ],
    flashCards: [
      {
        id: 1,
        front: "Commission Duration",
        back: "4 years from appointment date"
      }
    ]
  },
  2: {
    id: 2,
    title: "Five Steps of Notarization",
    subtitle: "Step-by-step notarization process",
    estimatedStudyTime: "20-25 min",
    difficulty: "Intermediate",
    isAvailable: false,
    legalCodes: [],
    keyFacts: [],
    questions: [],
    flashCards: []
  }
};

// 輔助函數
const getAvailableChapters = () => {
  return Object.values(chapterData).filter(chapter => chapter.isAvailable);
};

const getChapterById = (id) => {
  return chapterData[id] || null;
};

// 樣式
const styles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '1rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(214, 211, 209, 0.6)'
  },
  button: {
    background: 'linear-gradient(135deg, #be7b7b 0%, #a86b6b 100%)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  navButton: {
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  }
};

const NotaryExamApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = useState(0);
  const [showFlashCardAnswer, setShowFlashCardAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [progressData, setProgressData] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: []
  });

  const updateProgress = (isCorrect, questionIndex) => {
    const newProgress = { ...progressData };
    newProgress.questionsAnswered += 1;
    if (isCorrect) {
      newProgress.correctAnswers += 1;
    } else {
      newProgress.wrongAnswers.push({
        chapter: selectedChapter,
        question: questionIndex,
        timestamp: new Date().toISOString()
      });
    }
    setProgressData(newProgress);
  };

  const HomeView = () => {
    const availableChapters = getAvailableChapters();
    
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={{fontSize: '1.75rem', fontWeight: '800', color: '#44403c'}}>
            ACE in Notary Exam California
          </h1>
          <p style={{color: '#be7b7b', fontSize: '0.875rem'}}>
            Bite-size Learning | Sleep Memorizing | AI-driven Optimization
          </p>
        </div>
        
        <div style={styles.card}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
            <h3 style={{fontWeight: '600', color: '#8b5a5a'}}>Learning Progress</h3>
            <Award style={{color: '#be7b7b'}} size={20} />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#be7b7b'}}>
                {progressData.questionsAnswered}
              </div>
              <div style={{fontSize: '0.75rem', color: '#8b5a5a'}}>Questions</div>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#7ba05b'}}>
                {progressData.questionsAnswered > 0 
                  ? Math.round((progressData.correctAnswers / progressData.questionsAnswered) * 100) 
                  : 0}%
              </div>
              <div style={{fontSize: '0.75rem', color: '#8b5a5a'}}>Accuracy</div>
            </div>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
          <button
            onClick={() => setCurrentView('chapters')}
            style={{...styles.card, textAlign: 'left', cursor: 'pointer'}}
          >
            <BookOpen style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c'}}>Chapter Study</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Legal codes & key facts</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('flashcards')}
            style={{...styles.card, textAlign: 'left', cursor: 'pointer'}}
          >
            <Brain style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c'}}>Flash Cards</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Quick memory training</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('quiz')}
            style={{...styles.card, textAlign: 'left', cursor: 'pointer'}}
          >
            <FileText style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c'}}>Practice Quiz</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Test your knowledge</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('audio')}
            style={{...styles.card, textAlign: 'left', cursor: 'pointer'}}
          >
            <Volume2 style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c'}}>Audio Learning</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Sleep learning mode</p>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const ChaptersView = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button onClick={() => setCurrentView('home')} style={styles.navButton}>
            <ChevronLeft style={{color: '#78716c'}} size={20} />
          </button>
          <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Chapter Selection</h2>
          <div></div>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          {Object.values(chapterData).map((chapter) => (
            <div key={chapter.id}>
              {chapter.isAvailable ? (
                <button
                  onClick={() => {
                    setSelectedChapter(chapter.id);
                    setCurrentView('summary');
                  }}
                  style={{...styles.card, width: '100%', textAlign: 'left', cursor: 'pointer'}}
                >
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                      <h3 style={{fontWeight: '500', color: '#44403c'}}>
                        Chapter {chapter.id}: {chapter.title}
                      </h3>
                      <p style={{fontSize: '0.875rem', color: '#78716c'}}>{chapter.subtitle}</p>
                    </div>
                    <ChevronRight style={{color: '#d6d3d1'}} size={20} />
                  </div>
                </button>
              ) : (
                <div style={{...styles.card, opacity: 0.5}}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                      <h3 style={{fontWeight: '500', color: '#78716c'}}>
                        Chapter {chapter.id}: {chapter.title}
                      </h3>
                      <p style={{fontSize: '0.875rem', color: '#a8a29e'}}>Coming soon</p>
                    </div>
                    <Clock style={{color: '#d6d3d1'}} size={20} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SummaryView = () => {
    const chapter = getChapterById(selectedChapter);
    if (!chapter) return <div style={styles.card}>Chapter not found</div>;
    
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button onClick={() => setCurrentView('chapters')} style={styles.navButton}>
            <ChevronLeft style={{color: '#78716c'}} size={20} />
          </button>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Chapter {chapter.id}</h2>
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>{chapter.title}</p>
          </div>
          <div></div>
        </div>

        {chapter.legalCodes.length > 0 && (
          <div>
            <h3 style={{fontWeight: '600', color: '#8b5a5a', marginBottom: '0.75rem'}}>Legal Codes</h3>
            {chapter.legalCodes.map((code) => (
              <div key={code.id} style={styles.card}>
                <h4 style={{fontWeight: '500', color: '#44403c'}}>{code.title}</h4>
                <p style={{color: '#78716c', fontSize: '0.875rem'}}>{code.content}</p>
              </div>
            ))}
          </div>
        )}

        {chapter.keyFacts.length > 0 && (
          <div>
            <h3 style={{fontWeight: '600', color: '#8b5a5a', marginBottom: '0.75rem'}}>Key Facts</h3>
            <div style={styles.card}>
              {chapter.keyFacts.map((factObj) => (
                <div key={factObj.id} style={{marginBottom: '0.5rem'}}>
                  <span style={{color: '#57534e', fontSize: '0.875rem'}}>{factObj.fact}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const FlashCardsView = () => {
    const chapter = getChapterById(selectedChapter);
    if (!chapter || !chapter.flashCards || chapter.flashCards.length === 0) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <button onClick={() => setCurrentView('home')} style={styles.navButton}>
              <ChevronLeft style={{color: '#78716c'}} size={20} />
            </button>
            <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Flash Cards</h2>
            <div></div>
          </div>
          <div style={styles.card}>
            <p>No flash cards available for this chapter yet.</p>
          </div>
        </div>
      );
    }

    const cards = chapter.flashCards;
    const currentCard = cards[currentFlashCardIndex];

    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button onClick={() => setCurrentView('home')} style={styles.navButton}>
            <ChevronLeft style={{color: '#78716c'}} size={20} />
          </button>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Flash Cards</h2>
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>{currentFlashCardIndex + 1} / {cards.length}</p>
          </div>
          <div></div>
        </div>

        <div style={{...styles.card, minHeight: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '1.125rem', fontWeight: '500', color: '#44403c', marginBottom: '1rem'}}>
              {showFlashCardAnswer ? currentCard.back : currentCard.front}
            </div>
            {!showFlashCardAnswer ? (
              <button
                onClick={() => setShowFlashCardAnswer(true)}
                style={styles.button}
              >
                Show Answer
              </button>
            ) : (
              <button
                onClick={() => {
                  if (currentFlashCardIndex < cards.length - 1) {
                    setCurrentFlashCardIndex(currentFlashCardIndex + 1);
                    setShowFlashCardAnswer(false);
                  }
                }}
                style={styles.button}
              >
                Next Card
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const QuizView = () => {
    const chapter = getChapterById(selectedChapter);
    if (!chapter || !chapter.questions || chapter.questions.length === 0) {
      return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <button onClick={() => setCurrentView('home')} style={styles.navButton}>
              <ChevronLeft style={{color: '#78716c'}} size={20} />
            </button>
            <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Practice Quiz</h2>
            <div></div>
          </div>
          <div style={styles.card}>
            <p>No quiz questions available for this chapter yet.</p>
          </div>
        </div>
      );
    }

    const questions = chapter.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const userAnswer = userAnswers[currentQuestionIndex];

    const handleAnswer = (answerIndex) => {
      const newAnswers = { ...userAnswers };
      newAnswers[currentQuestionIndex] = answerIndex;
      setUserAnswers(newAnswers);
      
      const isCorrect = answerIndex === currentQuestion.correct;
      updateProgress(isCorrect, currentQuestionIndex);
    };

    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button onClick={() => setCurrentView('home')} style={styles.navButton}>
            <ChevronLeft style={{color: '#78716c'}} size={20} />
          </button>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Practice Quiz</h2>
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>{currentQuestionIndex + 1} / {questions.length}</p>
          </div>
          <div></div>
        </div>

        <div style={styles.card}>
          <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '1rem'}}>{currentQuestion.question}</h3>
          
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e7e5e4',
                  cursor: 'pointer',
                  backgroundColor: userAnswer === index
                    ? userAnswer === currentQuestion.correct ? '#dcfce7' : '#fecaca'
                    : '#fafaf9'
                }}
              >
                {option}
              </button>
            ))}
          </div>

          {userAnswer !== undefined && (
            <div style={{
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: '#eff6ff',
              borderRadius: '0.5rem'
            }}>
              <p style={{color: '#1e40af', fontSize: '0.875rem'}}>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const AudioView = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <button onClick={() => setCurrentView('home')} style={styles.navButton}>
          <ChevronLeft style={{color: '#78716c'}} size={20} />
        </button>
        <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Audio Learning</h2>
        <div></div>
      </div>
      <div style={styles.card}>
        <p>Audio learning features coming soon!</p>
      </div>
    </div>
  );

  return (
    <div>
      {currentView === 'home' && <HomeView />}
      {currentView === 'chapters' && <ChaptersView />}
      {currentView === 'summary' && <SummaryView />}
      {currentView === 'flashcards' && <FlashCardsView />}
      {currentView === 'quiz' && <QuizView />}
      {currentView === 'audio' && <AudioView />}
    </div>
  );
};

export default NotaryExamApp;