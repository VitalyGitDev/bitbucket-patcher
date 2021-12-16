export interface GitCliInterface {
	clone(repoName: String): Promise<boolean>
	setNewBranch(name: String): Promise<boolean>
	commit(message: String): Promise<boolean>
	push(): Promise<boolean>
}