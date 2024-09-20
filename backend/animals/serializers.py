from rest_framework import serializers
from animals.models import City, Shelter, Species, Animal


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ['name']


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = ['name', 'city', 'full_address', 'email', 'phone', 'website']


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Species
        fields = ['name', 'city', 'shelter']


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Animal
        fields = ['name', 'age', 'sex', 'special_needs', 'description', 'city', 'shelter', 'species']