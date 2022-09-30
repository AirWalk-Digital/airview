# Airview API Demo

A reference api implementation to be consumed by [airview-cms](/packages/airview-cms/) which wraps the logic provided by [airview-cms-api](/packages/airview-cms-api)

## Configuration

The API is configured via environment variables. In order to interact with GitHub's API, you will need to create a 'GitHub App' as described [here](https://docs.github.com/en/developers/apps/building-github-apps/creating-a-github-app)

You should only need to add the mandatory information of Name and Homepage (this can be a placeholder).

You will also need to generate a private key and save somewhere securely.

The app will need to be assigned permissions for:

- Content (Read and Write)
- Pull Requests (Read and Write)

Once the app is created, you will also need to install it into the your account as creating and installing the app are seperate tasks.

### Environment Variables

You will need to define the following environement variables:

|Name|Example|Description|
|-----|-------|------------|
| GITHUB_REPO_NAME | my-repository | Name of repository in which to store content |
| GITHUB_ORG_NAME | my-user-or-org-name | Name of github user or organisation which owns the repo |
| GITHUB_INSTALLATION_ID | 123456 | Id of installation. Can be found by inspecting URL when viewing in GitHub UI|
| GITHUB_APP_ID | 183877 |Id of application. Can be found by inspecting URL when viewing in GitHub UI|
| GITHUB_PRIVATE_KEY_FILE | /path/to/private-key.pem |Path to where the private key is stored|
