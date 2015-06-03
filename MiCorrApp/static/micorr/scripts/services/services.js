angular.module('MiCorr').factory('MiCorrService', function ($http, $q) {
    return{
        sayHello: function(){
            return 'Hello!';
        },
        getAllArtefacts : function(){
            return $http.get('json/getallartefacts').error(function(){
                console.log('Problème de connexion avec le serveur pour récupérer les artefacts');
                alert('Erreur de chargement des artefacts');
            });
        },
        getStratigraphyByArtefact : function(artefact){
            return $http.get('json/getstratsbyartefact/' + artefact).error(function(){
                console.log('Problème de connexion avec le serveur pour récupérer les stratigraphies');
                alert('Erreur de chargement des stratigraphies');
            });
        },
        getDetailedStratigraphy : function(stratigraphy) {
            return $http.get('json/getstratigraphydetails/' + stratigraphy).error(function(){
                console.log('Problème de connexion avec le serveur pour récupérer le détail des stratigraphies');
                alert('Erreur de chargement du détail des stratigraphies');
            });
        },
        stratigraphyExists : function(stratigraphy){
            return $http.get('json/stratigraphyexists/' + stratigraphy).error(function(){
                console.log('Problème de connexion avec le serveur pour voir si la stratigraphie existe');
                alert('Erreur de dialogue avec le serveur');
            });
        },
        addStratigraphy : function(artefact, stratigraphy){
            return $http.get('json/addstratigraphy/' + artefact + '/' + stratigraphy).error(function(){
                console.log('Problème de connexion avec le serveur pour ajouter une stratigraphie');
                alert('Erreur de dialogue avec le serveur');
            });
        },
        getAllCharacteristic : function() {
            return $http.get('json/getallcharacteristic').error(function(){
                console.log('Problème de connexion avec le serveur pour charger les caractéristiques');
                alert('Erreur de chargement des caractéristiques');
            });
        }
    }
});

