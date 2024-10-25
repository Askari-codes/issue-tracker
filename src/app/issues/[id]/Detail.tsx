import { Issue } from "@prisma/client";
import { Badge, Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const Detail = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <Flex gap="3" my="3">
        <Badge>{issue?.status}</Badge>
        <Text>{issue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <ReactMarkdown className="prose">{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default Detail;
