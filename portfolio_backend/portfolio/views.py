from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Profile, BlogPost, Contact, Portfolio, Service
from .serializers import (
    ProfileSerializer,
    BlogPostSerializer,
    ContactSerializer,
    PortfolioSerializer,
    ServiceSerializer,
)
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

#logger = logging.getLogger(__name__)

# Profile Views
@api_view(['GET'])
def profile_detail(request):
    profile = Profile.objects.first()  # .fist because i only have one profile.
    if profile:
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)
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
@csrf_exempt  # CSRF exemption for demonstration. Should use CSRF token in production
def send_contact_email(request):
    name = request.data.get('name')
    email = request.data.get('email')
    message = request.data.get('message')

    # Validate input data
    if not name or not email or not message:
        return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

    email_subject = f"New Contact Form Submission from {name}"
    email_message = f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}"
    print(email)
    try:
        # Send email
        send_mail(
            subject=email_subject,
            message=email_message,
            from_email=settings.EMAIL_HOST_USER,  # Your email in settings
            recipient_list=[settings.EMAIL_HOST_USER],  # Recipient list (your email)
            fail_silently=False,
            #reply_to=[email], 
        )
        return Response({"success": "Email sent successfully"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
