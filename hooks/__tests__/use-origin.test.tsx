import { act, renderHook, waitFor } from '@testing-library/react';
import { useOrigin } from '@/hooks/use-origin';

describe('useOrigin hook', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://example.com',
      },
      writable: true,
    });
  });
  it('should return an empty string initially when the component is not mounted', () => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: '',
      },
      writable: true,
    });

    const { result } = renderHook(() => useOrigin());

    expect(result.current).toBe(''); // Initially, hook should return an empty str
  });

  it('should return window.location.origin after the component has mounted', async () => {
    Object.defineProperty(window, 'location', {
      value: {
        origin: 'http://example.com',
      },
      writable: true,
    });

    const { result, rerender } = renderHook(() => useOrigin());

    act(() => {
      rerender();
    });

    // Wait for the hook to update after useEffect runs
    await waitFor(() => {
      // After update, it should return the mocked window.location.origin
      expect(result.current).toBe('http://example.com');
    });
  });
});
