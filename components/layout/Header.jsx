import styles from '../../styles/Layout.module.scss'

export default function Header({ children }) {
  return (
    <div className={`${styles.header}`}>
      <div>{children}</div>
    </div>
  )
}
