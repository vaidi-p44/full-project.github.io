import { FcGoogle } from "react-icons/fc";
import styles from "./login.module.css";
const Sociallogin = () => {
    return(
        <>
     <div className={styles.social_login}>
            <button className={styles.social_button}>
            <FcGoogle className={styles.social_icon}/> Sign in with Google
            </button>
        </div>
        </>
    );

};
export default Sociallogin;