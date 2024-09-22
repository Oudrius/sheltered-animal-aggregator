from django.urls import path
from . import views


urlpatterns = [
    path("city/", views.CityListCreate.as_view(), name='city-view-create')
]
