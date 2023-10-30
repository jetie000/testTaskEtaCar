import styles from './page.module.scss'
import CoinTable from './coinTable'
import Pagination from './pagination'
import Header from './header'

export default function Home() {

  return (
    <main className={styles.main}>
      <Header/>
      <CoinTable/>
      <Pagination/>
    </main>
  )
}
