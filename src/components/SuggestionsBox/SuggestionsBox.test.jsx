import { render, screen } from '@testing-library/react';
import SuggestionsBox from './SuggestionsBox';

describe('SuggestionsBox', () => {
  it('renders the heading correctly', () => {
    render(<SuggestionsBox suggestions={[]} />);
    const heading = screen.getByRole('heading', { name: /Improvement Suggestions/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the section with correct aria-labelledby', () => {
    render(<SuggestionsBox suggestions={[]} />);
    const section = screen.getByRole('region', { hidden: true });
    expect(section).toHaveAttribute('aria-labelledby', 'suggestions-heading');
  });

  it('displays empty state when suggestions array is empty', () => {
    render(<SuggestionsBox suggestions={[]} />);
    const emptyMessage = screen.getByText(/No improvement suggestions available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when suggestions prop is not provided', () => {
    render(<SuggestionsBox />);
    const emptyMessage = screen.getByText(/No improvement suggestions available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when suggestions prop is undefined', () => {
    render(<SuggestionsBox suggestions={undefined} />);
    const emptyMessage = screen.getByText(/No improvement suggestions available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when suggestions prop is null', () => {
    render(<SuggestionsBox suggestions={null} />);
    const emptyMessage = screen.getByText(/No improvement suggestions available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when suggestions is not an array', () => {
    render(<SuggestionsBox suggestions="not an array" />);
    const emptyMessage = screen.getByText(/No improvement suggestions available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when suggestions is an object', () => {
    render(<SuggestionsBox suggestions={{ 0: 'suggestion' }} />);
    const emptyMessage = screen.getByText(/No improvement suggestions available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders list when suggestions are provided', () => {
    render(<SuggestionsBox suggestions={['Add skills section', 'Improve summary']} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  it('renders all suggestions in the list', () => {
    const mockSuggestions = [
      'Add more technical skills',
      'Improve job descriptions',
      'Add certifications',
    ];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    mockSuggestions.forEach(suggestion => {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    });
  });

  it('renders correct number of list items', () => {
    const mockSuggestions = [
      'Suggestion 1',
      'Suggestion 2',
      'Suggestion 3',
      'Suggestion 4',
      'Suggestion 5',
    ];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(5);
  });

  it('renders each suggestion as a separate list item', () => {
    const mockSuggestions = ['Add skills', 'Update summary'];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    const list = screen.getByRole('list');
    const listItems = list.querySelectorAll('li');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toBe('Add skills');
    expect(listItems[1].textContent).toBe('Update summary');
  });

  it('does not display empty state when suggestions are provided', () => {
    render(<SuggestionsBox suggestions={['Add contact information']} />);
    const emptyMessage = screen.queryByText(/No improvement suggestions available/i);
    expect(emptyMessage).not.toBeInTheDocument();
  });

  it('handles single suggestion correctly', () => {
    render(<SuggestionsBox suggestions={['Add LinkedIn URL']} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(listItems[0].textContent).toBe('Add LinkedIn URL');
  });

  it('handles suggestions with special characters', () => {
    const mockSuggestions = [
      'Use keywords like "Python" & "JavaScript"',
      'Add 3-5 bullet points per role',
      'Include metrics (e.g., 50% improvement)',
    ];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    expect(screen.getByText(/Use keywords like/i)).toBeInTheDocument();
    expect(screen.getByText(/Add 3-5 bullet points/i)).toBeInTheDocument();
    expect(screen.getByText(/Include metrics/i)).toBeInTheDocument();
  });

  it('handles long suggestion text', () => {
    const longSuggestion = 'Consider adding more details about your achievements and impact in previous roles to make your resume more compelling to potential employers.';
    render(<SuggestionsBox suggestions={[longSuggestion]} />);
    expect(screen.getByText(longSuggestion)).toBeInTheDocument();
  });

  it('handles suggestions with line breaks and whitespace', () => {
    const mockSuggestions = [
      'Add experience',
      '  Trim whitespace  ',
      'Update dates',
    ];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    expect(screen.getByText('Add experience')).toBeInTheDocument();
    // Testing Library normalizes whitespace, so we match the normalized version
    expect(screen.getByText('Trim whitespace')).toBeInTheDocument();
    expect(screen.getByText('Update dates')).toBeInTheDocument();
  });

  it('handles large number of suggestions', () => {
    const mockSuggestions = Array.from({ length: 20 }, (_, i) => `Suggestion ${i + 1}`);
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(20);
  });

  it('does not render list when suggestions is not an array', () => {
    render(<SuggestionsBox suggestions={{ suggestion: 'text' }} />);
    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
  });

  it('renders empty string suggestions', () => {
    const mockSuggestions = ['Add skills', '', 'Update summary'];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('preserves order of suggestions', () => {
    const mockSuggestions = [
      'First suggestion',
      'Second suggestion',
      'Third suggestion',
      'Fourth suggestion',
    ];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems[0].textContent).toBe('First suggestion');
    expect(listItems[1].textContent).toBe('Second suggestion');
    expect(listItems[2].textContent).toBe('Third suggestion');
    expect(listItems[3].textContent).toBe('Fourth suggestion');
  });

  it('uses correct heading id for aria-labelledby', () => {
    render(<SuggestionsBox suggestions={['Test']} />);
    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('id', 'suggestions-heading');
  });

  it('heading id matches section aria-labelledby', () => {
    render(<SuggestionsBox suggestions={['Test']} />);
    const section = screen.getByRole('region', { hidden: true });
    const ariaLabel = section.getAttribute('aria-labelledby');
    const heading = screen.getByRole('heading');
    expect(heading.id).toBe(ariaLabel);
  });

  it('handles emoji in suggestions', () => {
    const mockSuggestions = [
      '✅ Add skills',
      '📝 Update summary',
      '🔗 Add links',
    ];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    expect(screen.getByText(/✅ Add skills/)).toBeInTheDocument();
    expect(screen.getByText(/📝 Update summary/)).toBeInTheDocument();
    expect(screen.getByText(/🔗 Add links/)).toBeInTheDocument();
  });

  it('does not break with numeric-like strings', () => {
    const mockSuggestions = [
      '123 add skills',
      '456 update summary',
    ];
    render(<SuggestionsBox suggestions={mockSuggestions} />);

    expect(screen.getByText('123 add skills')).toBeInTheDocument();
    expect(screen.getByText('456 update summary')).toBeInTheDocument();
  });
});