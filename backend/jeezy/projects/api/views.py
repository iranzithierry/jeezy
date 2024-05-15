from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from jeezy.projects.models import Project
from jeezy.projects.api.serializers import ProjectSerializer

from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.request import Request
from jeezy.users.models import User
from rest_framework.views import APIView
import requests
from jeezy.secrets.jwt import get_app_jwt


class ProjectViewSet(ListModelMixin, RetrieveModelMixin, GenericViewSet):
    permission_classes =  [IsAuthenticated]
    serializer_class = ProjectSerializer
    queryset = Project.objects.none()
    lookup_field = "id"

    def get_queryset(self):
        queryset = Project.objects.filter(
            user=self.request.user
        )
        return queryset

    def get_serializer_context(self):
        return {"request": self.request, "user": self.request.user}

class GetUserGithubRepositories(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request: Request, *args, **kwargs) -> Response:
        user: User = request.user
        accessToken = user.github_private_access_token
        headers = {
            "Authorization": f"Bearer {accessToken}",
        }
        try:
            data = requests.get(f"https://api.github.com/search/repositories?q=language:typescript,javascript+user:{user.username}&type=Repositories", headers=headers)
        except Exception as e:
            return Response({"message": e, "success": False, "source": "Github" },  status=status.HTTP_500_INTERNAL_SERVER_ERROR )
        response = data.json()
        if "items" in  data.json():
            response = data.json()['items']
        return Response({"message": response, "success": True if str(data.status_code).startswith("2") else False, "source": "Github" },  status=data.status_code )