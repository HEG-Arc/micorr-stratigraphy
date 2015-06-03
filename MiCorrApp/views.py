from django.shortcuts import render
from django.http import HttpResponse
from py2neo import Graph
from py2neo import Node, Relationship
import simplejson as json
from MiCorrApp.ch.hearc.ig.micorr.neo4jDaoImpl.Neo4JDAO import Neo4jDAO
from MiCorrApp.ch.hearc.ig.micorr.service.MiCorrService import MiCorrService
import time


def home(request):
    return render(request, 'index.html', locals())

def test(request):
    print ("HELLO")

    #n4j = Neo4jDAO()
    #print (n4j.addStratigraphy("hello", "stratigraphy100000"))

    ms = MiCorrService()
    ms.getAllCharacteristics()

    #ms = MiCorrService()
    #for strat in ms.getStratigraphyByArtefact("artefact17"):
    #    print (strat.name)



    return render(request, 'test.html', locals())

def getStratigraphyDetails(request, stratigraphy):
    ms = MiCorrService()
    return HttpResponse(json.dumps(ms.getStratigraphyDetails(stratigraphy)), content_type='application/json')

def getallcharacteristic(request):
    ms = MiCorrService()
    return HttpResponse(json.dumps(ms.getAllCharacteristic()), content_type='application/json')

def addStratigraphy(request, artefact, stratigraphy):
    ms = MiCorrService()
    response = {"insertStatus" : ms.addStratigraphy(artefact, stratigraphy)}
    return HttpResponse(json.dumps(response), content_type='application/json')

def stratigraphyExists(request, stratigraphy):
    ms = MiCorrService()
    exists = {"StratigraphyExists" : ms.stratigraphyExists(stratigraphy)}
    return HttpResponse(json.dumps(exists), content_type='application/json')


def getStratigraphyByArtefact(request, artefact):
    ms = MiCorrService()
    strats = {'strats' : []}
    for strat in ms.getStratigraphyByArtefact(artefact):
        strats['strats'].append({'name' : strat.name})
    return HttpResponse(json.dumps(strats), content_type='application/json')

def getallartefacts(request):
    ms = MiCorrService()
    artefacts = {'artefacts' : []}
    for artefact in ms.getAllArtefacts():
        artefacts['artefacts'].append({'name' : artefact.name})
    return HttpResponse(json.dumps(artefacts), content_type='application/json')




