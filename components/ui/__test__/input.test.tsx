import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { Input } from '@/components/ui/input';

interface SetupProps {
  placeholder?: string;
  value?: string;
  onChange?: () => void;
  readOnly?: boolean;
}

afterEach(() => {
  cleanup();
});

const setup = (props?: SetupProps) => {
  render(<Input {...props} />);

  const input = screen.getByRole('textbox') as HTMLInputElement;

  return {
    input,
  };
};

describe('Input Component', () => {
  test('It should be rendered', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
  });

  test('It should have a placeholder', () => {
    const { input } = setup({ placeholder: 'Enter your email' });
    expect(input).toHaveAttribute('placeholder');
  });

  test('It should display correct value', () => {
    const { input } = setup({ value: 'Hello', readOnly: true });
    expect(input.value).toBe('Hello');
  });

  test('It should allow letters to be inputted', () => {
    const { input } = setup();

    expect(input.value).toBe('');
    fireEvent.change(input, { target: { value: 'Good Day' } });
    expect(input.value).toBe('Good Day');
  });

  test('It should call onChange when input value changes', () => {
    const mockedOnChange = jest.fn();

    const { input } = setup({ value: '', onChange: mockedOnChange });

    fireEvent.change(input, { target: { value: 'Hello' } });
    expect(mockedOnChange).toHaveBeenCalledTimes(1);
  });
});
