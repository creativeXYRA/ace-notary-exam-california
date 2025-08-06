import { useChapters, useStats } from '../hooks/useContent';
import React, { useState, useRef } from 'react';
import { 
  BookOpen, Brain, Volume2, History, FileText, 
  ChevronRight, ChevronLeft, Play, Pause, RotateCcw,
  Check, X, Award, Clock
} from 'lucide-react';

const chapterData = {
  1: {
    id: 1,
    title: "The Notary Public Office",
    subtitle: "Introduction to the notary public office and responsibilities",
    estimatedStudyTime: "30 minutes",
    difficulty: "Beginner",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "GC § 8200",
        title: "Definition of Notary Public",
        content: "A notary public is a public officer whose function it is to administer oaths and affirmations, to attest to and certify, by his or her hand and official seal, such matters as are required by law.",
        keyPoints: [
          "Public officer appointed by Secretary of State",
          "Administers oaths and affirmations",
          "Certifies legal documents",
          "Uses official seal for authentication"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "California notaries serve 4-year terms and must maintain a $15,000 surety bond",
        category: "Term & Bond",
        importance: "high"
      }
    ],

    questions: [
      {
        question: "What is the primary role of a California notary public?",
        options: [
          "Provide legal advice to clients",
          "Prepare legal documents",
          "Serve as an impartial witness to document signings",
          "Represent clients in court"
        ],
        correct: 2,
        explanation: "A notary's primary role is to serve as an impartial witness to document signings and verify the identity of signers."
      }
    ],

    flashCards: [
      {
        front: "What are the basic requirements to become a California notary?",
        back: "• Be 18 years or older\n• Be a legal resident of California\n• Complete required education\n• Not be disqualified by law\n• Pass the state exam"
      }
    ]
  },

  2: {
    id: 2,
    title: "Five Steps of Notarization",
    subtitle: "Learn the proper steps of any notarization",
    estimatedStudyTime: "45 minutes",
    difficulty: "Intermediate",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "CC §§ 1189, 1190 & GC § 8202",
        title: "Personal Appearance Requirement",
        content: "Before any notarization is complete, the signer must appear in person before the Notary Public.",
        keyPoints: [
          "Physical presence is mandatory",
          "No remote notarization alternatives"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "The five steps must be followed in order: 1) Personal appearance, 2) Scan document, 3) Identify signer, 4) Record journal, 5) Complete certificate",
        category: "Process",
        importance: "high"
      }
    ],

    questions: [
      {
        question: "What is the proper sequence for the five steps of notarization?",
        options: [
          "Identify, appear, scan, record, complete",
          "Appear, scan, identify, record, complete",
          "Scan, appear, identify, complete, record",
          "Appear, identify, scan, complete, record"
        ],
        correct: 1,
        explanation: "The correct order is: 1) Require personal appearance, 2) Scan the document, 3) Identify and screen the signer, 4) Record the journal entry, 5) Complete the notarial certificate."
      }
    ],

    flashCards: [
      {
        front: "What are the five steps of notarization in order?",
        back: "1) Require personal appearance\n2) Scan the document for completeness\n3) Identify and screen the signer\n4) Record the journal entry\n5) Complete the notarial certificate"
      }
    ]
  }
};

const getChapterById = (id) => {
  return chapterData[id] || null;
};

const styles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '1rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(214, 211, 209, 0.6)'
  },
  progressCard: {
    background: 'linear-gradient(135deg, #f2e6e6 0%, #e8d6d6 100%)',
    borderRadius: '1rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid rgba(190, 123, 123, 0.2)'
  },
  button: {
    background: 'linear-gradient(135deg, #be7b7b 0%, #a86b6b 100%)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)',
    color: '#57534e',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(214, 211, 209, 0.6)',
    cursor: 'pointer',
    fontFamily: 'inherit'
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '1rem',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(214, 211, 209, 0.6)',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#44403c',
    marginBottom: '0.25rem'
  },
  subtitle: {
    color: '#be7b7b',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.5rem'
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#8b5a5a',
    marginBottom: '0.75rem'
  },
  navButton: {
    padding: '0.5rem',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '0.5rem'
  }
};

const NotaryExamApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedChapters, setSelectedChapters] = useState([1]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = useState(0);
  const [showFlashCardAnswer, setShowFlashCardAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [audioContent, setAudioContent] = useState('legal-codes');
  const [isVIP, setIsVIP] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const speechRef = useRef(null);
  
  const [progressData, setProgressData] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: [],
    currentStreak: 0
  });

  const getCombinedChapterData = () => {
    if (selectedChapters.length === 1) {
      return getChapterById(selectedChapters[0]);
    }
    
    const combinedData = {
      id: 'combined',
      title: `Chapters ${selectedChapters.join(', ')}`,
      subtitle: 'Combined study materials',
      legalCodes: [],
      keyFacts: [],
      questions: [],
      flashCards: []
    };
    
    selectedChapters.forEach(chapterId => {
      const chapter = getChapterById(chapterId);
      if (chapter) {
        combinedData.legalCodes.push(...chapter.legalCodes);
        combinedData.keyFacts.push(...chapter.keyFacts);
        combinedData.questions.push(...chapter.questions);
        combinedData.flashCards.push(...chapter.flashCards);
      }
    });
    
    return combinedData;
  };

  const checkVIPFeature = (feature) => {
    const vipFeatures = ['podcast', 'ai-review'];
    if (vipFeatures.includes(feature) && !isVIP) {
      setShowPaymentModal(true);
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    setTimeout(() => {
      setIsVIP(true);
      setShowPaymentModal(false);
      alert('Payment successful! You are now a VIP member.');
    }, 2000);
  };

  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const updateProgress = (isCorrect) => {
    const newProgress = { ...progressData };
    newProgress.questionsAnswered += 1;
    if (isCorrect) {
      newProgress.correctAnswers += 1;
    }
    setProgressData(newProgress);
  };

  const HomeView = () => {
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={styles.title}>ACE in Notary Exam California</h1>
          <p style={styles.subtitle}>Bite-size Learning | Sleep Memorizing | AI-driven Optimization</p>
          {isVIP && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#fbbf24',
              color: '#92400e',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              marginTop: '0.5rem'
            }}>
              <Award size={14} />
              VIP Member
            </div>
          )}
        </div>
        
        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Study Chapters</h3>
          <div style={{marginBottom: '1rem'}}>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#57534e', marginBottom: '0.5rem'}}>
              Select chapters to study:
            </label>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1rem'}}>
              {Object.values(chapterData).map(chapter => (
                <label key={chapter.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #e7e5e4',
                  cursor: 'pointer',
                  backgroundColor: selectedChapters.includes(chapter.id) ? '#f2e6e6' : 'white'
                }}>
                  <input
                    type="checkbox"
                    checked={selectedChapters.includes(chapter.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedChapters([...selectedChapters, chapter.id]);
                      } else {
                        setSelectedChapters(selectedChapters.filter(id => id !== chapter.id));
                      }
                    }}
                  />
                  <span style={{fontSize: '0.875rem', color: '#44403c'}}>Ch.{chapter.id}</span>
                </label>
              ))}
            </div>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button
                onClick={() => setSelectedChapters([1, 2])}
                style={{...styles.buttonSecondary, fontSize: '0.875rem', padding: '0.5rem 1rem'}}
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedChapters([1])}
                style={{...styles.buttonSecondary, fontSize: '0.875rem', padding: '0.5rem 1rem'}}
              >
                Clear All
              </button>
            </div>
          </div>
          <div style={{fontSize: '0.875rem', color: '#78716c'}}>
            Currently selected: {selectedChapters.length} chapter(s)
          </div>
        </div>
        
        <div style={styles.progressCard}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem'}}>
            <h3 style={styles.sectionTitle}>Learning Progress</h3>
            <Award style={{color: '#be7b7b'}} size={20} />
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#be7b7b'}}>{progressData.questionsAnswered}</div>
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
            onClick={() => setCurrentView('summary')}
            style={{...styles.featureCard, textAlign: 'left'}}
          >
            <BookOpen style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Study Materials</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Legal codes & key facts</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('flashcards')}
            style={{...styles.featureCard, textAlign: 'left'}}
          >
            <Brain style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Flash Cards</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Quick memory training</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('quiz')}
            style={{...styles.featureCard, textAlign: 'left'}}
          >
            <FileText style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Practice Quiz</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Test your knowledge</p>
            </div>
          </button>

          <button
            onClick={() => setCurrentView('audio')}
            style={{...styles.featureCard, textAlign: 'left'}}
          >
            <Volume2 style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Audio Learning</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Sleep learning mode</p>
            </div>
          </button>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
          <button
            onClick={() => checkVIPFeature('podcast') && setCurrentView('podcast')}
            style={{
              ...styles.featureCard, 
              textAlign: 'left',
              border: !isVIP ? '2px dashed #fbbf24' : '1px solid rgba(214, 211, 209, 0.6)',
              position: 'relative'
            }}
          >
            {!isVIP && (
              <div style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                backgroundColor: '#fbbf24',
                color: '#92400e',
                fontSize: '0.625rem',
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
                fontWeight: '500'
              }}>
                VIP
              </div>
            )}
            <Volume2 style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>AI Podcast</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Professional audio content</p>
            </div>
          </button>

          <button
            onClick={() => checkVIPFeature('ai-review') && setCurrentView('ai-review')}
            style={{
              ...styles.featureCard, 
              textAlign: 'left',
              border: !isVIP ? '2px dashed #fbbf24' : '1px solid rgba(214, 211, 209, 0.6)',
              position: 'relative'
            }}
          >
            {!isVIP && (
              <div style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.5rem',
                backgroundColor: '#fbbf24',
                color: '#92400e',
                fontSize: '0.625rem',
                padding: '0.125rem 0.375rem',
                borderRadius: '0.25rem',
                fontWeight: '500'
              }}>
                VIP
              </div>
            )}
            <Brain style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>AI Review</h3>
              <p style={{fontSize: '0.875rem', color: '#78716c'}}>Personalized study plan</p>
            </div>
          </button>
        </div>
      </div>
    );
  };

  const SummaryView = () => {
    const chapter = getCombinedChapterData();
    if (!chapter) return <div style={styles.card}>Chapter not found</div>;
    
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button onClick={() => setCurrentView('home')} style={styles.navButton}>
            <ChevronLeft style={{color: '#78716c'}} size={20} />
          </button>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontWeight: 'bold', color: '#44403c'}}>{chapter.title}</h2>
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>{chapter.subtitle}</p>
          </div>
          <div></div>
        </div>

        {chapter.legalCodes.length > 0 && (
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <h3 style={styles.sectionTitle}>Legal Codes</h3>
              <button
                onClick={() => speakText(chapter.legalCodes.map(code => `${code.title}: ${code.content}`).join('. '))}
                style={{...styles.buttonSecondary, padding: '0.5rem'}}
              >
                <Volume2 size={16} />
              </button>
            </div>
            {chapter.legalCodes.map((code) => (
              <div key={code.id} style={{...styles.card, marginBottom: '0.75rem'}}>
                <div style={{display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <h4 style={{fontWeight: '500', color: '#44403c'}}>{code.title}</h4>
                  <div style={{display: 'flex', gap: '0.5rem', alignItems: 'center'}}>
                    <button
                      onClick={() => speakText(`${code.title}: ${code.content}`)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '0.25rem',
                        color: '#be7b7b'
                      }}
                    >
                      <Volume2 size={14} />
                    </button>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#be7b7b',
                      backgroundColor: '#f2e6e6',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}>{code.code}</span>
                  </div>
                </div>
                <p style={{color: '#78716c', fontSize: '0.875rem', lineHeight: '1.625', marginBottom: '0.5rem'}}>{code.content}</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                  {code.keyPoints.map((point, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.75rem',
                      backgroundColor: '#f5f5f4',
                      color: '#68615a',
                      padding: '0.125rem 0.5rem',
                      borderRadius: '0.25rem'
                    }}>
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {chapter.keyFacts.length > 0 && (
          <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem'}}>
              <h3 style={styles.sectionTitle}>Key Facts</h3>
              <button
                onClick={() => speakText(chapter.keyFacts.map(fact => fact.fact).join('. '))}
                style={{...styles.buttonSecondary, padding: '0.5rem'}}
              >
                <Volume2 size={16} />
              </button>
            </div>
            <div style={styles.card}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
                {chapter.keyFacts.map((factObj) => (
                  <div key={factObj.id} style={{
                    display: 'flex',
                    alignItems: 'start',
                    gap: '0.75rem',
                    padding: '0.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: '#fafaf9'
                  }}>
                    <div style={{
                      width: '0.75rem',
                      height: '0.75rem',
                      borderRadius: '50%',
                      marginTop: '0.25rem',
                      flexShrink: 0,
                      backgroundColor: factObj.importance === 'high' ? '#f87171' : '#facc15'
                    }}></div>
                    <div style={{flex: 1}}>
                      <span style={{color: '#57534e', fontSize: '0.875rem'}}>{factObj.fact}</span>
                      <div style={{fontSize: '0.75rem', color: '#a8a29e', marginTop: '0.25rem'}}>
                        Category: {factObj.category}
                      </div>
                    </div>
                    <button
                      onClick={() => speakText(factObj.fact)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        borderRadius: '0.25rem',
                        color: '#be7b7b'
                      }}
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const FlashCardsView = () => {
    const chapter = getCombinedChapterData();
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
            <p>No flash cards available for the selected chapters yet.</p>
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
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>
              {currentFlashCardIndex + 1} / {cards.length}
            </p>
          </div>
          <div></div>
        </div>

        <div style={{...styles.card, minHeight: '12rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{fontSize: '1.125rem', fontWeight: '500', color: '#44403c', marginBottom: '1rem', whiteSpace: 'pre-line'}}>
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
              <div style={{display: 'flex', justifyContent: 'center', gap: '0.75rem'}}>
                <button
                  onClick={() => {
                    if (currentFlashCardIndex < cards.length - 1) {
                      setCurrentFlashCardIndex(currentFlashCardIndex + 1);
                      setShowFlashCardAnswer(false);
                    }
                  }}
                  disabled={currentFlashCardIndex === cards.length - 1}
                  style={{
                    ...styles.button,
                    backgroundColor: currentFlashCardIndex === cards.length - 1 ? '#d6d3d1' : '#22c55e'
                  }}
                >
                  Got it! Next
                </button>
                <button
                  onClick={() => setShowFlashCardAnswer(false)}
                  style={styles.buttonSecondary}
                >
                  Review Again
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button
            onClick={() => {
              setCurrentFlashCardIndex(Math.max(0, currentFlashCardIndex - 1));
              setShowFlashCardAnswer(false);
            }}
            disabled={currentFlashCardIndex === 0}
            style={{
              ...styles.buttonSecondary,
              opacity: currentFlashCardIndex === 0 ? 0.5 : 1
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setCurrentFlashCardIndex(Math.min(cards.length - 1, currentFlashCardIndex + 1));
              setShowFlashCardAnswer(false);
            }}
            disabled={currentFlashCardIndex === cards.length - 1}
            style={{
              ...styles.button,
              opacity: currentFlashCardIndex === cards.length - 1 ? 0.5 : 1
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  const QuizView = () => {
    const chapter = getCombinedChapterData();
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
            <p>No quiz questions available for the selected chapters yet.</p>
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
      updateProgress(isCorrect);
    };

    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button onClick={() => setCurrentView('home')} style={styles.navButton}>
            <ChevronLeft style={{color: '#78716c'}} size={20} />
          </button>
          <div style={{textAlign: 'center'}}>
            <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Practice Quiz</h2>
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>
              {currentQuestionIndex + 1} / {questions.length}
            </p>
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
                  border: '1px solid',
                  cursor: 'pointer',
                  backgroundColor: userAnswer === index
                    ? userAnswer === currentQuestion.correct
                      ? '#dcfce7'
                      : '#fecaca'
                    : '#fafaf9',
                  borderColor: userAnswer === index
                    ? userAnswer === currentQuestion.correct
                      ? '#16a34a'
                      : '#dc2626'
                    : '#e7e5e4',
                  color: userAnswer === index
                    ? userAnswer === currentQuestion.correct
                      ? '#166534'
                      : '#991b1b'
                    : '#44403c'
                }}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <span style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    borderRadius: '50%',
                    border: '2px solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem'
                  }}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span>{option}</span>
                  {userAnswer === index && (
                    userAnswer === currentQuestion.correct ? 
                    <Check style={{color: '#16a34a', marginLeft: 'auto'}} size={20} /> :
                    <X style={{color: '#dc2626', marginLeft: 'auto'}} size={20} />
                  )}
                </div>
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
              <h4 style={{fontWeight: '500', color: '#1d4ed8', marginBottom: '0.5rem'}}>Explanation</h4>
              <p style={{color: '#1e40af', fontSize: '0.875rem'}}>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
            style={{
              ...styles.buttonSecondary,
              opacity: currentQuestionIndex === 0 ? 0.5 : 1
            }}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
            disabled={currentQuestionIndex === questions.length - 1}
            style={{
              ...styles.button,
              opacity: currentQuestionIndex === questions.length - 1 ? 0.5 : 1
            }}
          >
            Next
          </button>
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
        <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <div style={{
            width: '5rem',
            height: '5rem',
            backgroundColor: '#f2e6e6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <Volume2 style={{color: '#be7b7b'}} size={32} />
          </div>
          <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.5rem'}}>Sleep Learning Mode</h3>
          <p style={{fontSize: '0.875rem', color: '#78716c'}}>Perfect for commuting or bedtime study</p>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
          <button
            onClick={() => speakText('This is a test of the audio learning feature.')}
            style={styles.button}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Play size={20} />
              <span>Play Audio</span>
            </div>
          </button>
          <button
            onClick={stopSpeaking}
            style={styles.buttonSecondary}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <RotateCcw size={20} />
              <span>Stop</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );

  const PodcastView = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <button onClick={() => setCurrentView('home')} style={styles.navButton}>
          <ChevronLeft style={{color: '#78716c'}} size={20} />
        </button>
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontWeight: 'bold', color: '#44403c'}}>AI Podcast</h2>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: '#fbbf24',
            color: '#92400e',
            padding: '0.125rem 0.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            <Award size={12} />
            VIP Feature
          </div>
        </div>
        <div></div>
      </div>

      <div style={styles.card}>
        <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.5rem'}}>Professional Podcast Episodes</h3>
          <p style={{fontSize: '0.875rem', color: '#78716c'}}>AI-generated expert discussions on notary topics</p>
        </div>

        <div style={{
          padding: '1rem',
          border: '1px solid #e7e5e4',
          borderRadius: '0.75rem',
          backgroundColor: '#fafaf9'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
            <h4 style={{fontWeight: '500', color: '#44403c'}}>Sample Episode: Chapter 1</h4>
            <span style={{fontSize: '0.75rem', color: '#78716c'}}>25 min</span>
          </div>
          <p style={{fontSize: '0.875rem', color: '#78716c', marginBottom: '0.75rem'}}>
            Expert discussion covering key legal codes and practical applications
          </p>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <button style={{...styles.button, fontSize: '0.875rem', padding: '0.5rem 1rem'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Play size={14} />
                Play Episode
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AIReviewView = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <button onClick={() => setCurrentView('home')} style={styles.navButton}>
          <ChevronLeft style={{color: '#78716c'}} size={20} />
        </button>
        <div style={{textAlign: 'center'}}>
          <h2 style={{fontWeight: 'bold', color: '#44403c'}}>AI Review Assistant</h2>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            backgroundColor: '#fbbf24',
            color: '#92400e',
            padding: '0.125rem 0.5rem',
            borderRadius: '0.5rem',
            fontSize: '0.75rem',
            fontWeight: '500'
          }}>
            <Award size={12} />
            VIP Feature
          </div>
        </div>
        <div></div>
      </div>

      <div style={styles.card}>
        <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
          <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.5rem'}}>Personalized Study Plan</h3>
          <p style={{fontSize: '0.875rem', color: '#78716c'}}>AI-driven recommendations based on your performance</p>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#f0f9ff',
          borderRadius: '0.75rem',
          border: '1px solid #bae6fd'
        }}>
          <h4 style={{fontWeight: '500', color: '#0369a1', marginBottom: '0.5rem'}}>📊 Performance Analysis</h4>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
            <div>
              <div style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#0369a1'}}>
                {progressData.questionsAnswered > 0 
                  ? Math.round((progressData.correctAnswers / progressData.questionsAnswered) * 100) 
                  : 0}%
              </div>
              <div style={{fontSize: '0.875rem', color: '#0369a1'}}>Overall Accuracy</div>
            </div>
            <div>
              <div style={{fontSize: '1.25rem', fontWeight: 'bold', color: '#0369a1'}}>{progressData.currentStreak}</div>
              <div style={{fontSize: '0.875rem', color: '#0369a1'}}>Current Streak</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const HistoryView = () => {
    const accuracy = progressData.questionsAnswered > 0 
      ? Math.round((progressData.correctAnswers / progressData.questionsAnswered) * 100) 
      : 0;
    
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <button onClick={() => setCurrentView('home')} style={styles.navButton}>
            <ChevronLeft style={{color: '#78716c'}} size={20} />
          </button>
          <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Learning History</h2>
          <div></div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
          <div style={styles.card}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#be7b7b'}}>{progressData.questionsAnswered}</div>
              <div style={{fontSize: '0.875rem', color: '#78716c'}}>Questions Answered</div>
            </div>
          </div>
          <div style={styles.card}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#22c55e'}}>{accuracy}%</div>
              <div style={{fontSize: '0.875rem', color: '#78716c'}}>Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ResourcesView = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <button onClick={() => setCurrentView('home')} style={styles.navButton}>
          <ChevronLeft style={{color: '#78716c'}} size={20} />
        </button>
        <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Official Resources</h2>
        <div></div>
      </div>

      <div style={styles.card}>
        <h3 style={{fontWeight: '600', color: '#8b5a5a', marginBottom: '0.75rem'}}>California Secretary of State</h3>
        <a 
          href="https://www.sos.ca.gov/notary/handbook" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem',
            backgroundColor: '#f2e6e6',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            color: 'inherit'
          }}
        >
          <div>
            <h4 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Notary Public Handbook</h4>
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>Official study guide</p>
          </div>
          <ChevronRight style={{color: '#be7b7b'}} size={16} />
        </a>
      </div>
    </div>
  );

  const PaymentModal = () => {
    if (!showPaymentModal) return null;
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '400px',
          width: '100%',
          position: 'relative'
        }}>
          <button
            onClick={() => setShowPaymentModal(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#78716c'
            }}
          >
            ×
          </button>
          
          <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
            <div style={{
              width: '4rem',
              height: '4rem',
              backgroundColor: '#fbbf24',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <Award style={{color: 'white'}} size={28} />
            </div>
            <h3 style={{fontWeight: 'bold', color: '#44403c', marginBottom: '0.5rem'}}>Upgrade to VIP</h3>
            <p style={{fontSize: '0.875rem', color: '#78716c'}}>Unlock premium features for better exam preparation</p>
          </div>

          <div style={{
            border: '2px solid #fbbf24',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            backgroundColor: '#fffbeb'
          }}>
            <div style={{textAlign: 'center', marginBottom: '1rem'}}>
              <div style={{fontSize: '2rem', fontWeight: 'bold', color: '#92400e'}}>$19.99</div>
              <div style={{fontSize: '0.875rem', color: '#92400e'}}>One-time payment</div>
            </div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#92400e'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Check size={16} style={{color: '#22c55e'}} />
                <span>AI-generated podcast episodes</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Check size={16} style={{color: '#22c55e'}} />
                <span>Personalized AI study recommendations</span>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Check size={16} style={{color: '#22c55e'}} />
                <span>Advanced performance analytics</span>
              </div>
            </div>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            <button
              onClick={handlePayment}
              style={{
                ...styles.button,
                width: '100%',
                fontSize: '1rem',
                padding: '0.875rem'
              }}
            >
              Upgrade Now - $19.99
            </button>
            <button
              onClick={() => setShowPaymentModal(false)}
              style={{
                ...styles.buttonSecondary,
                width: '100%',
                fontSize: '0.875rem'
              }}
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {currentView === 'home' && <HomeView />}
      {currentView === 'summary' && <SummaryView />}
      {currentView === 'flashcards' && <FlashCardsView />}
      {currentView === 'quiz' && <QuizView />}
      {currentView === 'audio' && <AudioView />}
      {currentView === 'podcast' && <PodcastView />}
      {currentView === 'ai-review' && <AIReviewView />}
      {currentView === 'history' && <HistoryView />}
      {currentView === 'resources' && <ResourcesView />}
      <PaymentModal />
    </div>
  );
};

export default NotaryExamApp;