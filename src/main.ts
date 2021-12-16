require("dotenv").config();

import { Logger } from "./domains/common/logger";
import GitCli from "./domains/common/vcs-cli";
import { CodePatcherService } from "./domains/patcher"; // instantiate with IOC

const getErrorHandler = (ioc?: Record<string, any>) => (e: Error) => {
	Logger.error(e);
	process.exit(1);
};
;

async function RunPatcher() {
	Logger.info('Strarting to patch ____');
	const gitCliOptions = {
		
	};
	const gitCli = new GitCli(gitCliOptions);
	(new CodePatcherService(gitCli)).patchSomeStaff(process.env.REPO_TO_PATCH!);

	return Promise.resolve(true);
}

RunPatcher()
	.then((result) => Logger.info('Patched successfully!'))
	.catch(getErrorHandler());
