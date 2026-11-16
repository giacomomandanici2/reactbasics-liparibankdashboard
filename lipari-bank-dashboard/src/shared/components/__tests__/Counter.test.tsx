import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../Counter';

describe('Counter', () => {
  it('renderizza con initialValue', () => {
    render(<Counter initialValue={5} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('incrementa al click su +', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={0} />);
    await user.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('decrementa al click su -', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={5} />);
    await user.click(screen.getByRole('button', { name: '-' }));
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('resetta al click su Reset', async () => {
    const user = userEvent.setup();
    render(<Counter initialValue={3} />);
    await user.click(screen.getByRole('button', { name: '+' }));
    await user.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
