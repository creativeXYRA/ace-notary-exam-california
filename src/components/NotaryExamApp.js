import React, { useState, useRef } from 'react';
import { 
  BookOpen, Brain, Volume2, History, FileText, 
  ChevronRight, ChevronLeft, Play, Pause, RotateCcw,
  Check, X, Award, Clock
} from 'lucide-react';

// 完整的章節數據 - 包含所有10個章節
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
      },
      {
        id: 2,
        code: "GC § 8201",
        title: "Appointment Requirements",
        content: "Any person who is 18 years of age or older, is a legal resident of California, is not disqualified to receive a commission, and who has satisfactorily completed the course of study may be appointed a notary public.",
        keyPoints: [
          "Must be 18 years or older",
          "Must be California legal resident",
          "Must complete required education",
          "Cannot be disqualified by law"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "California notaries serve 4-year terms and must maintain a $15,000 surety bond",
        category: "Term & Bond",
        importance: "high"
      },
      {
        id: 2,
        fact: "The Secretary of State oversees notary appointments and can impose penalties up to $10,000",
        category: "Oversight",
        importance: "medium"
      },
      {
        id: 3,
        fact: "Notaries must take an oath of office and file it with the county clerk",
        category: "Appointment Process",
        importance: "medium"
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
      },
      {
        question: "What is the minimum age requirement to become a California notary?",
        options: [
          "16 years old",
          "18 years old",
          "21 years old",
          "25 years old"
        ],
        correct: 1,
        explanation: "You must be at least 18 years old to become a California notary public."
      }
    ],

    flashCards: [
      {
        front: "What are the basic requirements to become a California notary?",
        back: "• Be 18 years or older\n• Be a legal resident of California\n• Complete required education\n• Not be disqualified by law\n• Pass the state exam"
      },
      {
        front: "What is the term length and bond amount for California notaries?",
        back: "• Term: 4 years\n• Bond: $15,000 surety bond\n• Filed with county clerk where oath is taken"
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
        content: "Before any notarization is complete, the signer must appear in person before the Notary Public. The signer must be face-to-face with the Notary. A phone call, email or web broadcast do not replace personal appearance.",
        keyPoints: [
          "Physical presence is mandatory",
          "No remote notarization alternatives",
          "Face-to-face requirement is absolute"
        ]
      },
      {
        id: 2,
        code: "GC § 8205",
        title: "Document Completeness Requirements",
        content: "A Notary may not take an acknowledgment or a proof of execution on an incomplete document. A Notary may not notarize a document containing blanks the Notary knows from his or her experience to be incomplete.",
        keyPoints: [
          "Document must be complete before notarization",
          "No blank spaces in critical areas",
          "Notary must use professional judgment"
        ]
      },
      {
        id: 3,
        code: "CC § 1185(b)",
        title: "Satisfactory Evidence Requirements",
        content: "For acknowledgments and jurats, a Notary is required to obtain satisfactory evidence of the signer's identity. Satisfactory evidence includes: a state-approved ID document, the oath of one credible identifying witness, or the oaths of two credible identifying witnesses.",
        keyPoints: [
          "Identity verification is mandatory",
          "Three acceptable forms of evidence",
          "State-approved ID documents preferred"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "The five steps must be followed in order: 1) Personal appearance, 2) Scan document, 3) Identify signer, 4) Record journal, 5) Complete certificate",
        category: "Process",
        importance: "high"
      },
      {
        id: 2,
        fact: "California-approved ID documents fall into two groups - both must be current or issued within the last five years",
        category: "Identification",
        importance: "high"
      },
      {
        id: 3,
        fact: "Group 1 IDs include: CA driver's license, U.S. passport, inmate ID (custody only), sheriff's department inmate ID",
        category: "Identification",
        importance: "medium"
      },
      {
        id: 4,
        fact: "A credible identifying witness must personally know the signer, be impartial to the transaction, take an oath, and present state-approved ID",
        category: "Credible Witness",
        importance: "high"
      },
      {
        id: 5,
        fact: "California Notaries may not use personal knowledge to establish signer identity",
        category: "Identification",
        importance: "high"
      }
    ],

    questions: [
      {
        question: "A client brings you a document that was transmitted via fax but has an original handwritten signature. Can this be notarized?",
        options: [
          "No, transmitted documents cannot be notarized",
          "Yes, if the signature is original and signer appears personally",
          "Only with special authorization",
          "Yes, but only for certain document types"
        ],
        correct: 1,
        explanation: "A Notary may notarize a faxed document as long as it contains an original (wet) signature and the signer appears in person before the Notary."
      },
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
      },
      {
        question: "Under what circumstances can an expired identification document be used for notarization?",
        options: [
          "When no other ID is available",
          "If it expired within five years",
          "If it was issued within five years",
          "Never - expired IDs are not acceptable"
        ],
        correct: 3,
        explanation: "Expired identification documents are never acceptable for notarization, regardless of when they were issued or expired."
      }
    ],

    flashCards: [
      {
        front: "What are the five steps of notarization in order?",
        back: "1) Require personal appearance\n2) Scan the document for completeness\n3) Identify and screen the signer\n4) Record the journal entry\n5) Complete the notarial certificate"
      },
      {
        front: "What are California-approved ID documents Group 1?",
        back: "• CA driver's license or ID card\n• U.S. passport\n• Inmate ID (custody only)\n• Sheriff's department inmate ID (local detention only)"
      },
      {
        front: "What are the requirements for using one credible identifying witness?",
        back: "• Known to the Notary\n• Knows the signer\n• Presents ID document\n• Takes oath or affirmation\n• Signs journal with ID info recorded"
      },
      {
        front: "Can a California Notary use personal knowledge to identify a signer?",
        back: "No. California Notary Public may NOT use personal knowledge to establish the identity of the signer."
      }
    ]
  },

  3: {
    id: 3,
    title: "The Journal, Certificate and Seal",
    subtitle: "Understand the legal requirements for the notarial journal, certificate, and seal",
    estimatedStudyTime: "50 minutes",
    difficulty: "Intermediate",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "GC § 8206",
        title: "Required Journal Entries",
        content: "A Notary must keep only one active journal at a time and make a separate and complete entry in sequential order for each notarization. All journal entries must be recorded at the time of the notarization.",
        keyPoints: [
          "Only one active journal at a time",
          "Separate entry for each notarization",
          "Sequential order required",
          "Record at time of notarization"
        ]
      },
      {
        id: 2,
        code: "GC § 8214.23",
        title: "Thumbprint Requirements and Penalty",
        content: "Failure to obtain a thumbprint when required by law is punishable by a fine of up to $2,500. Thumbprints are required for deeds, quitclaim deeds, deeds of trust, documents affecting real property, and powers of attorney.",
        keyPoints: [
          "Civil penalty up to $2,500",
          "Required for real property documents",
          "Required for powers of attorney",
          "Exception: trustee's deeds from foreclosure"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "Seven required journal entries: 1) Date/time, 2) Type of notarization, 3) Document type, 4) Signer ID info, 5) Notary fee, 6) Signature of signer, 7) Thumbprint (when required)",
        category: "Journal Requirements",
        importance: "high"
      },
      {
        id: 2,
        fact: "Journal is the exclusive property of the Notary and must be kept in locked, secured area under direct control",
        category: "Journal Security",
        importance: "high"
      },
      {
        id: 3,
        fact: "Thumbprint required for: deeds, quitclaim deeds, deeds of trust, documents affecting real property, powers of attorney",
        category: "Thumbprint Rules",
        importance: "high"
      },
      {
        id: 4,
        fact: "Notary seal must contain: 'Notary Public' words, Notary's name, commission number, county, expiration date, state seal, manufacturer ID",
        category: "Seal Requirements",
        importance: "high"
      }
    ],

    questions: [
      {
        question: "When a Notary gets a new job, what should happen to the seal and journal?",
        options: [
          "Surrender to new employer",
          "Give to Secretary of State",
          "Notary keeps them",
          "Give to former employer"
        ],
        correct: 2,
        explanation: "When changing jobs, the Notary keeps their journal and seal. They are not surrendered unless the commission expires, is revoked, or the Notary resigns."
      },
      {
        question: "What does the venue on a notarial certificate indicate?",
        options: [
          "Where the document was originally created",
          "Where the document will be filed",
          "Where the Notary's commission is active",
          "Where the notarization takes place"
        ],
        correct: 3,
        explanation: "The venue indicates the state and county where the notarization is performed (where the document is signed), as indicated at the top of most Notary certificates."
      }
    ],

    flashCards: [
      {
        front: "What are the 7 required journal entries?",
        back: "1) Date and time of notarization\n2) Type of notarization (act)\n3) Document (instrument) kind or type\n4) Signer identification information\n5) Notary fee charged\n6) Signature of person whose signature is being notarized\n7) Thumbprint of signer (when required)"
      },
      {
        front: "When is a thumbprint required in the journal?",
        back: "Required for:\n• Deeds\n• Quitclaim deeds\n• Deeds of trust affecting real property\n• Documents affecting real property\n• Powers of attorney\n\nNOT required for trustee's deeds from foreclosure"
      },
      {
        front: "What elements must be on the Notary seal?",
        back: "• Words 'Notary Public'\n• Notary's commission name\n• Notary's sequential commission number\n• County where oath and bond are on file\n• Commission expiration date\n• Seal manufacturer's sequential ID number\n• California state seal"
      }
    ]
  },

  4: {
    id: 4,
    title: "Acknowledgments",
    subtitle: "Follow the requirements for performing an acknowledgment",
    estimatedStudyTime: "40 minutes",
    difficulty: "Intermediate",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "CC §§ 1188 and 1193",
        title: "Acknowledgment Definition",
        content: "An acknowledgment is a notarial act in which a Notary certifies having positively identified a document signer who admitted having signed the document. The primary function of an acknowledgment is the positive identification of a document signer.",
        keyPoints: [
          "Certifies positive identification",
          "Signer admits to signing document",
          "Focus is on identity verification",
          "Signer need not sign in Notary's presence"
        ]
      },
      {
        id: 2,
        code: "CC § 1189[c]",
        title: "Out-of-State Acknowledgment Restrictions",
        content: "Notaries may complete acknowledgment forms required by another state or jurisdiction only if the document will be filed in that state or jurisdiction. A Notary may never complete an out-of-state acknowledgment certificate if it requires the Notary to determine or certify that the signer holds a particular representative capacity.",
        keyPoints: [
          "Document must be filed in that state",
          "Cannot determine representative capacity",
          "May cross out unacceptable wording",
          "Attach California acknowledgment if needed"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "Acknowledgment requirements: 1) Signer must personally appear, 2) Signer must be positively identified, 3) Signer must acknowledge his or her signature",
        category: "Requirements",
        importance: "high"
      },
      {
        id: 2,
        fact: "For acknowledgments, the signer does NOT need to sign the document in front of the Notary - they only need to acknowledge they signed it",
        category: "Signing Requirements",
        importance: "high"
      },
      {
        id: 3,
        fact: "Maximum fee for an acknowledgment is $15 for each signature notarized",
        category: "Fees",
        importance: "medium"
      }
    ],

    questions: [
      {
        question: "Is it required for a Notary to witness the document signing during an acknowledgment?",
        options: [
          "Yes, witnessing is always required",
          "No, only identity verification is needed",
          "Yes, but only for property documents",
          "No, but it's strongly recommended"
        ],
        correct: 1,
        explanation: "No. An acknowledgment does not require the Notary to witness the signing. The signer only needs to acknowledge to the Notary that they signed the document."
      },
      {
        question: "What must a signer do during an acknowledgment?",
        options: [
          "Confirm their signature before a Notary",
          "Sign the document in the Notary's presence",
          "Take an oath about the document's contents",
          "Provide witness contact information"
        ],
        correct: 0,
        explanation: "For an acknowledgment, the signer must confirm (acknowledge) their signature before a Notary. They do not need to sign in the Notary's presence."
      }
    ],

    flashCards: [
      {
        front: "What is an acknowledgment?",
        back: "A notarial act where a Notary certifies having positively identified a document signer who admitted having signed the document. The focus is on identity verification, not witnessing the signature."
      },
      {
        front: "What are the 3 requirements for performing an acknowledgment?",
        back: "1) The signer must personally appear before the Notary\n2) The signer must be positively identified using satisfactory evidence\n3) The signer must acknowledge his or her signature"
      },
      {
        front: "Does the signer need to sign the document in front of the Notary for an acknowledgment?",
        back: "No. For acknowledgments, the signer does NOT need to sign in the Notary's presence. They only need to acknowledge that they signed the document."
      }
    ]
  },

  5: {
    id: 5,
    title: "Oaths or Affirmations and Jurats",
    subtitle: "Understand the difference between oaths and jurats",
    estimatedStudyTime: "35 minutes",
    difficulty: "Intermediate",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "GC § 8202[b]",
        title: "Jurat Certificate Wording",
        content: "California Notaries must use the specific jurat certificate wording mandated by statute. The notarial certificate for a jurat is identified by the wording 'Subscribed and sworn to (or affirmed).'",
        keyPoints: [
          "Specific wording required by law",
          "Identified by 'Subscribed and sworn to' phrase",
          "Must be exactly as prescribed in statute",
          "Cannot use alternative wording"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "An oath is a solemn spoken promise to a supreme being made before a Notary. An affirmation is a solemn spoken promise on one's personal honor with no reference to a supreme being.",
        category: "Definitions",
        importance: "high"
      },
      {
        id: 2,
        fact: "Jurat requirements: 1) Signer personally appears, 2) Signer is positively identified, 3) Signer signs document in Notary's presence, 4) Notary administers oath or affirmation",
        category: "Process",
        importance: "high"
      },
      {
        id: 3,
        fact: "Maximum fee for a jurat is $15 for each signature notarized",
        category: "Fees",
        importance: "medium"
      }
    ],

    questions: [
      {
        question: "A client asks you to notarize their signature on a sworn statement and wants you to administer an oath. What type of notarization is this?",
        options: [
          "Acknowledgment",
          "Jurat",
          "Proof of execution",
          "Copy certification"
        ],
        correct: 1,
        explanation: "A jurat involves the signer signing the document in the Notary's presence and taking an oath or affirmation about the truthfulness of the content."
      },
      {
        question: "Can a California Notary use a Florida jurat certificate for documents being filed in Florida?",
        options: [
          "Yes, if the document will be filed there",
          "No, only California jurat certificates are permitted",
          "Yes, but only for state residents",
          "No, unless officially translated"
        ],
        correct: 1,
        explanation: "No. California Notaries can only use California jurat certificate wording. Unlike acknowledgments, out-of-state jurat wording is not permitted."
      }
    ],

    flashCards: [
      {
        front: "What is the difference between an oath and an affirmation?",
        back: "Oath: Solemn spoken promise to a supreme being\nAffirmation: Solemn spoken promise on personal honor with no reference to a supreme being\nBoth carry the same legal weight"
      },
      {
        front: "What are the 4 requirements for performing a jurat?",
        back: "1) Signer must personally appear before the Notary\n2) Signer must be positively identified using satisfactory evidence\n3) Signer must sign the document in the Notary's presence\n4) Notary must administer an oath or affirmation"
      },
      {
        front: "Can California Notaries use out-of-state jurat wording?",
        back: "No. California Notaries must always use California jurat certificate wording. Out-of-state jurat forms are not permitted (unlike acknowledgments)."
      }
    ]
  },

  6: {
    id: 6,
    title: "Proofs of Execution by Subscribing Witness",
    subtitle: "Explain the procedures for a proof of execution",
    estimatedStudyTime: "35 minutes",
    difficulty: "Advanced",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "Code of Civil Procedure § 1935",
        title: "Proof of Execution Definition",
        content: "When the document signer cannot appear before a Notary, another person may appear on the principal signer's behalf to prove that the principal signer executed the document. A subscribing witness watches the principal signer sign the document and brings the document to a Notary for notarization.",
        keyPoints: [
          "Used when principal signer cannot appear",
          "Subscribing witness proves execution",
          "Witness must have watched signing",
          "Alternative to personal appearance"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "Proofs of execution are prohibited on: grant deeds, quitclaim deeds, deeds of trust, mortgages, security agreements, powers of attorney, any document affecting real property, any document requiring thumbprint",
        category: "Prohibited Documents",
        importance: "high"
      },
      {
        id: 2,
        fact: "Subscribing witness requirements: 1) Personally appear before Notary, 2) Sign document before Notary, 3) Be positively identified using one credible identifying witness, 4) Take oath or affirmation, 5) Sign Notary's journal",
        category: "Witness Requirements",
        importance: "high"
      },
      {
        id: 3,
        fact: "Maximum fee for proof of execution by subscribing witness is $15 for each signature, including the oath",
        category: "Fees",
        importance: "medium"
      }
    ],

    questions: [
      {
        question: "What is a subscribing witness in notarial terms?",
        options: [
          "A witness who signs the document",
          "A person who proves document execution on behalf of the principal signer",
          "A person who notarizes the document", 
          "A credible identifying witness"
        ],
        correct: 1,
        explanation: "A subscribing witness is a person who proves that the principal signer executed the document when the principal signer cannot appear before the Notary."
      },
      {
        question: "Which document type prohibits the use of proof of execution?",
        options: [
          "Trustee's deed from foreclosure",
          "Property deed",
          "Deed of reconveyance",
          "Business agreement"
        ],
        correct: 1,
        explanation: "Property deeds are specifically prohibited for proofs of execution. Proofs cannot be performed on any documents affecting real property."
      }
    ],

    flashCards: [
      {
        front: "What is a proof of execution by subscribing witness?",
        back: "A notarial act where a subscribing witness appears before the Notary to prove that the principal signer executed a document when the principal signer cannot personally appear before the Notary."
      },
      {
        front: "What documents are prohibited for proofs of execution?",
        back: "• Grant deeds\n• Quitclaim deeds\n• Deeds of trust\n• Mortgages\n• Security agreements\n• Powers of attorney\n• Any document affecting real property\n• Any document requiring thumbprint"
      },
      {
        front: "What can a proof of execution replace?",
        back: "A proof of execution can replace ONLY an acknowledgment. It cannot replace a jurat or any other notarial act."
      }
    ]
  },

  7: {
    id: 7,
    title: "Copy Certifications and Protests",
    subtitle: "Identify documents for copy certification and define protests",
    estimatedStudyTime: "25 minutes",
    difficulty: "Beginner",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "Section 4307 California Probate Code",
        title: "Power of Attorney Copy Certification",
        content: "A certified copy of a power of attorney has the same force and effect as the original. The Notary certifies that the attached document is a true, complete, and correct copy of a power of attorney presented on this date.",
        keyPoints: [
          "Same legal effect as original",
          "Must be true, complete, and correct copy",
          "Specific wording required",
          "Only for original powers of attorney"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "California Notaries may only certify copies of two types of documents: 1) Original powers of attorney, 2) Notary journal line entries (upon subpoena, court order, or Secretary of State request)",
        category: "Authorized Documents",
        importance: "high"
      },
      {
        id: 2,
        fact: "Documents never to be certified as copies: recordable documents, vital records (birth, death, marriage certificates), divorce decrees, U.S. Naturalization Certificates",
        category: "Prohibited Documents",
        importance: "high"
      },
      {
        id: 3,
        fact: "Maximum fee for certification of a copy of a power of attorney is $15 for each copy certified",
        category: "Fees",
        importance: "medium"
      }
    ],

    questions: [
      {
        question: "Must the Notary identify the person when certifying a copy of a power of attorney?",
        options: [
          "Yes, identification is always required",
          "No, identification is not required",
          "Only if specifically requested",
          "Yes, but only with government-issued ID"
        ],
        correct: 1,
        explanation: "No. The Notary is not required to identify the person presenting the power of attorney for copy certification."
      },
      {
        question: "Can a Notary certify a photocopy of a birth certificate?",
        options: [
          "Yes, if it's already a certified copy",
          "No, vital records cannot be copy certified",
          "Yes, but only for immediate family",
          "No, unless it's an original birth certificate"
        ],
        correct: 1,
        explanation: "No. Birth certificates are vital records, and Notaries are prohibited from certifying copies of vital records such as birth, death, or marriage certificates."
      }
    ],

    flashCards: [
      {
        front: "What two types of documents can California Notaries certify as copies?",
        back: "1) Original powers of attorney\n2) Notary journal line entries (only upon subpoena, court order, or written request from Secretary of State)"
      },
      {
        front: "What documents can NEVER be certified as copies?",
        back: "• Recordable documents\n• Vital records (birth, death, marriage certificates)\n• Divorce decrees\n• U.S. Naturalization Certificates\n• Any document that can be certified by appointed agencies"
      },
      {
        front: "Is identification required for copy certification?",
        back: "No. The Notary is not required to identify the person presenting the original power of attorney for copy certification."
      }
    ]
  },

  8: {
    id: 8,
    title: "Notarial Responsibilities and Special Circumstances",
    subtitle: "Learn how to avoid unauthorized practice of law and handle special situations",
    estimatedStudyTime: "40 minutes",
    difficulty: "Advanced",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "GC § 8214.1[g]",
        title: "Unauthorized Practice of Law",
        content: "California Notaries Public are prohibited from performing any duties that may be construed as the practice of law. A Notary must not advise others unless the Notary is an attorney. The unauthorized practice of law includes giving advice about documents or legal matters, preparing or selecting documents, or choosing the notarial act to perform.",
        keyPoints: [
          "Cannot give legal advice unless attorney",
          "Cannot prepare or select documents",
          "Cannot choose notarial act for customer",
          "Must refer to attorney or receiving agency"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "Unauthorized practice of law includes: giving advice about documents or legal matters, preparing or choosing documents, or choosing the notarial act to perform",
        category: "Legal Restrictions",
        importance: "high"
      },
      {
        id: 2,
        fact: "Advertising restrictions: Cannot use false or misleading advertising, cannot translate 'Notary Public' to 'Notario' or 'Notario Publico', cannot advertise as immigration expert and Notary",
        category: "Advertising Rules",
        importance: "high"
      },
      {
        id: 3,
        fact: "Maximum allowable fees: Acknowledgments $15, Jurats $15, Proofs of execution $15, Oaths/affirmations $15, Copy certifications $15, Depositions $30 total",
        category: "Fee Schedule",
        importance: "high"
      }
    ],

    questions: [
      {
        question: "A Notary may not charge a fee for notarizations on:",
        options: [
          "A Veteran's Affairs life insurance form",
          "The oath for a credible witness",
          "A circulator's affidavit for an initiative",
          "All of the above"
        ],
        correct: 3,
        explanation: "All of the above. Notaries cannot charge fees for veteran benefits documents, vote-related documents, or credible witness oaths."
      },
      {
        question: "May a Notary who is also an attorney use the term 'Notario Publico' in an advertisement?",
        options: [
          "Yes, attorneys are exempt",
          "No, no one can use this term",
          "Yes, but only in Spanish publications",
          "No, unless bilingual"
        ],
        correct: 1,
        explanation: "No. Even attorneys who are also Notaries cannot use 'Notario' or 'Notario Publico' in advertisements. This restriction applies to all Notaries regardless of other qualifications."
      }
    ],

    flashCards: [
      {
        front: "What constitutes unauthorized practice of law for Notaries?",
        back: "• Giving advice about documents or legal matters\n• Preparing or selecting documents\n• Choosing the notarial act to perform\n\nInstead: Refer signer to attorney or agency receiving document"
      },
      {
        front: "What are the advertising restrictions for Notaries?",
        back: "Cannot:\n• Use false or misleading advertising\n• Translate 'Notary Public' to 'Notario' or 'Notario Publico'\n• Advertise as immigration expert AND Notary\n• Use seal/title for non-notary purposes"
      },
      {
        front: "What fees are prohibited for Notaries?",
        back: "Cannot charge for:\n• U.S. military veteran's benefits applications\n• Vote-by-mail or absentee ballot documents\n• Nomination documents for candidates\n• Credible witness oaths"
      }
    ]
  },

  9: {
    id: 9,
    title: "Notarial Misconduct and Protections",
    subtitle: "Understand types of misconduct, penalties, and protections",
    estimatedStudyTime: "35 minutes",
    difficulty: "Advanced",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "GC § 8214",
        title: "Civil Liability for Notary Misconduct",
        content: "Notaries are liable for both intentional and unintentional misconduct. Notaries have unlimited financial liability. In a civil action, both the Notary Public and the Notary's surety are liable for all damages sustained from the Notary's misconduct or neglect.",
        keyPoints: [
          "Unlimited financial liability",
          "Liable for intentional and unintentional acts",
          "Both Notary and surety liable",
          "Civil lawsuits possible for damages"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "Three types of penalties for misconduct: Criminal (infractions, misdemeanors, felonies), Civil (lawsuits and financial damages), Administrative (Secretary of State penalties up to $10,000)",
        category: "Penalty Types",
        importance: "high"
      },
      {
        id: 2,
        fact: "Criminal penalties: Infractions (fine up to $500), Misdemeanors (fine up to $1,000 and/or up to 6 months imprisonment), Felonies (imprisonment and/or fines)",
        category: "Criminal Penalties",
        importance: "high"
      },
      {
        id: 3,
        fact: "Protections against misconduct: reasonable care, errors and omissions insurance, $15,000 surety bond",
        category: "Protections",
        importance: "high"
      }
    ],

    questions: [
      {
        question: "What is the administrative penalty for not complying with foreign language advertising requirements?",
        options: [
          "A $750 fine",
          "Suspension for less than one year",
          "A criminal conviction",
          "Suspension for not less than one year"
        ],
        correct: 3,
        explanation: "The first offense for foreign language advertising violations results in suspension of commission for not less than one year or revocation of commission."
      },
      {
        question: "Which violation constitutes a felony offense?",
        options: [
          "Knowingly making false statements in notarial certificates",
          "Destroying or concealing Notary records",
          "Acting as a Notary without valid commission",
          "Making false statements about property documents"
        ],
        correct: 2,
        explanation: "Impersonating or acting as a Notary without a valid commission is a felony offense."
      }
    ],

    flashCards: [
      {
        front: "What are the three types of penalties for notarial misconduct?",
        back: "1) Criminal penalties (infractions, misdemeanors, felonies)\n2) Civil penalties (lawsuits, financial damages)\n3) Administrative penalties (Secretary of State actions)"
      },
      {
        front: "What are the three main protections against misconduct?",
        back: "1) Reasonable Care - most effective protection, using ordinary prudence\n2) Errors & Omissions Insurance - covers 'honest' mistakes only\n3) $15,000 Surety Bond - protects public, not the Notary"
      },
      {
        front: "What does the Notary bond protect?",
        back: "The $15,000 surety bond protects the PUBLIC against Notary negligence and criminal acts. It does NOT protect the Notary - the Notary must reimburse surety for any amounts paid."
      }
    ]
  },

  10: {
    id: 10,
    title: "Practice Exam",
    subtitle: "Test your knowledge with comprehensive practice questions",
    estimatedStudyTime: "60 minutes",
    difficulty: "Advanced",
    isAvailable: true,
    
    legalCodes: [
      {
        id: 1,
        code: "Practice Exam Code Review",
        title: "Comprehensive Legal Code Application",
        content: "This practice exam tests knowledge of all legal codes covered in Chapters 2-9, including the five steps of notarization, journal requirements, acknowledgments, jurats, proofs of execution, copy certifications, notarial responsibilities, and misconduct penalties.",
        keyPoints: [
          "Tests all previous chapter concepts",
          "Real exam simulation",
          "Comprehensive code application",
          "Penalty and procedure knowledge"
        ]
      }
    ],

    keyFacts: [
      {
        id: 1,
        fact: "Practice exam covers all topics from Chapters 2-9: Five steps, journal/certificate/seal, acknowledgments, jurats, proofs of execution, copy certifications, responsibilities, and misconduct",
        category: "Exam Coverage",
        importance: "high"
      },
      {
        id: 2,
        fact: "Common exam topics: ID requirements, fee limits, prohibited documents, penalty amounts, time limits, and proper procedures",
        category: "Key Topics",
        importance: "high"
      }
    ],

    questions: [
      {
        question: "Someone applied for a Notary commission but was denied. What was the most likely reason?",
        options: [
          "The applicant is not a United States citizen",
          "The applicant is only 18 years old",
          "The applicant is a Nevada resident",
          "The applicant is making child support payments"
        ],
        correct: 2,
        explanation: "Being a Nevada resident would cause denial. California Notaries must be California residents."
      },
      {
        question: "A Notary cannot execute an acknowledgment or proof of execution for:",
        options: [
          "A document signed outside the Notary's presence",
          "An incomplete document",
          "A document with multiple signers",
          "Someone personally known to the Notary"
        ],
        correct: 1,
        explanation: "Both acknowledgments and proofs of execution cannot be performed on incomplete documents per GC § 8205."
      },
      {
        question: "A proof of execution by subscribing witness can be performed on:",
        options: [
          "Deed of reconveyance",
          "Property transfer deed",
          "Security agreement",
          "Deed of trust"
        ],
        correct: 0,
        explanation: "Deeds of reconveyance are permitted for proofs of execution. The other options are prohibited documents affecting real property."
      },
      {
        question: "A Notary's commission expired February 15, 20XX and renewed February 16, 20XX with a new commission number. What should the Notary do?",
        options: [
          "Start a new journal for the new commission number",
          "Continue using the same journal",
          "Start a new journal for home and keep one at office",
          "Record notarizations on separate paper"
        ],
        correct: 0,
        explanation: "A new commission requires a new journal with the new commission number."
      },
      {
        question: "What is the primary function of a credible witness?",
        options: [
          "Sign the document for the principal signer",
          "Swear that document statements are true",
          "Swear or affirm to the document signer's identity",
          "Witness the document signing"
        ],
        correct: 2,
        explanation: "The primary function of a credible identifying witness is to swear or affirm to the document signer's identity."
      }
    ],

    flashCards: [
      {
        front: "What can cause denial of a Notary commission application?",
        back: "• Not being a U.S. citizen\n• Being under 18 years old\n• Not being a California resident\n• Failing to disclose a conviction\n• Non-compliance with child support orders"
      },
      {
        front: "Key differences between notarial acts?",
        back: "Acknowledgment: Identity verification, no signing witnessed\nJurat: Identity + witness signing + oath about document truth\nProof of execution: Substitute for acknowledgment when signer can't appear"
      },
      {
        front: "Commission renewal requirements?",
        back: "New commission = new commission number\n• Must start new journal\n• Complete previous journal or 30-day gap\n• May need new seal with new number and dates\n• Take new oath if required"
      }
    ]
  }
};

