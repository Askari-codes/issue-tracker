import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'
import delay from 'delay'

interface Props {
    params:{id:string}
}

const IssueDetail = async ({params}:Props) => {
    await delay(2000)
    if(typeof params.id!=='number') notFound()
    const issue= await prisma.issue.findUnique({
        where:{id:parseInt(params.id)}
    })
    if(!issue)
        return notFound()
  return (
    <div>
      <div>{issue?.title}</div>
      <div>{issue?.description}</div>
      <div>{issue?.status}</div>
      <div>{issue?.createdAt.toDateString()}</div>
     
      
    </div>
  )
}

export default IssueDetail
