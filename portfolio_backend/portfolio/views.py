from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Profile, BlogPost, Contact, Portfolio, Service, User
from .serializers import (
    ProfileSerializer,
    BlogPostSerializer,
    ContactSerializer,
    PortfolioSerializer,
    ServiceSerializer,
)
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
#from rest_framework.parsers import MultiPartParser, FormParser
#from django.http import JsonRespons


#logger = logging.getLogger(__name__)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([AllowAny])
def login_view(request):
    if request.method != "POST":
        return Response({'errors': "Method not allowed."}, status=405)
    
    data = json.loads(request.body)
    username = data.get("username", "")
    password = data.get("password", "")

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'Invalid username or password'}, status=401)

    user = authenticate(request, username=user.username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        login(request, user)
        response = {
            'token': token.key, 
            'message': f"You are now logged in as {username}.",
            'username': username
        }
        return Response(response, status=200)
    else:
        return Response({'error': 'Invalid username or password'}, status=401)

                    
"""                   
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])      
def logout_view(request):
    Token.objects.filter(user=request.user).delete()
    return JsonResponse({'message': 'User logged out successfully'})
"""


# Profile Views
@api_view(['GET'])
def profile_detail(request):
    profile = Profile.objects.first()  # .fist because i only have one profile.
    if profile:
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
    return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

#@csrf_exempt  # Add this decorator temporarily for testing
@api_view(['PUT'])
#@permission_classes([IsAuthenticated])
def edit_profile(request):
    try:
        profile = Profile.objects.first()  # Becacuse i only have  one profile instance
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Profile.DoesNotExist:
        return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)


# BlogPost Views
@api_view(['GET'])
def blogpost_list(request):
    posts = BlogPost.objects.all()
    serializer = BlogPostSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def blogpost_detail(request, pk):
    post = get_object_or_404(BlogPost, pk=pk)
    serializer = BlogPostSerializer(post)
    print(post.created_at)
    #print(serializer.data.created_at)
    return Response(serializer.data)

# Contact Views
@api_view(['POST'])
def contact_create(request):
    if request.method == 'POST':
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Portfolio Views
@api_view(['GET'])
def portfolio_list(request):
    portfolios = Portfolio.objects.all()
    serializer = PortfolioSerializer(portfolios, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def portfolio_detail(request, pk):
    portfolio = get_object_or_404(Portfolio, pk=pk)
    serializer = PortfolioSerializer(portfolio)
    return Response(serializer.data)

# Service Views
@api_view(['GET'])
def service_list(request):
    services = Service.objects.all()
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def service_detail(request, pk):
    service = get_object_or_404(Service, pk=pk)
    serializer = ServiceSerializer(service)
    return Response(serializer.data)


@api_view(['POST'])
def send_contact_email(request):
    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')

    if not name or not email or not message:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    email_subject = f"New Contact Form Submission from {name}"
    email_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"

    try:
        send_mail(
            subject=email_subject,
            message=email_message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[settings.EMAIL_HOST_USER],
            fail_silently=False,
        )
        return Response({"success": "Email sent successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        error_message = f"Error sending email: {str(e)}"
        print(error_message)  # Console log for development
        return Response({"error": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def create_portfolio(request):
    serializer = PortfolioSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print("Errors:", serializer.errors)  # Log validation errors
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_portfolio(request, pk):
    try:
        portfolio = Portfolio.objects.get(pk=pk)
        portfolio.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Portfolio.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def create_blog(request):
    serializer = BlogPostSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)  # Print validation errors to console
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_blog(request, pk):
    try:
        blog_post = BlogPost.objects.get(pk=pk)
        blog_post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
        
@api_view(['POST'])
def create_service(request):
    if request.method == 'POST':
        serializer = ServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
