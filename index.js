const child_process = require("child_process");
const log = require("./log");
const apps = process.argv.slice(2);

if (!apps.length) {
    console.error("@todo Add help here :)");
    process.exit(1);
}

if (apps.length % 2) {
    console.error("Arguments number is odd. Did you forget to give name for your process?");
    process.exit(1);
}

const count = apps.length;
const contexts = [];

const handleProcessExit = function() {
    console.log("exit", this);
};

const handleProcessError = function(err) {
    console.log("process error", this, err);
};

const handleProcessStdout = function(text) {
    this.log(String(text));
};

const handleProcessSterr = function(text) {
    this.error(String(text));
};

for (let i = 0; i < count; i += 2) {
    const name = apps[i];
    const command = apps[i+1];

    const context = {
        name,
        command,
    };

    contexts.push(context);
}
let longest = 0;
contexts.forEach(({name}) => {
    if (name.length > longest) {
        longest = name.length;
    }
});
contexts.forEach((context, key) => {
    context.name = context.name.padEnd(longest);

    const index = key;
    context.log = log.bind(null, index, context.name, false);
    context.error = log.bind(null, index, context.name, true);

    const proc =  child_process.spawn(context.command, { detached: false, shell: true });
    proc.on("exit", handleProcessExit.bind(context));
    proc.on("error", handleProcessError.bind(context));
    proc.stdout.on("data", handleProcessStdout.bind(context));
    proc.stderr.on("data", handleProcessSterr.bind(context));

});

console.log("Logging for", count / 2, "processes");
