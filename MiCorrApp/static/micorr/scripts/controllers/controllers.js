angular.module('MiCorr', ['ngRoute', 'ngResource', 'ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/artefact/:name', {
            templateUrl: '../static/micorr/views/artefact.html',
            controller: 'showArtefact'
        }).
        when('/artefact/:artefact/:strat/', {
            templateUrl: '../static/micorr/views/strat.html'
        }).
        otherwise({
            redirectTo: '/',
            templateUrl: '../static/micorr/views/listartefacts.html',
            controller: 'listArtefacts'
        });
}]);

angular.module('MiCorr').controller('showStrat', function ($scope, $routeParams, $timeout, MiCorrService, StrataData) {
    StrataData.clear();

    $scope.artefactName     = $routeParams.artefact;
    $scope.stratigraphyName = $routeParams.strat;
    $scope.rstratas         = StrataData.getStratas();
    $scope.natures          = natures;
    $scope.strataName       = "No strata selected";
    $scope.natureFamilyname = "";

    $scope.showTabForms = false;
    $scope.showColor = false;
    $scope.showBrightness = false;
    $scope.showOpacity = false;
    $scope.showMagnetism = false;
    $scope.showPorosity = false;
    $scope.showcprimicrostructureFamily = false;
    $scope.showmmicrostructureFamily = false;
    $scope.showCohesion = false;
    $scope.showHardness = false;
    $scope.showCracking = false;
    $scope.showScomposition = false;
    $scope.showNmmcomposition = false;
    $scope.showDcomposition = false;
    $scope.showPomcomposition = false;
    $scope.showCpcomposition = false;
    $scope.showCmcomposition = false;
    $scope.showMcomposition = false;
    $scope.showinterfacetransition = false;
    $scope.showinterfaceroughness = false;
    $scope.showinterfaceadherence = false;

    MiCorrService.getDetailedStratigraphy($scope.stratigraphyName).success(function(data){
        for (var i = 0; i < data.length; i++) {
            var loadedStrata = data[i];
            if (loadedStrata['characteristics'].length == 0){
                console.log("Can not load this strata. Probably this strata has no natureFamily characteristics !");
                alert("Error : Strata '" + loadedStrata.name + "' has no nature characteristics. This strata can not be loaded !");
            }
            else {
                var strata = natureFactory($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "natureFamily"));
                strata.setName(loadedStrata.name);
                strata.setShapeFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "shapeFamily"));
                strata.setWidthFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "widthFamily"));
                strata.setThicknessFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "thicknessFamily"));
                strata.setContinuityFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "continuityFamily"));
                strata.setDirectionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "directionFamily"));

                if (strata.findDependency('colourFamily'))
                    strata.setColourFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "colourFamily"));
                if (strata.findDependency('brightnessFamily'))
                    strata.setBrightnessFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "brightnessFamily"));
                if (strata.findDependency('opacityFamily'))
                    strata.setOpacityFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "opacityFamily"));
                if (strata.findDependency('magnetismFamily'))
                    strata.setMagnetismFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "magnetismFamily"));
                if (strata.findDependency('porosityFamily'))
                    strata.setPorosityFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "porosityFamily"));
                if (strata.findDependency('cprimicrostructureFamily'))
                    strata.setCpriMicrostructureFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "cpriMicrostructureFamily"));
                if (strata.findDependency('mmicrostructureFamily'))
                    strata.setMmicrostructureFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "mMicrostructureFamily"));
                if (strata.findDependency('cohesionFamily'))
                    strata.setCohesionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "cohesionFamily"));
                if (strata.findDependency('hardnessFamily'))
                    strata.setHardnessFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "hardnessFamily"));
                if (strata.findDependency('crackingFamily'))
                    strata.setCrackingFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "crackingFamily"));
                if (strata.findDependency('scompositionFamily'))
                    strata.setScompositionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "sCompositionFamily"));
                if (strata.findDependency('nmmcompositionFamily'))
                    strata.setNmmCompositionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "nmmCompositionFamily"));
                if (strata.findDependency('dcompositionFamily'))
                    strata.setDcompositionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "dCompositionFamily"));
                if (strata.findDependency('pomcompositionFamily'))
                    strata.setPomCompositionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "pomCompositionFamily"));
                if (strata.findDependency('cpcompositionFamily'))
                    strata.setCpcompositionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "cpCompositionFamily"));
                if (strata.findDependency('cmcompositionFamily'))
                    strata.setCmcompositionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "cmCompositionFamily"));
                if (strata.findDependency('mcompositionFamily'))
                    strata.setMcompositionFamily($scope.getCharacteristicByFamily(loadedStrata['characteristics'], "mCompositionFamily"));

                strata.setInterfaceprofileFamily($scope.getCharacteristicByFamily(loadedStrata['interfaces']['characteristics'], "interfaceProfileFamily"));
                if (strata.findDependency('interfacetransitionFamily'))
                    strata.setInterfacetransitionFamily($scope.getCharacteristicByFamily(loadedStrata['interfaces']['characteristics'], "interfaceTransitionFamily"));
                if (strata.findDependency('interfaceroughnessFamily'))
                    strata.setInterfaceroughnessFamily($scope.getCharacteristicByFamily(loadedStrata['interfaces']['characteristics'], "interfaceRoughnessFamily"));
                if (strata.findDependency('interfaceadherenceFamily'))
                    strata.setInterfaceadherenceFamily($scope.getCharacteristicByFamily(loadedStrata['interfaces']['characteristics'], "interfaceAdherenceFamily"));

                StrataData.pushOneStrata(strata);
            }
        }});

    $scope.getCharacteristicByFamily = function(data, family) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].family == family){
                return data[i].name;
            }
        }
        return "";
    }

    $scope.$on('doUpdate', function(event, index){
        $timeout(function(){
            $scope.update(index);
        });
    });

    $scope.update = function(index){
        $scope.showTabForms = true;
        StrataData.setSelectedStrata(index);
        $scope.hideShowForms(StrataData.getStratas()[index]);
        $scope.strataName = StrataData.getStratas()[index].getName();
        $scope.natureFamilyname = StrataData.getStratas()[index].getNatureFamily();

        //var t = StrataData.getStratas()[index];

        $scope.$broadcast('updateMorphology');
        $scope.$broadcast('updateTexture');
        $scope.$broadcast('updateMicrostructure');
        $scope.$broadcast('updateComposition');
        $scope.$broadcast('updateInterface');

        $scope.$apply();
    }

    $scope.hideShowForms = function(strata) {
        $scope.showColor = strata.findDependency('colourFamily');
        $scope.showBrightness = strata.findDependency('brightnessFamily');
        $scope.showOpacity = strata.findDependency('opacityFamily');
        $scope.showMagnetism = strata.findDependency('magnetismFamily');
        $scope.showPorosity = strata.findDependency('porosityFamily');
        $scope.showcprimicrostructureFamily = strata.findDependency('cprimicrostructureFamily');
        $scope.showmmicrostructureFamily = strata.findDependency('mmicrostructureFamily');
        $scope.showCohesion = strata.findDependency('cohesionFamily');
        $scope.showHardness = strata.findDependency('hardnessFamily');
        $scope.showCracking = strata.findDependency('crackingFamily');
        $scope.showScomposition = strata.findDependency('scompositionFamily');
        $scope.showNmmcomposition = strata.findDependency('nmmcompositionFamily');
        $scope.showDcomposition =  strata.findDependency('dcompositionFamily');
        $scope.showPomcomposition = strata.findDependency('pomcompositionFamily');
        $scope.showCpcomposition = strata.findDependency('cpcompositionFamily');
        $scope.showCmcomposition = strata.findDependency('cmcompositionFamily');
        $scope.showMcomposition = strata.findDependency('mcompositionFamily');
        $scope.showinterfacetransition = strata.findDependency('interfacetransitionFamily');
        $scope.showinterfaceroughness = strata.findDependency('interfaceroughnessFamily');
        $scope.showinterfaceadherence = strata.findDependency('interfaceadherenceFamily');
    }

    $scope.$on('updateDraw', function() {
        $timeout(function(){
            $scope.rstratas = new Array();
            $scope.$apply();
            $scope.rstratas = StrataData.getStratas();
            $scope.$apply();
        });
    });


}).controller('tabsStrata', function ($scope, $route, $window, MiCorrService, StrataData) {
    $scope.movestrataup = function() {
        var current = parseInt(StrataData.getCurrentSelectedStrata());
        if (current > 0) {
            //StrataData.setSelectedStrata(current - 1);
            StrataData.swapTwoStratas(current, current - 1);
            $scope.$emit('doUpdate', current - 1);
            $scope.$emit('updateDraw');
        }
    };

    $scope.movestratadown = function() {
        var current = parseInt(StrataData.getCurrentSelectedStrata());
        if (parseInt(StrataData.getCurrentSelectedStrata()) + 1 < StrataData.getStratas().length){
            StrataData.swapTwoStratas(current, current + 1);
            $scope.$emit('doUpdate', current + 1);
            $scope.$emit('updateDraw', current + 1);
        }
    };
}).controller('stratMorphologyCtrl', function ($scope, $route, $window, StrataData) {
    $scope.fShapeFamily     = "";
    $scope.shapeFamily      = StrataData.getShapeFamily()['characteristics'];
    $scope.widthFamily      = StrataData.getWidthFamily()['characteristics'];
    $scope.thicknessFamily  = StrataData.getThicknessFamily()['characteristics'];
    $scope.continuityFamily = StrataData.getContinuityFamily()['characteristics'];
    $scope.directionFamily  = StrataData.getDirectionFamily()['characteristics'];
    $scope.colourFamily     = StrataData.getColourFamily()['characteristics'];
    $scope.brightnessFamily = StrataData.getBrightnessFamily()['characteristics'];
    $scope.opacityFamily    = StrataData.getOpacityFamily()['characteristics'];
    $scope.magnetismFamily  = StrataData.getMagnetismFamily()['characteristics'];

    $scope.selectedShapeFamily;
    $scope.selectedWidthFamily;
    $scope.selectedThicknessFamily;
    $scope.selectedContinuityFamily;
    $scope.selectedDirectionFamily;
    $scope.selectedColourFamily;
    $scope.selectedBrightnessFamily;
    $scope.selectedOpacityFamily;
    $scope.selectedMagnetismFamily;

    $scope.$on('updateMorphology', function(){
        var strata = StrataData.getStratas()[StrataData.getCurrentSelectedStrata()];
        $scope.selectedShapeFamily = getCharacteristicByItsName($scope.shapeFamily, strata.getShapeFamily());
        $scope.selectedWidthFamily = getCharacteristicByItsName($scope.widthFamily, strata.getWidthFamily());
        $scope.selectedThicknessFamily = getCharacteristicByItsName($scope.thicknessFamily, strata.getThicknessFamily());
        $scope.selectedContinuityFamily = getCharacteristicByItsName($scope.continuityFamily, strata.getContinuityFamily());
        $scope.selectedDirectionFamily = getCharacteristicByItsName($scope.directionFamily, strata.getDirectionFamily());

        if (strata.findDependency('colourFamily'))
            $scope.selectedColourFamily = getCharacteristicByItsName($scope.colourFamily, strata.getColourFamily());
        if (strata.findDependency('brightnessFamily'))
            $scope.selectedBrightnessFamily = getCharacteristicByItsName($scope.brightnessFamily, strata.getBrightnessFamily());
        if (strata.findDependency('opacityFamily'))
            $scope.selectedOpacityFamily = getCharacteristicByItsName($scope.opacityFamily, strata.getOpacityFamily());
        if (strata.findDependency('magnetismFamily'))
            $scope.selectedMagnetismFamily = getCharacteristicByItsName($scope.magnetismFamily, strata.getMagnetismFamily());

    });

    $scope.upMorpho = function() {
        var temp = StrataData.getStratas();
        var index = StrataData.getCurrentSelectedStrata();

        temp[index].setShapeFamily($scope.selectedShapeFamily.name);
        temp[index].setWidthFamily($scope.selectedWidthFamily.name);
        temp[index].setThicknessFamily($scope.selectedThicknessFamily.name);
        temp[index].setContinuityFamily($scope.selectedContinuityFamily.name);
        temp[index].setDirectionFamily($scope.selectedDirectionFamily.name);
        if (temp[index].findDependency('colourFamily'))
            temp[index].setColourFamily($scope.selectedColourFamily.name);
        if (temp[index].findDependency('brightnessFamily'))
            temp[index].setBrightnessFamily($scope.selectedBrightnessFamily.name);
        if (temp[index].findDependency('opacityFamily'))
            temp[index].setOpacityFamily($scope.selectedOpacityFamily.name);
        if (temp[index].findDependency('magnetismFamily'))
            temp[index].setMagnetismFamily($scope.selectedMagnetismFamily.name);


        $scope.$emit('updateDraw');
    };

}).controller('stratTextureCtrl', function ($scope, $route, $window, StrataData) {

    $scope.porosityFamily   = StrataData.getPorosityFamily()['characteristics'];
    $scope.cohesionFamily   = StrataData.getCohesionFamily()['characteristics'];
    $scope.hardnessFamily   = StrataData.getHardnessFamily()['characteristics'];
    $scope.crackingFamily   = StrataData.getCrackingFamily()['characteristics'];

    $scope.selectedPorosityFamily;
    $scope.selectedCohesionFamily;
    $scope.selectedHardnessFamily;
    $scope.selectedCrackingFamily;

    $scope.$on('updateTexture', function(){
        var strata = StrataData.getStratas()[StrataData.getCurrentSelectedStrata()];

        if (strata.findDependency('porosityFamily'))
            $scope.selectedPorosityFamily = getCharacteristicByItsName($scope.porosityFamily, strata.getPorosityFamily());
        if (strata.findDependency('cohesionFamily'))
            $scope.selectedCohesionFamily = getCharacteristicByItsName($scope.cohesionFamily, strata.getCohesionFamily());
        if (strata.findDependency('hardnessFamily'))
            $scope.selectedHardnessFamily = getCharacteristicByItsName($scope.hardnessFamily, strata.getHardnessFamily());
        if (strata.findDependency('crackingFamily'))
            $scope.selectedCrackingFamily = getCharacteristicByItsName($scope.crackingFamily, strata.getCrackingFamily());
    });

    $scope.upTexture = function() {
        var temp = StrataData.getStratas();
        var index = StrataData.getCurrentSelectedStrata();

        if (temp[index].findDependency('porosityFamily'))
            temp[index].setPorosityFamily($scope.selectedPorosityFamily.name);
        if (temp[index].findDependency('cohesionFamily'))
            temp[index].setCohesionFamily($scope.selectedCohesionFamily.name);
        if (temp[index].findDependency('hardnessFamily'))
            temp[index].setHardnessFamily($scope.selectedHardnessFamily.name);
        if (temp[index].findDependency('crackingFamily'))
            temp[index].setCrackingFamily($scope.selectedCrackingFamily.name);

        $scope.$emit('updateDraw');
    };

}).controller('stratMicrostructureCtrl', function ($scope, $route, $window, StrataData) {

    $scope.cprimicrostructureFamily   = StrataData.getCprimicrostructureFamily()['characteristics'];
    $scope.mmicrostructureFamily      = StrataData.getMmicrostructureFamily()['characteristics'];

    $scope.selectedCprimicrostructureFamily;
    $scope.selectedMmicrostructureFamily;

    $scope.$on('updateMicrostructure', function(){
        var strata = StrataData.getStratas()[StrataData.getCurrentSelectedStrata()];

        if (strata.findDependency('cprimicrostructureFamily'))
            $scope.selectedCprimicrostructureFamily = getCharacteristicByItsName($scope.cprimicrostructureFamily, strata.getCpriMicrostructureFamily());
        if (strata.findDependency('mmicrostructureFamily'))
            $scope.selectedMmicrostructureFamily = getCharacteristicByItsName($scope.mmicrostructureFamily, strata.getMmicrostructureFamily());

    });

    $scope.upMicrostructure = function() {
        var temp = StrataData.getStratas();
        var index = StrataData.getCurrentSelectedStrata();

        if (temp[index].findDependency('cprimicrostructureFamily'))
            temp[index].setCpriMicrostructureFamily($scope.selectedCprimicrostructureFamily.name);
        if (temp[index].findDependency('mmicrostructureFamily'))
            temp[index].setMmicrostructureFamily($scope.selectedMmicrostructureFamily.name);

        $scope.$emit('updateDraw');
    };

}).controller('stratCompositionCtrl', function ($scope, $route, $window, StrataData) {
    $scope.scompositionFamily      = StrataData.getScompositionFamily()['characteristics'];
    $scope.nmmcompositionFamily    = StrataData.getNmmcompositionFamily()['characteristics'];
    $scope.dcompositionFamily      = StrataData.getDcompositionFamily()['characteristics'];
    $scope.pomcompositionFamily    = StrataData.getPomcompositionFamily()['characteristics'];
    $scope.cpcompositionFamily     = StrataData.getCpcompositionFamily()['characteristics'];
    $scope.cmcompositionFamily     = StrataData.getCmcompositionFamily()['characteristics'];
    $scope.mcompositionFamily     = StrataData.getMcompositionFamily()['characteristics'];

    $scope.selectedScompositionFamily;
    $scope.selectedNmmcompositionFamily;
    $scope.selectedDcompositionFamily;
    $scope.selectedPomcompositionFamily;
    $scope.selectedCpcompositionFamily;
    $scope.selectedCmcompositionFamily;
    $scope.selectedMcompositionFamily;

    $scope.$on('updateComposition', function(){
        var strata = StrataData.getStratas()[StrataData.getCurrentSelectedStrata()];

        if (strata.findDependency('scompositionFamily'))
            $scope.selectedScompositionFamily = getCharacteristicByItsName($scope.scompositionFamily, strata.getScompositionFamily());
        if (strata.findDependency('nmmcompositionFamily'))
            $scope.selectedNmmcompositionFamily = getCharacteristicByItsName($scope.nmmcompositionFamily, strata.getNmmCompositionFamily());
        if (strata.findDependency('dcompositionFamily'))
            $scope.selectedDcompositionFamily = getCharacteristicByItsName($scope.dcompositionFamily, strata.getDcompositionFamily());
        if (strata.findDependency('pomcompositionFamily'))
            $scope.selectedPomcompositionFamily = getCharacteristicByItsName($scope.pomcompositionFamily, strata.getPomcompositionFamily());
        if (strata.findDependency('cpcompositionFamily'))
            $scope.selectedCpcompositionFamily = getCharacteristicByItsName($scope.cpcompositionFamily, strata.getCpcompositionFamily());
        if (strata.findDependency('cmcompositionFamily'))
            $scope.selectedCmcompositionFamily = getCharacteristicByItsName($scope.cmcompositionFamily, strata.getCmcompositionFamily());
        if (strata.findDependency('mcompositionFamily'))
            $scope.selectedMcompositionFamily = getCharacteristicByItsName($scope.mcompositionFamily, strata.getMcompositionFamily());

    });

    $scope.upComposition = function() {
        var temp = StrataData.getStratas();
        var index = StrataData.getCurrentSelectedStrata();

        if (temp[index].findDependency('scompositionFamily'))
            temp[index].setScompositionFamily($scope.selectedScompositionFamily.name);
        if (temp[index].findDependency('nmmcompositionFamily'))
            temp[index].setNmmCompositionFamily($scope.selectedNmmcompositionFamily.name);
        if (temp[index].findDependency('dcompositionFamily'))
            temp[index].setDcompositionFamily($scope.selectedDcompositionFamily.name);
        if (temp[index].findDependency('pomcompositionFamily'))
            temp[index].setPomCompositionFamily($scope.selectedPomcompositionFamily.name);
        if (temp[index].findDependency('cpcompositionFamily'))
            temp[index].setCpcompositionFamily($scope.selectedCpcompositionFamily.name);
        if (temp[index].findDependency('cmcompositionFamily'))
            temp[index].setCmcompositionFamily($scope.selectedCmcompositionFamily.name);
        if (temp[index].findDependency('mcompositionFamily'))
            temp[index].setMcompositionFamily($scope.selectedMcompositionFamily.name);

        $scope.$emit('updateDraw');
    };

}).controller('stratInterfaceCtrl', function ($scope, $route, $window, StrataData) {
    $scope.interfaceprofileFamily    = StrataData.getInterfaceprofileFamily()['characteristics'];
    $scope.interfacetransitionFamily = StrataData.getInterfacetransitionFamily()['characteristics'];
    $scope.interfaceroughnessFamily  = StrataData.getInterfaceroughnessFamily()['characteristics'];
    $scope.interfaceadherenceFamily  = StrataData.getInterfaceadherenceFamily()['characteristics'];

    $scope.selectedInterfaceprofileFamily;
    $scope.selectedInterfacetransitionFamily;
    $scope.selectedInterfaceroughnessFamily;
    $scope.selectedInterfaceadherenceFamily;

    $scope.$on('updateInterface', function(){
        var strata = StrataData.getStratas()[StrataData.getCurrentSelectedStrata()];

        $scope.selectedInterfaceprofileFamily = getCharacteristicByItsName($scope.interfaceprofileFamily, strata.getInterfaceprofileFamily());
        if (strata.findDependency('interfacetransitionFamily'))
            $scope.selectedInterfacetransitionFamily = getCharacteristicByItsName($scope.interfacetransitionFamily, strata.getInterfacetransitionFamily());
        if (strata.findDependency('interfaceroughnessFamily'))
            $scope.selectedInterfaceroughnessFamily = getCharacteristicByItsName($scope.interfaceroughnessFamily, strata.getInterfaceroughnessFamily());
        if (strata.findDependency('interfaceadherenceFamily'))
            $scope.selectedInterfaceadherenceFamily = getCharacteristicByItsName($scope.interfaceadherenceFamily, strata.getInterfaceadherenceFamily());

    });

    $scope.upInterface = function() {
        var temp = StrataData.getStratas();
        var index = StrataData.getCurrentSelectedStrata();

        temp[index].setInterfaceprofileFamily($scope.selectedInterfaceprofileFamily.name);
        if (temp[index].findDependency('interfacetransitionFamily'))
            temp[index].setInterfacetransitionFamily($scope.selectedInterfacetransitionFamily.name);
        if (temp[index].findDependency('interfaceroughnessFamily'))
            temp[index].setInterfaceroughnessFamily($scope.selectedInterfaceroughnessFamily.name);
        if (temp[index].findDependency('interfaceadherenceFamily'))
            temp[index].setInterfaceadherenceFamily($scope.selectedInterfaceadherenceFamily.name);

        $scope.$emit('updateDraw');
    };

}).controller('ModalAddStrataCtrl', function ($scope, $modal, $log) {
    $scope.artefactName = $scope.$parent.artefactName;
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'modalAddStrata.html',
            controller: 'ModalAddStrataInstanceCtrl',
            resolve : {
                arg1 : function(){
                    return "hello";
                }
            }
        });
    };
}).controller('ModalAddStrataInstanceCtrl', function ($scope, $route, $modalInstance, MiCorrService, arg1, StrataData) {
    $scope.route = $route;
    $scope.natures = natures;
    $scope.nature;
    $scope.strataName;
    $scope.strataUid;

    $scope.ok = function () {
        var newStrata = natureFactory($scope.nature);
        newStrata.setName($scope.strataName);
        newStrata.setUid($scope.strataUid);
        StrataData.pushOneStrata(newStrata);
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}).controller('ModalDelStrataCtrl', function ($scope, $modal, $log) {
    $scope.artefactName = $scope.$parent.artefactName;
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'delStrataContent.html',
            controller: 'ModalDelStrataInstanceCtrl',
            size: size,
        });
    };
}).controller('ModalDelStrataInstanceCtrl', function ($scope, $route, $modalInstance, MiCorrService, StrataData) {
    $scope.route = $route;
    $scope.natures = natures;
    $scope.nature;
    $scope.strataName;
    $scope.strataUid;

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});



