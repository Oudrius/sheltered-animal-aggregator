from django.shortcuts import render
from rest_framework import generics
from .models import City, Shelter, Species, Animal
from .serializers import CitySerializer, ShelterSerializer, SpeciesSerializer, AnimalSerializer


class CityListCreate(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer