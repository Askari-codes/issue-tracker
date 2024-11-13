'use client'
import { Card } from '@radix-ui/themes'
import React from 'react'
import {ResponsiveContainer,BarChart,XAxis,YAxis,Bar} from 'recharts'

interface Props{
    Open:number;
    Close:number;
    In_Progress:number;
}

const IssueChart = ({Open,Close,In_Progress}:Props) => {
    const data=[
        {label:'Open',value:Open},
        {label:'Close',value:Close},
        {label:'In_Progress',value:In_Progress}
    ]
  return (
   <Card>
<ResponsiveContainer width='100%' height={300}>
<BarChart data={data}>
    <XAxis dataKey='label'/>
    <YAxis/>
    <Bar dataKey='value' barSize={70} style={{fill:'var(--accent-9)'}}/>
</BarChart>
</ResponsiveContainer>
   </Card>
  )
}

export default IssueChart