angular.module('MiCorr').controller('showArtefact', function ($scope, $location, $routeParams, MiCorrService) {
    $scope.artefactName = $routeParams.name;

    MiCorrService.getStratigraphyByArtefact($scope.artefactName).success(function(data){
        $scope.strats = data['strats'];
    });
});

angular.module('MiCorr').controller('listArtefacts', function ($scope, $routeParams, MiCorrService) {
    MiCorrService.getAllArtefacts().success(function(data){
        $scope.artefacts = data['artefacts'];
    });
});

angular.module('MiCorr').controller('ModalAddStratigraphyCtrl', function ($scope, $modal, $log) {
    $scope.artefactName = $scope.$parent.artefactName;
    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'modalAddStratigraphy.html',
            controller: 'ModalAddStratigraphyInstanceCtrl',
            resolve : {
                artefact : function(){
                    return $scope.artefactName;
                }
            }
        });
    };
}).controller('ModalAddStratigraphyInstanceCtrl', function ($scope, $route, $modalInstance, MiCorrService, artefact) {
    $scope.route = $route;
    $scope.artefactName = artefact;
    $scope.strat = '';
    $scope.ok = function () {
        MiCorrService.stratigraphyExists($scope.strat).success(function(data) {
            if (data['StratigraphyExists'] == false) {
                MiCorrService.addStratigraphy($scope.artefactName, $scope.strat).success(function(data) {
                    if (data['insertStatus'] == true){
                        $modalInstance.close();
                        $scope.route.reload();
                    }
                    else {
                        console.log("Impossible d'ajouter la stratigraphie.");
                        alert("Erreur d'ajout de la stratigraphie");
                    }
                })
            }
            else
                $scope.$broadcast('addArtefact', $scope.strat);
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}).controller('addStratigraphyCtrl', function ($scope) {
    $scope.alerts = [];

    $scope.addAlert = function() {
        $scope.alerts.push({type : 'danger', msg: 'This stratigraphy already exists in database ! '});
    };

    $scope.$on('addArtefact', function(event, sc){
        $scope.addAlert();
    });

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});

angular.module('MiCorr').controller('mainController', function ($scope, $routeParams, MiCorrService, StrataData) {

    MiCorrService.getAllCharacteristic().success(function(data){
        characteristics = data;

        StrataData.setShapeFamily($scope.parseCharasteristic('shapeFamily'));
        StrataData.setWidthFamily($scope.parseCharasteristic('widthFamily'));
        StrataData.setThicknessFamily($scope.parseCharasteristic('thicknessFamily'));
        StrataData.setContinuityFamily($scope.parseCharasteristic('continuityFamily'));
        StrataData.setDirectionFamily($scope.parseCharasteristic('directionFamily'));
        StrataData.setColourFamily($scope.parseCharasteristic('colourFamily'));
        StrataData.setBrightnessFamily($scope.parseCharasteristic('brightnessFamily'));
        StrataData.setOpacityFamily($scope.parseCharasteristic('opacityFamily'));
        StrataData.setMagnetismFamily($scope.parseCharasteristic('magnetismFamily'));
        StrataData.setPorosityFamily($scope.parseCharasteristic('porosityFamily'));
        StrataData.setCprimicrostructureFamily($scope.parseCharasteristic('cpriMicrostructureFamily'));
        StrataData.setMmicrostructureFamily($scope.parseCharasteristic('mMicrostructureFamily'));
        StrataData.setCohesionFamily($scope.parseCharasteristic('cohesionFamily'));
        StrataData.setHardnessFamily($scope.parseCharasteristic('hardnessFamily'));
        StrataData.setCrackingFamily($scope.parseCharasteristic('crackingFamily'));
        StrataData.setScompositionFamily($scope.parseCharasteristic('sCompositionFamily'));
        StrataData.setNmmCompositionFamily($scope.parseCharasteristic('nmmCompositionFamily'));
        StrataData.setDcompositionFamily($scope.parseCharasteristic('dCompositionFamily'));
        StrataData.setPomcompositionFamily($scope.parseCharasteristic('pomCompositionFamily'));
        StrataData.setCpcompositionFamily($scope.parseCharasteristic('cpCompositionFamily'));
        StrataData.setCmcompositionFamily($scope.parseCharasteristic('cmCompositionFamily'));
        StrataData.setMcompositionFamily($scope.parseCharasteristic('mCompositionFamily'));
        StrataData.setInterfaceprofileFamily($scope.parseCharasteristic('interfaceProfileFamily'));
        StrataData.setInterfacetransitionFamily($scope.parseCharasteristic('interfaceTransitionFamily'));
        StrataData.setInterfaceroughnessFamily($scope.parseCharasteristic('interfaceRoughnessFamily'));
        StrataData.setInterfaceadherenceFamily($scope.parseCharasteristic('interfaceAdherenceFamily'));
    });

    $scope.parseCharasteristic = function(name) {
        for (var i = 0; i < characteristics.length; i++) {
            if (characteristics[i].family == name)
                return characteristics[i];
        }
    }
    //helloa

});

