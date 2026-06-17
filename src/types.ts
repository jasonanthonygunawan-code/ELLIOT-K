export type Language = 'en' | 'de' | 'fr' | 'es';

export interface TranslationSet {
  // Navigation
  navDashboard: string;
  navCareer: string;
  navSandbox: string;
  
  // Profile / Hero
  studentTitle: string;
  managementStudent: string;
  ageText: string;
  locationText: string;
  profileTitle: string;
  profileDescription: string;
  contactMe: string;
  downloadCV: string;
  quickStats: string;
  statLanguages: string;
  statExperience: string;
  statAchievements: string;
  statExchange: string;

  // Contacts
  contactTitle: string;
  contactSubtitle: string;
  formName: string;
  formEmail: string;
  formSubject: string;
  formMessage: string;
  formSend: string;
  formSending: string;
  formSuccess: string;
  formPlaceholderName: string;
  formPlaceholderEmail: string;
  formPlaceholderSubject: string;
  formPlaceholderMessage: string;

  // Career & Resume
  experienceTitle: string;
  educationTitle: string;
  skillsTitle: string;
  projectsTitle: string;
  present: string;
  studyExchange: string;

  // Timeline Items
  resellingTitle: string;
  resellingCompany: string;
  resellingBullet1: string;
  resellingBullet2: string;
  resellingBullet3: string;
  resellingBullet4: string;

  floristTitle: string;
  floristCompany: string;
  floristBullet1: string;
  floristBullet2: string;
  floristBullet3: string;
  floristBullet4: string;

  transcriptionTitle: string;
  transcriptionCompany: string;
  transcriptionBullet1: string;
  transcriptionBullet2: string;
  transcriptionBullet3: string;

  dreamakersTitle: string;
  dreamakersCompany: string;
  dreamakersBullet1: string;
  dreamakersBullet2: string;
  dreamakersBullet3: string;

  // Finance Sandbox & Calculator
  savingsPlanTitle: string;
  savingsPlanSubtitle: string;
  initialDeposit: string;
  monthlyAddition: string;
  annualInterest: string;
  calcPeriod: string;
  projectedWealth: string;
  futureValueText: string;
  totalInterestText: string;
  totalContributionsText: string;
  years: string;

  sandboxTitle: string;
  sandboxSubtitle: string;
  assetAllocation: string;
  cashLabel: string;
  cryptoLabel: string;
  equitiesLabel: string;
  goldLabel: string;
  bondsLabel: string;
  backtestResults: string;
  expectedAnnualReturn: string;
  volatilityLabel: string;
  sharpeRatio: string;
  simulateScenario: string;
  riskProfile: string;
  conservative: string;
  balanced: string;
  aggressive: string;
  rebalanceButton: string;

  // Interactive Florist ledger demo
  floristDemoTitle: string;
  floristDemoSubtitle: string;
  ledgerDate: string;
  ledgerRef: string;
  ledgerDebit: string;
  ledgerCredit: string;
  ledgerBalance: string;
  ledgerRevenue: string;
  ledgerExpenses: string;
  addTransaction: string;
  transactionType: string;
  transactionAmount: string;
}
