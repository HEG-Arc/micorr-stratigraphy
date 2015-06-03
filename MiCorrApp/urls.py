from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url(r'^$', 'MiCorrApp.views.home'),
    url(r'^test$', 'MiCorrApp.views.test'),
    url(r'^json/getallartefacts$', 'MiCorrApp.views.getallartefacts'),
    url(r'^json/getallcharacteristic$', 'MiCorrApp.views.getallcharacteristic'),
    url(r'^json/getstratsbyartefact/(?P<artefact>\w+)$', 'MiCorrApp.views.getStratigraphyByArtefact'),
    url(r'^json/getstratigraphydetails/(?P<stratigraphy>\w+)$', 'MiCorrApp.views.getStratigraphyDetails'),
    url(r'^json/stratigraphyexists/(?P<stratigraphy>\w+)$', 'MiCorrApp.views.stratigraphyExists'),
    url(r'^json/addstratigraphy/(?P<artefact>\w+)/(?P<stratigraphy>\w+)$', 'MiCorrApp.views.addStratigraphy'),
)
