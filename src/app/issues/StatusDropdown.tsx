"use client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
interface Props {
  onValueChange: (value: string) => void;
  id:number
}

const StatusDropdown = ({ onValueChange,id }: Props) => {
  const dropdownHandler = (value: string) => {
    onValueChange(value);
    axios.patch('/api/issue/'+id,{status:value})
  };

  return (
    <Select.Root open  onValueChange={(value) => dropdownHandler(value)}>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Item value="OPEN">OPEN</Select.Item>
          <Select.Item value="CLOSE">CLOSE</Select.Item>
          <Select.Item value="IN_PROGRESS">IN PROGRESS</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusDropdown;
