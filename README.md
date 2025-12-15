# 📄 ATSQuick - AI-Powered ATS Resume Score Analyzer

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.0-blue?logo=react)
![Jest](https://img.shields.io/badge/Jest-29.0-red?logo=jest)
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-2.5-orange)
![License](https://img.shields.io/badge/License-MIT-green)

**Transform your resume into an ATS powerhouse with AI-driven insights powered by Google Gemini 2.5**

[Live Demo](https://ats-quick.vercel.app/) 

</div>

---

## 🎯 Introduction

**ATSQuick** is an intelligent, AI-powered Applicant Tracking System (ATS) resume analyzer that leverages **Google Gemini 2.5** to provide comprehensive resume scoring and optimization recommendations. 

Designed for job seekers, recruiters, and HR professionals, ATSQuick analyzes your resume against industry standards and provides:

✨ **AI-Powered Scoring** - Get a detailed ATS compatibility score (0-100)  
🎯 **Smart Job Matching** - Discover the best-fitting job roles based on your profile  
📊 **Skills Breakdown** - Visualize your top 10 skills with an interactive radar chart  
💡 **Actionable Insights** - Receive personalized improvement suggestions  
⚡ **Fast Processing** - Instant analysis with real-time feedback  

---

## 🏗️ Project Structure

```
atsquick/
│
├── app/
│   ├── layout.js                 # Root layout (metadata, fonts, providers)
│   ├── globals.css               # Global styles, CSS variables, resets
│
│   ├── page.js                   # Home page
│   ├── page.module.css
│
│   ├── dashboard/
│   │   ├── page.js               # Dashboard route
│   │   ├── DashboardClient.jsx   # Client-only dashboard logic
│   │   └── dashboard.module.css
│
│   ├── api/
│   │   ├── analyze/
│   │   │   └── route.js          # Resume analysis API
│   │   └── contact/
│   │       └── route.js          # Contact + reCAPTCHA + nodemailer
│
│   └── sitemap.js                # SEO sitemap
│
├── components/
│   ├── ui/
│   │   ├── dot-background.jsx
│   │   └── dot-background.module.css
│
│   ├── UploadBox/
│   │   ├── UploadBox.jsx
│   │   └── UploadBox.module.css
│
│   ├── ScoreCard/
│   │   ├── ScoreCard.jsx
│   │   └── ScoreCard.module.css
│
│   ├── SkillsChart/
│   │   ├── SkillsChart.jsx
│   │   ├── SkillsRadarChart.jsx
│   │   └── SkillsChart.module.css
│
│   ├── JobMatchBox/
│   │   ├── JobMatchBox.jsx
│   │   └── JobMatchBox.module.css
│
│   ├── SuggestionsBox/
│   │   ├── SuggestionsBox.jsx
│   │   └── SuggestionsBox.module.css
│
│   ├── PillNav/
│   │   ├── PillNav.jsx
│   │   └── PillNav.module.css
│
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.module.css
│
│   ├── Contact/
│   │   ├── Contact.jsx
│   │   ├── ContactInner.jsx
│   │   └── Contact.module.css
│
│   └── Loader/
│       ├── FullScreenLoader.jsx
│       └── FullScreenLoader.module.css
│
├── services/
│   ├── analyzeService.js         # Client-side API call wrapper
│   └── contactService.js         # Optional abstraction
│
├── utils/
│   ├── generateReportPdf.js
│   ├── normalizeSkills.js
│   └── constants.js
│
├── assets/
│   ├── lottie/
│   │   ├── loader.json
│   │   └── contact.json
│   └── images/
│
├── public/
│   ├── logo.png
│   ├── ats.mp4
│   ├── favicon.ico
│   └── robots.txt
│
├── .env.local                    # Secrets (never commit)
├── next.config.js
├── package.json
├── jsconfig.json                 # @ alias config
└── README.md

```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ and npm/yarn
- Google Gemini API key
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Step-by-Step Setup

1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/ats_score.git
cd ats_score
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Environment Variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in Browser**
Navigate to `http://localhost:3000`

---

## 🧩 Main Components

### 1. **UploadBox** 📤
**Location:** `src/components/UploadBox/UploadBox.jsx`

Handles PDF file uploads with drag-and-drop functionality.

**Features:**
- Drag & drop file upload
- PDF validation
- Real-time file name display
- Loading state management
- Error handling

**Usage:**
```jsx
<UploadBox />
```

---

### 2. **ScoreCard** 🎯
**Location:** `src/components/ScoreCard/ScoreCard.jsx`

Displays an animated ATS compatibility score with performance labels.

**Features:**
- Smooth number animation (0-100)
- Performance-based labels (Excellent, Strong, Average, Needs Improvement)
- Accessible aria-labels
- Real-time score updates

**Props:**
```jsx
<ScoreCard score={85} />
```

**Score Ranges:**
- 85-100: Excellent ✨
- 70-84: Strong 💪
- 50-69: Average 📊
- 0-49: Needs Improvement 📈

---

### 3. **SkillsChart** 📊
**Location:** `src/components/SkillsChart/SkillsChart.jsx`

Visualizes top 10 skills using an interactive radar chart.

**Features:**
- Dynamic skill visualization
- Top 10 skills extraction
- Value normalization (0-100)
- Responsive design
- Interactive hover states

**Props:**
```jsx
<SkillsChart skills={{ 
  JavaScript: 90, 
  React: 85, 
  Python: 80 
}} />
```

---

### 4. **JobMatchBox** 💼
**Location:** `src/components/JobMatchBox/JobMatchBox.jsx`

Displays AI-recommended job roles based on resume analysis.

**Features:**
- Role recommendations
- Empty state handling
- Accessible list structure
- Sorted by relevance

**Props:**
```jsx
<JobMatchBox roles={['Senior Developer', 'Tech Lead']} />
```

---

### 5. **SuggestionsBox** 💡
**Location:** `src/components/SuggestionsBox/SuggestionsBox.jsx`

Presents actionable improvement suggestions from AI analysis.

**Features:**
- Numbered suggestions
- Clear, actionable advice
- Empty state messaging
- Accessible formatting

**Props:**
```jsx
<SuggestionsBox suggestions={[
  'Add more technical skills',
  'Improve job descriptions'
]} />
```

---

## 🧪 Jest Integration & Testing

### Overview
This project includes **comprehensive Jest testing** with **24+ test cases** across all components. Tests are written following React Testing Library best practices and focus on user behavior rather than implementation details.

### Test Coverage

#### **JobMatchBox Tests** (13 tests)
```bash
npm test JobMatchBox
```
- ✅ Renders heading and aria attributes
- ✅ Handles empty states (undefined, null, empty array)
- ✅ Displays all roles correctly
- ✅ Maintains proper list structure
- ✅ Tests edge cases (single role, special characters, long text)

**Output:**
```
 PASS  src/components/JobMatchBox/JobMatchBox.test.jsx
  JobMatchBox
    ✓ renders the heading correctly (38 ms)
    ✓ renders the section with correct aria-labelledby (3 ms)
    ✓ displays empty state when roles array is empty (2 ms)
    ✓ renders list of roles when roles array has items (4 ms)
    ✓ renders correct number of list items (3 ms)
    ...
  
  Test Suites: 1 passed, 1 total
  Tests:       13 passed, 13 total
```

---

#### **ScoreCard Tests** (23 tests)
```bash
npm test ScoreCard
```
- ✅ Renders heading and aria attributes
- ✅ Validates score input (0-100 range)
- ✅ Tests animation flow with fake timers
- ✅ Score rounding and clamping
- ✅ Label accuracy for all ranges
- ✅ Accessibility attributes (aria-live, aria-label)
- ✅ Tests re-animation prevention

**Special Testing:** Uses `jest.useFakeTimers()` to test smooth animations

**Output:**
```
 PASS  src/components/ScoreCard/ScoreCard.test.jsx (with act() warnings suppressed)
  ScoreCard
    ✓ renders the heading correctly (37 ms)
    ✓ animates the score from 0 to the target value (186 ms)
    ✓ rounds the score to nearest integer (161 ms)
    ✓ displays "Excellent" label for score >= 85 (137 ms)
    ✓ displays "Strong" label for score >= 70 and < 85 (131 ms)
    ...

  Test Suites: 1 passed, 1 total
  Tests:       23 passed, 23 total
```

---

#### **SkillsChart Tests** (19 tests)
```bash
npm test SkillsChart
```
- ✅ Renders heading and aria attributes
- ✅ Empty state handling for various falsy values
- ✅ Data normalization and clamping (0-100)
- ✅ Sorting by value (descending order)
- ✅ Filtering non-numeric values
- ✅ Top 10 skills limitation
- ✅ Special characters in skill names
- ✅ Boundary value testing

**Special Testing:** Mocks dynamic components and tests data transformation logic

**Output:**
```
 PASS  src/components/SkillsChart/SkillsChart.test.jsx
  SkillsChart
    ✓ renders the heading correctly (38 ms)
    ✓ displays empty state when skills prop is undefined (3 ms)
    ✓ passes normalized skills data to chart component (2 ms)
    ✓ sorts skills by value in descending order (5 ms)
    ✓ clamps values between 0 and 100 (1 ms)
    ✓ filters out non-numeric values (1 ms)
    ✓ limits displayed skills to top 10 (7 ms)
    ...

  Test Suites: 1 passed, 1 total
  Tests:       19 passed, 19 total
```

---

#### **SuggestionsBox Tests** (25 tests)
```bash
npm test SuggestionsBox
```
- ✅ Renders heading and aria attributes
- ✅ Empty state for various falsy values
- ✅ Displays all suggestions
- ✅ Maintains suggestion order
- ✅ Handles edge cases (long text, special characters, emoji)
- ✅ Tests large datasets (20+ items)
- ✅ Empty string suggestions
- ✅ Whitespace normalization

**Output:**
```
 PASS  src/components/SuggestionsBox/SuggestionsBox.test.jsx
  SuggestionsBox
    ✓ renders the heading correctly (37 ms)
    ✓ displays empty state when suggestions array is empty (2 ms)
    ✓ renders list when suggestions are provided (6 ms)
    ✓ renders all suggestions in the list (2 ms)
    ✓ renders correct number of list items (5 ms)
    ✓ handles suggestions with special characters (1 ms)
    ✓ handles long suggestion text (2 ms)
    ✓ handles large number of suggestions (7 ms)
    ✓ handles emoji in suggestions (2 ms)
    ...

  Test Suites: 1 passed, 1 total
  Tests:       25 passed, 25 total
```

---

#### **UploadBox Tests** (24 tests)
```bash
npm test UploadBox
```
- ✅ File upload and validation
- ✅ PDF file type checking
- ✅ Drag & drop functionality
- ✅ Visual feedback (dragActive class)
- ✅ Error handling and alerts
- ✅ Loading state management
- ✅ localStorage integration
- ✅ API integration with mocked analyzeService

**Special Testing:** Mocks file operations, localStorage, and API calls

**Output:**
```
 PASS  src/components/UploadBox/UploadBox.test.jsx
  UploadBox
    ✓ renders the upload box (75 ms)
    ✓ renders the drag and drop zone with initial text (11 ms)
    ✓ displays file name when a PDF file is selected (51 ms)
    ✓ shows alert when non-PDF file is selected (9 ms)
    ✓ does not accept non-PDF files (9 ms)
    ✓ shows alert when analyze button is clicked without a file (32 ms)
    ✓ disables button while loading (117 ms)
    ✓ displays fullscreen loader when analyzing (85 ms)
    ✓ calls analyzeResume with the file when button is clicked (70 ms)
    ✓ stores analysis data in localStorage on success (98 ms)
    ✓ shows error alert when analyzeResume fails (85 ms)
    ...

  Test Suites: 1 passed, 1 total
  Tests:       24 passed, 24 total
```

---

### Running All Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Results Summary

```
Test Suites: 5 passed, 5 total
Tests:       104 passed, 104 total
Snapshots:   0 total
Time:        ~15s
Coverage:    Components: 90%+
```

### Testing Best Practices Used

✅ **React Testing Library** - Tests user behavior, not implementation  
✅ **User-Centric Testing** - Simulates real user interactions  
✅ **Mocking** - External dependencies (APIs, localStorage, dynamic imports)  
✅ **Accessibility Testing** - Verifies aria attributes and semantic HTML  
✅ **Edge Cases** - Comprehensive boundary testing  
✅ **Async Handling** - waitFor, act() for async operations  
✅ **Error Scenarios** - Tests error states and fallbacks  

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start Next.js dev server

# Testing
npm test             # Run Jest tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

---

## 🤖 AI Integration: Google Gemini 2.5

ATSQuick uses **Google Gemini 2.5** for intelligent resume analysis:

**What it analyzes:**
- Resume structure and formatting
- Keyword optimization for ATS systems
- Skill relevance and industry alignment
- Job role recommendations
- Personalized improvement suggestions

**How it works:**
1. User uploads PDF resume
2. Resume text is extracted
3. Gemini 2.5 analyzes content
4. Returns score (0-100), skills, roles, and suggestions
5. Results displayed with interactive visualizations

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 14.0+ | React framework & routing |
| **React** | 18.0+ | UI library |
| **Jest** | 29.0+ | Testing framework |
| **React Testing Library** | Latest | Component testing |
| **Google Gemini 2.5** | Latest | AI analysis |
| **Recharts** | Latest | Data visualization |
| **CSS Modules** | Built-in | Styling |

---

## 🎨 Features

- 🎯 **AI-Powered Analysis** - Gemini 2.5 provides intelligent insights
- 📊 **Interactive Visualizations** - Charts and animations for better understanding
- 🎨 **Modern UI** - Clean, professional, responsive design
- ♿ **Accessibility** - WCAG compliant with aria labels
- 🚀 **Fast Performance** - Optimized loading and rendering
- 🧪 **Fully Tested** - 100+ Jest tests with high coverage
- 📱 **Responsive** - Works on desktop, tablet, and mobile

---

## 📄 API Documentation

### analyzeResume(file)

```javascript
import { analyzeResume } from '@/services/analyzeService';

const data = await analyzeResume(pdfFile);
// Returns: {
//   score: 85,
//   roles: ['Senior Developer', 'Tech Lead'],
//   skills: { JavaScript: 90, React: 85, ... },
//   suggestions: ['Add certifications', 'Improve summary', ...]
// }
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Testing Requirements
- Add tests for new features
- Ensure all tests pass (`npm test`)
- Maintain or improve code coverage

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙋 Support

Have questions or need help?
- 📧 Email: dakshat75@gmail.com

---

## 🌟 Acknowledgments

- **Google Gemini 2.5** - Powering intelligent resume analysis
- **React Testing Library** - Best practices for component testing
- **Next.js Team** - Amazing React framework
- **Community Contributors** - Your feedback and contributions

---

<div align="center">

**Made with ❤️ for job seekers everywhere**

[⬆ Back to top](#atsquick---ai-powered-ats-resume-score-analyzer)

</div>