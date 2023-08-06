# BreachedUtils
#### As an active BF user this will get updated pretty often.

<!--- These are examples. See https://shields.io for others or to customize this set of shields. You might want to include dependencies, project status and licence info here --->
![GitHub repo size](https://img.shields.io/github/repo-size/Kryptonux/BreachedUtils?style=for-the-badge&logoColor=white)
![GitHub stars](https://img.shields.io/github/stars/Kryptonux/BreachedUtils?style=for-the-badge&logoColor=white)
![GitHub forks](https://img.shields.io/github/forks/Kryptonux/BreachedUtils?style=for-the-badge&logoColor=white)

BreachedUtils is a versatile utility extension designed to enhance the functionality of Breached. It empowers users with additional features and enables other scripts to access valuable resources like the latest shoutbox messages, online users, and the ability to add custom emojis.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of [TamperMonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/), or [GreaseMonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/), 

## Installing BreachedUtils

To install BreachedUtils, follow these steps:
- Go to the BreachedUtils.js file
- Click on `Raw` button on the top right
- Install the user script!

## Example of BreachedUtils
```js
function main() {
    // Init BreachedUtils
    const util = new BreachedUtils();

    // Inject our premade selection of emojis
    util.injectEmojis();

    // Inject a custom emoji into Yuieditor
    util.injectEmoji('test-emoji', 'https://example.com/emoji.png')

    // Get the latest shout-box messages and log them
    const messages = BreachUtility.getLatestSB();
    console.log(messages)
}
```

## Contributing to BreachedUtils
To contribute to BreachedUtils, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively see the GitHub documentation on [creating a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## License
This project uses the following license: [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.en.html#license-text).
