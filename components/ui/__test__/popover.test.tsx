import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

describe('Popover Component', () => {
  test('It should render trigger text correctly', () => {
    const trigger = 'Trigger';

    const screen = render(
      <Popover>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>
    );

    const triggerButton = screen.getByRole('button', { name: trigger });

    expect(triggerButton).toBeInTheDocument();
  });

  test('It should render content correctly', () => {
    const content = 'Content';

    const screen = render(
      <Popover open>
        <PopoverTrigger>Trigger</PopoverTrigger>
        <PopoverContent>{content}</PopoverContent>
      </Popover>
    );

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('It should trigger correctly', async () => {
    const trigger = 'Trigger';
    const content = 'Content';

    const screen = render(
      <Popover>
        <PopoverTrigger>{trigger}</PopoverTrigger>
        <PopoverContent>{content}</PopoverContent>
      </Popover>
    );

    // closed by default
    expect(screen.queryByText(content)).not.toBeInTheDocument();

    const triggerButton = screen.getByRole('button', { name: trigger });

    // open on trigger clicked
    await userEvent.click(triggerButton);
    expect(screen.getByText(content)).toBeInTheDocument();

    // close on trigger clicked
    await userEvent.click(triggerButton);
    expect(screen.queryByText(content)).not.toBeInTheDocument();
  });
});
