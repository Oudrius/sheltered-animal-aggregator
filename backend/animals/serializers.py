from rest_framework import serializers
from animals.models import City, Shelter, Species, Animal, Invitation
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


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


class InvitationSerializer(serializers.ModelSerializer):
    
    class Meta:

        model = Invitation
        fields = ['code', 'is_used', 'created_at']


class RegistrationSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

    class Meta:
        model = User
        fields = ['username', 'password', 'email']
        
        def create(self, validated_data):
            user = User.objects.create_user(**validated_data)
            return user