# # -*- coding: utf-8 -*-
# from __future__ import unicode_literals
#
# from django.shortcuts import render
#
# # Create your views here.
#
#
# def index(request):
#     return render(request, 'index.html')


# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import logging
import os

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

from django.shortcuts import render


# Create your views here.
class FrontendAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.BASE_DIR, 'fifistudy_web', 'templates', 'index.html')) as f:
                return HttpResponse(f.read())
            # return render(request, 'index.html')
        except Exception:
            print 'test'
            logging.exception('test')
            return HttpResponse(status=501)