
function extractTitle(messageContent) {
    const firstLine = toPlainText(messageContent).split('\n')[0]
    if(firstLine.length > 42) {
        return firstLine.substring(0, 42) + "…"
    } else {
        return firstLine
    }
}

function toPlainText(messageContent) {
    return messageContent.replace(/<([^|]*)\|([^>]*)>/g, '$2').replaceAll('*', '')
}

function toMarkDown(messageContent) {
    return messageContent.replace(/<([^|]*)\|([^>]*)>/g, '[$2]($1)').replaceAll('&amp;', '&')
}

function resolveUsers(users, messageContent) {
    users.forEach(element => {
        messageContent = messageContent.replaceAll('<@' + element.id + '>', element.username)
        console.debug(element)
    });
    return messageContent;
}

module.exports = {removeSlackLinks: toPlainText, extractTitle, toMarkDown, resolveUsers}
