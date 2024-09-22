from rest_framework import serializers
from animals.models import City, Shelter, Species, Animal


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        id = serializers.ReadOnlyField()
        
        model = City
        fields = ['id', 'name']


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        id = serializers.ReadOnlyField()
        
        model = Shelter
        fields = ['id', 'name', 'city', 'full_address', 'email', 'phone', 'website']


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        id = serializers.ReadOnlyField()
        
        model = Species
        fields = ['id', 'name', 'city', 'shelter']


class AnimalSerializer(serializers.ModelSerializer):
    class Meta:
        id = serializers.ReadOnlyField()
        
        model = Animal
        fields = ['id', 'name', 'age', 'sex', 'special_needs', 'description', 'city', 'shelter', 'species']