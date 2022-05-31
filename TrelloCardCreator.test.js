const { removeSlackLinks } = require("./TrelloCardCreator");

test('test removing slack links', () => {
    const slackStr = "*<https://hyperskill.org/tracks|Hyperskill>*<https://hyperskill.org/tracks|, aka >*<https://hyperskill.org/tracks|JetBrains Academy>*"
    expect(removeSlackLinks(slackStr)).toBe("Hyperskill, aka JetBrains Academy")
});
