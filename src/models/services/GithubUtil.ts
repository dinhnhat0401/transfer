import {Octokit, RestEndpointMethodTypes} from '@octokit/rest';
import Source, { Issue, IssueComment } from '../Source'

export default class GithubUtil implements Source {
  /// octokit
  octokit: Octokit

  constructor(octokit: Octokit) {
    this.octokit = octokit
  }

  async getIssues(): Promise<string> {
    /// TBI
    return ""
  }

  async createIssue(issue: Issue) {
    console.log(issue);
    let props : RestEndpointMethodTypes["issues"]["create"]["parameters"]  = {
      owner: process.env.GITHUB_REPO_OWNER,
      repo: process.env.GITHUB_REPO,
      title: issue.title.trim(),
      body: issue["description"] ?? "issue title placeholder",
    };

    return (await this.octokit.issues.create(props)).data;
  }

  /// get all comment belong to one issue
  async getIssueComments(issueID: number): Promise<string> {
    /// TBI
    return ""
  }

  /// create new comments on a issue
  async createIssueComment(issueComment: IssueComment, issue: Issue) {
    console.log(issue);
    let props : RestEndpointMethodTypes["issues"]["createComment"]["parameters"]  = {
      owner: process.env.GITHUB_REPO_OWNER,
      repo: process.env.GITHUB_REPO,
      issue_number: issue.number,
      body: issueComment.body ?? "issue title placeholder",
    };

    return this.octokit.issues.createComment(props);
  }
}