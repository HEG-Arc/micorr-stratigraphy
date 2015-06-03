function natureFactory (nature){
    if (nature == "cmCharacteristic" || nature == "CM")
        return new CM();
    else if (nature == "cpCharacteristic" || nature == "CP")
        return new CP();
    else if (nature == "dCharacteristic" || nature == "D")
        return new D();
    else if (nature == "mCharacteristic" || nature == "M")
        return new M();
    else if (nature == "nmmCharacteristic" || nature == "NMM")
        return new NMM();
    else if (nature == "pomCharacteristic" || nature == "POM")
        return new POM();
    else if (nature == "sCharacteristic" || nature == "S")
        return new S();
    else if (nature == "svCharacteristic" || nature == "SV")
        return new SV();
}

function Strata() {
    this.name;
    this.orderName;
    this.uid;
    this.shapeFamily;
    this.widthFamily;
    this.thicknessFamily;
    this.continuityFamily;
    this.directionFamily;
    this.interfaceprofileFamily;
    this.natureFamily;
    this.shortNatureFamily;

    this.dependencies = new Array();

    this.getOrderName = function() {
        return this.orderName;
    };

    this.setOrderName = function(orderName){
        this.orderName = orderName;
    };

    this.getShortNatureFamily = function() {
        return this.shortNatureFamily;
    };

    this.getNatureFamily = function() {
        return this.natureFamily;
    };

    this.findDependency = function(dep) {
        for (var i = 0; i < this.dependencies.length; i++){
            if (this.dependencies[i] == dep)
                return true;
        }
        return false;
    };

    this.setName = function(name){
        this.name = name;
    };

    this.getName = function() {
        if (this.name == null)
            return "No name defined yet";
        return this.name;
    };

    this.setDirectionFamily = function(directionFamily){
        this.directionFamily = directionFamily;
    };

    this.getDirectionFamily = function(){
        return this.directionFamily;
    };

    this.setContinuityFamily = function(continuityFamily){
        this.continuityFamily = continuityFamily;
    };

    this.getContinuityFamily = function(){
        return this.continuityFamily;
    };

    this.setThicknessFamily = function(thicknessFamily){
        this.thicknessFamily = thicknessFamily;
    };

    this.getThicknessFamily = function() {
        return this.thicknessFamily;
    };

    this.setWidthFamily = function(widthFamily) {
        this.widthFamily = widthFamily;
    };

    this.getWidthFamily = function() {
        return this.widthFamily;
    };

    this.setShapeFamily = function(shapeFamily){
        this.shapeFamily = shapeFamily;
    };

    this.getShapeFamily = function(){
        return this.shapeFamily;
    };

    this.setUid = function(uid) {
        this.uid = uid
    };

    this.getUid = function() {
        return this.uid;
    };

    this.getInterfaceprofileFamily = function() {
        return this.interfaceprofileFamily;
    };

    this.setInterfaceprofileFamily = function(interfaceprofileFamily) {
        this.interfaceprofileFamily = interfaceprofileFamily;
    };
}

function ColourStrata() {
    this.colourFamily;

    this.setColourFamily = function(colourFamily){
        this.colourFamily = colourFamily;
    };

    this.getColourFamily = function(){
        return this.colourFamily;
    };
}

function BrightnessStrata() {
    this.brightnessFamily;

    this.setBrightnessFamily = function(brightnessFamily){
        this.brightnessFamily = brightnessFamily;
    };

    this.getBrightnessFamily = function() {
        return this.brightnessFamily;
    };
}

function OpacityStrata() {
    this.opacityFamily;

    this.getOpacityFamily = function() {
        return this.opacityFamily;
    };

    this.setOpacityFamily = function(opacityFamily) {
        this.opacityFamily = opacityFamily;
    };
}

function MagnetismStrata() {
    this.magnetismFamily;

    this.getMagnetismFamily = function() {
        return this.magnetismFamily;
    };

    this.setMagnetismFamily = function(magnetismFamily) {
        this.magnetismFamily = magnetismFamily;
    };
}

function PorosityStrata() {
    this.porosityFamily;

    this.getPorosityFamily = function(){
        return this.porosityFamily;
    };

    this.setPorosityFamily = function(porosityFamily) {
        this.porosityFamily = porosityFamily;
    };
}

