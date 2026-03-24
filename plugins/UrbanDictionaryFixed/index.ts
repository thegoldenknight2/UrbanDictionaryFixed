import { registerCommand } from "@vendetta/commands";
import { findByProps } from "@vendetta/metro";

const { sendBotMessage } = findByProps("sendBotMessage");

let unregister: (() => void) | undefined;

export default {
  onLoad() {
    unregister = registerCommand({
      name: "urban",
      displayName: "urban",
      description: "Look up a word on Urban Dictionary",
      displayDescription: "Look up a word on Urban Dictionary",
      type: 1,
      inputType: 1,
      options: [
        {
          name: "word",
          displayName: "word",
          description: "The word to look up",
          displayDescription: "The word to look up",
          type: 3,
          required: true,
        },
      ],
      execute: async (args: any[], ctx: any) => {
        const word = args.find((a) => a.name === "word")?.value;
        if (!word) return;

        try {
          const res = await fetch(
            `https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(word)}`
          );
          const data = await res.json();
          const entry = data?.list?.[0];

          if (!entry) {
            sendBotMessage(ctx.channel.id, `❌ No definition found for **${word}**.`);
            return;
          }

          const definition = entry.definition.replace(/\[|\]/g, "");
          const example = entry.example?.replace(/\[|\]/g, "").trim();

          sendBotMessage(
            ctx.channel.id,
            `📖 **${entry.word}**\n\n${definition}${example ? `\n\n*${example}*` : ""}\n\n👍 ${entry.thumbs_up}  👎 ${entry.thumbs_down}`
          );
        } catch (e) {
          sendBotMessage(ctx.channel.id, "❌ Failed to fetch definition. Try again!");
        }
      },
    });
  },

  onUnload() {
    unregister?.();
  },
};
