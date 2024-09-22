from django.shortcuts import render
from rest_framework import generics
from .models import City, Shelter, Species, Animal
from .serializers import CitySerializer, ShelterSerializer, SpeciesSerializer, AnimalSerializer


class CityListCreate(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer


class ShelterListCreate(generics.ListCreateAPIView):
    queryset = Shelter.objects.all()
    serializer_class = ShelterSerializer


class SpeciesListCreate(generics.ListCreateAPIView):
    queryset = Species.objects.all()
    serializer_class = SpeciesSerializer


class AnimalListCreate(generics.ListCreateAPIView):
    queryset = Animal.objects.all()
    serializer_class = AnimalSerializer