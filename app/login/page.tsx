import LoginCard from "../ui/Login";
import "../globals.css";  
import styles from "../styles/login.module.css"; 

export default function Home() {
  return (
    <div className={styles.bgCustom}>
      <LoginCard />
    </div>
  );
}
