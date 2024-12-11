from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    x_coordinate = models.FloatField()
    y_coordinate = models.FloatField()
    user = models.ForeignKey(  # Reference User.id instead of User.email
        User,
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = 'user_location'
        constraints = [
            models.UniqueConstraint(fields=['user', 'x_coordinate', 'y_coordinate'], name='unique_user_location'),
        ]

    def __str__(self):
        return f"Location({self.user.email}, {self.x_coordinate}, {self.y_coordinate})"

