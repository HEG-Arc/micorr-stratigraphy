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
        return MiCorrService.db.getStratigraphyDetails(stratigraphy)

    def save(self, data):
        return MiCorrService.db.save(data)

    def match(self, data):
        return MiCorrService.db.match(data);

    def deleteStratigrapy(self, stratigraphy):
        return MiCorrService.db.deleteStratigraphy(stratigraphy)

    def addArtefact(self, artefact):
        return MiCorrService.db.addArtefact(artefact)

    def delArtefact(self, artefact):
        return MiCorrService.db.delArtefact(artefact)

    def test(self):
        return MiCorrService.db.test()



