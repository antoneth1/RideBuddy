from django.shortcuts import render
from django.http import HttpResponse

def say_hello(request):
    return HttpResponse('Hello World')


# Create your views here.
# request -> response
# request handler
# action (view in Djago, equivalent is template)