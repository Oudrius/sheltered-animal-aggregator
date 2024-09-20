from django.db import models

class City(models.Model):
    name = models.CharField()
    
    def __str__(self):
        return self.name


class Shelter(models.Model):
    name = models.CharField()
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    full_address = models.CharField()
    email = models.EmailField()
    phone = models.CharField()
    website = models.URLField(blank=True)
    
    def __str__(self):
        return self.name

class Species(models.Model):
    name = models.CharField()
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
    
class Animal(models.Model):
    name = models.CharField()
    age = models.CharField(blank=True)
    sex = models.CharField(blank=True)
    special_needs = models.CharField(blank=True)
    description = models.TextField(blank=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    