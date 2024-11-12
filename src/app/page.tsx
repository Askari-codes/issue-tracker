import Image from 'next/image'
import Pagination from './Components/Pagination'

export default function Home() {
  return (
  <div className='text-black'>
dashboard
<Pagination itemCount={100} pageSize={10} currentPage={10}/>
  </div>
  )

}
