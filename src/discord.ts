import Discord, { Intents, TextChannel } from "discord.js";

export const discordSetup = (
  discordBotToken: string,
  discordChannelId: string
): Promise<TextChannel> => {
  const discordBot = new Discord.Client({
    intents: [Intents.FLAGS.GUILD_MESSAGES],
  });
  return new Promise<TextChannel>((resolve, reject) => {
    discordBot.login(discordBotToken);
    discordBot.on("ready", async () => {
      const channel = await discordBot.channels.fetch(discordChannelId);
      resolve(channel as TextChannel);
    });
  });
};

export const createMessage = (
  metadata: { name: string; image: string },
  value: string,
  valueUSD: string,
  buyer: string,
  seller: string,
  timestamp: string | number,
  contractAddress: string,
  tokenId: string
) =>
  new Discord.MessageEmbed()
    .setColor("#66ff82")
    .setTitle(`${metadata.name} sold!`)
    .addField("Price:", `${value} ETH`, true)
    .addField("Price USD:", `$${valueUSD}`, true)
    .addField("Buyer:", buyer)
    .addField("Seller:", seller)
    .setURL(`https://opensea.io/assets/${contractAddress}/${tokenId}`)
    .setImage(metadata.image);
