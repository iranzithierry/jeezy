const HOST = "http://127.0.0.1:8000"
const BACKEND_URLS = {
    SIGNUP: `${HOST}/api/auth/register/`,
    EMAIL_VERIFICATION: `${HOST}/api/auth/verify_email/`,
    LOGIN: `${HOST}/api/auth/login/`,
    GET_NEW_ACCESS_TOKEN: `${HOST}/api/auth/token/refresh/`,
    GITHUB_INSTALLATION: `${HOST}/api/auth/github/installation/`,
    GITHUB_AUTHENTICATE: `${HOST}/api/auth/github/authenticate/`,
    NEW_GITHUB_ACCESS_TOKEN: `${HOST}/api/auth/github/access_token/`,
    RETREIVE_PROJECT: `${HOST}/api/project/`,
    GET_PROJECTS: `${HOST}/api/projects/`,
    CREATE_PROJECTS: `${HOST}/api/projects/create?mode=`,
    GET_USER_GITHUB_REPOSITORIES: `${HOST}/api/github/repositories/`
}

export default BACKEND_URLS;
