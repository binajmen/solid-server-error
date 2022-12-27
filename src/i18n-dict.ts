import merge from "lodash/merge";

const en = {
  menu: {
    contact: "Contact",
    login: "Login",
    tests: "Tests",
    results: "Results",
    account: "Account",
    users: "Users",
    questionnaires: "Questionnaires",
  },
  email: "Email",
  givenName: "Fisrt name",
  familyName: "Last name",
  age: "Age",
  gender: "Gender",
  male: "Male",
  female: "Female",
  other: "Other",
  password: "Password",
  "confirm-password": "Confirm password",
  "accept-invitation": "Accept invitation",
  login: "Login",
  logout: "Logout",
  "login-with": "Login with {{ provider }}",
  "no-tests": "You don't have tests at the moment.",
  questionnaire: "Questionnaire",
  status: "Status",
  new: "New",
  ongoing: "Ongoing",
  completed: "Completed",
  start: "Start",
  continue: "Continue",
  results: "Results",
  language: "Language",
  "invite-only": "None – Invite only",
  "remaining-credits": "{{ amount }} crédit(s) restant(s)",
  "send-invitations": "Send invitations",
  "test-completed": "The test is completed!",
  "test-is-completed":
    "You will receive an email with a link to the results when they are ready. In the meantime, you can now close this window.",
  "close-window": "Close this window",
  instructions: {
    title: "Instructions",
    why: "This is a test that allows to identify the main elements of your personality.",
    time: "This test will take about {{ amount }} minutes.",
    resume:
      "If you had to stop during the test, you will resume where you left off.",
    accuracy:
      "The more you asnwer in a serious, instinctive (without overthinking your answers), and sincere way, the more the profile that will emerge will be accurate.",
    secure:
      "We attach great importance to the protection of your personal data and we work everyday to ensure security and confidentiality.",
  },
};

const fr = {};
const french = {
  menu: {
    contact: "Contact",
    login: "S'identifier",
    tests: "Tests",
    results: "Résultats",
    account: "Compte",
    users: "Utilisateurs",
    questionnaires: "Questionnaires",
  },
  password: "Mot de passe",
  login: "S'identifier",
  "login-with": "S'identifier avec {{ provider }}",
  "no-tests": "Vous n'avez pas de tests en ce moment.",
  questionnaire: "Questionnaire",
  status: "Statut",
  new: "Nouveau",
  ongoing: "En cours",
  completed: "Terminé",
  start: "Commencer",
  continue: "Continuer",
  results: "Résultats",
  language: "Langue",
  "invite-only": "Aucun – Invitation seulement",
  "remaining-credits": "{{amount}} crédit(s) restant(s)",
  "send-invitations": "Envoyer des invitations",
};
merge(fr, en, french);

const nl = {};
const dutch = {};
merge(nl, en, dutch);

const ru = {};
const russian = {};
merge(ru, en, russian);

export const dict = {
  en,
  fr,
  nl,
  ru,
};
