# Slack bot that creates a Trello card with the content of the first message of a thread where this bot is mentioned in

Very simple, prototype implementation.

## Preparation

* You will need NodeJS and [Yarn](https://classic.yarnpkg.com/lang/en/docs/install).
* Copy `.env.example` to `.env`
* Configure and [install a slack app in your workspace](https://api.slack.com/tutorials/tracks/hello-world-bolt) (See `slack.app.manifest.yml` for this app's current configuration) and configure the credentials in `.env`
* [Create a Trello API key](https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction) and add it to your `.env`, too.

## Run

```shell
yarn install
yarn dev
```

For tests, Jest is used, they can be run by `yarn test`.

## Resources

* Create a slack app: https://api.slack.com/tutorials/tracks/hello-world-bolt
* Documentation about Slack API library "Bolt": https://slack.dev/bolt-js/concepts
* Simple Trello npm library: https://github.com/bhushankumarl/trello-node-api

## Who is Cora?

You might notice that I called this bot "Cora". Cora was a crow we found in the field as a chick, we fed her and raised her up and spent great time together. After the first weeks, after she learned to fly, she mainly lived outside, but came at least once or twice a day asking for food and cuddles.

![](https://lh3.googleusercontent.com/pw/AM-JKLX4rkhV8kQr1p8t_RJvSoyu6413Wgg4Y0V15pjoFeiPnLqKeUovSxwEz-SHBfatiq7VfA3ZxkZfHnd3fi0VslXskoeaaipm3-8EFed-jqjkHI-d5VCPc_o2ZlpZTUoICPxcmBG2lTdI6MBEzNlpkeDL8w=w2995-h500-no)

Unfortunately, one day she disappeared.
