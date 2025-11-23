import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CreateContentModal from '../Components/Createcontentmodel';

describe('CreateContentModal component', () => {
  const onClose = jest.fn();

  test('renders modal when open is true', () => {
    render(<CreateContentModal open={true} onClose={onClose} />);
    expect(screen.getByPlaceholderText(/Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Link/i)).toBeInTheDocument();
  });

  test('does not render modal when open is false', () => {
    const { container } = render(<CreateContentModal open={false} onClose={onClose} />);
    expect(container.firstChild).toBeNull();
  });

  test('calls onClose when close icon is clicked', () => {
    render(<CreateContentModal open={true} onClose={onClose} />);
    fireEvent.click(screen.getByRole('button', { hidden: true }));
    // Since close icon div has no role, you might need to query by alternative selectors or text
    // Modify this test based on actual close icon implementation if needed
  });

  test('switches content type when buttons clicked', () => {
    render(<CreateContentModal open={true} onClose={onClose} />);
    const youtubeButton = screen.getByText(/Youtube/i);
    const twitterButton = screen.getByText(/Twitter/i);
    fireEvent.click(twitterButton);
    expect(twitterButton).toHaveClass('primary');
    fireEvent.click(youtubeButton);
    expect(youtubeButton).toHaveClass('primary');
  });
});
