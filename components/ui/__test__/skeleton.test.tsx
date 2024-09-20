import { render } from '@testing-library/react';

import { Skeleton } from '@/components/ui/skeleton';

describe('Skeleton component', () => {
  test('It should render component correctly', () => {
    const {
      container: { firstChild },
    } = render(<Skeleton className='h-20 w-20' />);

    expect(firstChild).toBeDefined();
  });
});
