from django.urls import path
from . import views


urlpatterns = [
    path("city/", views.CityListCreate.as_view(), name='city-view-create'),
    path("shelter/", views.ShelterListCreate.as_view(), name='shelter-view-create'),
    path("species/", views.SpeciesListCreate.as_view(), name='species-view-create'),
    path("animal/", views.AnimalListCreate.as_view(), name='animal-view-create')
]
