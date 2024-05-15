from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from jeezy.projects.models import Project
from jeezy.projects.api.serializers import ProjectSerializer


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