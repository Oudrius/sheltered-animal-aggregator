from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    The request is authenticated as an admin, or is a read-only request.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff

class IsAdminOrOwnerOrReadOnly(permissions.BasePermission):
    """
    The request is authenticated as an admin or shelter owner, or is a read-only request.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff or obj.owner == request.user
    

class IsAdminOrAnimalOwnerOrReadOnly(permissions.BasePermission):
    """
    The request is authenticated as an admin or animal instance's shelter owner, or is a read-only request.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff or obj.shelter.owner == request.user