import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { DataState, ResourceFormDialog, safeText } from './operations-ui';
import { ApiRequestError } from '@/services/api-client';

describe('ResourceFormDialog', () => {
  it('retains keyboard input after the dialog opens', () => {
    render(<ResourceFormDialog fields={[{ label: 'Organization name', name: 'name', required: true }]} onClose={vi.fn()} onSubmit={vi.fn()} open submitting={false} title="Create organization" />);

    const input = screen.getByRole('textbox', { name: 'Organization name' });
    fireEvent.change(input, { target: { value: 'FIFA Operations' } });

    expect(input).toHaveValue('FIFA Operations');
  });

  it('presents authentication failures as a sign-in requirement', () => {
    render(<DataState error={new ApiRequestError(401, 'Unauthorized')} isLoading={false} onRetry={vi.fn()} title="Sports"><div>Protected content</div></DataState>);

    expect(screen.getByRole('heading', { name: 'Authentication required' })).toBeInTheDocument();
    expect(screen.getByText(/Sign in required/i)).toBeInTheDocument();
  });

  it('uses a resilient display value for incomplete API records', () => {
    expect(safeText(undefined)).toBe('Untitled record');
    expect(safeText('  ', 'Organization')).toBe('Organization');
  });
});
