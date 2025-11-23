
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('renders signin and signup routes', () => {
  render(
    <MemoryRouter initialEntries={['/signin']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();

  render(
    <MemoryRouter initialEntries={['/signup']}>
      <App />
    </MemoryRouter>
  );
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
});