function CpriMicrostructureStrata() {
    this.cpriMicrostructureFamily;

    this.getCpriMicrostructureFamily = function() {
        return this.cpriMicrostructureFamily;
    };
    this.setCpriMicrostructureFamily = function(cpriMicrostructureFamily) {
        this.cpriMicrostructureFamily = cpriMicrostructureFamily;
    };
}

function MMicrostructureStrata() {
    this.mmicrostructureFamily;

    this.getMmicrostructureFamily = function() {
        return this.mmicrostructureFamily;
    };

    this.setMmicrostructureFamily = function(mmicrostructureFamily) {
        this.mmicrostructureFamily = mmicrostructureFamily;
    };
}

function CohesionStrata() {
    this.cohesionFamily;

    this.getCohesionFamily = function() {
        return this.cohesionFamily;
    };

    this.setCohesionFamily = function(cohesionFamily) {
        this.cohesionFamily = cohesionFamily;
    };
}

function HardnessStrata() {
    this.hardnessFamily;

    this.getHardnessFamily = function() {
        return this.hardnessFamily;
    };

    this.setHardnessFamily = function(hardnessFamily) {
        this.hardnessFamily = hardnessFamily;
    };
}

function CrackingStrata() {
    this.crackingFamily;

    this.getCrackingFamily = function(){
        return this.crackingFamily;
    };

    this.setCrackingFamily = function(crackingFamily) {
        this.crackingFamily = crackingFamily;
    };
}

function SCompositionStrata() {
    this.scompositionFamily;

    this.getScompositionFamily = function() {
        return this.scompositionFamily;
    };

    this.setScompositionFamily = function(scompositionFamily) {
        this.scompositionFamily = scompositionFamily;
    }
}

function NMMCompositionStrata() {
    this.nmmcompositionFamily;

    this.getNmmCompositionFamily = function() {
        return this.nmmcompositionFamily;
    };

    this.setNmmCompositionFamily = function(nmmcompositionFamily) {
        this.nmmcompositionFamily = nmmcompositionFamily;
    };
}

function DCompositionStrata () {
    this.dcompositionFamily;

    this.getDcompositionFamily = function() {
        return this.dcompositionFamily;
    };

    this.setDcompositionFamily = function(dcompositionFamily) {
        this.dcompositionFamily = dcompositionFamily;
    };
}

function POMCompositionStrata() {
    this.pomcompositionFamily;

    this.getPomcompositionFamily = function() {
        return this.pomcompositionFamily;
    };

    this.setPomCompositionFamily = function(pomcompositionFamily) {
        this.pomcompositionFamily = pomcompositionFamily;
    };
}

function CPCompositionStrata() {
    this.cpcompositionFamily;

    this.getCpcompositionFamily = function() {
        return this.cpcompositionFamily;
    };

    this.setCpcompositionFamily = function(cpcompositionFamily) {
        this.cpcompositionFamily = cpcompositionFamily;
    };
}

function CMCompositionStrata() {
    this.cmcompositionFamily;

    this.getCmcompositionFamily = function() {
        return this.cmcompositionFamily;
    };

    this.setCmcompositionFamily = function(cmcompositionFamily) {
        this.cmcompositionFamily = cmcompositionFamily;
    };
}

function MCompositionStrata() {
    this.mcompositionFamily;

    this.getMcompositionFamily = function() {
        return this.mcompositionFamily;
    };

    this.setMcompositionFamily = function(mcompositionFamily) {
        this.mcompositionFamily = mcompositionFamily;
    };
}

function InterfaceTransitionStrata() {
    this.interfacetransitionFamily;
    this.getInterfacetransitionFamily = function() {
        return this.interfacetransitionFamily;
    };

    this.setInterfacetransitionFamily = function(interfacetransitionFamily){
        this.interfacetransitionFamily = interfacetransitionFamily;
    };
}

function InterfaceRoughnessStrata() {
    this.interfaceroughnessFamily;

    this.getInterfaceroughnessFamily = function() {
        return this.interfaceroughnessFamily;
    };

    this.setInterfaceroughnessFamily = function(interfaceroughnessFamily) {
        this.interfaceroughnessFamily = interfaceroughnessFamily;
    };
}

function InterfaceAdherenceStrata() {
    this.interfaceadherenceFamily;

    this.getInterfaceadherenceFamily = function() {
        return this.interfaceadherenceFamily;
    };

    this.setInterfaceadherenceFamily = function(interfaceadherenceFamily) {
        this.interfaceadherenceFamily = interfaceadherenceFamily;
    };
}

