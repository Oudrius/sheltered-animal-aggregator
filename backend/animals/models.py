from django.db import models

class City(models.Model):
    name = models.CharField()
    
    def __str__(self):
        return self.name


class Shelter(models.Model):
    owner = models.ForeignKey('auth.User', related_name='owner', on_delete=models.CASCADE, default = 1)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    name = models.CharField()
    full_address = models.CharField()
    email = models.EmailField()
    phone = models.CharField()
    website = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Species(models.Model):
    name = models.CharField()
    
    def __str__(self):
        return self.name
    
    
class Animal(models.Model):
    name = models.CharField()
    age = models.CharField(blank=True)
    sex = models.CharField(max_length=6, choices={
        'male': 'Patinas',
        'female': 'Patelė'
    })
    special_needs = models.CharField(blank=True)
    description = models.TextField(blank=True)
    picture = models.ImageField(upload_to='images/')
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
    @property
    def city(self):
        return self.shelter.city.name
    