angular.module('MiCorr').directive('strata', function($compile, StrataData){
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        template : '<div class="col-md-11 text-center"></div>',
        link : function(scope, element, attrs) {

            var index = attrs.index;
            var strat = scope.rstratas[index];

            var width = element[0].offsetWidth * getWidths(strat.getWidthFamily());
            var height = getThicknesses(strat.getThicknessFamily());

            var poisson = [];
            var pds = new PoissonDiskSampler(width, height);

            element[0].style.height = height + "px";

            var paper = Raphael(element[0], width, height);
            var rect = paper.rect(0, 0, width, height);

            try {
                rect.attr("fill", strat.getColourFamily().replace('Characteristic', ''));
            }
            catch (err) {
                console.log("No color family defined yet");
            }

            // Porosity
            if (strat.findDependency('porosityFamily')){
                var img = 'porosity';
                if (strat.getPorosityFamily() == 'slightlyPorousCharacteristic')
                    poisson.push({'min' : 20, 'max' : 90, 'img' : img, 'imgw' : 5, 'imgh' : 5});
                    //pds.createPointsPerso(90, 90, img);
                if (strat.getPorosityFamily() == 'porousCharacteristic')
                    poisson.push({'min' : 20, 'max' : 40, 'img' : img, 'imgw' : 5, 'imgh' : 5});
                    //pds.createPointsPerso(40, 40, img);
                if (strat.getPorosityFamily() == 'highlyPorousCharacteristic')
                    poisson.push({'min' : 20, 'max' : 20, 'img' : img, 'imgw' : 5, 'imgh' : 5});
                    //pds.createPointsPerso(20, 20, img);
            }

            //cpriMicroStructure
            if (strat.findDependency('cprimicrostructureFamily')) {
                if (strat.getCpriMicrostructureFamily() == "pseudomorphOfGranularCharacteristic")
                    Voronoi.init(40, width, height, paper);
                else if (strat.getCpriMicrostructureFamily() == "pseudomorphOfDendriticCharacteristic")
                poisson.push({'min': 20, 'max': 20, 'img': 'dendrit', 'imgw': 25, 'imgh': 35});
            }

            //CrackingFamily
            if (strat.findDependency('crackingFamily')){
                if (strat.getCrackingFamily() == "simpleCracksCharacteristic") {
                    drawCracking(paper, width, height, 1, 0);
                }
                else if (strat.getCrackingFamily() == "branchedCracksCharacteristic") {
                    drawCracking(paper, width, height, 1, 1);
                }
                else if (strat.getCrackingFamily() == "networkCracksCharacteristic") {
                    drawCracking(paper, width, height, 2, 5);
                }
            }


            // render
            for (var i = 0; i < 500; i++) {
                for (var j = 0; j < poisson.length; j++) {
                    pds.createPointsPerso(poisson[j].min, poisson[j].max, poisson[j].img, poisson[j].imgw, poisson[j].imgh);
                }
            }
            for (var i = 0; i < pds.pointList.length; i++){
                paper.image("../static/micorr/images/c/" + pds.pointList[i].t + ".png", pds.pointList[i].x-pds.pointList[i].w/2, pds.pointList[i].y-pds.pointList[i].h/2, pds.pointList[i].w, pds.pointList[i].h);
            }

            if (strat.getShapeFamily() == "vainsOrSeamsCharacteristic"){
                var vains = imgList.getImg('vains');
                paper.image(vains.url, width/2 - vains.width/2, height/2 - vains.height/2, vains.width, vains.height);
            }
            element.bind('click', function(){
                scope.update(index);
            });


            $compile(element.contents())(scope);
        }
    };
}).directive('stratainfo', function($compile, StrataData){
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        template : '<div class="col-md-1 text-center"></div>',
        link : function(scope, element, attrs) {
            var index = attrs.index;

            var stratas = scope.rstratas;
            var strata = stratas[index];
            var nb = stratas.length;

            var similarName = "";
            var sameNature = 0;

            var similar = false;

            for (var i = 0; i < index; i++) {
                var s2 = stratas[i];

                if (strata.getShortNatureFamily() == s2.getShortNatureFamily()){
                    if (compareTwoStratas(strata, s2)){
                        strata.setOrderName(s2.getOrderName());
                        similar = true;
                    }
                    sameNature++;
                }



            }

            if (!similar)
                strata.setOrderName(strata.getShortNatureFamily() + (sameNature + 1));

            //console.log(sameNature);

            element[0].innerText = strata.getOrderName();

            /*var nbSimilar = 0;
            var sameNature = 0;
            var similar = false;
            for (var i = 0; i < index; i++) {
                var s2 = stratas[i];
                //if (compareTwoStratas(strata, stratas[i])){

                //}

                if (strata.getShortNatureFamily() == s2.getShortNatureFamily()){
                    if (compareTwoStratas(strata, s2)) {
                        similar = true;

                        for (var j = 0; j < i; j++){

                        }

                        element[0].innerText = "idem";
                        break;
                    }
                    sameNature++;
                }
            }

            if (!similar)
                element[0].innerText = strata.getShortNatureFamily() + (sameNature + 1);
            */
        }
    };
});