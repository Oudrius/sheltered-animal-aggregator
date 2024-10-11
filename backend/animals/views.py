from django.shortcuts import get_object_or_404
from rest_framework import generics, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated, IsAdminUser, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from django.contrib.auth import validators, authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import City, Shelter, Species, Animal, Invitation
from .serializers import CitySerializer, ShelterSerializer, SpeciesSerializer, AnimalSerializer, InvitationSerializer
from .permissions import IsAdminOrReadOnly, IsAdminOrOwnerOrReadOnly, IsAdminOrAnimalOwnerOrReadOnly


class InvitationsListCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminUser]

    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer

    # def delete(self, request):
    #     self.queryset.delete()

    #     return Response(status=status.HTTP_200_OK)


class Register(APIView):
    def post(self, request, format=None):
        data = request.data

        verification_code = data.get('verification_code')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if username and password and email:
            verification_object = get_object_or_404(Invitation, code=verification_code)
            if verification_code == verification_object.code and not verification_object.is_used:
                user = User.objects.create_user(username, email, password)
                login(request, user)
                verification_object.is_used = True
                return Response({'detail': 'Registered successfully!'}, status=status.HTTP_201_CREATED )
            else:
                return Response({'detail': 'Wrong or already used verification code.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Please enter all fields.'}, status=status.HTTP_400_BAD_REQUEST)


class CsrfRetrieve(APIView):
    authentication_classes = [SessionAuthentication]
    
    def get(self, request, format=None):
        response = Response({'detail': 'CSRF cookie set'}, status=status.HTTP_200_OK)
        response['X-CSRFToken'] = get_token(request)
        
        return response


class Login(APIView):
    
    def post(self, request, format=None):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            
            if user:
                login(request, user)
                return Response({'detail': 'Logged in successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'detail': 'Incorrect credentials.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'Provide username and password.'}, status=status.HTTP_401_UNAUTHORIZED)


class Logout(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        logout(request)
        
        return Response({'detail': 'Successfully logged out.'}, status=status.HTTP_200_OK)
    

class SessionRetrieve(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):

        return Response({'isAuthenticated': True}, status=status.HTTP_200_OK)


class UsernameRetrieve(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        username = request.user.username
        
        return Response({'username': username}, status=status.HTTP_200_OK)
        


class CityListCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    queryset = City.objects.all()
    serializer_class = CitySerializer
    

class CityRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    queryset = City.objects.all()
    serializer_class = CitySerializer
    lookup_field = "pk"


class ShelterListCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminOrReadOnly]

    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class ShelterRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminOrOwnerOrReadOnly]

    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    lookup_field = "pk"


class SpeciesListCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class SpeciesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminOrOwnerOrReadOnly]

    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer
    lookup_field = "pk"


class AnimalListCreate(generics.ListCreateAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def perform_create(self, serializer):
        shelter = Shelter.objects.get(owner=self.request.user.id)
        serializer.save(shelter=shelter)


class AnimalRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = [IsAdminOrAnimalOwnerOrReadOnly]

    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    lookup_field = "pk"