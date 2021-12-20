import fetch from 'node-fetch';
import Source, { Issue, IssueComment } from '../Source'

export default class GitlabUtil implements Source {
  async getIssues(): Promise<string> {
    const response = await fetch(
      `${process.env.GITLAB_API_ENDPOINT}/projects/${process.env.GITLAB_PROJECT_ID}/issues?state=opened`,
      {
        method: "GET",
        params: {
          state: "opened"
        },
        headers: {
          "content-type": "application/json",
          "Private-Token": process.env.GITLAB_PRIVATE_TOKEN,
        },
      }
    );
    return response.text();
  }

  async createIssue(issue: Issue) {
    /// TBI
  }

  /// get all comment belong to one issue
  async getIssueComments(issueID: number): Promise<string> {
    const response = await fetch(
      `${process.env.GITLAB_API_ENDPOINT}/projects/${process.env.GITLAB_PROJECT_ID}/issues/${issueID}/discussions`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "Private-Token": process.env.GITLAB_PRIVATE_TOKEN,
        },
      }
    );
    return response.text();
  }

  /// create new comments on a issue
  async createIssueComment(issueComment: IssueComment, issue: Issue) {
    /// BIT
  }
}
