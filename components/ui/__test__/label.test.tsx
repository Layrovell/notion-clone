import { render } from '@testing-library/react';

import { Label } from '@/components/ui/label';

describe('Label Component', () => {
  test('It should render the Label', async () => {
    const screen = render(<Label>Label</Label>);

    const label = screen.getByText('Label');

    expect(label).toBeInTheDocument();
  });
});
