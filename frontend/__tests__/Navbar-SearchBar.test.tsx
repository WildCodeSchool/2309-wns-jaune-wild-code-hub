import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Searchbar from '@/components/Searchbar';
import Navbar from '@/components/Navbar';

// Définir la requête GraphQL et le mock
const SEARCH_QUERY = gql`
  query listPublicProjectsByName($name: String!) {
    listPublicProjectsByName(name: $name) {
      id
      name
    }
  }
`;

const mocks = [
  {
    request: {
      query: SEARCH_QUERY,
      variables: { name: 'test' },
    },
    result: {
      data: {
        listPublicProjectsByName: [
          { id: '1', name: 'Item 1' },
          { id: '2', name: 'Item 2' },
        ],
      },
    },
  },
];

const mockOnResults = jest.fn();

const renderWithApolloAndChakra = (ui: React.ReactElement) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ChakraProvider>
        {ui}
      </ChakraProvider>
    </MockedProvider>
  );
};

// Mock de useRouter et usePathname
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

test('renders Searchbar and performs search', async () => {
  renderWithApolloAndChakra(<Searchbar onResults={mockOnResults} />);

  // Simuler la saisie dans le champ de recherche
  fireEvent.change(screen.getByPlaceholderText('Search for projects'), { target: { value: 'test' } });

  // Vérifier l'état de chargement
  expect(screen.getByRole('button')).toBeInTheDocument(); // Assurez-vous que le bouton est présent
  
  // Attendre et vérifier les résultats de la recherche
  await waitFor(() => {
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});

test('renders Navbar with correct title', () => {
  renderWithApolloAndChakra(<Navbar />);

  // Vérifier que le titre "< Wild Code Hub />" est présent dans la Navbar
  expect(screen.getByText('< Wild Code Hub />')).toBeInTheDocument();
});

test('shows login and signup buttons when not logged in', () => {
  // Simuler l'absence de connexion
  Cookies.remove('pseudo');

  renderWithApolloAndChakra(<Navbar />);

  // Vérifier la présence des boutons de connexion et d'inscription
  expect(screen.getByText('Log in')).toBeInTheDocument();
  expect(screen.getByText('Sign Up')).toBeInTheDocument();
  expect(screen.queryByText('Log out')).toBeNull(); // Vérifier l'absence du bouton de déconnexion
});

test('shows logout button when logged in', () => {
  // Simuler la connexion
  Cookies.set('pseudo', 'testUser');

  renderWithApolloAndChakra(<Navbar />);

  // Vérifier la présence du bouton de déconnexion
  expect(screen.getByText('Log out')).toBeInTheDocument();
  expect(screen.queryByText('Log in')).toBeNull(); // Vérifier l'absence du bouton de connexion
  expect(screen.queryByText('Sign Up')).toBeNull(); // Vérifier l'absence du bouton d'inscription
});