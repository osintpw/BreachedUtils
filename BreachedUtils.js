// ==UserScript==
// @name         BreachedUtils
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Some basic utils for working on Breached forums.
// @author       You
// @match        *://breachforums.is/*
// ==/UserScript==

class BreachedUtils {
    constructor() {
        // User plan dictionary
        this.userPlans = {
            "rf_noob": "Default",
            "rf_vip": "VIP",
            "rf_mvp": "MVP",
            "rf_god": "God",
            "rf_mod": "Mod",
            "rf_admin": "Admin"
        };

        this.customEmojis = [{
                "name": "bara-sit",
                "source": "https://cdn3.emoji.gg/emojis/2403-capybara.png"
            }, {
                "name": "bara-sit2",
                "source": "https://cdn3.emoji.gg/emojis/5313-capybara.png"
            }, {
                "name": "bara-biz",
                "source": "https://cdn3.emoji.gg/emojis/2304-capybaralawyer.png"
            },
               {
                "name": "confused",
                "source": "https://cdn3.emoji.gg/emojis/6652-confused.png"
               },
               {
                "name": "blush-tipsy",
                "source": "https://cdn3.emoji.gg/emojis/5905-blush-tipsy.png"
               },
               {
                "name": "snoopy-cheer",
                "source": "https://cdn3.emoji.gg/emojis/6483-snoopy-cheer.png"
               },
               {
                "name": "pepe-rich",
                "source": "https://cdn3.emoji.gg/emojis/9561-pepe-rich.gif"
               },
               {
                "name": "sigma",
                "source": "https://cdn3.emoji.gg/emojis/4331-sigma.gif"
               },
               {
                "name": "pepe-bye",
                "source": "https://cdn3.emoji.gg/emojis/2493-pepe-bye.gif"
               },
               {
                "name": "nerd",
                "source": "https://cdn3.emoji.gg/emojis/4591-nerd.gif"
               },
               {
                "name": "myaowlcat-roar",
                "source": "https://cdn3.emoji.gg/emojis/4353-myaowlcat-roar.gif"
               },
               {
                "name": "owo-say",
                "source": "https://cdn3.emoji.gg/emojis/6226-owo-say.gif"
               }
            // TODO: Add more emojis
        ];

        $(document).on('paste', (event) => {
            const clipboardData = event.originalEvent.clipboardData || window.clipboardData;
            const items = clipboardData.items;

            for (const item of items) {
                if (item.kind === 'file') {
                    const file = item.getAsFile();
                    if (file && file.type.startsWith('image/') && (file.type.includes('png') || file.type.includes('jpeg') || file.type.includes('jpg'))) {
                        this.uploadImageToPostimages(file, file.name);
                    } else {
                        this.log('The pasted content is not an image of PNG, JPG, JPEG, or similar format.');
                    }
                    break;
                }
            }
        });
    }

    log(message) {
        console.log(
            `%c[Breached%cUtils]%c ${message}`,
            'background: linear-gradient(135deg, #6063fc, #f900fc); color: transparent; -webkit-background-clip: text; background-clip: text;',
            'background: linear-gradient(135deg, #f900fc, #6063fc); color: transparent; -webkit-background-clip: text; background-clip: text;',
            'color: initial;'
        );
    }

    uploadImageToPostimages(imageData, filename) {
        const apiUrl = 'https://sxcu.net/api/files/create';

        const formData = new FormData();
        formData.append('file', imageData, filename);

        $.ajax({
            type: 'POST',
            url: apiUrl,
            data: formData,
            processData: false,
            contentType: false,
            success: (response) => {
                if (response && response.url) {
                    const url = `${response.url}.png`
                    $('#shout_text').val($('#shout_text').val() + url);
                } else {
                    console.error('Image upload failed.');
                }
            },
            error: (error) => {
                console.error('Error uploading image:', error);
            },
        });
    }

    waitForElement(selector, timeout) {
        return new Promise((resolve, reject) => {
            const startTime = Date.now();
            const checkElement = () => {
                const element = $(selector);
                if (element.length) {
                    resolve(element);
                } else {
                    const currentTime = Date.now();
                    if (currentTime - startTime >= timeout) {
                        reject(`Timeout exceeded. Element "${selector}" not found.`);
                    } else {
                        setTimeout(checkElement, 100);
                    }
                }
            };
            checkElement();
        });
    }

    injectEmoji(name, source) {
        const ul = $('.yuieditor-insertemoticon.yuieditor-emoticons-ul.yuieditor-emoticons_shout_text');

        this.waitForElement(ul, 5000)
            .then(() => {
                const li = document.createElement('li');
                li.innerHTML = `
            <a class="yuieditor-emoticons" title="${name}" onclick="$('#shout_text').val($('#shout_text').val() + ' ${source} ');$('.yuieditor-dropdown').hide();$('#shout_text').focus();">
                <img src="${source}" alt="${name}" width="32" height="32">
            </a>
          `;

                ul.append(li);
            })
            .catch((error) => {
                this.log('Could not find the target Yuieditor element.');
            });
    }



    injectEmojis() {
        this.customEmojis.forEach(({
            name,
            source
        }) => {
            this.injectEmoji(name, source)
        });
    }

    getOnlineUsers() {
        const boardStatsElement = document.getElementById('boardstats_e');

        if (!boardStatsElement) {
            this.log('Element with id `boardstats_e` not found.');
            return [];
        }

        const users = [];
        const anchorTags = boardStatsElement.getElementsByTagName('a');

        for (const anchorTag of anchorTags) {
            const profileLink = anchorTag.href;
            const username = anchorTag.textContent.trim();
            users.push({
                username,
                profileLink
            });
        }

        return users;
    }

    getLatestSB() {
        // Loop through each .msgShout element and build the JSON objects
        const users = [];

        $('.msgShout').each((index, element) => {
            const username = $(element).attr('username');
            const userId = $(element).attr('user');
            const messageId = $(element).attr('id');
            const messageContent = $(element).find('.content_msgShout').text();

            // Check for user plan class in the username span
            const userPlanClass = $(element).find('.username_msgShout span').attr('class');
            const userPlan = this.userPlans[userPlanClass] || "Default";

            const jsonObject = {
                "username": username,
                "userId": userId,
                "messageId": messageId,
                "messageContent": messageContent,
                "userPlan": userPlan
            };

            users.push(jsonObject);
        });

        // Return the array of JSON objects
        return users;
    }
}

function main() {
    const util = new BreachedUtils();
    util.log('BreachedUtils initialized. You can now access all its functions via the `util` object!');
    util.injectEmojis();
}

main();
