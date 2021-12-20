import { Octokit } from '@octokit/rest';
import GitlabUtil from '../models/services/GitlabUtil';
import GithubUtil from '../models/services/GithubUtil';
import Source, { Issue, IssueComment } from '../models/Source';

// dotenv config
import * as dotenv from 'dotenv';
dotenv.config();

// utility function
export const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default class API {
  /// issue source
  input: Source;
  /// move output this
  output: Source;

  constructor(input: Source, output: Source) {
    this.input = input
    this.output = output
  }

  async cloneIssue() {
    const rawIssueData = await this.input.getIssues()
    // console.log(res);
    let issues: [Issue] = JSON.parse(rawIssueData);
    issues.flatMap(async (issue) => {
      /// create a new issue at output source
      let newIssue = await this.output.createIssue(issue);

      /// load comment from input source
      const rawCommentData = await this.input.getIssueComments(issue["iid"]);
      let comments: [IssueComment] = JSON.parse(rawCommentData);

      /// create new comments at newly created issue
      comments
        .filter((comment) => {
          return comment["system"] === undefined || comment["system"] === false;
        })
        .flatMap(async (comment) => {
          await this.output.createIssueComment(comment, newIssue);
        });
    });
  }
}

/// Make the request here
const gitlabUtil = new GitlabUtil();
const octokit = new Octokit({
  debug: false,
  baseUrl: process.env.GITHUB_API_ENDPOINT,
  timeout: 5000,
  headers: {
    'user-agent': process.env.GITHUB_REPO, // GitHub is happy with a unique user agent
    accept: 'application/vnd.github.v3+json',
  },
  auth: 'token ' + process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
  throttle: {
    onRateLimit: async (retryAfter, options) => {
      console.log(
        `Request quota exhausted for request ${options.method} ${options.url}`
      );
      await sleep(60000);
      return true;
    },
    onAbuseLimit: async (retryAfter, options) => {
      console.log(
        `Abuse detected for request ${options.method} ${options.url}`
      );
      await sleep(60000);
      return true;
    },
  },
});
const githubUtil = new GithubUtil(octokit);
const api = new API(gitlabUtil, githubUtil);
api.cloneIssue();