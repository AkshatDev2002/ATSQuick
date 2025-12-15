import { render, screen } from '@testing-library/react';
import SkillsChart from './SkillsChart';

// Mock the SkillsRadarChart component before importing SkillsChart
jest.mock('./SkillsRadarChart', () => {
  return function MockChart({ data }) {
    return (
      <div data-testid="skills-radar-chart">
        {data && data.length > 0 ? (
          <ul data-testid="chart-skills">
            {data.map((item) => (
              <li key={item.name} data-testid={`skill-${item.name}`}>
                {item.name}: {item.value}
              </li>
            ))}
          </ul>
        ) : (
          <p>No chart data</p>
        )}
      </div>
    );
  };
});

// Mock next/dynamic to return the component directly
jest.mock('next/dynamic', () => {
  return {
    __esModule: true,
    default: (fn) => {
      const SkillsRadarChart = require('./SkillsRadarChart');
      return SkillsRadarChart.default || SkillsRadarChart;
    },
  };
});

describe('SkillsChart', () => {
  it('renders the heading correctly', () => {
    render(<SkillsChart skills={{ JavaScript: 90 }} />);
    const heading = screen.getByRole('heading', { name: /Skills Breakdown/i });
    expect(heading).toBeInTheDocument();
  });

  it('renders the section with correct aria-labelledby', () => {
    render(<SkillsChart skills={{ JavaScript: 90 }} />);
    const section = screen.getByRole('region', { hidden: true });
    expect(section).toHaveAttribute('aria-labelledby', 'skills-heading');
  });

  it('displays empty state when skills prop is undefined', () => {
    render(<SkillsChart skills={undefined} />);
    const emptyMessage = screen.getByText(/No skill data available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when skills prop is null', () => {
    render(<SkillsChart skills={null} />);
    const emptyMessage = screen.getByText(/No skill data available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when skills is an empty object', () => {
    render(<SkillsChart skills={{}} />);
    const emptyMessage = screen.getByText(/No skill data available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when skills is not an object', () => {
    render(<SkillsChart skills="not an object" />);
    const emptyMessage = screen.getByText(/No skill data available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('displays empty state when skills is an array', () => {
    render(<SkillsChart skills={[]} />);
    const emptyMessage = screen.getByText(/No skill data available/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it('renders chart when skills are provided', () => {
    render(<SkillsChart skills={{ JavaScript: 90, React: 85 }} />);
    const chart = screen.getByTestId('skills-radar-chart');
    expect(chart).toBeInTheDocument();
  });

  it('passes normalized skills data to chart component', () => {
    const skills = {
      JavaScript: 90,
      React: 85,
      CSS: 80,
    };
    render(<SkillsChart skills={skills} />);
    
    expect(screen.getByText('JavaScript: 90')).toBeInTheDocument();
    expect(screen.getByText('React: 85')).toBeInTheDocument();
    expect(screen.getByText('CSS: 80')).toBeInTheDocument();
  });

  it('sorts skills by value in descending order', () => {
    const skills = {
      Python: 75,
      JavaScript: 95,
      React: 85,
    };
    render(<SkillsChart skills={skills} />);
    
    const skillList = screen.getByTestId('chart-skills');
    const items = skillList.querySelectorAll('li');
    expect(items[0].textContent).toBe('JavaScript: 95');
    expect(items[1].textContent).toBe('React: 85');
    expect(items[2].textContent).toBe('Python: 75');
  });

  it('clamps values between 0 and 100', () => {
    const skills = {
      SkillA: 150,
      SkillB: -50,
      SkillC: 50,
    };
    render(<SkillsChart skills={skills} />);
    
    expect(screen.getByText('SkillA: 100')).toBeInTheDocument();
    expect(screen.getByText('SkillB: 0')).toBeInTheDocument();
    expect(screen.getByText('SkillC: 50')).toBeInTheDocument();
  });

  it('filters out non-numeric values', () => {
    const skills = {
      JavaScript: 90,
      React: 'not a number',
      Python: 85,
      CSS: null,
      TypeScript: 80,
    };
    render(<SkillsChart skills={skills} />);
    
    expect(screen.getByText('JavaScript: 90')).toBeInTheDocument();
    expect(screen.getByText('Python: 85')).toBeInTheDocument();
    expect(screen.getByText('TypeScript: 80')).toBeInTheDocument();
    expect(screen.queryByText(/React:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/CSS:/)).not.toBeInTheDocument();
  });

  it('limits displayed skills to top 10', () => {
    const skills = {
      Skill1: 100,
      Skill2: 95,
      Skill3: 90,
      Skill4: 85,
      Skill5: 80,
      Skill6: 75,
      Skill7: 70,
      Skill8: 65,
      Skill9: 60,
      Skill10: 55,
      Skill11: 50,
      Skill12: 45,
    };
    render(<SkillsChart skills={skills} />);
    
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(10);
    expect(screen.getByText('Skill1: 100')).toBeInTheDocument();
    expect(screen.queryByText('Skill11: 50')).not.toBeInTheDocument();
    expect(screen.queryByText('Skill12: 45')).not.toBeInTheDocument();
  });

  it('handles single skill correctly', () => {
    render(<SkillsChart skills={{ JavaScript: 90 }} />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
    expect(screen.getByText('JavaScript: 90')).toBeInTheDocument();
  });

  it('handles skills with special characters in names', () => {
    const skills = {
      'C++': 85,
      'C#': 80,
      'Node.js': 90,
    };
    render(<SkillsChart skills={skills} />);
    
    expect(screen.getByText('Node.js: 90')).toBeInTheDocument();
    expect(screen.getByText('C++: 85')).toBeInTheDocument();
    expect(screen.getByText('C#: 80')).toBeInTheDocument();
  });

  it('does not render chart when skills is falsy', () => {
    const { rerender } = render(<SkillsChart skills={null} />);
    let chart = screen.queryByTestId('skills-radar-chart');
    expect(chart).not.toBeInTheDocument();

    rerender(<SkillsChart skills={undefined} />);
    chart = screen.queryByTestId('skills-radar-chart');
    expect(chart).not.toBeInTheDocument();
  });

  it('normalizes boundary values correctly', () => {
    const skills = {
      AtBoundary100: 100,
      AtBoundary0: 0,
      AboveMax: 200,
      BelowMin: -100,
    };
    render(<SkillsChart skills={skills} />);
    
    expect(screen.getByText('AtBoundary100: 100')).toBeInTheDocument();
    expect(screen.getByText('AtBoundary0: 0')).toBeInTheDocument();
    expect(screen.getByText('AboveMax: 100')).toBeInTheDocument();
    expect(screen.getByText('BelowMin: 0')).toBeInTheDocument();
  });

  it('renders chart wrapper div with correct class', () => {
    render(<SkillsChart skills={{ JavaScript: 90 }} />);
    const skillsList = screen.getByTestId('chart-skills');
    const parent = skillsList.closest('[class*="chartWrapper"]');
    expect(parent).toBeInTheDocument();
  });

  it('handles decimal skill values', () => {
    const skills = {
      JavaScript: 87.5,
      React: 92.3,
      Python: 75.1,
    };
    render(<SkillsChart skills={skills} />);
    
    expect(screen.getByText('React: 92.3')).toBeInTheDocument();
    expect(screen.getByText('JavaScript: 87.5')).toBeInTheDocument();
    expect(screen.getByText('Python: 75.1')).toBeInTheDocument();
  });

  it('does not include skills with undefined values', () => {
    const skills = {
      JavaScript: 90,
      React: undefined,
      Python: 85,
    };
    render(<SkillsChart skills={skills} />);
    
    expect(screen.getByText('JavaScript: 90')).toBeInTheDocument();
    expect(screen.getByText('Python: 85')).toBeInTheDocument();
    expect(screen.queryByText(/React:/)).not.toBeInTheDocument();
  });

  it('preserves skill order after sorting', () => {
    const skills = {
      A: 50,
      B: 100,
      C: 75,
    };
    render(<SkillsChart skills={skills} />);
    
    const items = screen.getAllByRole('listitem');
    expect(items[0].textContent).toBe('B: 100');
    expect(items[1].textContent).toBe('C: 75');
    expect(items[2].textContent).toBe('A: 50');
  });
});