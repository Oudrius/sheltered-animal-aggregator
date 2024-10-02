from django.db import models

class City(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name


class Shelter(models.Model):
    owner = models.ForeignKey('auth.User', related_name='owner', on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    name = models.CharField(max_length=254)
    full_address = models.CharField(max_length=254)
    email = models.EmailField()
    phone = models.CharField(max_length=30)
    website = models.URLField(blank=True, null=True, max_length=100)
    
    def __str__(self):
        return self.name

class Species(models.Model):
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    
class Animal(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(blank=True, null=True)
    sex = models.CharField(max_length=6, choices=(
        ('male', 'Patinas'),
        ('female', 'Patelė')
    ))
    special_needs = models.CharField(blank=True, null=True, max_length=254)
    description = models.TextField(blank=True, null=True)
    picture = models.ImageField(upload_to='images/', blank=True, null=True)
    shelter = models.ForeignKey(Shelter, on_delete=models.CASCADE)
    species = models.ForeignKey(Species, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name
    
    @property
    def city(self):
        return self.shelter.city.name


class Invitation(models.Model):
    code = models.CharField(max_length=20, primary_key=True)
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.code