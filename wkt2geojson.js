		function wkt2geojson(wkt){
			str="";
		//POLYGON((0.0524887245 46.34721813,0.0524887245 48.938372,3.128101325 48.938372,3.128101325 46.34721813,0.0524887245 46.34721813))
			if (wkt.search("LINESTRING") == 0){
				geojson = {"type":"Linestring", "coordinates":[]};
				str = wkt.substring("LINESTRING((".length, wkt.length-2);
				coord_list=str.split(",");
				for (var i in coord_list){
				    coord=coord_list[i].split(" ");
				    geojson.coordinates.push([parseFloat(coord[0]), parseFloat(coord[1])]);
				}
			} else if (wkt.search("POLYGON") == 0){
				geojson = {"type":"Polygon", "coordinates":[[]]};
				str = wkt.substring("POLYGON((".length, wkt.length-2);
				coord_list=str.split(",");
				for (var i in coord_list){
				    coord=coord_list[i].split(" ");
				    geojson.coordinates[0].push([parseFloat(coord[0]), parseFloat(coord[1])]);
				}

			} else if (wkt.search("MULTIPOLYGON") == 0){
				geojson = {"type":"Polygon", "coordinates":[]};
				str = wkt.substring("MULTIPOLYGON(((".length, wkt.length-3);
				polygon_list = str.split(")");
				for (p in polygon_list) {
				    geojson.coordinates[p] = [];
				    parenthese_pos = polygon_list[p].search("\\(");
				    polygon_str = polygon_list[p].substring(parenthese_pos+1, polygon_list[p].length);
				    coord_list=polygon_str.split(",");
				    for (var i in coord_list){
				        coord=coord_list[i].split(" ");
				        geojson.coordinates[p].push([parseFloat(coord[0]), parseFloat(coord[1])]);
				    }
				}
			}
			return geojson;
		}