import { render, screen, waitFor, act } from '@testing-library/react';
import ScoreCard from './ScoreCard';

// Mock requestAnimationFrame for predictable testing
jest.useFakeTimers();

describe('ScoreCard', () => {
  afterEach(() => {
    jest.clearAllTimers();
  });

  it('renders the heading correctly', () => {
    render(<ScoreCard score={75} />);
    const heading = screen.getByRole('heading', { name: /Resume Score/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the section with correct aria-labelledby', () => {
    render(<ScoreCard score={75} />);
    const section = screen.getByRole('region', { hidden: true });
    expect(section).toHaveAttribute('aria-labelledby', 'score-heading');
  });

  it('renders error message when score is undefined', () => {
    render(<ScoreCard score={undefined} />);
    const errorMessage = screen.getByText(/Score unavailable/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders error message when score is null', () => {
    render(<ScoreCard score={null} />);
    const errorMessage = screen.getByText(/Score unavailable/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders error message when score is negative', () => {
    render(<ScoreCard score={-10} />);
    const errorMessage = screen.getByText(/Score unavailable/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders error message when score is greater than 100', () => {
    render(<ScoreCard score={150} />);
    const errorMessage = screen.getByText(/Score unavailable/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders error message when score is not a number', () => {
    render(<ScoreCard score="85" />);
    const errorMessage = screen.getByText(/Score unavailable/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('initializes displayScore to 0', () => {
    render(<ScoreCard score={80} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('animates the score from 0 to the target value', async () => {
    render(<ScoreCard score={80} />);

    expect(screen.getByText('0')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('80')).toBeInTheDocument();
    });
  });

  it('rounds the score to nearest integer', () => {
    render(<ScoreCard score={85.6} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    expect(screen.getByText('86')).toBeInTheDocument();
  });

  it('displays "Excellent" label for score >= 85', async () => {
    render(<ScoreCard score={90} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Excellent')).toBeInTheDocument();
    });
  });

  it('displays "Strong" label for score >= 70 and < 85', async () => {
    render(<ScoreCard score={75} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });
  });

  it('displays "Average" label for score >= 50 and < 70', async () => {
    render(<ScoreCard score={60} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Average')).toBeInTheDocument();
    });
  });

  it('displays "Needs Improvement" label for score < 50', async () => {
    render(<ScoreCard score={40} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Needs Improvement')).toBeInTheDocument();
    });
  });

  it('has aria-live="polite" on score span', () => {
    render(<ScoreCard score={75} />);
    const scoreSpan = screen.getByText('0');
    expect(scoreSpan).toHaveAttribute('aria-live', 'polite');
  });

  it('has correct aria-label on score span', async () => {
    render(<ScoreCard score={75} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      const scoreSpan = screen.getByLabelText(/Resume score 75/i);
      expect(scoreSpan).toBeInTheDocument();
    });
  });

  it('handles score of 0 correctly', async () => {
    render(<ScoreCard score={0} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument();
      expect(screen.getByText('Needs Improvement')).toBeInTheDocument();
    });
  });

  it('handles score of 100 correctly', async () => {
    render(<ScoreCard score={100} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('Excellent')).toBeInTheDocument();
    });
  });

  it('does not animate twice when component re-renders with same score', async () => {
    const { rerender } = render(<ScoreCard score={75} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    // Re-render with same score
    rerender(<ScoreCard score={75} />);

    // Should still show 75, not animate again
    expect(screen.getByText('75')).toBeInTheDocument();
  });

  it('does not render score wrapper when safeScore is null', () => {
    render(<ScoreCard score={null} />);
    const scoreSpan = screen.queryByText('0');
    expect(scoreSpan).not.toBeInTheDocument();
  });

  it('boundary test: score at exactly 85', async () => {
    render(<ScoreCard score={85} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Excellent')).toBeInTheDocument();
    });
  });

  it('boundary test: score at exactly 70', async () => {
    render(<ScoreCard score={70} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Strong')).toBeInTheDocument();
    });
  });

  it('boundary test: score at exactly 50', async () => {
    render(<ScoreCard score={50} />);

    act(() => {
      jest.advanceTimersByTime(1200);
    });

    await waitFor(() => {
      expect(screen.getByText('Average')).toBeInTheDocument();
    });
  });
});