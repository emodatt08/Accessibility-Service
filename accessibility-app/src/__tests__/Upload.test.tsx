import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Upload from '../pages/Upload';
import { BrowserRouter } from 'react-router-dom';

// A helper to render with Router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Upload Page', () => {
  test('renders upload form', () => {
    renderWithRouter(<Upload />);
    expect(screen.getByText(/Upload HTML File/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Upload and Analyze/i })).toBeInTheDocument();
  });

  test('shows file input when file is selected', () => {
    renderWithRouter(<Upload />);
    const fileInput = screen.getByLabelText(/file/i) || screen.getByTestId('file-input');
    const file = new File(['<html></html>'], 'test.html', { type: 'text/html' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    expect(fileInput?.files?.[0]).toStrictEqual(file);
    expect(fileInput?.files).toHaveLength(1);
  });
});
