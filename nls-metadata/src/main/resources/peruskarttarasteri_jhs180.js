/**
 * Peruskarttarasteri
 * Metadatan k�sittely 
 **/

importClass(Packages.fi.nls.fileservice.jcr.MetadataProperty);

handlerRegistry.registerDatasetHandler((function () {

	var fileIdentifier = 'c6e94f34-4925-4fa6-bac9-6b25f4e7cebf';
	var datasetName = 'peruskarttarasteri_jhs180';
	var pattern = /\/tuotteet\/peruskarttarasteri_jhs180\/(\S*)\/\S*\/(\S*)\/(\S*)\/\S*\/\S*\/(\S*).png/i; 
				   
	var mappers = new Array();
	mappers.push(defaultMapper(MetadataProperty.NLS_DATASETVERSION));
	mappers.push(lookupTableMapper(MetadataProperty.NLS_CRS, crsMappings));
	mappers.push(lookupTableMapper(MetadataProperty.GMD_DISTRIBUTIONFORMAT, formatMappings));
	mappers.push(defaultMapper(MetadataProperty.NLS_GRIDCELL));

	var handler = {
			supportsPath: function (path) {
				return path.match(pattern);
			},
			fileIdentifier : fileIdentifier,
			processNode: function (node, outputProperties) {
				node.addMixin('nls:datasetfile');
				node.addMixin('gmd:metadata');
				getPropertiesFromPath(pattern,node.path,mappers,outputProperties);
				outputProperties.put(MetadataProperty.GMD_FILEIDENTIFIER,fileIdentifier);
				outputProperties.put(MetadataProperty.NLS_DATASET,datasetName);
				
				var name = node.getName();
				name = name.substring(0,name.lastIndexOf("."));
				
				var arr = java.lang.reflect.Array.newInstance(java.lang.String, 1);
				arr[0] = name + ".pgw";
				outputProperties.put(MetadataProperty.NLS_RELATED, arr);
			}
	};
	
	return handler;
		
}()));
