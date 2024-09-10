import { cleanup, fireEvent, render, screen } from '@testing-library/react';

import { Input } from '@/components/ui/input';

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

const setup = () => {
  const utils = render(<Input />);
  const input = screen.getByLabelText('input-field');
  return {
    input,
    ...utils,
  };
};

describe('Input Component', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: '23' } });
  expect(input.value).toBe('$23');
});
