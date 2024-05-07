// Define a type for urlType to restrict the possible values
export type UrlType = 'url' | 'html_url' | 'followers_url' | 'following_url' | 'gists_url' | 'starred_url' | 'subscriptions_url' | 'organizations_url' | 'repos_url' | 'events_url' | 'received_events_url' | 'search' | 'all_by_languages';

// Define the function with type annotations
export const getGithubUrl = (username: string, urlType: UrlType): string => {
    let url = '';
    switch (urlType) {
        case 'url':
            url = `https://api.github.com/users/${username}`;
            break;
        case 'html_url':
            url = `https://github.com/${username}`;
            break;
        case 'followers_url':
            url = `https://api.github.com/users/${username}/followers`;
            break;
        case 'following_url':
            url = `https://api.github.com/users/${username}/following{/other_user}`;
            break;
        case 'gists_url':
            url = `https://api.github.com/users/${username}/gists{/gist_id}`;
            break;
        case 'starred_url':
            url = `https://api.github.com/users/${username}/starred{/owner}{/repo}`;
            break;
        case 'subscriptions_url':
            url = `https://api.github.com/users/${username}/subscriptions`;
            break;
        case 'organizations_url':
            url = `https://api.github.com/users/${username}/orgs`;
            break;
        case 'repos_url':
            url = `https://api.github.com/users/${username}/repos`;
            break;
        case 'events_url':
            url = `https://api.github.com/users/${username}/events{/privacy}`;
            break;
        case 'received_events_url':
            url = `https://api.github.com/users/${username}/received_events`;
            break;
        case 'search':
            url = `https://api.github.com/search/repositories?q=user:${username}+`;
            break;
        case 'all_by_languages':
            url = `https://api.github.com/search/repositories?q=language:typescript,javascript+user:${username}&type=Repositories`
            break;
        default:
            break;
    }
    return url;
};

const Installation_url = "https://github.com/settings/apps/jeezy-dev"