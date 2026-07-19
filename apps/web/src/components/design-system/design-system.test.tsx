import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { PremiumButton, PremiumDataTable, Toggle } from './index';

describe('design-system primitives', () => {
  it('keeps primary actions accessible and interactive', () => {
    const onClick = vi.fn();
    render(<PremiumButton onClick={onClick}>Create workspace</PremiumButton>);

    fireEvent.click(screen.getByRole('button', { name: 'Create workspace' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('reports controlled toggle changes', () => {
    const onChange = vi.fn();
    render(<Toggle checked={false} label="Enable operations alerts" onChange={onChange} />);

    fireEvent.click(screen.getByRole('checkbox', { name: 'Enable operations alerts' }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('exposes interactive table controls for a consuming page', () => {
    const onFilter = vi.fn();
    render(<PremiumDataTable columns={[{ cell: (item: { name: string }) => item.name, header: 'Name', id: 'name' }]} items={[{ name: 'Operations' }]} onFilter={onFilter} />);

    fireEvent.click(screen.getByRole('button', { name: 'Filter' }));

    expect(onFilter).toHaveBeenCalledOnce();
    expect(screen.getByText('Filter controls are ready for the consuming page to provide.')).toBeInTheDocument();
  });
});
