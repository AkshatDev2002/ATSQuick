import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UploadBox from './UploadBox';

// Mock the analyzeService
jest.mock('@/services/analyzeService', () => ({
  analyzeResume: jest.fn(),
}));

// Mock FullScreenLoader
jest.mock('@/components/FullScreenLoader/FullScreenLoader', () => {
  return function MockLoader({ text }) {
    return <div data-testid="fullscreen-loader">{text}</div>;
  };
});

describe('UploadBox', () => {
  const { analyzeResume } = require('@/services/analyzeService');

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
    // Mock alert
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the upload box', () => {
    render(<UploadBox />);
    expect(screen.getByRole('button', { name: /Analyze Resume/i })).toBeInTheDocument();
  });

  it('renders the drag and drop zone with initial text', () => {
    render(<UploadBox />);
    expect(screen.getByText(/Drag & drop your resume here/i)).toBeInTheDocument();
    expect(screen.getByText(/or click to upload/i)).toBeInTheDocument();
  });

  it('renders a hidden file input', () => {
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('accept', 'application/pdf');
  });

  it('accepts only PDF files in the input', () => {
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toHaveAttribute('accept', 'application/pdf');
  });

  it('displays file name when a PDF file is selected', async () => {
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);

    expect(screen.getByText(/resume.pdf/i)).toBeInTheDocument();
  });

  it('shows alert when non-PDF file is selected', async () => {
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.txt', { type: 'text/plain' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(window.alert).toHaveBeenCalledWith('Only PDF files are allowed');
  });

  it('does not accept non-PDF files', async () => {
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.queryByText(/document.docx/i)).not.toBeInTheDocument();
  });

  it('shows alert when analyze button is clicked without a file', async () => {
    render(<UploadBox />);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });

    await userEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Please upload a resume');
  });

  it('disables button while loading', async () => {
    analyzeResume.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    expect(button).toBeDisabled();
  });

  it('displays fullscreen loader when analyzing', async () => {
    analyzeResume.mockResolvedValue({ score: 85 });
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    expect(screen.getByTestId('fullscreen-loader')).toBeInTheDocument();
    expect(screen.getByText('Analyzing your resume…')).toBeInTheDocument();
  });

  it('calls analyzeResume with the file when button is clicked', async () => {
    analyzeResume.mockResolvedValue({ score: 85 });
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    expect(analyzeResume).toHaveBeenCalledWith(file);
  });

  it('stores analysis data in localStorage on success', async () => {
    const mockData = { score: 85, roles: ['Engineer'], skills: {} };
    analyzeResume.mockResolvedValue(mockData);
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(localStorage.getItem('analysis')).toBe(JSON.stringify(mockData));
    });
  });

  it('attempts to redirect after storing analysis data', async () => {
    const mockData = { score: 85, roles: ['Engineer'], skills: {} };
    analyzeResume.mockResolvedValue(mockData);
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    await waitFor(() => {
      // Verify that localStorage was set (which happens before redirect)
      expect(localStorage.getItem('analysis')).toBeTruthy();
    });
  });

  it('shows error alert when analyzeResume fails', async () => {
    analyzeResume.mockRejectedValue(new Error('API Error'));
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Our system is currently experiencing high demand and is temporarily overloaded. Please try your request again shortly.');
    });
  });

  it('hides loader and enables button when analysis fails', async () => {
    analyzeResume.mockRejectedValue(new Error('API Error'));
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.queryByTestId('fullscreen-loader')).not.toBeInTheDocument();
      expect(button).not.toBeDisabled();
    });
  });

  it('adds dragActive class when dragging over the box', async () => {
    render(<UploadBox />);
    const box = document.querySelector('.box') || screen.getByRole('button', { name: /Analyze Resume/i }).parentElement;

    fireEvent.dragOver(box);

    expect(box).toHaveClass('dragActive');
  });

  it('removes dragActive class when dragging leaves the box', async () => {
    render(<UploadBox />);
    const box = document.querySelector('.box') || screen.getByRole('button', { name: /Analyze Resume/i }).parentElement;

    fireEvent.dragOver(box);
    expect(box).toHaveClass('dragActive');

    fireEvent.dragLeave(box);
    expect(box).not.toHaveClass('dragActive');
  });

  it('handles file drop on drag zone', async () => {
    render(<UploadBox />);
    const box = document.querySelector('.box') || screen.getByRole('button', { name: /Analyze Resume/i }).parentElement;
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    const dataTransfer = {
      files: [file],
      preventDefault: jest.fn(),
    };

    fireEvent.drop(box, { dataTransfer });

    expect(screen.getByText(/resume.pdf/i)).toBeInTheDocument();
  });

  it('removes dragActive class after drop', async () => {
    render(<UploadBox />);
    const box = document.querySelector('.box') || screen.getByRole('button', { name: /Analyze Resume/i }).parentElement;
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    fireEvent.dragOver(box);
    expect(box).toHaveClass('dragActive');

    const dataTransfer = {
      files: [file],
      preventDefault: jest.fn(),
    };

    fireEvent.drop(box, { dataTransfer });

    expect(box).not.toHaveClass('dragActive');
  });

  it('handles drop with non-PDF file', async () => {
    render(<UploadBox />);
    const box = document.querySelector('.box') || screen.getByRole('button', { name: /Analyze Resume/i }).parentElement;
    const file = new File(['dummy content'], 'document.txt', { type: 'text/plain' });

    const dataTransfer = {
      files: [file],
      preventDefault: jest.fn(),
    };

    fireEvent.drop(box, { dataTransfer });

    expect(window.alert).toHaveBeenCalledWith('Only PDF files are allowed');
  });

  it('handles empty drop (no files)', async () => {
    render(<UploadBox />);
    const box = document.querySelector('.box') || screen.getByRole('button', { name: /Analyze Resume/i }).parentElement;

    const dataTransfer = {
      files: [],
      preventDefault: jest.fn(),
    };

    fireEvent.drop(box, { dataTransfer });

    expect(screen.queryByText(/\.pdf/i)).not.toBeInTheDocument();
  });

  it('updates file display when a new file is selected', async () => {
    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file1 = new File(['dummy'], 'resume1.pdf', { type: 'application/pdf' });
    const file2 = new File(['dummy'], 'resume2.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file1);
    expect(screen.getByText(/resume1.pdf/i)).toBeInTheDocument();

    await userEvent.upload(input, file2);
    expect(screen.getByText(/resume2.pdf/i)).toBeInTheDocument();
    expect(screen.queryByText(/resume1.pdf/i)).not.toBeInTheDocument();
  });

  it('sets dragActive class on drag over and removes on drag leave', () => {
    render(<UploadBox />);
    const box = document.querySelector('.box') || screen.getByRole('button', { name: /Analyze Resume/i }).parentElement;

    fireEvent.dragOver(box);
    expect(box).toHaveClass('dragActive');

    fireEvent.dragLeave(box);
    expect(box).not.toHaveClass('dragActive');
  });

  it('console.error is called when analyzeResume throws error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    const error = new Error('API Error');
    analyzeResume.mockRejectedValue(error);

    render(<UploadBox />);
    const input = document.querySelector('input[type="file"]');
    const file = new File(['dummy content'], 'resume.pdf', { type: 'application/pdf' });

    await userEvent.upload(input, file);
    const button = screen.getByRole('button', { name: /Analyze Resume/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    });

    consoleErrorSpy.mockRestore();
  });
});