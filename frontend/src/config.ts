export const API_URL = (typeof window !== 'undefined' && !window.location.origin.includes("localhost")) ?
  `${window.location.origin}/graphql`
  :
  "http://localhost:4000";