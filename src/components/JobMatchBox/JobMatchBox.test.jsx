import { render, screen } from '@testing-library/react';
import JobMatchBox from './JobMatchBox';

describe('JobMatchBox', () => {
  it('renders the heading correctly', () => {
    render(<JobMatchBox roles={[]} />);
    const heading = screen.getByRole('heading', { name: /Best Matching Job Roles/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the section with correct aria-labelledby', () => {
    render(<JobMatchBox roles={[]} />);
    const section = screen.getByRole('region', { hidden: true });
    expect(section).toHaveAttribute('aria-labelledby', 'job-match-heading');
  });

  it('displays empty state when roles array is empty', () => {
    render(<JobMatchBox roles={[]} />);
    const emptyMessage = screen.getByText(/No strong job matches detected/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when roles prop is not provided', () => {
    render(<JobMatchBox />);
    const emptyMessage = screen.getByText(/No strong job matches detected/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders list of roles when roles array has items', () => {
    const mockRoles = ['Software Engineer', 'Frontend Developer', 'Full Stack Developer'];
    render(<JobMatchBox roles={mockRoles} />);

    mockRoles.forEach(role => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });

  it('renders correct number of list items', () => {
    const mockRoles = ['Data Scientist', 'ML Engineer', 'AI Specialist'];
    render(<JobMatchBox roles={mockRoles} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
  });

  it('renders each role as a separate list item', () => {
    const mockRoles = ['Product Manager', 'Project Manager'];
    render(<JobMatchBox roles={mockRoles} />);

    const list = screen.getByRole('list');
    const listItems = list.querySelectorAll('li');
    expect(listItems).toHaveLength(2);
    expect(listItems[0].textContent).toBe('Product Manager');
    expect(listItems[1].textContent).toBe('Project Manager');
  });

  it('does not display empty state when roles are provided', () => {
    render(<JobMatchBox roles={['Designer']} />);
    const emptyMessage = screen.queryByText(/No strong job matches detected/i);
    expect(emptyMessage).not.toBeInTheDocument();
  });

  it('handles single role correctly', () => {
    render(<JobMatchBox roles={['UX Designer']} />);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(1);
    expect(listItems[0].textContent).toBe('UX Designer');
  });

  it('handles roles with special characters and spaces', () => {
    const mockRoles = ['Senior Data Scientist', 'ML Engineer (NLP)', 'AI/ML Specialist'];
    render(<JobMatchBox roles={mockRoles} />);

    expect(screen.getByText('Senior Data Scientist')).toBeInTheDocument();
    expect(screen.getByText('ML Engineer (NLP)')).toBeInTheDocument();
    expect(screen.getByText('AI/ML Specialist')).toBeInTheDocument();
  });

  it('does not render list when roles is null', () => {
    render(<JobMatchBox roles={null} />);
    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
    expect(screen.getByText(/No strong job matches detected/i)).toBeInTheDocument();
  });

  it('does not render list when roles is undefined', () => {
    render(<JobMatchBox roles={undefined} />);
    const list = screen.queryByRole('list');
    expect(list).not.toBeInTheDocument();
  });
});