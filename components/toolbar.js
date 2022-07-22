import { useRouter } from "next/router"
import styles from "../styles/Toolbar.module.css"
export const Toolbar = () => {
    const router = useRouter()
    return (
        <div className={styles.main}>
            <div onClick={() => router.push('/')}>Home</div>
            <div onClick={() => window.location.href = 'https://www.twitter.com/cmrktmr/'}>Twitter</div>
            <div onClick={() => window.location.href = 'https://www.github.com/cmrktmr/'}>Github</div>

        </div >
    )
}