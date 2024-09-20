import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { HomeIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface SetupProps {
  children?: JSX.Element;
  onClick?: () => void;
  name: string;
  asChild?: boolean;
  disabled?: boolean;
}

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

const setup = (props: SetupProps) => {
  render(
    <Button {...props}>
      {props?.children} {props.name}
    </Button>
  );

  const button = screen.getByRole('button', { name: props.name });

  return {
    button,
  };
};

describe('Button Component', () => {
  test('It should be rendered', () => {
    const { button } = setup({ name: 'Click me' });

    expect(button).toBeInTheDocument();
  });

  test('It should have asChild prop', () => {
    const mockedOnClick = jest.fn();

    render(
      <Button asChild onClick={mockedOnClick}>
        <a href='https://example.com'>Go to</a>
      </Button>
    );

    const anchorElement = screen.getByRole('link', { name: 'Go to' });

    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute('href', 'https://example.com');

    fireEvent.click(anchorElement);

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });

  test('It should have text value', () => {
    const { button } = setup({ name: 'Text' });

    expect(button).toHaveTextContent('Text');
  });

  test('It should have an Icon', () => {
    const { button } = setup({
      name: 'Home',
      children: <HomeIcon />,
    });

    const svgEl = button.querySelector('svg');

    expect(svgEl).toBeInTheDocument();
  });

  test('It should fire event', () => {
    const mockedOnClick = jest.fn();

    const { button } = setup({ name: 'Click me', onClick: mockedOnClick });

    fireEvent.click(button, { target: { name: 'Click me' } });

    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });

  test('It should be disabled when the disabled prop is true', () => {
    const { button } = setup({
      name: 'Buy',
      disabled: true,
    });

    expect(button).toBeDisabled()
  })
});