function S() {
    Strata.call(this);
    ColourStrata.call(this);
    BrightnessStrata.call(this);
    OpacityStrata.call(this);
    MagnetismStrata.call(this);
    PorosityStrata.call(this);
    CohesionStrata.call(this);
    HardnessStrata.call(this);
    CrackingStrata.call(this);
    SCompositionStrata.call(this);
    InterfaceTransitionStrata.call(this);
    InterfaceRoughnessStrata.call(this);
    InterfaceAdherenceStrata.call(this);

    this.natureFamily = "Soil";
    this.shortNatureFamily = "S";

    this.dependencies.push('colourFamily');
    this.dependencies.push('brightnessFamily');
    this.dependencies.push('opacityFamily');
    this.dependencies.push('magnetismFamily');
    this.dependencies.push('porosityFamily');
    this.dependencies.push('cohesionFamily');
    this.dependencies.push('hardnessFamily');
    this.dependencies.push('crackingFamily');
    this.dependencies.push('scompositionFamily');
    this.dependencies.push('interfacetransitionFamily');
    this.dependencies.push('interfaceroughnessFamily');
    this.dependencies.push('interfaceadherenceFamily');
};

function NMM() {
    Strata.call(this);
    ColourStrata.call(this);
    BrightnessStrata.call(this);
    OpacityStrata.call(this);
    MagnetismStrata.call(this);
    PorosityStrata.call(this);
    CohesionStrata.call(this);
    HardnessStrata.call(this);
    CrackingStrata.call(this);
    NMMCompositionStrata.call(this);
    InterfaceTransitionStrata.call(this);
    InterfaceRoughnessStrata.call(this);
    InterfaceAdherenceStrata.call(this);

    this.natureFamily = "Non-Metallic material";
    this.shortNatureFamily = "NMM";

    this.dependencies.push('colourFamily');
    this.dependencies.push('brightnessFamily');
    this.dependencies.push('opacityFamily');
    this.dependencies.push('magnetismFamily');
    this.dependencies.push('porosityFamily');
    this.dependencies.push('cohesionFamily');
    this.dependencies.push('hardnessFamily');
    this.dependencies.push('crackingFamily');
    this.dependencies.push('nmmcompositionFamily');
    this.dependencies.push('interfacetransitionFamily');
    this.dependencies.push('interfaceroughnessFamily');
    this.dependencies.push('interfaceadherenceFamily');
};

function D() {
    Strata.call(this);
    ColourStrata.call(this);
    BrightnessStrata.call(this);
    OpacityStrata.call(this);
    MagnetismStrata.call(this);
    PorosityStrata.call(this);
    CohesionStrata.call(this);
    HardnessStrata.call(this);
    CrackingStrata.call(this);
    DCompositionStrata.call(this);
    InterfaceTransitionStrata.call(this);
    InterfaceRoughnessStrata.call(this);
    InterfaceAdherenceStrata.call(this);

    this.natureFamily = "Deposit";
    this.shortNatureFamily = "D";

    this.dependencies.push('colourFamily');
    this.dependencies.push('brightnessFamily');
    this.dependencies.push('opacityFamily');
    this.dependencies.push('magnetismFamily');
    this.dependencies.push('porosityFamily');
    this.dependencies.push('cohesionFamily');
    this.dependencies.push('hardnessFamily');
    this.dependencies.push('crackingFamily');
    this.dependencies.push('dcompositionFamily');
    this.dependencies.push('interfacetransitionFamily');
    this.dependencies.push('interfaceroughnessFamily');
    this.dependencies.push('interfaceadherenceFamily');
};

function SV() {
    Strata.call(this);

    this.natureFamily = "Structural Void";
    this.shortNatureFamily = "SV";
};

function POM() {
    Strata.call(this);
    ColourStrata.call(this);
    BrightnessStrata.call(this);
    OpacityStrata.call(this);
    MagnetismStrata.call(this);
    PorosityStrata.call(this);
    CohesionStrata.call(this);
    HardnessStrata.call(this);
    CrackingStrata.call(this);
    POMCompositionStrata.call(this);
    InterfaceTransitionStrata.call(this);
    InterfaceRoughnessStrata.call(this);
    InterfaceAdherenceStrata.call(this);

    this.natureFamily = "Pseudomorph of organic material";
    this.shortNatureFamily = "POM";

    this.dependencies.push('colourFamily');
    this.dependencies.push('brightnessFamily');
    this.dependencies.push('opacityFamily');
    this.dependencies.push('magnetismFamily');
    this.dependencies.push('porosityFamily');
    this.dependencies.push('cohesionFamily');
    this.dependencies.push('hardnessFamily');
    this.dependencies.push('crackingFamily');
    this.dependencies.push('pomcompositionFamily');
    this.dependencies.push('interfacetransitionFamily');
    this.dependencies.push('interfaceroughnessFamily');
    this.dependencies.push('interfaceadherenceFamily');
};