angular.module('MiCorr').factory('StrataData', function () {
    var selectedStrata = 0;

    var rstratas         = [];

    var shapeFamily      = [];
    var widthFamily      = [];
    var thicknessFamily  = [];
    var continuityFamily = [];
    var directionFamily  = [];
    var colourFamily     = [];
    var brightnessFamily = [];
    var opacityFamily    = [];
    var magnetismFamily  = [];
    var porosityFamily   = [];
    var cohesionFamily   = [];
    var hardnessFamily   = [];
    var crackingFamily   = [];
    var scompositionFamily   = [];
    var nmmcompositionFamily = [];
    var dcompositionFamily   = [];
    var pomcompositionFamily = [];
    var cpcompositionFamily  = [];
    var cmcompositionFamily  = [];
    var mcompositionFamily   = [];
    var cprimicrostructureFamily  = [];
    var mmicrostructureFamily     = [];
    var interfaceprofileFamily    = [];
    var interfacetransitionFamily = [];
    var interfaceroughnessFamily  = [];
    var interfaceadherenceFamily  = [];

    return {
        clear : function(){
            selectedStrata = 0;
            rstratas = new Array();
            namesStratas = new Array();;
        },
        getCurrentStrata : function() {
            if (rstratas.length == 0)
                return new Strata();
            return rstratas[selectedStrata];
        },
        setSelectedStrata : function(i) {
            this.selectedStrata = i;
        },
        getCurrentSelectedStrata : function() {
            return this.selectedStrata;
        },
        getStratas : function() {
            return rstratas;
        },
        pushOneStrata : function(strata) {
            rstratas.push(strata);
        },
        swapTwoStratas : function(index1, index2) {
            var temp;
            temp = rstratas[index1];
            rstratas[index1] = rstratas[index2];
            rstratas[index2] = temp;
        },

        setInterfaceadherenceFamily : function(interfaceadherenceFamily) {
            this.interfaceadherenceFamily = interfaceadherenceFamily;
        },
        getInterfaceadherenceFamily : function () {
            return this.interfaceadherenceFamily;
        },
        setInterfaceroughnessFamily : function(interfaceroughnessFamily) {
            this.interfaceroughnessFamily = interfaceroughnessFamily;
        },
        getInterfaceroughnessFamily : function() {
            return this.interfaceroughnessFamily;
        },
        setInterfacetransitionFamily : function(interfacetransitionFamily) {
            this.interfacetransitionFamily = interfacetransitionFamily;
        },
        getInterfacetransitionFamily : function() {
            return this.interfacetransitionFamily;
        },
        setInterfaceprofileFamily : function(interfaceprofileFamily) {
            this.interfaceprofileFamily = interfaceprofileFamily;
        },
        getInterfaceprofileFamily : function() {
            return this.interfaceprofileFamily;
        },
        setMcompositionFamily : function(mcompositionFamily) {
            this.mcompositionFamily = mcompositionFamily;
        },
        getMcompositionFamily : function () {
            return this.mcompositionFamily;
        },
        setCmcompositionFamily : function(cmcompositionFamily) {
            this.cmcompositionFamily = cmcompositionFamily;
        },
        getCmcompositionFamily : function() {
            return this.cmcompositionFamily;
        },
        getCpcompositionFamily : function() {
            return this.cpcompositionFamily;
        },
        setCpcompositionFamily : function(cpcompositionFamily) {
            this.cpcompositionFamily = cpcompositionFamily;
        },
        setPomcompositionFamily : function (pomcompositionFamily){
            this.pomcompositionFamily = pomcompositionFamily;
        },
        getPomcompositionFamily : function(){
            return this.pomcompositionFamily;
        },
        setDcompositionFamily : function (dcompositionFamily){
            this.dcompositionFamily = dcompositionFamily;
        },
        getDcompositionFamily : function() {
            return this.dcompositionFamily;
        },
        setNmmCompositionFamily : function (nmmcompositionFamily){
            this.nmmcompositionFamily = nmmcompositionFamily;
        },
        getNmmcompositionFamily : function() {
            return this.nmmcompositionFamily;
        },
        setScompositionFamily : function (scompositionFamily){
            this.scompositionFamily = scompositionFamily;
        },
        getScompositionFamily : function() {
            return this.scompositionFamily;
        },
        getCrackingFamily : function() {
            return this.crackingFamily;
        },
        setCrackingFamily : function(crackingFamily) {
            this.crackingFamily = crackingFamily;
        },
        getHardnessFamily : function() {
            return this.hardnessFamily;
        },
        setHardnessFamily : function (hardnessFamily){
            this.hardnessFamily = hardnessFamily;
        },
        setCohesionFamily : function(cohesionFamily) {
            this.cohesionFamily = cohesionFamily;
        },
        getCohesionFamily : function() {
            return this.cohesionFamily;
        },
        setMmicrostructureFamily : function(mmicrostructureFamily) {
            this.mmicrostructureFamily = mmicrostructureFamily;
        },
        getMmicrostructureFamily : function() {
            return this.mmicrostructureFamily;
        },
        setCprimicrostructureFamily : function(cprimicrostructureFamily) {
            this.cprimicrostructureFamily = cprimicrostructureFamily;
        },
        getCprimicrostructureFamily : function() {
            return this.cprimicrostructureFamily;
        },
        getPorosityFamily : function() {
            return this.porosityFamily;
        },
        setPorosityFamily : function(porosityFamily) {
            this.porosityFamily = porosityFamily;
        },
        getMagnetismFamily : function() {
            return this.magnetismFamily;
        },
        setMagnetismFamily : function(magnetismFamily){
            this.magnetismFamily = magnetismFamily;
        },
        getOpacityFamily : function() {
            return this.opacityFamily;
        },
        setOpacityFamily : function(opacityFamily){
            this.opacityFamily = opacityFamily;
        },
        setBrightnessFamily : function(brightnessFamily) {
            this.brightnessFamily = brightnessFamily;
        },
        getBrightnessFamily : function(){
            return this.brightnessFamily;
        },
        getColourFamily : function() {
            return this.colourFamily;
        },
        setColourFamily : function(colourFamily){
            this.colourFamily = colourFamily;
        },
        setShapeFamily : function(shapeFamily) {
            this.shapeFamily = shapeFamily;
        },
        getShapeFamily : function(){
            return this.shapeFamily;
        },
        setWidthFamily : function(widthFamily) {
            this.widthFamily = widthFamily;
        },
        getWidthFamily : function(){
            return this.widthFamily;
        },
        setThicknessFamily : function(thicknessFamily) {
            this.thicknessFamily = thicknessFamily;
        },
        getThicknessFamily : function() {
            return this.thicknessFamily;
        },
        setContinuityFamily : function(continuityFamily) {
            this.continuityFamily = continuityFamily;
        },
        getContinuityFamily : function() {
            return this.continuityFamily;
        },
        setDirectionFamily : function(directionFamily) {
            this.directionFamily = directionFamily;
        },
        getDirectionFamily : function(){
            return this.directionFamily;
        }
    }
});




