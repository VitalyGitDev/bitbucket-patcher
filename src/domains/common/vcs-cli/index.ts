import fs from "fs";
import simpleGit, { SimpleGit, SimpleGitOptions } from "simple-git";
import { Logger } from "../logger";
import { GitCliInterface } from "../interfaces";


export default class GitCli implements GitCliInterface {

	protected baseDir: string;

	protected git: SimpleGit;

	protected config;

	constructor(config: Record<string, any>, options?: SimpleGitOptions, services?: Record<string, any>) {
		this.config = config;
		// this.config.authPrefix = 'x-token-auth';
    this.baseDir = `${config.CLONED_REPOS_DIR}/${config.repoName}`;
    !fs.existsSync(this.baseDir) && fs.mkdirSync(this.baseDir, { recursive: true });

    this.git = simpleGit({ baseDir: this.baseDir, ...options });
	}

  private buildRepoUrl(repo: String) {
    const { accessToken, clonePath, gitProtocol, authPrefix } = this.config;
    return `${gitProtocol}://${authPrefix}:${accessToken}@bitbucket.com/${clonePath}/${repo}.git`;
  }

	public async clone(
    repoName: String,
    // options = { '--depth': 1 }
  ) {
    const repoUrl = this.buildRepoUrl(repoName);
    try {
      Logger.info('Starting repository clone', { repoName });
      await this.git.clone(
				repoUrl,
				// options,
			);
      Logger.info('Finished cloning repository', { repoName });
      return true;
    } catch (e) {
      Logger.error(e as Error);
      throw e;
    }
	}
	
	public async setNewBranch(name: String) {
		// git branch
		// git checkout
		return true;
	}
	
	public async commit(message: String) {
		// git commit if there are some updates
		return true;
	}
	
	public async push() {
		// git push if there are some updates
		return true;
	}
}