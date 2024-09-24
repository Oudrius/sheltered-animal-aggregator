from rest_framework import serializers
from animals.models import City, Shelter, Species, Animal


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        
        model = City
        fields = ['id', 'name']


class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Shelter
        fields = ['id', 'owner', 'name', 'city', 'full_address', 'email', 'phone', 'website']


class SpeciesSerializer(serializers.ModelSerializer):
    class Meta:
        
        model = Species
        fields = ['id', 'name']


class AnimalSerializer(serializers.ModelSerializer):
    shelter = serializers.SlugRelatedField(read_only=True, slug_field='name')
    
    class Meta:
        
        model = Animal
        fields = ['id', 'name', 'age', 'sex', 'special_needs', 'description', 'picture', 'city', 'shelter', 'species']