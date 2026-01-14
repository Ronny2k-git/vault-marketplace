import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Button } from "./interface/Button";

export function Footer() {
  return (
    <div className="min-w-full min-h-full bg-background pt-8 px-2">
      {/* Divider */}
      <div className="border border-dashed border-gray-500 my-8" />

      <section className="flex flex-wrap px-4 md:px-8 items-center max-[840px]:justify-center gap-2">
        <p className="text-sm text-gray-400">
          To service provider or just report a bug:
        </p>
        <a>
          <span className="text-white hover:underline text-xl font-semibold">
            Contact Me
          </span>
        </a>
      </section>

      {/* Divider */}
      <div className="border border-dashed border-gray-500 my-8" />

      <section className="flex px-4 md:px-8 max-[840px]:flex-col items-center justify-between gap-2 text-gray-400 pb-8">
        <div className="flex flex-wrap items-center justify-center gap-2 max-[840px]:mb-4 text-sm">
          <p className="hover:underline">Documentation</p>
          <p className="hover:underline">Terms & Conditions</p>
          <p className="hover:underline">Privacy Policy</p>
          <p className="hover:underline ">Account Verification</p>
        </div>

        <div className="flex items-center gap-4">
          <p className="text-sm ">Follow Me:</p>
          <a href="https://discord.com/" target="_blank">
            <Button
              className="flex gap-1 hover:bg-none"
              intent="neutral"
              size="medium"
            >
              <FaDiscord />
              Discord
            </Button>
          </a>
          <a href="https://x.com" target="_blank">
            <Button
              className="flex gap-1 hover:bg-none"
              intent="neutral"
              size="medium"
            >
              <FaXTwitter />
              Twitter
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