// 輔助函數
const getAvailableChapters = () => {
  return Object.values(chapterData).filter(chapter => chapter.isAvailable);
};

const getChapterById = (id) => {
  return chapterData[id] || null;
};

// 美化樣式對象
const styles = {
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '1rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(214, 211, 209, 0.6)',
    backdropFilter: 'blur(10px)'
  },
  progressCard: {
    background: 'linear-gradient(135deg, #f2e6e6 0%, #e8d6d6 100%)',
    borderRadius: '1rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    border: '1px solid rgba(190, 123, 123, 0.2)',
    boxShadow: '0 2px 8px rgba(190, 123, 123, 0.1)'
  },
  button: {
    background: 'linear-gradient(135deg, #be7b7b 0%, #a86b6b 100%)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    boxShadow: '0 4px 15px rgba(190, 123, 123, 0.3)'
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)',
    color: '#57534e',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    border: '1px solid rgba(214, 211, 209, 0.6)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.3s ease'
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '1rem',
    padding: '1rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(214, 211, 209, 0.6)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '800',
    color: '#44403c',
    letterSpacing: '-0.025em',
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
    borderRadius: '0.5rem',
    transition: 'all 0.3s ease'
  }
};

const NotaryExamApp = () => {
  // 狀態管理
  const [currentView, setCurrentView] = useState('home');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentFlashCardIndex, setCurrentFlashCardIndex] = useState(0);
  const [showFlashCardAnswer, setShowFlashCardAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSpeed, setAudioSpeed] = useState(1.0);
  const [autoStopTimer, setAutoStopTimer] = useState('never');
  const [audioContent, setAudioContent] = useState('legal-codes');
  
  // 音頻系統
  const speechRef = useRef(null);
  const timerRef = useRef(null);
  
  // 進度數據 - 使用內存存儲
  const [progressData, setProgressData] = useState({
    questionsAnswered: 0,
    correctAnswers: 0,
    wrongAnswers: [],
    dailyActivity: {},
    completedChapters: [],
    currentStreak: 0,
    bestStreak: 0,
    totalStudyTime: 0
  });

  // 音頻功能
  const speakNormalContent = (text) => {
    if (!('speechSynthesis' in window)) return;
    
    speechRef.current = new SpeechSynthesisUtterance(text);
    speechRef.current.rate = audioSpeed;
    speechRef.current.lang = 'en-US';
    
    speechRef.current.onend = () => {
      setIsPlaying(false);
    };
    
    window.speechSynthesis.speak(speechRef.current);
    setIsPlaying(true);
    setAutoStopTimeout();
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const setAutoStopTimeout = () => {
    const timeouts = {
      '15min': 15 * 60 * 1000,
      '30min': 30 * 60 * 1000,
      '45min': 45 * 60 * 1000,
      '1hour': 60 * 60 * 1000
    };
    
    if (timeouts[autoStopTimer]) {
      timerRef.current = setTimeout(() => {
        stopSpeaking();
      }, timeouts[autoStopTimer]);
    }
  };

  const getAudioText = () => {
    const chapter = getChapterById(selectedChapter);
    if (!chapter) return '';
    
    switch (audioContent) {
      case 'legal-codes':
        return chapter.legalCodes.map(code => `${code.title}: ${code.content}`).join('. ');
      case 'key-facts':
        return chapter.keyFacts.map(fact => fact.fact).join('. ');
      case 'qa':
        return chapter.questions.map(q => `Question: ${q.question} Answer: ${q.options[q.correct]}. Explanation: ${q.explanation}`).join(' ');
      default:
        return chapter.keyFacts.map(fact => fact.fact).join('. ');
    }
  };

  // 進度管理
  const updateProgress = (isCorrect, questionIndex) => {
    const today = new Date().toISOString().split('T')[0];
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
    
    newProgress.dailyActivity[today] = (newProgress.dailyActivity[today] || 0) + 1;
    setProgressData(newProgress);
  };

  // 視圖組件
  const HomeView = () => {
    const availableChapters = getAvailableChapters();
    
    return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={styles.title}>ACE in Notary Exam California</h1>
          <p style={styles.subtitle}>Bite-size Learning | Sleep Memorizing | AI-driven Optimization</p>
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

        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>Available Chapters</h3>
          <div style={{fontSize: '0.875rem', color: '#78716c', marginBottom: '0.5rem'}}>
            {availableChapters.length} of {Object.keys(chapterData).length} chapters ready
          </div>
          <div style={{width: '100%', backgroundColor: '#e7e5e4', borderRadius: '9999px', height: '0.5rem', overflow: 'hidden'}}>
            <div 
              style={{
                background: 'linear-gradient(90deg, #be7b7b 0%, #d4928a 100%)',
                height: '0.5rem',
                borderRadius: '9999px',
                width: `${(availableChapters.length / Object.keys(chapterData).length) * 100}%`,
                transition: 'width 0.8s ease'
              }}
            ></div>
          </div>
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem'}}>
          <button
            onClick={() => setCurrentView('chapters')}
            style={{...styles.featureCard, textAlign: 'left'}}
          >
            <BookOpen style={{color: '#be7b7b', marginBottom: '0.5rem'}} size={24} />
            <div>
              <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Chapter Study</h3>
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
            onClick={() => setCurrentView('history')}
            style={styles.buttonSecondary}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <History style={{color: '#7c7269'}} size={20} />
              <span style={{color: '#68615a'}}>History</span>
            </div>
          </button>
          
          <button
            onClick={() => setCurrentView('resources')}
            style={styles.buttonSecondary}
          >
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
              <FileText style={{color: '#7c7269'}} size={20} />
              <span style={{color: '#68615a'}}>Resources</span>
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
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem'}}>
                        <h3 style={{fontWeight: '500', color: '#44403c'}}>Chapter {chapter.id}: {chapter.title}</h3>
                        <span style={{
                          backgroundColor: '#e6f2e6',
                          color: '#6b8f4a',
                          fontSize: '0.75rem',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '0.25rem'
                        }}>
                          Ready
                        </span>
                      </div>
                      <p style={{fontSize: '0.875rem', color: '#78716c', marginBottom: '0.5rem'}}>{chapter.subtitle}</p>
                      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: '#a8a29e'}}>
                        <span>📚 {chapter.questions.length} questions</span>
                        <span>⏱️ {chapter.estimatedStudyTime}</span>
                        <span>🎯 {chapter.difficulty}</span>
                      </div>
                    </div>
                    <ChevronRight style={{color: '#d6d3d1'}} size={20} />
                  </div>
                </button>
              ) : (
                <div style={{
                  ...styles.card,
                  opacity: 0.5,
                  backgroundColor: '#f5f5f4'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem'}}>
                        <h3 style={{fontWeight: '500', color: '#78716c'}}>Chapter {chapter.id}: {chapter.title}</h3>
                        <span style={{
                          backgroundColor: '#f2ebe6',
                          color: '#b5956b',
                          fontSize: '0.75rem',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '0.25rem'
                        }}>
                          Coming Soon
                        </span>
                      </div>
                      <p style={{fontSize: '0.875rem', color: '#a8a29e', marginBottom: '0.5rem'}}>{chapter.subtitle}</p>
                      <div style={{fontSize: '0.75rem', color: '#d6d3d1'}}>
                        ⏱️ {chapter.estimatedStudyTime} • 🎯 {chapter.difficulty}
                      </div>
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
            <h3 style={styles.sectionTitle}>Legal Codes</h3>
            {chapter.legalCodes.map((code) => (
              <div key={code.id} style={{...styles.card, marginBottom: '0.75rem'}}>
                <div style={{display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
                  <h4 style={{fontWeight: '500', color: '#44403c'}}>{code.title}</h4>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#be7b7b',
                    backgroundColor: '#f2e6e6',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '0.25rem'
                  }}>{code.code}</span>
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
            <h3 style={styles.sectionTitle}>Key Facts</h3>
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
                      backgroundColor: factObj.importance === 'high' ? '#f87171' : 
                                      factObj.importance === 'medium' ? '#facc15' : '#4ade80'
                    }}></div>
                    <div>
                      <span style={{color: '#57534e', fontSize: '0.875rem'}}>{factObj.fact}</span>
                      <div style={{fontSize: '0.75rem', color: '#a8a29e', marginTop: '0.25rem'}}>
                        Category: {factObj.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Flash Cards View
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
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
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

  // Quiz View
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
                  border: '1px solid',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
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
            onClick={() => {
              setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
            }}
            disabled={currentQuestionIndex === 0}
            style={{
              ...styles.buttonSecondary,
              opacity: currentQuestionIndex === 0 ? 0.5 : 1
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
            }}
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

  // Audio View
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

        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#57534e', marginBottom: '0.5rem'}}>
              Audio Content
            </label>
            <select
              value={audioContent}
              onChange={(e) => setAudioContent(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d6d3d1',
                borderRadius: '0.5rem',
                backgroundColor: 'white'
              }}
            >
              <option value="legal-codes">Legal Codes</option>
              <option value="key-facts">Key Facts</option>
              <option value="qa">Q&A Content</option>
            </select>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#57534e', marginBottom: '0.5rem'}}>
              Playback Speed
            </label>
            <select
              value={audioSpeed}
              onChange={(e) => setAudioSpeed(parseFloat(e.target.value))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d6d3d1',
                borderRadius: '0.5rem',
                backgroundColor: 'white'
              }}
            >
              <option value={0.5}>0.5x (Sleep learning)</option>
              <option value={0.8}>0.8x (Slow)</option>
              <option value={1.0}>1.0x (Normal)</option>
              <option value={1.2}>1.2x (Fast)</option>
            </select>
          </div>

          <div>
            <label style={{display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#57534e', marginBottom: '0.5rem'}}>
              Auto-Stop Timer
            </label>
            <select
              value={autoStopTimer}
              onChange={(e) => setAutoStopTimer(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d6d3d1',
                borderRadius: '0.5rem',
                backgroundColor: 'white'
              }}
            >
              <option value="never">Never stop</option>
              <option value="15min">After 15 minutes</option>
              <option value="30min">After 30 minutes</option>
              <option value="45min">After 45 minutes</option>
              <option value="1hour">After 1 hour</option>
            </select>
          </div>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem'}}>
          <button
            onClick={() => isPlaying ? stopSpeaking() : speakNormalContent(getAudioText())}
            style={styles.button}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
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

  // History View
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

        <div style={styles.card}>
          <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.75rem'}}>Activity Summary</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#78716c'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>Correct Answers:</span>
              <span style={{color: '#22c55e', fontWeight: '500'}}>{progressData.correctAnswers}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>Wrong Answers:</span>
              <span style={{color: '#ef4444', fontWeight: '500'}}>{progressData.wrongAnswers.length}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <span>Current Streak:</span>
              <span style={{color: '#be7b7b', fontWeight: '500'}}>{progressData.currentStreak}</span>
            </div>
          </div>
        </div>

        {progressData.wrongAnswers.length > 0 && (
          <div style={styles.card}>
            <h3 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.75rem'}}>Areas for Improvement</h3>
            <div style={{fontSize: '0.875rem', color: '#78716c'}}>
              <p>Incorrect answers: {progressData.wrongAnswers.length}</p>
              <p style={{color: '#ef4444'}}>Recommended: Review Chapter {selectedChapter} content</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Resources View
  const ResourcesView = () => (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <button onClick={() => setCurrentView('home')} style={styles.navButton}>
          <ChevronLeft style={{color: '#78716c'}} size={20} />
        </button>
        <h2 style={{fontWeight: 'bold', color: '#44403c'}}>Official Resources</h2>
        <div></div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
        <div style={styles.card}>
          <h3 style={{fontWeight: '600', color: '#8b5a5a', marginBottom: '0.75rem'}}>California Secretary of State</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
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
                color: 'inherit',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <h4 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Notary Public Handbook</h4>
                <p style={{fontSize: '0.875rem', color: '#78716c'}}>Official study guide - Essential reading</p>
              </div>
              <ChevronRight style={{color: '#be7b7b'}} size={16} />
            </a>
            
            <a 
              href="https://www.sos.ca.gov/notary" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: '#f5f5f4',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'all 0.3s ease'
              }}
            >
              <div>
                <h4 style={{fontWeight: '500', color: '#44403c', marginBottom: '0.25rem'}}>Notary Public Main Page</h4>
                <p style={{fontSize: '0.875rem', color: '#78716c'}}>Forms, applications & updates</p>
              </div>
              <ChevronRight style={{color: '#7c7269'}} size={16} />
            </a>
          </div>
        </div>

        <div style={{
          ...styles.card,
          backgroundColor: '#fef3cd',
          border: '1px solid #fbbf24'
        }}>
          <h4 style={{fontWeight: '500', color: '#92400e', marginBottom: '0.5rem'}}>📚 Study Tip</h4>
          <p style={{fontSize: '0.875rem', color: '#b45309'}}>
            Start with the official Notary Public Handbook - it contains all the essential information you need to pass the exam.
          </p>
        </div>
      </div>
    </div>
  );

  // 主要渲染
  return (
    <div>
      {currentView === 'home' && <HomeView />}
      {currentView === 'chapters' && <ChaptersView />}
      {currentView === 'summary' && <SummaryView />}
      {currentView === 'flashcards' && <FlashCardsView />}
      {currentView === 'quiz' && <QuizView />}
      {currentView === 'audio' && <AudioView />}
      {currentView === 'history' && <HistoryView />}
      {currentView === 'resources' && <ResourcesView />}
    </div>
  );
};

export default NotaryExamApp;// Updated Mon Aug  4 23:58:11 PDT 2025
