from MiCorrApp.ch.hearc.ig.micorr.neo4jDaoImpl.Neo4JDAO import Neo4jDAO


class MiCorrService:
    db = None
    def __init__(self):
        if MiCorrService.db == None:
            MiCorrService.db = Neo4jDAO()

    def getAllArtefacts(self):
        return MiCorrService.db.getAllArtefacts()

    def getStratigraphyByArtefact(self, artefact):
        return MiCorrService.db.getStratigraphyByArtefact(artefact)

    def stratigraphyExists(self, stratigraphy):
        return MiCorrService.db.stratigraphyExists(stratigraphy)

    def addStratigraphy(self, artefact, stratigraphy):
        return MiCorrService.db.addStratigraphy(artefact, stratigraphy)

    def getAllCharacteristic(self):
        return MiCorrService.db.getAllCharacteristic()

    def getStratigraphyDetails(self, stratigraphy):
        return MiCorrService.db.getStratigraphyDetails(stratigraphy);



