import { login } from "@/app/actions/auth";
import styles from "@/components/login/login.module.css";

export default function Login() {
  return (
    <div id={styles["loginForm"]}>
      <form action={login}>
        <label htmlFor="password">password</label>
        <input type="password" id="password" name="password" />
      </form>
    </div>
  );
}
