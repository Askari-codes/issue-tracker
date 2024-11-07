import React from 'react'
import { Button,Flex} from "@radix-ui/themes";
import Link from 'next/link';
import IssuesStatusFilter from './IssuesStatusFilter';



const IssueActions = () => {
  return (
    <Flex justify='between'  >
      <IssuesStatusFilter/>
        <Button className="mb-5 " >
          <Link href="/issues/new">new issue</Link>
        </Button>
      </Flex>
  )
}

export default IssueActions
