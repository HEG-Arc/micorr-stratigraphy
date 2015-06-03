var Voronoi = {
    voronoi: new Voronoi(),
    sites: [],
    diagram: null,
    bbox: null,
	width : 0,
	height : 0,
	paper : null,
	
    init: function(nbSites, width, height, paper) {
		this.bbox = {xl:0,xr: width,yt:0,yb:height};
        this.width = width;
		this.height = height;
		this.paper = paper;
        this.randomSites(nbSites,true);
        this.render();
    },

    randomSites: function(n,clear) {
        if (clear) {this.sites = [];}
        // create vertices
        var xmargin = this.width;
            ymargin = this.height;
            xo = xmargin,
            dx = this.width-xmargin*2,
            yo = ymargin,
            dy = this.height-ymargin*2;
        for (var i=0; i<n; i++) {
            this.sites.push({
                x: xo + Math.random()*dx + Math.random()/dx,
                y: yo + Math.random()*dy + Math.random()/dy
                });
            }
        this.diagram = this.voronoi.compute(this.sites, this.bbox);		
	},

    render: function() {
        // voronoi
        if (!this.diagram) {return;}
        var edges = this.diagram.edges,
            iEdge = edges.length,
            edge, v;
        while (iEdge--) {
            edge = edges[iEdge];
			var line = "";
			
			v = edge.va;
			line += "M" + v.x + " " + v.y + "L";
            v = edge.vb;
			line += v.x + " " + v.y;
            this.paper.path(line);
            }
	}
};