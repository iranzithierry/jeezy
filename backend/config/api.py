from django.urls import re_path
from rest_framework_simplejwt.views import TokenRefreshView
from jeezy.users.api.views import  MeAPIView, EmailVerificationView, EmailSignUpView, SignInView
from jeezy.users.api.oauth import GithubInstallationView, GithubAuthenticateView, GithubPrivateAccessToken
from jeezy.projects.api.views import GetUserProjects, GetUserProject ,GetUserGithubRepositories, CreateProjectsSetting


urlpatterns = [
    re_path(r"^auth/token/refresh/?", TokenRefreshView.as_view()),
    
    # Email Auth
    re_path(r"^auth/register/?", EmailSignUpView.as_view(), name='sign_up_view'),
    re_path(r"^auth/verify_email/?", EmailVerificationView.as_view(), name='email_verification'),
    re_path(r"^auth/login/?", SignInView.as_view(), name='sign_in_view'),

    # Github Oauth
    re_path(r"^auth/github/installation/?", GithubInstallationView.as_view(), name="github_installation"),
    re_path(r"^auth/github/authenticate/?", GithubAuthenticateView.as_view(), name='sign_in_view'),
    re_path(r"^auth/github/access_token/?", GithubPrivateAccessToken.as_view(), name='get_new_access_token'),

    # Github Data
    re_path(r"^github/repositories/?", GetUserGithubRepositories.as_view(), name='get_user_repositories'),

    # Projects
    re_path(r"^project/(?P<id>\d+)/$", GetUserProject.as_view(), name='get_user_project'),
    re_path(r"^projects/create/?", CreateProjectsSetting.as_view(), name='create_user_projects'),
    re_path(r"^projects/?", GetUserProjects.as_view(), name='get_user_projects'),

    re_path(r"^auth/user/?", MeAPIView.as_view(), name='self_get_view'),
]