function CP() {
    Strata.call(this);
    ColourStrata.call(this);
    BrightnessStrata.call(this);
    OpacityStrata.call(this);
    MagnetismStrata.call(this);
    PorosityStrata.call(this);
    CpriMicrostructureStrata.call(this);
    CohesionStrata.call(this);
    HardnessStrata.call(this);
    CrackingStrata.call(this);
    CPCompositionStrata.call(this);
    InterfaceTransitionStrata.call(this);
    InterfaceRoughnessStrata.call(this);
    InterfaceAdherenceStrata.call(this);

    this.natureFamily = "Corroded Products";
    this.shortNatureFamily = "CP";

    this.dependencies.push('colourFamily');
    this.dependencies.push('brightnessFamily');
    this.dependencies.push('opacityFamily');
    this.dependencies.push('magnetismFamily');
    this.dependencies.push('porosityFamily');
    this.dependencies.push('cprimicrostructureFamily');
    this.dependencies.push('cohesionFamily');
    this.dependencies.push('hardnessFamily');
    this.dependencies.push('crackingFamily');
    this.dependencies.push('cpcompositionFamily');
    this.dependencies.push('interfacetransitionFamily');
    this.dependencies.push('interfaceroughnessFamily');
    this.dependencies.push('interfaceadherenceFamily');
};

function CM() {
    Strata.call(this);
    ColourStrata.call(this);
    BrightnessStrata.call(this);
    OpacityStrata.call(this);
    MagnetismStrata.call(this);
    PorosityStrata.call(this);
    CpriMicrostructureStrata.call(this);
    CohesionStrata.call(this);
    HardnessStrata.call(this);
    CrackingStrata.call(this);
    CMCompositionStrata.call(this);
    InterfaceTransitionStrata.call(this);
    InterfaceRoughnessStrata.call(this);
    InterfaceAdherenceStrata.call(this);

    this.natureFamily = "Corroded metal";
    this.shortNatureFamily = "CM";

    this.dependencies.push('colourFamily');
    this.dependencies.push('brightnessFamily');
    this.dependencies.push('opacityFamily');
    this.dependencies.push('magnetismFamily');
    this.dependencies.push('porosityFamily');
    this.dependencies.push('cprimicrostructureFamily');
    this.dependencies.push('cohesionFamily');
    this.dependencies.push('hardnessFamily');
    this.dependencies.push('crackingFamily');
    this.dependencies.push('cmcompositionFamily');
    this.dependencies.push('interfacetransitionFamily');
    this.dependencies.push('interfaceroughnessFamily');
    this.dependencies.push('interfaceadherenceFamily');
};

function M() {
    Strata.call(this);
    ColourStrata.call(this);
    BrightnessStrata.call(this);
    OpacityStrata.call(this);
    MagnetismStrata.call(this);
    PorosityStrata.call(this);
    MMicrostructureStrata.call(this);
    CohesionStrata.call(this);
    HardnessStrata.call(this);
    CrackingStrata.call(this);
    MCompositionStrata.call(this);
    InterfaceTransitionStrata.call(this);
    InterfaceRoughnessStrata.call(this);
    InterfaceAdherenceStrata.call(this);

    this.natureFamily = "Metal";
    this.shortNatureFamily = "M";

    this.dependencies.push('colourFamily');
    this.dependencies.push('brightnessFamily');
    this.dependencies.push('opacityFamily');
    this.dependencies.push('magnetismFamily');
    this.dependencies.push('porosityFamily');
    this.dependencies.push('mmicrostructureFamily');
    this.dependencies.push('cohesionFamily');
    this.dependencies.push('hardnessFamily');
    this.dependencies.push('crackingFamily');
    this.dependencies.push('mcompositionFamily');
    this.dependencies.push('interfacetransitionFamily');
    this.dependencies.push('interfaceroughnessFamily');
    this.dependencies.push('interfaceadherenceFamily');
};
