import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

describe('Dialog Component', () => {
  test('It should render trigger text correctly', () => {
    const trigger = 'Trigger';

    const screen = render(
      <Dialog modal>
        <DialogTrigger>Trigger</DialogTrigger>
        <DialogContent>
          <DialogHeader>Header</DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText(trigger)).toBeInTheDocument();
  });

  test('It should render the component', async () => {
    const screen = render(
      <Dialog modal open>
        <DialogTrigger>Trigger</DialogTrigger>
        <DialogContent>
          <DialogHeader>Header</DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog', { name: 'Title' });
    const heading = screen.getByRole('heading');
    const headerText = screen.getByText('Header');
    const descriptionText = screen.getByText('Description');

    expect(dialog).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(headerText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
  });

  test('It should open and close the dialog', async () => {
    const trigger = 'Trigger';

    const screen = render(
      <Dialog>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent>
          <DialogHeader>Header</DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    const openButton = screen.getByRole('button', { name: trigger });

    await userEvent.click(openButton);

    expect(screen.getByRole('dialog', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByRole('dialog', { name: 'Title' })).toBeVisible();

    const closeButton = screen.getByRole('button', { name: 'Close' });

    await userEvent.click(closeButton);

    expect(screen.queryByRole('dialog', { name: 'Title' })).not.toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: 'Title' })).not.toBeInTheDocument();
  });
});
