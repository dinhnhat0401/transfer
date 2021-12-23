
# Transfer

A lightweight package for transferring data between various sources.

## Requirement

```
➜  transfer git:(main) npm -v
8.1.2
➜  transfer git:(main) node -v
v16.13.1
```

## Building

Clone a copy of the repo:

```bash
git clone https://github.com/dinhnhat0401/transfer
```

Change to the TypeScript directory:

```bash
cd transfer
```

Install dependencies:

```bash
npm install
```

Setup enviroment variables:

```bash
Create a new .env file with below variables.

# Gitlab private token, created at https://gitlab.com/-/profile/personal_access_tokens
GITLAB_PRIVATE_TOKEN=xxxx-yyyyyyyy

# Gitlab API endpoint
GITLAB_API_ENDPOINT=https://abc.def

# Gitlab project info
GITLAB_PROJECT_ID=123456

# Github personal access token, created at https://github.com/settings/tokens
GITHUB_PERSONAL_ACCESS_TOKEN=xxx_yyyyyy

# Github project info
GITHUB_API_ENDPOINT=https://api.github.com

# Github project owner
GITHUB_REPO_OWNER=whoami

# Github repo where issue will be transfered to
GITHUB_REPO=myreponame
```

## Usage

```bash
tsc src/controllers/api.ts && node src/controllers/api.js             # create js file from ts file then execute js file
```

## Contribute

TBD

## Documentation

TBD

## Roadmap

TBD
