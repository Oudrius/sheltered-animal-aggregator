from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.middleware.csrf import get_token
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie
from .models import City, Shelter, Species, Animal, Invitation
from .serializers import CitySerializer, ShelterSerializer, SpeciesSerializer, AnimalSerializer, InvitationSerializer


class InvitationsListCreate(generics.ListCreateAPIView):
    queryset = Invitation.objects.all()
    serializer_class = InvitationSerializer

    def delete(self, request):
        self.queryset.delete()

        return Response(status=200)


class Register(APIView):
    def post(self, request, format=None):
        data = request.data

        verification_code = data.get('verification_code')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        verification_object = get_object_or_404(Invitation, code=verification_code)
        if verification_code == verification_object.code and not verification_object.is_used:
            user = User.objects.create_user(username, email, password)
            login(request, user)
            verification_object.is_used = True
            return Response({'detail': 'Registered successfully!'}, status=200 )
        else:
            return Response({'detail': 'Wrong or already used verification code.'}, status=400)


class CsrfRetrieve(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    
    def get(self, request, format=None):
        response = Response({'detail': 'CSRF cookie set'}, status=200)
        response['X-CSRFToken'] = get_token(request)
        
        return response


class Login(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    
    def post(self, request, format=None):
        data = request.data
        username = data.get('username')
        password = data.get('password')
        
        if username and password:
            user = authenticate(username=username, password=password)
            
            if user:
                login(request, user)
                return Response({'detail': 'Logged in successfully.'}, status=200)
            else:
                return Response({'detail': 'Incorrect credentials.'}, status=400)
        else:
            return Response({'detail': 'Provide username and password.'}, status=400)


class Logout(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format=None):
        logout(request)
        
        return Response({'detail': 'Successfully logged out.'}, status=200)
    

class SessionRetrieve(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):

        return Response({'isAuthenticated': True}, status=200)


class UsernameRetrieve(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        username = request.user.username
        
        return Response({'username': username}, status=200)
        


class CityListCreate(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    

class CityRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer
    lookup_field = "pk"


class ShelterListCreate(generics.ListCreateAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class ShelterRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer
    lookup_field = "pk"


class SpeciesListCreate(generics.ListCreateAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class SpeciesRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer
    lookup_field = "pk"


class AnimalListCreate(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer

    def perform_create(self, serializer):
        shelter = Shelter.objects.get(owner=self.request.user.id)
        serializer.save(shelter=shelter)


class AnimalRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer
    lookup_field = "pk"