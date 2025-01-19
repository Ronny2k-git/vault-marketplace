"use client";

import { CardTransaction } from "@/components/vault/vaultCardTransaction";
import { Box, Button, Flex, Tabs, Text } from "@radix-ui/themes";

export default function Test() {
  return (
    <div className="h-screen w-[calc(screen-1px)] bg-red-500">
      <div className="h-full w-full flex flex-col justify-center items-center">
        <Tabs.Root defaultValue="Deposit">
          <Tabs.List>
            <CardTransaction></CardTransaction>
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
      </div>
    </div>
  );
}

// <Tabs.Root defaultValue="account">
//   <Tabs.List>
//     <Tabs.Trigger
//       className="h-10 w-52 bg-accent rounded-md mr-4"
//       value="account"
//     >
//       Account
//     </Tabs.Trigger>
//     <Tabs.Trigger
//       className="h-10 w-52 bg-accent rounded-md mr-4"
//       value="documents"
//     >
//       Documents
//     </Tabs.Trigger>
//     <Tabs.Trigger
//       className="h-10 w-52 bg-accent rounded-md mr-4"
//       value="settings"
//     >
//       Settings
//     </Tabs.Trigger>
//   </Tabs.List>
//   {/* <Box pt="3"> */}
//   <Tabs.Content
//     className="h-10 w-80 text-center pt-2 mb-10 flex flex-col bg-background-foreground rounded-md mt-4"
//     value="account"
//   >
//     <Text size="2">Make changes to your account.</Text>
//   </Tabs.Content>
//   <Tabs.Content
//     className="h-10 w-80 text-center pt-2 bg-background-foreground rounded-md mt-4"
//     value="documents"
//   >
//     <Text size="2">Access and update your documents.</Text>
//   </Tabs.Content>
//   <Tabs.Content
//     className="h-10 w-96 text-center pt-2 bg-background-foreground rounded-md mt-4"
//     value="settings"
//   >
//     <Text size="2">
//       Edit your profile or update contact information.
//     </Text>
//   </Tabs.Content>
//   {/* </Box> */}
//   test
// </Tabs.Root>
