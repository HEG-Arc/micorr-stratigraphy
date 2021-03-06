from py2neo import Graph
import time
from py2neo import Node, Relationship

class Neo4jDAO:
    # Initialisation de la connexion avec le serveur
    def __init__(self):
        #self.url = "http://MiCorr:hmqKUx4ehTQv0M7Z1STc@micorr.sb04.stations.graphenedb.com:24789/db/data/"
        self.url = "http://neo4j:1234@localhost:7474/db/data/"
        self.graph = Graph(self.url)
        self.tx = self.graph.cypher.begin()

    def begin(self):
        self.tx = self.graph.cypher.begin()

    #commit des transaction. Si rien n'est précidé, autocommit
    def commit(self):
        self.tx.process()
        self.tx.commit()

    def rollback(self):
        self.tx.rollback()

    # retourne tous les détails d'une stratigraphie, caractéristiques, sous caractéristiques et interfaces
    # @params le nom de la stratigraphie
    # @returns tous les détails de la stratigraphie voulue
    def getStratigraphyDetails(self, stratigraphy):
        # on retourne c
        c = []

        # on cherche d'abord toutes les strates
        strataList = self.graph.cypher.execute("MATCH (n:Stratigraphy)-[r:POSSESSES]->(d:Strata) where n.uid='" + stratigraphy + "'  RETURN d.uid as uid order by ID(d)")
        print (stratigraphy)

        # pour chaque strates on va faire une requête
        for strata in strataList:
            st = {'name' : strata.uid, 'characteristics' : '', 'subcharacteristics' : '', 'interfaces' : ''}
            print ("***" + strata.uid)

            # Chaque strates a des caractéristiques
            charactList = self.graph.cypher.execute("MATCH (n:Strata)-[r:IS_CONSTITUTED_BY]->(c:Characteristic)-[b:BELONGS_TO]->(f:Family) where n.uid='" + strata.uid + "' RETURN c.uid as uid, f.uid as family")
            print ("======Characteristic")
            clist = []
            for charact in charactList:
                clist.append({'name' : charact.uid, 'family' : charact.family})
                print ("         " + charact.uid)

            # Chaque strate a des sous-caractéristiques
            print ("======subCharacteristic")
            subCharactList = self.graph.cypher.execute("MATCH (s:Strata)-[r:IS_CONSTITUTED_BY]->(c:SubCharacteristic) where s.uid='" + strata.uid + "' RETURN c.uid as uid")
            slist = []
            for subCharact in subCharactList:
                slist.append({'name' : subCharact.uid})
                print("         " + subCharact.uid)

            # Chaque strates a des interfaces
            print("======interface")
            interfaceName = self.graph.cypher.execute("MATCH (s:Strata)-[r:HAS_UPPER_INTERFACE]->(n:Interface) where s.uid='" + strata.uid + "' RETURN n.uid as uid")

            if len(interfaceName) > 0:
                ilist = {'name' : interfaceName[0].uid, 'characteristics' : ''}
                interfaceList = self.graph.cypher.execute("MATCH (s:Strata)-[r:HAS_UPPER_INTERFACE]->(i:Interface) where s.uid='" + strata.uid + "' RETURN i.uid as uid")

                #Chaque interface a des caractéristiques
                intCharactList = self.graph.cypher.execute("MATCH (i:Interface)-[r:IS_CONSTITUTED_BY]->(c:Characteristic)-[b:BELONGS_TO]->(f:Family) where i.uid='" + interfaceName[0].uid + "' RETURN c.uid as uid, f.uid as family")
                iclist = []
                for ic in intCharactList:
                    iclist.append({'name' : ic.uid, 'family' : ic.family})
                    print("            " + ic.uid);

                # on rassemble toutes les données dans c
                ilist['characteristics'] = iclist;
                st['interfaces'] = ilist
            else:
                st['interfaces'] = []

            st['characteristics'] = clist
            st['subcharacteristics'] = slist
            #st['interfaces'] = ilist
            c.append(st)
        return c;

    # retourne la liste de toutes les caractéristiques, sous-caractéristiques et sous-sous-caractéristiques
    # @params
    # @returns toutes les caractéristiques et sous-caractéristiques de la base
    def getAllCharacteristic(self):
        chars = []
        # tout d'abord on cherche les famille
        familyList = self.graph.cypher.execute("MATCH (n:Family) RETURN n.uid as name")
        for family in familyList:
            #pour chaque famille on ajoute les caractéristiques
            caracList = self.graph.cypher.execute("MATCH (a)-[r:BELONGS_TO]->(b) where b.uid = '" + family.name + "' return a.uid as uid, a.description as description order by a.uid asc")
            fam = {'family' : family.name, 'characteristics' : []}
            for carac in caracList:
                # pour chaque caractéristiques on ajoute les sous caractéristiques
                subcaracList = self.graph.cypher.execute("MATCH (a)-[r:HAS_SPECIALIZATION]->(b) where a.uid='" + carac.uid + "' RETURN b.uid as uid, b.description as description order by a.uid asc")

                sc = []
                for subcarac in subcaracList:
                    # pour chaque sous-caractéristique on ajoute les sous-sous caractéristiques
                    subsubcaractList = self.graph.cypher.execute("MATCH (sub:SubCharacteristic)-[:`HAS_SPECIALIZATION`]->(subsub:SubCharacteristic) where sub.uid='" + subcarac.uid + "' RETURN subsub.uid as uid order by subsub.uid asc")

                    subsubcaractItems = []
                    for subsubcarac in subsubcaractList:
                        subsubcaractItems.append({'name' : subsubcarac.uid})

                    ssc = {'name' : subcarac.uid, 'description' : subcarac.description, 'subcharacteristics' : ''}
                    ssc['subcharacteristics'] = subsubcaractItems;
                    sc.append(ssc)


                fam['characteristics'].append({'name' : carac.uid, 'description' : carac.description, 'subcharacteristics' : sc})

            chars.append(fam)

        return chars

    # Ajout d'une stratigraphie
    # @params nom de l'artefact et description de la stratigraphie de la stratigraphie
    # @returns true si ajout, false si refus d'ajout
    def addStratigraphy(self, artefact, stratigraphy):
        self.insertOk = True

        cpt = 1
        name = artefact + "_stratigraphy" + str(cpt)

        while self.stratigraphyExists(name) > 0:
            cpt = cpt + 1
            name = artefact + "_stratigraphy" + str(cpt)

        if self.stratigraphyExists(stratigraphy) > 0:
            self.insertOk = False
        else:
            self.insertOk = True
            self.graph.cypher.execute_one("CREATE(stratigraphy:Stratigraphy{uid:'" + name + "', date:'" + time.strftime("%Y-%m-%d") + "', artefact_uid: '" + artefact + "', label:'stratigraphy', description:'" + stratigraphy + "'})")
            self.graph.cypher.execute_one("MATCH (a:Artefact),(b:Stratigraphy) WHERE a.uid = '" + artefact + "' AND b.uid= '" + name + "' CREATE (a)-[:IS_REPRESENTED_BY]->(b)")

        return self.insertOk

    # retourne la lis de tous les artefacts
    # @params
    # @returns liste de tous les artefacts
    def getAllArtefacts(self):
        return self.graph.cypher.execute("MATCH (p:Artefact) RETURN p.uid AS name order by p.uid")

    # retourne la liste de toutes les stratigraphies pour un artefact
    # @params
    # @returns
    def getStratigraphyByArtefact(self, artefact):
        return self.graph.cypher.execute("MATCH (n:`Artefact`)-[:`IS_REPRESENTED_BY`]->(m) where n.uid='" + artefact + "' RETURN m.uid as name, m.description as description")

    # vérifie si une stratigraphie existe ou pas
    # @params nom de la stratigraphie
    # @returns chiffre > 0 si existe, 0 sinon
    def stratigraphyExists(self, stratigraphy):
        self.strat = self.graph.cypher.execute("match (n:`Stratigraphy`) where n.uid='" + stratigraphy +  "' return n.uid as name")
        return len(self.strat) > 0

    # supprime toutes les strates d'une stratigraphie
    # @params nom de la stratigraphie
    # @returns
    def deleteAllStrataFromAStratigraphy(self, stratigraphy):
        self.query = "MATCH (n:Stratigraphy)-[p:POSSESSES]->(b:Strata)-[h:HAS_UPPER_INTERFACE]->(i:Interface) where n.uid='" + stratigraphy + "' optional match (i)-[x]-() optional match (b)-[y]-() optional match (b)-[z]-()  delete x, y, z, h, p, i, b"
        self.graph.cypher.execute(self.query)

    # supprime une stratigraphie
    # @params nom de la stratigraphie
    # @returns
    def deleteStratigraphy(self, stratigraphy):
        #self.deleteAllStrataFromAStratigraphy(stratigraphy)
        self.query = "match (a:Artefact)-[i:IS_REPRESENTED_BY]->(s:Stratigraphy) where s.uid = '" + stratigraphy + "' optional match (s)-[r]->()  delete i, r, s";
        self.graph.cypher.execute(self.query)
        return {'res' : 1}

    # créé une interface
    # @params nom de la strate et nom de l'interface
    # @returns
    def createInterface(self, strata, interface):
        self.query = "CREATE (interface:Interface {uid:'" + interface + "', date:'" + time.strftime("%Y-%m-%d") + "', strata_uid:'" + strata + "', label:'interface'})"
        self.queryMatch = ("MATCH (a:Strata),(b:Interface) WHERE a.uid = '" + strata + "' AND b.uid= '" + interface + "' CREATE (a)-[:HAS_UPPER_INTERFACE]->(b)")
        self.graph.cypher.execute(self.query)
        self.graph.cypher.execute(self.queryMatch)

    # attache une caractéristique à une interface
    # @params nom de l'interface et nom de la caractéristique
    # @returns
    def attachCharacteristicToInterface(self, interface, characteristic):
        self.query = "MATCH (a:Interface),(b) WHERE a.uid = '" + interface + "' AND b.uid= '" + characteristic + "' CREATE (a)-[r:IS_CONSTITUTED_BY]->(b)"
        self.graph.cypher.execute(self.query)

    # attache une caractéristique,sous-caractéristique à une strate
    # @params nom de la strate etnom de la caractéristique, sous-caractéristique
    # @returns
    def attachCharacteristicToStrata(self, strata, characteristic):
        self.query = "MATCH (a:Strata),(b) WHERE a.uid = '" + strata + "' AND b.uid= '" + characteristic + "' CREATE (a)-[r:IS_CONSTITUTED_BY]->(b)"
        print(self.query)
        self.graph.cypher.execute(self.query)

    # créé une strate
    # @params nom de la strate et nom de la stratigraphie
    # @returns
    def createStrata(self,  strata, stratigraphy):
        self.query = "CREATE(strata:Strata{uid:'" + strata + "',date:'" + time.strftime("%Y-%m-%d") + "',stratigraphy_uid: '" + stratigraphy + "',label:'strata'})"
        self.graph.cypher.execute(self.query)
        self.query = "MATCH (a:Stratigraphy),(b:Strata) WHERE a.uid = '" + stratigraphy + "' AND b.uid= '" + strata + "' CREATE (a)-[:POSSESSES]->(b)"
        self.graph.cypher.execute(self.query)

    # retourne le nombre d'interface pour toutes les strates d'une stratigraphie
    # @params nom de la stratigraphie
    # @returns nombre d'interface pour toutes les strates d'une stratigrpahie
    def getNbInterfaceByStratigraphy(self, stratigraphy):
        self.query = "MATCH (n:Stratigraphy)-[p:POSSESSES]->(s:Strata)-[u:HAS_UPPER_INTERFACE]->(i:Interface) where n.uid='" + stratigraphy + "' RETURN  count(i) as nb"
        return self.graph.cypher.execute(self.query)[0].nb

    # retourne le nombre de strates pour une stratigraphie
    # @params nom de la stratigraphie
    # @returns nombre de strates pour cette stratigraphie
    def getNbStratasByStratigraphy(self, stratigraphy):
        self.query = "MATCH (n:Stratigraphy)-[p:POSSESSES]->(s:Strata) where n.uid='" + stratigraphy + "' RETURN  count(s) as nb"
        return self.graph.cypher.execute(self.query)[0].nb

    # sauvegarde toutes les strates d'une stratigraphie
    # @params détails d'une stratigraphie au format json
    # @returns 1 si ok
    def save(self, data):
        stratigraphyName = data['stratigraphy']

        # on supprime entièrement toutes les strates de l'ancienne stratigraphie pour en créér une nouvelle
        # on fait ça pour partir sur une base vierge et on reconstruit de graphe à chaque sauvegarde
        self.deleteAllStrataFromAStratigraphy(stratigraphyName)

        # on parcourt toutes les strates
        for t in data['stratas']:
            strataName = stratigraphyName + "_Strata" + str(self.getNbStratasByStratigraphy(stratigraphyName) + 1)
            self.createStrata(strataName, stratigraphyName)

            # pour chaque strate on attache une caractéristique ou sous caractéristique
            for c in t['characteristics']:
                if len(c) > 0:
                    self.attachCharacteristicToStrata(strataName, c['name'])

            # pour chaque strate on créé une interface et on y attache des caractéristiques
            interfaceName = strataName + "_interface" + str(self.getNbInterfaceByStratigraphy(stratigraphyName) + 1)
            self.createInterface(strataName, interfaceName)
            for i in t['interfaces']:
                if len(i) > 0:
                    self.attachCharacteristicToInterface(interfaceName, i['name'])

        return {'res' : 1}

    # on créé une requête pour retrouver les artefacts similaires dans la base
    # @params stratigraphie au format json
    # @returns
    def match(self, data):

        # pour ce faire on va construire une requête au format cypher avec les
        # données qu'on a reçu de l'interface angular.
        # les données sont au format json et on les lit.
        # ensuite on créé notre requête cypher
        # pour savoir ce que fait exactement la requête cypher, il faut se réferrer au document de
        # Vincent Rochat sur la création du modèle numérique de MiCorr



        nbStrata = len(data['stratas'])

        listChar = []
        listCharInt = []

        for t in data['stratas']:
            for c in t['characteristics']:
                if len(c) > 0:
                    listChar.append(c['name'])
            for i in t['interfaces']:
                if len(i) > 0:
                    listCharInt.append(i['name'])

        listChar = set(listChar)
        listCharInt = set(listCharInt)

        qry  = "MATCH (a:Artefact)-->(s:Stratigraphy)-->(st:Strata) "

        cpt = 1
        for c in listChar:
            qry += "OPTIONAL MATCH (st)-[:IS_CONSTITUTED_BY]->(m" + str(cpt) + "{uid:'" + c + "'}) "
            cpt += 1

        for c in listCharInt:
            qry += "OPTIONAL MATCH (st)-[:HAS_UPPER_INTERFACE]->(i:Interface)-[:IS_CONSTITUTED_BY]->(m" + str(cpt) + "{uid:'" + c + "'}) "
            cpt += 1

        nbChar = len(listChar) + len(listCharInt)

        qry += "with a.uid as auid,  count(st) as stratum, count(st)-" + str(nbStrata) + " as DiffNombreStratum, "

        qry += "( "
        cpt = 1
        while cpt <= nbChar:
            qry += "sum(m" + str(cpt) + ".comparisonIndicator1) "
            if cpt != nbChar:
                qry += "+ "
            cpt += 1
        qry += ") as TotalComparisonIndicator1, "

        qry += "( "
        cpt = 1
        while cpt <= nbChar:
            qry += "count(m" + str(cpt) + ") "
            if cpt != nbChar:
                qry += "+ "
            cpt += 1
        qry += ") as TotalMatching "

        qry += "MATCH (a:Artefact)-->(s:Stratigraphy)-->(st:Strata)-[r:IS_CONSTITUTED_BY]-(o) WHERE a.uid=auid "
        qry += "with auid, stratum, DiffNombreStratum, TotalComparisonIndicator1, TotalMatching, count(r) as countrelations "
        qry += "MATCH(a:Artefact)-->(s:Stratigraphy)-->(st:Strata)-[:HAS_UPPER_INTERFACE]->(i:Interface)-[r1:IS_CONSTITUTED_BY]->(o1) WHERE a.uid=auid "
        qry += "with auid, stratum, DiffNombreStratum, TotalComparisonIndicator1, TotalMatching, count(r1) + countrelations as TotalRelations "
        qry += "RETURN auid, stratum, DiffNombreStratum, TotalComparisonIndicator1, TotalMatching, TotalRelations, 100*TotalMatching/TotalRelations as Matching100 "
        qry += "ORDER BY Matching100 DESC, TotalComparisonIndicator1 DESC "

        result = []

        res = self.graph.cypher.execute(qry)
        print (qry)
        print (res)

        for i in res:
            line = {'artefact' : '', 'stratum' : '', 'diffnbstratum' : '', 'tci' : '', 'totalmatching' : '', 'totalrelation' : '', 'matching100' : ''}
            line['artefact'] = i['auid']
            line['stratum']  = i['stratum']
            line['diffnbstratum']  = i['DiffNombreStratum']
            line['tci']  = i['TotalComparisonIndicator1']
            line['totalmatching']  = i['TotalMatching']
            line['totalrelation']  = i['TotalRelations']
            line['matching100']  = i['Matching100']
            result.append(line)



        return result

    # Ajout d'un artefact
    # @params nom de l'artefact
    # @returns 0 si pas ok, 1 si ok
    def addArtefact(self, artefact):
        self.query = "MATCH (n:Artefact) where n.uid='" + artefact + "' RETURN count(n.uid) as nb"
        self.nb = self.graph.cypher.execute(self.query)[0].nb


        if self.nb >= 1:
            return {'res' : 0}
        else:
            self.query = "CREATE(artefact:Artefact{uid:'" + artefact + "',date:'" + time.strftime("%Y-%m-%d") + "',label:'artefact'})"
            self.graph.cypher.execute(self.query)
            return {'res' : 1}

    # suppression d'un artefact
    # @params nom de l'artefact
    # @returns
    def delArtefact(self, artefact):
        self.query = "MATCH (a:Artefact)-[r:IS_REPRESENTED_BY]->(s:Stratigraphy) where a.uid='" + artefact + "' RETURN  s.uid as uid"
        listStrat = self.graph.cypher.execute(self.query)
        for strat in listStrat:
            self.deleteStratigraphy(strat.uid)

        self.query = "match (a:Artefact) where a.uid='" + artefact + "' optional match (a)-[x]-() delete x, a"
        self.graph.cypher.execute(self.query)

        return {'res' : 1}

















