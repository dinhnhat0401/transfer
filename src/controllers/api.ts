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
  from: Source;
  /// move to this
  to: Source;

  constructor(from: Source, to: Source) {
    this.from = from
    this.to = to
  }

  async cloneIssue() {
    const rawIssueData = await this.from.getIssues()
    // console.log(res);
    let issues: [Issue] = JSON.parse(rawIssueData);
    console.log(issues.length);
    console.log(issues[0]);
    const rawCommentData = await this.from.getIssueComments(issues[0]["iid"]);
    console.log("raw="+rawCommentData);
    let comments: [IssueComment] = JSON.parse(rawCommentData);
    let newIssue = await this.to.createIssue(issues[0]);
    console.log(newIssue);
    await this.to.createIssueComment(comments[0], newIssue);
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