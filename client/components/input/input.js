import styles from './input.module.scss'

export default function Input({icon, label, placeholder, onChange}) {
  return (
    <div className="mb-8">
      <label className="block text-lg mb-4" htmlFor="input">{label}</label>
      {icon && <img className={styles['input__icon']} src={`/${icon}`} />}
      <input 
        onChange={onChange} 
        className={`block w-full ${styles.input}`}  
        id="input" 
        type="text" 
        placeholder={placeholder}
      />  
    </div>
  )
}