from django.urls import path
from . import views


urlpatterns = [
    path("auth/register/", views.Register.as_view(), name='register'),
    path("auth/invitations/", views.InvitationsListCreate.as_view(), name='invitation-view-create'),
    path("auth/csrf/", views.CsrfRetrieve.as_view(), name='csrf'),
    path("auth/login/", views.Login.as_view(), name='login'),
    path("auth/logout/", views.Logout.as_view(), name='logout'),
    path("auth/session/", views.SessionRetrieve.as_view(), name='session'),
    path("auth/user/", views.UsernameRetrieve.as_view(), name='username'),
    path("cities/", views.CityListCreate.as_view(), name='city-view-create'),
    path("cities/<int:pk>/", views.CityRetrieveUpdateDestroy.as_view(), name='city-retrieve-update-destroy'),
    path("shelters/", views.ShelterListCreate.as_view(), name='shelter-view-create'),
    path("shelters/<int:pk>/", views.ShelterRetrieveUpdateDestroy.as_view(), name='shelter-retrieve-update-destroy'),
    path("species/", views.SpeciesListCreate.as_view(), name='species-view-create'),
    path("species/<int:pk>/", views.SpeciesRetrieveUpdateDestroy.as_view(), name='species-retrieve-update-destroy'),
    path("animals/", views.AnimalListCreate.as_view(), name='animal-view-create'),
    path("animals/<int:pk>/", views.AnimalRetrieveUpdateDestroy.as_view(), name='animal-retrieve-update-destroy')
]
