from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.request import Request
from jeezy.users.models import User
from jeezy.users.forms import GithubSignInForm
from .serializers import UserSerializer
from rest_framework.views import APIView
import requests
from jeezy.secrets.jwt import get_app_jwt
from .utils import get_tokens_for_user

class GithubAuthenticateView(APIView):
    def post(self, request: Request, *args, **kwargs) -> Response:
        form = GithubSignInForm(data=request.data)
        if form.is_valid():
            email = form.cleaned_data.get("email")
            access_token = form.cleaned_data.get("access_token")
            user = User.objects.filter(email=email, github_access_token=access_token).first()
            if user:
                return Response(
                    { "message": "Login successful", "success": True, "user": UserSerializer(user).data,  "tokens": get_tokens_for_user(user), },
                    status=status.HTTP_200_OK,
                )
            else:
                user = User.objects.filter(email=email).first()
                if user:
                    return self.authorize(user, access_token)
                else:
                    return self.create(access_token)

        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

    def authorize(self, user: User, access_token):
        user_with_this_token = requests.get(
            "https://api.github.com/user",
            headers={"Authorization": f"token {access_token}"},
        )

        if user_with_this_token.status_code == 200:
            gh_user = user_with_this_token.json()
        else:
            return Response(
                {"message": "Invalid credentials"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        if user.email != gh_user["email"]:
            return Response(
                {"message": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        user.email = gh_user["email"]
        user.name = gh_user["name"]
        user.username = gh_user["login"]
        user.github_id = gh_user["id"],
        user.github_access_token = access_token
        user.save()

        return Response(
            {"message": "Login successful","success": True,"user": UserSerializer(user).data, "tokens": get_tokens_for_user(user), },
            status=status.HTTP_200_OK,
        )

    def create(self, access_token):
        user_with_this_token = requests.get(
            "https://api.github.com/user",
            headers={"Authorization": f"token {access_token}"},
        )

        if user_with_this_token.status_code == 200:
            gh_user: dict = user_with_this_token.json()
        else:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = User.objects.create_user(
            email=gh_user["email"],
            github_id=gh_user["id"],
            name=gh_user["name"],
            username=gh_user["login"],
            picture=gh_user.get("avatar_url", None),
            github_access_token=access_token,
            sign_up_method="github",
        )
        user.set_email_verified()
        user.save()

        return Response(
            { "message": "Sign up successful", "success": True, "user": UserSerializer(user).data, "tokens": get_tokens_for_user(user), },
            status=status.HTTP_200_OK
        )


class GithubInstallationView(generics.CreateAPIView):
    def create(self, request: Request, *args, **kwargs) -> Response:
        installation_id = request.data.get("installation_id")
        if installation_id:
            application_jwt = get_app_jwt()
            headers = {
                "Authorization": f"Bearer {application_jwt}",
            }
            try:
                data = requests.post(f"https://api.github.com/app/installations/{installation_id}/access_tokens", headers=headers)
            except Exception as e:
                return Response({"message": e, "success": False, "source": "Github" },  status=status.HTTP_500_INTERNAL_SERVER_ERROR )
            response = data.json()
            print(response)
            # ATTACHING AUTH USER WITH INSTALLATION ID
            if "message" in  data.json():
                response = data.json()['message']
            if "token" in response:
                # return token with datetime.fromisoformat("2024-05-06T23:29:28Z".replace('Z', '+00:00'))
                response = response['token']
            return Response({"message": response, "success": True if data.status_code == 200 else False, "source": "Github" },  status=data.status_code )
        else:
            return Response({"message": "No installation id provided", "success": False}, status=status.HTTP_400_BAD_REQUEST)