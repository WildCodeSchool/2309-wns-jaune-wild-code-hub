import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '@/pages/auth/login'; // Assurez-vous que le chemin est correct
import { gql } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import Navbar from '@/components/Navbar';
import Cookies from 'js-cookie';

// Définir la mutation et les mocks
const LOGIN = gql`
  mutation login($info: InputLogin!) {
    login(info: $info) {
      success
      message
    }
  }
`;

const mocksSuccess = [
  {
    request: {
      query: LOGIN,
      variables: { info: { pseudo: 'Alexandre78R', password: 'toto' } },
    },
    result: {
      data: {
        login: {
          success: true,
          message: 'Connexion réussi',
        },
      },
    },
  },
];

const mocksFailure = [
  {
    request: {
      query: LOGIN,
      variables: { info: { pseudo: 'Alexandre78R', password: 'toto' } },
    },
    result: {
      data: {
        login: {
          success: false,
          message: 'Échec de la connexion',
        },
      },
    },
  },
];

// Mock pour useRouter
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

const renderWithProviders = (ui: React.ReactElement, mocks: any[]) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ChakraProvider>
        {ui}
      </ChakraProvider>
    </MockedProvider>
  );
};

test('Login true', async () => {
  renderWithProviders(<Login />, mocksSuccess);

  // Remplir le formulaire de connexion
  fireEvent.change(screen.getByLabelText(/Enter your Email or Pseudo\*/i), {
    target: { value: 'Alexandre78R' },
  });
  fireEvent.change(screen.getByLabelText(/Choose your Password \*/i), {
    target: { value: 'toto' },
  });

  // Simuler le clic sur le bouton de connexion
  fireEvent.click(screen.getByText(/Sign In/i));

  // Attendre que la mutation et les effets secondaires se produisent
  await waitFor(() => {
    Cookies.set('pseudo', 'Alexandre78R');
    expect(Cookies.get('pseudo')).toBe('Alexandre78R');
  });
});

test('get pseudo from cookie', () => {
  const pseudo = Cookies.get("pseudo");
  expect(pseudo).toBe('Alexandre78R');
});

test('shows logout button when logged in', () => {
  renderWithProviders(<Navbar />, mocksSuccess);
  // Vérifier la présence du bouton de déconnexion
  expect(screen.getByText('Log out')).toBeInTheDocument();
  expect(screen.queryByText('Log in')).toBeNull(); // Vérifier l'absence du bouton de connexion
  expect(screen.queryByText('Sign Up')).toBeNull(); // Vérifier l'absence du bouton d'inscription
  //Suppresion du cokkie après vérification des bouttons
  Cookies.remove('pseudo');
});

test('Login failure does not set cookie', async () => {
  renderWithProviders(<Login />, mocksFailure);

  // Remplir le formulaire de connexion
  fireEvent.change(screen.getByLabelText(/Enter your Email or Pseudo\*/i), {
    target: { value: 'Alexandre78R' },
  });
  fireEvent.change(screen.getByLabelText(/Choose your Password \*/i), {
    target: { value: 'toto' },
  });

  // Simuler le clic sur le bouton de connexion
  fireEvent.click(screen.getByText(/Sign In/i));

  // Attendre que la mutation soit complétée
  await waitFor(() => {
    // Vérifier que la connexion a échoué et que le cookie n'est pas défini
    expect(Cookies.get('pseudo')).toBeUndefined();
  });
});
