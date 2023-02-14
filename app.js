const fs = require("fs/promises");

(async () => {
	const commandFileHandler = await fs.open("./command.txt", "r");
	const watcher = fs.watch("./command.txt");
	for await (const event of watcher) {
		if (event.eventType === "change") {
			// size of file
			const size = (await commandFileHandler.stat()).size;
			const content = await commandFileHandler.read(
				Buffer.alloc(size),
				1, // offset - the location at which we want to start filling our buffer
				size - 1, // length - how many bytes we want to read
				0 // position - the position that we want to start reading the file from
			);
			console.log(content);
		}
	}
})();
