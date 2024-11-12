'use client'
import { useEffect } from 'react';
import Pagination from './Components/Pagination'
import { log } from 'console';


export default function Home({searchParams}:{searchParams:{page:string}}) {
 useEffect(() => {
  console.log(searchParams);
  
 }, []);
  return (
  <div className='text-black'>
dashboard
<Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)}/>
  </div>
  )

}
