"use client";

import { Box, Tabs, Text } from "@radix-ui/themes";

export function cardTabs() {
  return (
    <Tabs.Root defaultValue="Deposit">
      <Tabs.List>
        <Tabs.Trigger value="Withdraw">Deposit</Tabs.Trigger>
        <Tabs.Trigger value="documents">Withdraw</Tabs.Trigger>
      </Tabs.List>

      {/* <Box pt="3"> */}
      <Tabs.Content value="Deposit">
        <Text></Text>
      </Tabs.Content>

      <Tabs.Content value="Withdraw">
        <Text></Text>
      </Tabs.Content>
      {/* </Box> */}
    </Tabs.Root>
  );
}
