import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { LoginPage } from '../LoginPage';
import { AuthProvider } from '../../../store/auth/AuthContext';

describe('LoginPage', () => {
  beforeEach(() => {
    // Mock di fetch globale
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: '1', name: 'Mario', email: 'mario@test.it' }),
    } as Response);
  });

  function renderLoginPage() {
    return render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );
  }

  it('renderizza email, password, e bottone Login', () => {
    renderLoginPage();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('disabilita il bottone se email è invalida', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.type(screen.getByLabelText(/email/i), 'non-email');
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });

  it('abilita il bottone con email valida + password >= 6', async () => {
    const user = userEvent.setup();
    renderLoginPage();

    await user.type(screen.getByLabelText(/email/i), 'mario@test.it');
    await user.type(screen.getByLabelText(/password/i), 'password');

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).toBeEnabled();
    });
  });
});
