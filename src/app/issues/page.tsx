'use client';
import React from 'react'
import { Button, TextField } from '@radix-ui/themes'
import Link from 'next/link'

const IssuePage = () => {
  return (
    <div>
     <Button><Link href='/issues/new'>new issue</Link></Button>
    </div>
  )
}

export default IssuePage
