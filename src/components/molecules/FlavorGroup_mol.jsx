import SelectOption_atm from '../atoms/SelectOption_atm'
import styles from './FlavorGroup_mol.module.css'

/* "Sabor:" + radios en rejilla de 3 — ref_img/ProductPage.png */
export default function FlavorGroup_mol({ label, options, onSelect }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.options} role="radiogroup" aria-label={label}>
        {options.map((option) => (
          <SelectOption_atm
            key={option.id}
            selected={option.selected}
            onClick={() => onSelect?.(option.id)}
          >
            {option.label}
          </SelectOption_atm>
        ))}
      </div>
    </div>
  )
}
