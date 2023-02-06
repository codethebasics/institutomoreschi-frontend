import styles from '../../styles/Layout.module.scss'

export default function Footer({ children }) {
  return (
    <div className={styles.footer}>
      <div>{children}</div>
    </div>
  )
}
