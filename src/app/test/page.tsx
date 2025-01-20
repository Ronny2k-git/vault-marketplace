"use client";

import { Tabs, Text } from "@radix-ui/themes";

export default function Test() {
  return (
    <div className="h-screen w-screen bg-gray-700">
      <Tabs.Root defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger
            className="h-10 w-52 bg-accent rounded-md mr-4"
            value="account"
          >
            Account
          </Tabs.Trigger>
          <Tabs.Trigger
            className="h-10 w-52 bg-accent rounded-md mr-4"
            value="documents"
          >
            Documents
          </Tabs.Trigger>
          <Tabs.Trigger
            className="h-10 w-52 bg-accent rounded-md mr-4"
            value="settings"
          >
            Settings
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="h-10 w-80 text-center pt-2 mb-10 flex flex-col bg-background-foreground rounded-md mt-4"
          value="account"
        >
          <Text size="2">Make changes to your account.</Text>
        </Tabs.Content>
        <Tabs.Content
          className="h-10 w-80 text-center pt-2 bg-background-foreground rounded-md mt-4"
          value="documents"
        >
          <Text size="2">Access and update your documents.</Text>
        </Tabs.Content>
        <Tabs.Content
          className="h-10 w-96 text-center pt-2 bg-background-foreground rounded-md mt-4"
          value="settings"
        >
          {/* <DatePicker /> */}
          Edit your profile or update contact information.
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
