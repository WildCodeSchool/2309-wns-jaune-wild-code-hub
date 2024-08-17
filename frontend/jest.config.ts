import type { Config } from "jest";
import nextJest from "next/jest.js";

// Créez la configuration Jest de base pour Next.js
const createJestConfig = nextJest({
  dir: "./", // Répertoire racine de votre projet Next.js
});

// Définir la configuration Jest
const config: Config = {
  // Nettoyez automatiquement les appels de mock, les instances, les contextes et les résultats avant chaque test
  clearMocks: true,

  // Indique si les informations de couverture doivent être collectées pendant l'exécution des tests
  collectCoverage: true,

  // Le répertoire où Jest doit stocker ses fichiers de couverture
  coverageDirectory: "coverage",

  // Le fournisseur qui doit être utilisé pour instrumenter le code pour la couverture
  coverageProvider: "v8",

  // Un mappage de régularités à des noms de modules ou à des tableaux de noms de modules pour stubber des ressources avec un seul module
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"  // Ajustez le chemin en fonction de votre structure de répertoires
  },

  // Les fichiers qui exécutent un code pour configurer ou préparer l'environnement de test avant chaque test
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  // L'environnement de test qui sera utilisé pour les tests
  testEnvironment: "jest-environment-jsdom",

  // Les motifs globaux que Jest utilise pour détecter les fichiers de test
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

  // Les motifs de chemin que Jest utilise pour ignorer certains fichiers
  testPathIgnorePatterns: [
    "\\\\node_modules\\\\",
    "\\\\.next\\\\"
  ],

  // Ajouter des options supplémentaires si nécessaire
  // transformIgnorePatterns: [
  //   "\\\\node_modules\\\\",
  //   "\\.pnp\\.[^\\\\]+$"
  // ],
};

export default createJestConfig(config);