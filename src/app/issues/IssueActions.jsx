import React from 'react'
import { Button} from "@radix-ui/themes";
import Link from 'next/link';


const IssueActions = () => {
  return (
    <div  >
        <Button className="mb-5 " >
          <Link href="/issues/new">new issue</Link>
        </Button>
      </div>
  )
}

export default IssueActions
