import styles from "./SuggestionsBox.module.css";

/**
 * SuggestionsBox
 * Displays AI-generated resume improvement suggestions
 *
 * @param {Object} props
 * @param {string[]} props.suggestions
 */
export default function SuggestionsBox({ suggestions = [] }) {
  const hasSuggestions = Array.isArray(suggestions) && suggestions.length > 0;

  return (
    <section
      className={styles.container}
      aria-labelledby="suggestions-heading"
    >
      <h2 id="suggestions-heading" className={styles.title}>
        Improvement Suggestions
      </h2>

      {hasSuggestions ? (
        <ul className={styles.list}>
          {suggestions.map((item, index) => (
            <li key={index} className={styles.item}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          No improvement suggestions available. Your resume looks strong.
        </p>
      )}
    </section>
  );
}
