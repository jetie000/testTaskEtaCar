import CoinTable from '@/components/home/coinTable'
import Pagination from '@/components/home/pagination'

export default function Home() {

  return (
    <main className='main'>
      <CoinTable/>
      <Pagination/>
    </main>
  )
}
