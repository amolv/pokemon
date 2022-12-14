import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders pokemon app', () => {
    render(<App />);
    const linkElement = screen.getAllByText(/List/i)[0] as HTMLElement;
    expect(linkElement).toBeInTheDocument();
  });
});
