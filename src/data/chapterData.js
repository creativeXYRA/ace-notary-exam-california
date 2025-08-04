// ===============================================
// 章節數據結構 - 設計為容易擴充
// ===============================================

export const chapterData = {
  1: {
    id: 1,
    title: "The Notary Public Office",
    subtitle: "Foundation & Legal Framework",
    isAvailable: true,
    estimatedStudyTime: "45 minutes",
    difficulty: "Beginner",
    
    legalCodes: [
      {
        id: "gc8201.1",
        code: "GC §8201.1",
        title: "Notary Public Duties",
        content: "A notary public is a public officer who performs notarial acts including taking acknowledgments, administering oaths and affirmations, and witnessing signatures as authorized by law.",
        keyPoints: [
          "Public officer status",
          "Authorized notarial acts only",
          "Legal framework compliance"
        ]
      },
      {
        id: "gc8205",
        code: "GC §8205", 
        title: "Appointment Process",
        content: "The Secretary of State appoints notaries public. Applicants must meet age, residency, and education requirements as specified by law.",
        keyPoints: [
          "Secretary of State appointment",
          "Age requirement compliance",
          "Education prerequisites"
        ]
      },
      {
        id: "gc8224",
        code: "GC §8224",
        title: "Scope of Authority",
        content: "A notary public may perform notarial acts only within California and may not exceed the authority granted by law.",
        keyPoints: [
          "California jurisdiction only",
          "Legal authority limits",
          "Geographic restrictions"
        ]
      },
      {
        id: "gc8224.1",
        code: "GC §8224.1",
        title: "Identity Verification",
        content: "A notary public must verify the identity of a signer through satisfactory evidence as required by law.",
        keyPoints: [
          "Mandatory identity verification",
          "Satisfactory evidence requirement",
          "Legal compliance standards"
        ]
      }
    ],
    
    keyFacts: [
      {
        id: "duration",
        fact: "Notary commission lasts 4 years",
        category: "Commission",
        importance: "high"
      },
      {
        id: "age",
        fact: "Must be 18+ years old and California resident",
        category: "Eligibility",
        importance: "high"
      },
      {
        id: "education",
        fact: "Required to complete 6-hour education course",
        category: "Education",
        importance: "high"
      },
      {
        id: "exam",
        fact: "Must pass Secretary of State examination",
        category: "Testing",
        importance: "high"
      },
      {
        id: "bond",
        fact: "Required $15,000 surety bond",
        category: "Financial",
        importance: "medium"
      },
      {
        id: "violations",
        fact: "Criminal violations may result in commission revocation",
        category: "Legal",
        importance: "high"
      }
    ],
    
    questions: [
      {
        id: "q1",
        question: "How long does a notary commission last?",
        options: ["2 years", "3 years", "4 years", "5 years"],
        correct: 2,
        explanation: "According to California law, a notary public commission is valid for 4 years from the date of appointment.",
        difficulty: "easy",
        category: "Commission",
        relatedLegalCode: "gc8205"
      },
      {
        id: "q2",
        question: "What is the minimum age requirement to become a notary?",
        options: ["16 years", "18 years", "21 years", "25 years"],
        correct: 1,
        explanation: "Applicants must be at least 18 years old to be eligible for notary appointment.",
        difficulty: "easy",
        category: "Eligibility",
        relatedLegalCode: "gc8205"
      },
      {
        id: "q3",
        question: "How many hours of education are required for notaries?",
        options: ["3 hours", "6 hours", "9 hours", "12 hours"],
        correct: 1,
        explanation: "California law requires notary applicants to complete a 6-hour education course.",
        difficulty: "easy",
        category: "Education",
        relatedLegalCode: "gc8205"
      },
      {
        id: "q4",
        question: "What is the required surety bond amount?",
        options: ["$10,000", "$15,000", "$20,000", "$25,000"],
        correct: 1,
        explanation: "Notaries must obtain a $15,000 surety bond to protect the public from potential damages.",
        difficulty: "medium",
        category: "Financial",
        relatedLegalCode: "gc8205"
      },
      {
        id: "q5",
        question: "Where may a California notary perform notarial acts?",
        options: ["Any state", "Western states", "California only", "Neighboring states"],
        correct: 2,
        explanation: "A notary public may perform notarial acts only within the state of California.",
        difficulty: "medium",
        category: "Authority",
        relatedLegalCode: "gc8224"
      },
      {
        id: "q6",
        question: "Who appoints notaries public in California?",
        options: ["Governor", "Secretary of State", "Courts", "County government"],
        correct: 1,
        explanation: "The Secretary of State's office is responsible for appointing and overseeing notaries public.",
        difficulty: "easy",
        category: "Appointment",
        relatedLegalCode: "gc8205"
      },
      {
        id: "q7",
        question: "What is required for identity verification?",
        options: ["Verbal confirmation", "Satisfactory evidence", "Third-party witness", "Name only"],
        correct: 1,
        explanation: "Notaries must verify signer identity through satisfactory evidence as defined by law.",
        difficulty: "medium",
        category: "Verification",
        relatedLegalCode: "gc8224.1"
      },
      {
        id: "q8",
        question: "What may result from criminal violations?",
        options: ["Warning", "Fine only", "Commission revocation", "Additional training"],
        correct: 2,
        explanation: "Serious criminal violations may result in the Secretary of State revoking the notary commission.",
        difficulty: "hard",
        category: "Legal",
        relatedLegalCode: "gc8201.1"
      }
    ],
    
    flashCards: [
      {
        id: "fc1",
        front: "Commission Duration",
        back: "4 years from appointment date",
        category: "Commission",
        difficulty: "easy"
      },
      {
        id: "fc2",
        front: "Minimum Age Requirement",
        back: "18 years old + CA resident",
        category: "Eligibility",
        difficulty: "easy"
      },
      {
        id: "fc3",
        front: "Education Requirement",
        back: "6-hour mandatory course",
        category: "Education",
        difficulty: "easy"
      },
      {
        id: "fc4",
        front: "Surety Bond Amount",
        back: "$15,000 bond required",
        category: "Financial",
        difficulty: "medium"
      },
      {
        id: "fc5",
        front: "Geographic Authority",
        back: "California only - no other states",
        category: "Authority",
        difficulty: "medium"
      },
      {
        id: "fc6",
        front: "Identity Verification",
        back: "Satisfactory evidence required",
        category: "Verification",
        difficulty: "medium"
      }
    ],
    
    memoryTricks: [
      {
        id: "mt1",
        concept: "4-year commission",
        trick: "Four seasons, four years - one complete cycle",
        type: "association"
      },
      {
        id: "mt2",
        concept: "$15,000 bond",
        trick: "15K = 1.5 x 10K (easy to remember as 1.5 times ten thousand)",
        type: "calculation"
      },
      {
        id: "mt3",
        concept: "6-hour education",
        trick: "6 hours = typical work shift, one day of learning",
        type: "association"
      }
    ]
  },
  
  // ===============================================
  // 未來章節的模板結構
  // ===============================================
  2: {
    id: 2,
    title: "Five Steps of Notarization",
    subtitle: "Process & Procedures",
    isAvailable: false, // 設為 false 直到內容準備好
    estimatedStudyTime: "60 minutes",
    difficulty: "Intermediate",
    legalCodes: [], // 等待您提供內容
    keyFacts: [],
    questions: [],
    flashCards: [],
    memoryTricks: []
  },
  
  3: {
    id: 3,
    title: "Journal, Certificate and Seal",
    subtitle: "Documentation & Tools",
    isAvailable: false,
    estimatedStudyTime: "50 minutes",
    difficulty: "Intermediate",
    legalCodes: [],
    keyFacts: [],
    questions: [],
    flashCards: [],
    memoryTricks: []
  },
  
  4: {
    id: 4,
    title: "Acknowledgments",
    subtitle: "Forms & Applications",
    isAvailable: false,
    estimatedStudyTime: "55 minutes",
    difficulty: "Advanced",
    legalCodes: [],
    keyFacts: [],
    questions: [],
    flashCards: [],
    memoryTricks: []
  },
  
  5: {
    id: 5,
    title: "Oaths and Affirmations",
    subtitle: "Verbal Procedures",
    isAvailable: false,
    estimatedStudyTime: "40 minutes",
    difficulty: "Advanced",
    legalCodes: [],
    keyFacts: [],
    questions: [],
    flashCards: [],
    memoryTricks: []
  }
};

