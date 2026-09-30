import SelectOption_atm from '../atoms/SelectOption_atm'
import styles from './FlavorGroup_mol.module.css'

/* "Sabor:" + radios en rejilla de 3 — ref_img/ProductPage.png */
export default function FlavorGroup_mol({ label, options }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.options}>
        {options.map((option) => (
          <SelectOption_atm key={option.id} selected={option.selected}>
            {option.label}
          </SelectOption_atm>
        ))}
      </div>
    </div>
  )
}
