export type ProjectsResponse =  {
    id:                number;
    name:              string;
    visibility:        string;
    last_deployed:     Date;
    collaborators:     any[];
    technology_used:   string;
    generated_domain:  string;
    cloned_repo_path:  string;
    git_repository: string;
    active_deployment: null;
    deployments:       Deployment[];
}

export type Deployment  = {
    id:              number;
    commit:          string;
    branch:          string;
    status:          string;
    deployed_at:     string;
    deployment_logs: string;
    build_command:   string;
    build_output:    string;
    project:         number;
    deployed_by:     number;
}
