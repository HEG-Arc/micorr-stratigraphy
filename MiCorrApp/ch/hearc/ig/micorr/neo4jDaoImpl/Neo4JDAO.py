from py2neo import Graph
import time
from py2neo import Node, Relationship

class Neo4jDAO:
    def __init__(self):
        #self.url = "http://MiCorr:hmqKUx4ehTQv0M7Z1STc@micorr.sb04.stations.graphenedb.com:24789/db/data/"
        self.url = "http://neo4j:1234@localhost:7474/db/data/"
        self.graph = Graph(self.url)
        self.tx = self.graph.cypher.begin()

    def commit(self):
        self.tx.process()
        self.tx.commit()

    def rollback(self):
        self.tx.rollback()

    def getStratigraphyDetails(self, stratigraphy):
        c = []
        strataList = self.graph.cypher.execute("MATCH (n:Stratigraphy)-[r:POSSESSES]->(d:Strata) where n.uid='" + stratigraphy + "'  RETURN d.uid as uid")
        print (stratigraphy)
        for strata in strataList:
            st = {'name' : strata.uid, 'characteristics' : '', 'subcharacteristics' : '', 'interfaces' : ''}
            print ("***" + strata.uid)
            charactList = self.graph.cypher.execute("MATCH (n:Strata)-[r:IS_CONSTITUTED_BY]->(c:Characteristic)-[b:BELONGS_TO]->(f:Family) where n.uid='" + strata.uid + "' RETURN c.uid as uid, f.uid as family")
            print ("======Characteristic")
            clist = []
            for charact in charactList:
                clist.append({'name' : charact.uid, 'family' : charact.family})
                print ("         " + charact.uid)

            print ("======subCharacteristic")
            subCharactList = self.graph.cypher.execute("MATCH (s:Strata)-[r:IS_CONSTITUTED_BY]->(c:SubCharacteristic) where s.uid='" + strata.uid + "' RETURN c.uid as uid")
            slist = []
            for subCharact in subCharactList:
                slist.append({'name' : subCharact.uid})
                print("         " + subCharact.uid)

            print("======interface")
            interfaceList = self.graph.cypher.execute("MATCH (s:Strata)-[r:HAS_UPPER_INTERFACE]->(i:Interface) where s.uid='" + strata.uid + "' RETURN i.uid as uid")
            ilist = []
            for interface in interfaceList:
                ilist = {'name' : interface.uid, 'characteristics' : ''}
                print("         " + interface.uid)
                intCharactList = self.graph.cypher.execute("MATCH (i:Interface)-[r:IS_CONSTITUTED_BY]->(c:Characteristic)-[b:BELONGS_TO]->(f:Family) where i.uid='" + interface.uid + "' RETURN c.uid as uid, f.uid as family")
                iclist = []
                for ic in intCharactList:
                    iclist.append({'name' : ic.uid, 'family' : ic.family})
                    print("            " + ic.uid);

            ilist['characteristics'] = iclist;

            st['characteristics'] = clist
            st['subcharacteristics'] = slist
            st['interfaces'] = ilist
            c.append(st)
        return c;

    def getAllCharacteristic(self):
        chars = []
        familyList = self.graph.cypher.execute("MATCH (n:Family) RETURN n.uid as name")
        for family in familyList:
            caracList = self.graph.cypher.execute("MATCH (a)-[r:BELONGS_TO]->(b) where b.uid = '" + family.name + "' return a.uid as uid, a.description as description")
            fam = {'family' : family.name, 'characteristics' : []}
            for carac in caracList:
                subcaracList = self.graph.cypher.execute("MATCH (a)-[r:HAS_SPECIALIZATION]->(b) where a.uid='" + carac.uid + "' RETURN b.uid as uid, b.description as description")

                sc = []
                for subcarac in subcaracList:
                    sc.append({'name' : subcarac.uid, 'description' : subcarac.description})


                fam['characteristics'].append({'name' : carac.uid, 'description' : carac.description, 'subcharacteristics' : sc})

            chars.append(fam)

        return chars


    def addStratigraphy(self, artefact, stratigraphy):
        self.insertOk = True

        if self.stratigraphyExists(stratigraphy) > 0:
            self.insertOk = False
        else:
            self.insertOk = True
            self.graph.cypher.execute_one("CREATE(stratigraphy:Stratigraphy{uid:'" + stratigraphy + "', date:'" + time.strftime("%Y-%m-%d") + "', artefact_uid: '" + artefact + "', label:'stratigraphy'})")
            self.graph.cypher.execute_one("MATCH (a:Artefact),(b:Stratigraphy) WHERE a.uid = '" + artefact + "' AND b.uid= '" + stratigraphy + "' CREATE (a)-[:IS_REPRESENTED_BY]->(b)")

        return self.insertOk


    def getAllArtefacts(self):
        return self.graph.cypher.execute("MATCH (p:Artefact) RETURN p.uid AS name")

    def getStratigraphyByArtefact(self, artefact):
        return self.graph.cypher.execute("MATCH (n:`Artefact`)-[:`IS_REPRESENTED_BY`]->(m) where n.uid='" + artefact + "' RETURN m.uid as name")

    def stratigraphyExists(self, stratigraphy):
        self.strat = self.graph.cypher.execute("match (n:`Stratigraphy`) where n.uid='" + stratigraphy +  "' return n.uid as name")
        return len(self.strat) > 0


