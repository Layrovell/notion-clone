import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { HomeIcon } from 'lucide-react';
import '@testing-library/jest-dom';

import { Button } from '@/components/ui/button';

afterEach(() => {
  cleanup(); // Resets the DOM after each test suite
});

describe('Button Component', () => {
  render(<Button>Text</Button>);

  const button = screen.getByRole('button', { name: 'Text' });

  test('Button Rendering', () => {
    expect(button).toBeInTheDocument();
  });

  test('Button Text', () => {
    expect(button).toHaveTextContent('Text');
  });

  test('Button with Icon', () => {
    render(
      <Button>
        Home
        <HomeIcon className='h-6 w-6' />
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Home' });
    const svgEl = button.querySelector('svg');

    expect(svgEl).toBeInTheDocument();
  });

  test('Button Event', () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Fire event</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Fire event' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
