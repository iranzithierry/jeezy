import requests
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.request import Request
from jeezy.projects.models import Project, EnvironmentVariables
from jeezy.projects.api.serializers import ProjectSerializer
from jeezy.users.models import User
from .forms import (
    ProjectBasicSettingsForm,
    ProjectEnvironSettingsForm,
    ProjectBuildSettingsForm,
)


class GetUserProjects(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request, *args, **kwargs) -> Response:
        user = request.user
        projects = Project.objects.filter(user=user)
        if projects.count() != 0:
            projects = ProjectSerializer(projects, many=True).data
            return Response(
                {"success": True, "data": projects}, status=200
            )
        else:
            return Response({"success": True, "data": []}, status=200)


class GetUserGithubRepositories(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request, *args, **kwargs) -> Response:
        user: User = request.user
        accessToken = user.github_private_access_token
        headers = {
            "Authorization": f"Bearer {accessToken}",
        }
        try:
            data = requests.get(
                f"https://api.github.com/search/repositories?q=language:typescript,javascript+user:{user.username}&type=Repositories",
                headers=headers,
            )
        except Exception as e:
            return Response(
                {"message": e, "success": False, "source": "Github"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
        response = data.json()
        if "items" in data.json():
            response = data.json()["items"]
        return Response(
            {
                "message": response,
                "success": True if str(data.status_code).startswith("2") else False,
                "source": "Github",
            },
            status=data.status_code,
        )


class CreateProjectsSetting(APIView):
    permission_classes = [permissions.IsAuthenticated]

    # def __init__(self, **kwargs) -> None:
    #     super().__init__(**kwargs)
    #     self.user = None
    #     self.create_function = None

    def post(self, request: Request, *args, **kwargs) -> Response:
        mode = request.GET.get("mode", "basic")
        if mode == "basic":
            form = ProjectBasicSettingsForm(data=request.data)
            self.create_function = self.create_basic_project_settings
        elif mode == "environment_variables":
            form = ProjectEnvironSettingsForm(data=request.data)
            self.create_function = self.create_environment_variables_project_settings
        elif mode == "build_settings":
            form = ProjectBuildSettingsForm(data=request.data)
            self.create_function = self.create_build_project_settings
        else:
            return Response(
                {"success": False, "message": "Invalid mode"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if form.is_valid():
            return self.create_function(data=form.cleaned_data)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

    def create_basic_project_settings(self, data):
        values = {
            "name": data["project_name"],
            "git_repository": data["git_repository"],
            "root_directory": data["root_directory"],
        }
        try:
            project = Project.objects.get(git_repository=data["git_repository"], user=self.request.user)
            for key, value in values.items():
                setattr(project, key, value)
            project.save()
        except Project.DoesNotExist:
            project = Project.objects.create(**values, user=self.request.user)

        return Response({"success": True, "message": project.id}, status=status.HTTP_200_OK)

    def create_environment_variables_project_settings(self, data):
        try:
            project = Project.objects.get(id=data["project"], user=self.request.user)
        except Project.DoesNotExist:
            return Response({"success": False, "message": "Can not create envs for uncreate project."}, status=status.HTTP_404_NOT_FOUND)
        for env_ in data['envs']:
            key = env_['key']
            value = env_['value']
            try:
                env = EnvironmentVariables.objects.get(key=key, project=project)
                env.value = value
                env.save()
            except EnvironmentVariables.DoesNotExist:
                EnvironmentVariables.objects.create(key=key, value=value, project=project)
        return Response({"success": True}, status=status.HTTP_200_OK)

    def create_build_project_settings(self, data):
        return Response({"success": True}, status=status.HTTP_200_OK)
