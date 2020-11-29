import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Sign in', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Sign in/i);
  expect(linkElement).toBeInTheDocument();
});
