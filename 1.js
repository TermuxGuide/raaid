const colors = require('colors');

console.log(`Initializing deadrose bot...`.blue.bold);
const { 
    TOKEN,
    CHAT_SPAM,
    GROUP_ID,
    BTN_TEXT,
    BTN_TEXT2,
    BTN_TEXT3,
    HELLO_TEXT,
    TIME
} = require("./config");

console.log(`deadrose bot >> Starting...`.yellow.bold);

const { VK, Keyboard } = require("vk-io");
const vk = new VK({
    token: "ca5cb3ba470569d3676e458b7b45d26477f514e66c3c78ff8f104e195a1988346cca00a998dc020e31479",
    apiMode: "parallel",
    pollingGroupId: 193704556
});

vk.updates.use(async (ctx, next) => {
    if (ctx.is("message") && ctx.isOutbox) {
        return;
    }

    if (ctx.isChat) {
    	console.log(`deadrose bot >> New chat has been attacked.`.green.bold);
        setInterval(() => {
            ctx.send({
                message: randomFromArray(CHAT_SPAM),
                keyboard: Keyboard.keyboard(
                    Array(10).fill().map(() => 
                       Array(4).fill().map(() => button(randomFromArray(BTN_TEXT)))
                    )
                )
            });
        }, TIME);
    }

    return ctx.send(HELLO_TEXT);
});

vk.updates.startPolling()
.then(() => console.log(`deadrose bot >> Started...`.green.bold));
console.log(`Github version`.red.bold);

const randomInt = (x, y) => y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
const randomFromArray = (array) => array[randomInt(array.length - 1)];
const button = (label) => {
    return Keyboard.textButton({
        label, color: Keyboard[randomFromArray(["POSITIVE_COLOR", "DEFAULT_COLOR", "PRIMARY_COLOR", "NEGATIVE_COLOR"])]
    });
}
process.on("uncaughtException", e => {
  console.log(e);
});

process.on("unhandledRejection", e => {
  console.log(e);
});
