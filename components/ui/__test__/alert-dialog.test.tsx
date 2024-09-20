import { render } from '@testing-library/react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ConfirmModalProps } from '@/components/modals/confirm-modal';

interface SetupProps extends ConfirmModalProps {
  isOpen?: boolean;
}

const setup = ({ children, isOpen, onConfirm }: SetupProps) => {
  const titleText = 'Are you sure?';
  const descriptionText = 'Ths action can not be undone';

  const screen = render(
    <AlertDialog open={!!isOpen}>
      <AlertDialogTrigger asChild onClick={(ev) => ev.stopPropagation()}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{titleText}</AlertDialogTitle>
          <AlertDialogDescription>{descriptionText}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={(ev) => ev.stopPropagation()}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );

  screen.debug();

  const dialog = screen.queryByRole('alertdialog', { name: titleText });
  const heading = screen.queryByRole('heading', { name: titleText });

  return {
    dialog,
    heading,
    screen,
  };
};

describe('AlertDialog Component', () => {
  test('It should render the trigger button', () => {
    const trigger = 'Trigger';

    const { screen } = setup({
      children: <Button>{trigger}</Button>,
      onConfirm: () => {},
    });

    expect(screen.getByRole('button', { name: trigger })).toBeInTheDocument();
  });
  test('It should render the component', () => {
    const { dialog, heading } = setup({
      isOpen: true,
      children: null,
      onConfirm: () => {},
    });

    expect(dialog).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
  });
});
