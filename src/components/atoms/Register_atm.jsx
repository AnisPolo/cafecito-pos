import arrow from '../../assets/svg/arrow_right_brown.svg'
import styles from './Register_atm.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/* Botón ámbar del banner — ref_img/1x/Register_atm.png */

function registerOrLogin (){
  if(localStorage.getItem("session")){
    return(
      <Link to="/perfil">
        <button type="button" className={styles.btn}>
          <span>Perfil</span>
          <img className={styles.arrow} src={arrow} alt="" />
        </button>
      </Link>
    );
  }
  return(
    <Link to="/register">
      <button type="button" className={styles.btn}>
        <span>Registrate</span>
        <img className={styles.arrow} src={arrow} alt="" />
      </button>
    </Link>
  );
}

export default function Register_atm({ children = 'Registrate' }) {
  return (
    registerOrLogin()
  )
}
