import styles from "./JobMatchBox.module.css";

/**
 * JobMatchBox
 * Displays AI-recommended job roles based on resume analysis
 *
 * @param {Object} props
 * @param {string[]} props.roles
 */
export default function JobMatchBox({ roles = [] }) {
  const hasRoles = Array.isArray(roles) && roles.length > 0;

  return (
    <section
      className={styles.container}
      aria-labelledby="job-match-heading"
    >
      <h2 id="job-match-heading" className={styles.title}>
        Best Matching Job Roles
      </h2>

      {hasRoles ? (
        <ul className={styles.list}>
          {roles.map((role, index) => (
            <li key={index} className={styles.item}>
              {role}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.empty}>
          No strong job matches detected. Consider improving key skills.
        </p>
      )}
    </section>
  );
}
