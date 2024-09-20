import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

jest.mock('@radix-ui/react-avatar', () => {
  const originalModule = jest.requireActual('@radix-ui/react-avatar');
  return {
    ...originalModule,
    Image: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
  };
});

interface SetupProps {
  src?: string;
  fallbackText?: string;
}

const setup = ({ src = '', fallbackText = '' }: SetupProps) => {
  const alt = 'Avatar';

  render(
    <Avatar>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );

  const avatarImage = screen.queryByRole('img', { name: alt });
  const fallback = fallbackText && screen.queryByText(fallbackText);

  return {
    avatarImage,
    fallback,
  };
};

afterEach(() => {
  cleanup();
});

describe('Avatar Component', () => {
  test('It should render AvatarImage when a valid src is provided', () => {
    const { avatarImage } = setup({ src: 'https://example.com/avatar.jpg' });

    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute('src', 'https://example.com/avatar.jpg');
  });

  test('It should render AvatarFallback when image fails to load', () => {
    const { fallback } = setup({ src: 'broken-link.jpg', fallbackText: 'U' });

    expect(fallback).toBeInTheDocument();
  });

  test('It should render AvatarFallback when no image is provided', () => {
    const { fallback } = setup({ fallbackText: 'U' });

    expect(fallback).toBeInTheDocument();
  });

  test('It should render AvatarFallback when image onError event fires', () => {
    const { fallback, avatarImage } = setup({ src: 'broken-link.jpg', fallbackText: 'User Avatar' });

    // Simulate the image loading failure
    fireEvent.error(avatarImage as HTMLElement);

    expect(fallback).toBeInTheDocument();
  });
});
