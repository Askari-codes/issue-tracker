'use client'
import { useEffect } from 'react';

export default function Home({searchParams}:{searchParams:{page:string}}) {
 useEffect(() => {
  console.log(searchParams);
  
 }, []);
  return (
  <div className='text-black'>
dashboard

  </div>
  )

}
