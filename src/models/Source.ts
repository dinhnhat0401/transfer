import { components } from "@octokit/openapi-types";

export type Issue = components["schemas"]["issue"];
export type IssueComment = components["schemas"]["issue-comment"];

export default interface Source {
  /// get all issues from a source
  getIssues(): Promise<string>

  /// create a new issue to source
  createIssue(issue: Issue): any

  /// get all comment belong to issueID
  getIssueComments(issueID: number): Promise<string>

  /// create new comment on an issue
  createIssueComment(issueComment: IssueComment, issue: Issue): any
}
