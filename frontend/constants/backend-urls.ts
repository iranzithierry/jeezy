const BACKEND_URLS = {
    BACKEND_HOST: "http://127.0.0.1:8000/",
    SIGNUP: "http://127.0.0.1:8000/api/auth/register/",
    EMAIL_VERIFICATION: "http://127.0.0.1:8000/api/auth/verify_email/",
    LOGIN: "http://127.0.0.1:8000/api/auth/login/",
    GITHUB_INSTALLATION: "http://127.0.0.1:8000/api/auth/github/installation/",
    GITHUB_AUTHENTICATE: "http://127.0.0.1:8000/api/auth/github/authenticate/",
    NEW_GITHUB_ACCESS_TOKEN: "http://127.0.0.1:8000/api/auth/github/access_token/",
    PROJECTS: "http://127.0.0.1:8000/api/projects/",
    GET_NEW_ACCESS_TOKEN: "http://127.0.0.1:8000/api/auth/token/refresh/"
}

export default BACKEND_URLS;
