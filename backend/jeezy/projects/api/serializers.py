from rest_framework import serializers
from ..models import Project, Deployment
# from jeezy.users.models import User
# from jeezy.users.api.serializers import UserSerializer


class DeploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Deployment
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    visibility = serializers.ChoiceField(
        choices=Project.VISIBILITY_CHOICES,
        source="get_visibility_display",
        required=False,
    )
    deployments = DeploymentSerializer(many=True, required=False)

    class Meta:
        model = Project
        fields = (
            "id",
            "name",
            "visibility",
            "last_deployed",
            "root_directory",
            "git_repository",
            "technology_used",
            "generated_domain",
            "cloned_repo_path",
            "active_deployment",
            "deployments"
        )

    # def to_representation(self, instance: Project):
    #     representation = super().to_representation(instance)
    #     # representation["deployments"] = instance.deployments.main
    #     return representation