// ===============================================
// 輔助函數 - 方便管理章節
// ===============================================

export const getAvailableChapters = () => {
  return Object.values(chapterData).filter(chapter => chapter.isAvailable);
};

export const getChapterById = (id) => {
  return chapterData[id] || null;
};

export const getTotalQuestions = (chapterId) => {
  const chapter = chapterData[chapterId];
  return chapter ? chapter.questions.length : 0;
};

export const getQuestionsByDifficulty = (chapterId, difficulty) => {
  const chapter = chapterData[chapterId];
  return chapter ? chapter.questions.filter(q => q.difficulty === difficulty) : [];
};

export const getQuestionsByCategory = (chapterId, category) => {
  const chapter = chapterData[chapterId];
  return chapter ? chapter.questions.filter(q => q.category === category) : [];
};

// ===============================================
// 章節進度管理
// ===============================================

export const chapterProgress = {
  getProgress: (chapterId) => {
    const saved = localStorage.getItem(`chapter_${chapterId}_progress`);
    return saved ? JSON.parse(saved) : {
      questionsAnswered: 0,
      correctAnswers: 0,
      completedSections: [],
      lastStudied: null,
      timeSpent: 0
    };
  },
  
  updateProgress: (chapterId, updates) => {
    const current = chapterProgress.getProgress(chapterId);
    const updated = { ...current, ...updates, lastStudied: new Date().toISOString() };
    localStorage.setItem(`chapter_${chapterId}_progress`, JSON.stringify(updated));
    return updated;
  },
  
  resetProgress: (chapterId) => {
    localStorage.removeItem(`chapter_${chapterId}_progress`);
  }
};
