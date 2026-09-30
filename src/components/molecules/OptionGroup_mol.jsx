import OptionBtn_atm from '../atoms/OptionBtn_atm'
import styles from './OptionGroup_mol.module.css'

/* "Leche:" + píldoras de opción — ref_img/ProductPage.png */
export default function OptionGroup_mol({ label, options }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.options}>
        {options.map((option) => (
          <OptionBtn_atm key={option.id} selected={option.selected}>
            {option.label}
          </OptionBtn_atm>
        ))}
      </div>
    </div>
  )
}
