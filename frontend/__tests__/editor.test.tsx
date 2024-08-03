import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import Editor from '@/pages/editor/[id]';
import { useRouter } from 'next/router';

// Mocks pour GraphQL
const PROJECT_BY_ID = gql`
  query findProjectById($findProjectByIdId: String!) {
    findProjectById(id: $findProjectByIdId) {
      id
      name
      private
      update_at
      created_at
      category
      files {
        language
        extension
        name
        type
        id
        content
        created_at
        update_at
      }
    }
  }
`;

// Réponse mock pour un projet public
const mocks = [
  {
    request: {
      query: PROJECT_BY_ID,
      variables: { findProjectByIdId: '1' },
    },
    result: {
      data: {
        findProjectById: {
          id: '1',
          name: 'Public Project',
          private: false,
          update_at: '2024-08-01T00:00:00Z',
          created_at: '2024-08-01T00:00:00Z',
          category: 'Development',
          files: [],
        },
      },
    },
  },
];

// Mock pour useRouter
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    query: { id: '1' },
    push: mockPush,
  });
});

const renderWithApolloAndChakra = (ui: React.ReactElement) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <ChakraProvider>
        {ui}
      </ChakraProvider>
    </MockedProvider>
  );
};

test('renders public project when not logged in', async () => {
  // Simuler l'absence de connexion en supprimant les cookies
  Cookies.remove('id');
  Cookies.remove('pseudo');
  Cookies.remove('email');
  Cookies.remove('token');
  
  renderWithApolloAndChakra(<Editor />);
  
  // Vérifier que le titre du projet est affiché
  await waitFor(() => {
    expect(screen.getByText('Public Project')).toBeInTheDocument();
  });
  
  // Assurez-vous qu'aucun message d'erreur n'a été affiché
  expect(mockPush).not.toHaveBeenCalled();
});