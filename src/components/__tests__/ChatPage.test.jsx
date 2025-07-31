import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '../ToastContext';
import { ThemeProvider } from '../ThemeProvider';
import ChatPage from '../ChatPage';
import { auth, db } from '../../utils/firebase';

// Mock Firebase
jest.mock('../../utils/firebase', () => ({
  auth: {
    currentUser: {
      uid: 'test-user-id',
      email: 'test@example.com',
      displayName: 'Test User',
    },
    onAuthStateChanged: jest.fn(),
  },
  db: {
    collection: jest.fn(),
    doc: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    onSnapshot: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
    serverTimestamp: jest.fn(() => new Date()),
    getDocs: jest.fn(),
  },
}));

// Mock React Router
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Wrapper pour les tests
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('ChatPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock des données de contacts
    const mockContacts = [
      {
        id: 'contact-1',
        displayName: 'John Doe',
        email: 'john@example.com',
        online: true,
        lastSeen: null,
      },
      {
        id: 'contact-2',
        displayName: 'Jane Smith',
        email: 'jane@example.com',
        online: false,
        lastSeen: new Date(Date.now() - 300000), // 5 minutes ago
      },
    ];

    // Mock des données de messages
    const mockMessages = [
      {
        id: 'msg-1',
        text: 'Hello!',
        senderId: 'test-user-id',
        senderName: 'Test User',
        timestamp: new Date(),
        reactions: {},
      },
      {
        id: 'msg-2',
        text: 'Hi there!',
        senderId: 'contact-1',
        senderName: 'John Doe',
        timestamp: new Date(),
        reactions: {
          '👍': { count: 2, users: ['test-user-id', 'contact-1'] },
        },
      },
    ];

    // Mock onSnapshot pour les contacts
    db.onSnapshot.mockImplementation((query, callback) => {
      callback({
        docs: mockContacts.map(contact => ({
          id: contact.id,
          data: () => contact,
        })),
      });
      return jest.fn(); // unsubscribe function
    });

    // Mock onSnapshot pour les messages
    db.onSnapshot.mockImplementation((query, callback) => {
      callback({
        docs: mockMessages.map(message => ({
          id: message.id,
          data: () => message,
        })),
      });
      return jest.fn(); // unsubscribe function
    });

    // Mock addDoc
    db.addDoc.mockResolvedValue({ id: 'new-message-id' });

    // Mock updateDoc
    db.updateDoc.mockResolvedValue();

    // Mock getDocs pour les mentions
    db.getDocs.mockResolvedValue({
      docs: mockContacts.map(contact => ({
        id: contact.id,
        data: () => contact,
      })),
    });
  });

  test('renders chat page with contacts list', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Contacts')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  test('displays contact status correctly', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('En ligne')).toBeInTheDocument();
      expect(screen.getByText(/Il y a/)).toBeInTheDocument();
    });
  });

  test('selects a contact and shows chat interface', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Tapez votre message...')
      ).toBeInTheDocument();
    });
  });

  test('sends a message successfully', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    const messageInput = screen.getByPlaceholderText('Tapez votre message...');
    const sendButton = screen.getByText('➤');

    fireEvent.change(messageInput, { target: { value: 'Hello world!' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(db.addDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          text: 'Hello world!',
          senderId: 'test-user-id',
          senderName: 'Test User',
        })
      );
    });
  });

  test('handles message reactions', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    await waitFor(() => {
      const reactionButton = screen.getByLabelText('Réagir avec 👍');
      fireEvent.click(reactionButton);
    });

    await waitFor(() => {
      expect(db.updateDoc).toHaveBeenCalled();
    });
  });

  test('handles file upload', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    const fileInput = screen.getByLabelText('Joindre un fichier');
    const file = new File(['test content'], 'test.txt', { type: 'text/plain' });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(db.addDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          text: '📎 test.txt',
          fileType: 'text/plain',
          fileName: 'test.txt',
        })
      );
    });
  });

  test('handles mentions in messages', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    const messageInput = screen.getByPlaceholderText('Tapez votre message...');

    // Type @ to trigger mentions
    fireEvent.change(messageInput, { target: { value: '@' } });

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  test('prevents XSS in messages', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    const messageInput = screen.getByPlaceholderText('Tapez votre message...');
    const sendButton = screen.getByText('➤');

    const maliciousMessage = '<script>alert("xss")</script>';
    fireEvent.change(messageInput, { target: { value: maliciousMessage } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(db.addDoc).toHaveBeenCalledWith(
        expect.any(Object),
        expect.objectContaining({
          text: '&lt;script&gt;alert("xss")&lt;/script&gt;',
        })
      );
    });
  });

  test('shows typing indicator', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    const messageInput = screen.getByPlaceholderText('Tapez votre message...');
    fireEvent.change(messageInput, { target: { value: 'Typing...' } });

    await waitFor(() => {
      expect(screen.getByText("En train d'écrire")).toBeInTheDocument();
    });
  });

  test('handles theme toggle', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const themeToggle = screen.getByLabelText('Passer au thème sombre');
      fireEvent.click(themeToggle);
    });

    await waitFor(() => {
      expect(
        screen.getByLabelText('Passer au thème clair')
      ).toBeInTheDocument();
    });
  });

  test('displays empty state when no contact selected', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Sélectionnez un contact')).toBeInTheDocument();
      expect(
        screen.getByText(
          'Choisissez un contact pour commencer une conversation'
        )
      ).toBeInTheDocument();
    });
  });

  test('handles large file upload rejection', async () => {
    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    const fileInput = screen.getByLabelText('Joindre un fichier');
    const largeFile = new File(['x'.repeat(11 * 1024 * 1024)], 'large.txt', {
      type: 'text/plain',
    });

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(
        screen.getByText('Fichier trop volumineux (max 10MB)')
      ).toBeInTheDocument();
    });
  });

  test('handles network errors gracefully', async () => {
    // Mock addDoc to throw an error
    db.addDoc.mockRejectedValue(new Error('Network error'));

    render(
      <TestWrapper>
        <ChatPage />
      </TestWrapper>
    );

    await waitFor(() => {
      const johnContact = screen.getByText('John Doe');
      fireEvent.click(johnContact);
    });

    const messageInput = screen.getByPlaceholderText('Tapez votre message...');
    const sendButton = screen.getByText('➤');

    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(
        screen.getByText("Erreur lors de l'envoi du message")
      ).toBeInTheDocument();
    });
  });
});
