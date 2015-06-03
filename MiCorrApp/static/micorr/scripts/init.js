function ImageList() {
    this.img = [];

    this.getImg = function(name) {
        for (var i = 0; i < this.img.length; i++){
            if (this.img[i].name == name)
                return this.img[i];
        }
        return "";
    };

    this.setSize = function(name, width, height) {
        var image = this.getImg(name);
        image.width = width;
        image.height = height;
    }

    this.init = function() {
        this.img.push({'name' : 'dendrit', 'url' : '../static/micorr/images/c/dendrit.png', 'width' : 25, 'height' : 35});
        this.img.push({'name' : 'vains', 'url' : '../static/micorr/images/c/vains.png', 'width' : 150, 'height' : 18});
        this.img.push({'name' : 'porosity', 'url' : '../static/micorr/images/c/porosity.png', 'width' : 5, 'height' : 5});
    };
}

var imgList = new ImageList();
imgList.init();

// hauteur des strates en px
function getWidths(width) {
    if (width == "largeCharacteristic")
        return 1;
    else if (width == "normalWidthCharacteristic")
        return 0.75;
    else if (width == "smallCharacteristic")
        return 0.5;
    else
        return 0.75;
}

function getThicknesses(thickness) {
    if (thickness == "thickCharacteristic")
        return 150;
    else if (thickness == "normalThicknessCharacteristic")
        return 100;
    else if (thickness == "thinCharacteristic")
        return 75;
    else
        return 100;

}

// matreials or voids constituing the corroded artefact

var natures = {"natures" : [
    {"guidc" : "cmCharacteristic", "description" : "Corroded metal", "code" : "CM"},
    {"guidc" : "cpCharacteristic", "description" : "Corroded product", "code" : "CP"},
    {"guidc" : "dCharacteristic", "description" : "Deposit", "code" : "D"},
    {"guidc" : "mCharacteristic", "description" : "Metal", "code" : "M"},
    {"guidc" : "nmmCharacteristic", "description" : "Non-Metallic material", "code" : "NMM"},
    {"guidc" : "pomCharacteristic", "description" : "Pseudomorph of organic material", "code" : "POM"},
    {"guidc" : "sCharacteristic", "description" : "Soil", "code" : "S"},
    {"guidc" : "svCharacteristic", "description" : "Strucural void", "code" : "SV"},
]};

getCharacteristicByItsName = function(data, name) {
    for (var i = 0; i < data.length; i++) {
        if (data[i].name == name){
            return data[i];
        }
    }
    return "";
}

function compareTwoStratas(s1, s2) {
    if (s1.getNatureFamily() == s2.getNatureFamily()) {
        var i = false;

        if (s1.getShapeFamily() == s2.getShapeFamily() &&
            s1.getWidthFamily() == s2.getWidthFamily() &&
            s1.getThicknessFamily() == s2.getThicknessFamily() &&
            s1.getContinuityFamily() == s2.getContinuityFamily() &&
            s1.getDirectionFamily() == s2.getDirectionFamily() &&
            s1.getInterfaceprofileFamily() == s2.getInterfaceprofileFamily())
            i = true;

        return i;
    }
    else
        return false;
}


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function drawCracking(paper, width, height, nbLines, nbCol) {
    var nb_hoph = 8;
    var nb_hopv = 5;
    var y = height / (nbLines+1);
    //horizontal
    for (var c = 0; c < nbLines; c++) {
        var x = 0;
        var t_hoph = width/nb_hoph;
        for (var i = 0; i < nb_hoph; i++){
            var x_delta_hop = x + t_hoph / 2 + getRandomInt(-30 , 30);
            var y_delta_hop = y + getRandomInt(-30 , 30);
            paper.path(['M', x, y, 'Q', x_delta_hop, y_delta_hop, x + t_hoph, y]);
            x += t_hoph;
        }
        y += height / (nbLines + 1);
    }

    //vertical
    x = width / (nbCol + 1);
    for (var c = 0; c < nbCol; c++){
        y = 0;
        var t_hop_v = height / nb_hopv;
        for (var i = 0; i < nb_hopv; i++){
            var x_delta_hop = x + getRandomInt(-30 , 30);//t_hoph / 2 + getRandomInt(-30 , 30);
            var y_delta_hop = y + t_hop_v / 2 + getRandomInt(-30 , 30);
            paper.path(['M', x, y, 'Q', x_delta_hop, y_delta_hop, x , y + t_hop_v]);
            y += t_hop_v;
        }
        x += width / (nbCol + 1)
    }
}


