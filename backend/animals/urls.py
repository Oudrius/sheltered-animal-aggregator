from django.urls import path
from . import views


urlpatterns = [
    path("cities/", views.CityListCreate.as_view(), name='city-view-create'),
    path("city/<int:pk>/", views.CityRetrieveUpdateDestroy.as_view(), name='city-retrieve-update-destroy'),
    path("shelters/", views.ShelterListCreate.as_view(), name='shelter-view-create'),
    path("shelter/<int:pk>/", views.ShelterRetrieveUpdateDestroy.as_view(), name='shelter-retrieve-update-destroy'),
    path("species/", views.SpeciesListCreate.as_view(), name='species-view-create'),
    path("species/<int:pk>/", views.SpeciesRetrieveUpdateDestroy.as_view(), name='species-retrieve-update-destroy'),
    path("animals/", views.AnimalListCreate.as_view(), name='animal-view-create'),
    path("animal/<int:pk>/", views.AnimalRetrieveUpdateDestroy.as_view(), name='animal-retrieve-update-destroy')
]
