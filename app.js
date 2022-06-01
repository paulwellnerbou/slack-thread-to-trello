const { App } = require("@slack/bolt");
const { extractTitle, toMarkDown, resolveUsers } = require("./TrelloCardCreator");
require("dotenv").config();
const Trello = require('trello-node-api')(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN);

let users = {}

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_APP_TOKEN
});

(async () => {
    const port = process.env.PORT || 3000
    await app.start(port);
    console.log('Fetching users...')
    try {
        const result = await app.client.users.list();
        console.debug(result.members)

        users = result.members.map(user => ({
            id: user.id,
            username: user.profile.real_name
        }));
        console.debug(users)
      }
      catch (error) {
        console.error(error);
      }
    console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

// This will match any message that contains 👋
app.message(':wave:', async ({ message, say }) => {
    console.debug("Received :wave:")
    await say(`Hello, <@${message.user}>`);
});

app.event('app_mention', async ({ event, message, context, client, say }) => {
    console.debug(event)
    let ts = event.thread_ts || event.ts
    try {
        let conversations = await app.client.conversations.replies({
            token: process.env.SLACK_BOT_TOKEN,
            channel: event.channel,
            ts: ts
        })
        let originalMessage = conversations.messages.filter(message => message.ts == ts)[0]
        console.debug(originalMessage)
        console.debug(originalMessage.text)
        response = await createTrelloCard(originalMessage)
        console.debug(response)
        await say({ text: `Thanks, <@${event.user}>, I created this card: ${response.url}`, thread_ts: ts })
    } catch (error) {
        console.error(error);
        await say({ text: `<@${event.user}>, there was an error: \`${error}\``, thread_ts: ts })
    }
});

function createTrelloCard(message) {
    const messageContent = resolveUsers(users, message.text)
    var card = {
        name: extractTitle(messageContent),
        desc: toMarkDown(messageContent),
        pos: 'top',
        idList: process.env.TRELLO_LIST_ID
    };
    console.debug("Creating card...")
    console.debug(card)
    return Trello.card.create(card);
}
