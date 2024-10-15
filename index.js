const { AoiClient } = require("aoi.js");
const { AoiVoice, PlayerEvents, PluginName, Cacher, Filter } = require("@akarui/aoi.music");

const client = new AoiClient({
    token: process.env.Token,
    prefix: "$getGuildVar[prefix]",
    intents: ["MessageContent", "Guilds", "GuildMessages", "GuildMembers"],
    events: ["onMessage", "onInteractionCreate", "onGuildJoin", "onGuildLeave", "onJoin"],
    database: {
        type: "aoi.db",
        db: require("@akarui/aoi.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "a-32-characters-long-string-here",
    }
});

process.on('unhandRejection', (reason, promise) => {
  console.log(reason, promise)
});

process.on('uncaughtException', (error, origin) => {
   console.log(error, origin)
});

const voice = new AoiVoice(client, {
    searchOptions: {
        soundcloudClientId: "203982951",
        youtubegl: "US",
    },
    requestOptions: {
        offsetTimeout: 0,
        soundcloudLikeTrackLimit: 200,
    },
});

voice.addPlugin(PluginName.Cacher, new Cacher("memory" /* or "disk" */));
voice.addPlugin(PluginName.Filter, new Filter({
    filterFromStart: false,
}));

client.status({
  name: "🪐 • Estou ajudando $guildCount servidores!",
  type: "CUSTOM",
  time: 12,
});
client.status({
name: "🍭 • Já resgatou seu daily hoje!?",
type: "CUSTOM",
time: 12,
});
client.status({
name: "🥹 • Assistindo $allMembersCount Usuário(s)!!!!!",
type: "CUSTOM",
time: 12,
});
client.command({
  name: "<@$clientID>",
  nonPrefixed: 'true',
  code: `
$clientTyping
$reply[$messageID;false]
 👋 • Olá <@$authorID>, sou a **$username[$clientID]** e meu prefixo é \`$getGlobalUSerVar[prefix;$authorID]\`. Veja o que posso fazer utilizando \`$getGlobalUserVar[prefix;$authorID]ajuda\` ou \`$getGlobalUserVar[prefix;$authorID]help\`!
`
});

client.command({
  name: "<@!$clientID>",
  nonPrefixed: 'true',
  code: `
$clientTyping
$reply[$messageID;false]
 👋 • Olá <@$authorID>, sou a **$username[$clientID]** e meu prefixo é \`$getGlobalUserVar[prefix;$guildID]\`. Veja o que posso fazer utilizando \`$getGlobalUserVar[prefix;$guildID]ajuda\` ou \`$getGlobalUserVar[prefix;$guildID]help\`!
`
});

client.loadCommands("./comandos/", true);