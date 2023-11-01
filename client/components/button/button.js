import styles from './button.module.scss'

export default function Button({children, variant, onClick}) {
  return (
    <button 
      onClick={onClick} 
      className={`mr-2 ${styles.button} 
      ${styles[`button--${variant}`]}`}>
        {children}
    </button>
  )
}