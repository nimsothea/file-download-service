/**
 * Yleiskarttarasteri 1:8 000 000
 * Metadatan käsittely 
 **/

importClass(Packages.fi.nls.fileservice.jcr.MetadataProperty);

handlerRegistry.registerDatasetHandler((function () {

	var fileIdentifier = '72f22116-b877-4c02-8833-366134f96e06';
	var datasetName = 'yleiskarttarasteri_8000k_jhs180';
	var pattern = /\/tuotteet\/yleiskarttarasteri_8000k_jhs180\/(\S*)\/(\S*)\/(\S*)\/\S*.png/i; 
				   
	var mappers = new Array();
	mappers.push(defaultMapper(MetadataProperty.NLS_DATASETVERSION));
	mappers.push(lookupTableMapper(MetadataProperty.NLS_CRS, crsMappings));
	mappers.push(lookupTableMapper(MetadataProperty.GMD_DISTRIBUTIONFORMAT, formatMappings));

	var handler = {
			supportsPath: function (path) {
				return path.match(pattern);
			},
			fileIdentifier : fileIdentifier,
			processNode: function (node, outputProperties) {
				node.addMixin('nls:datasetfile');
				node.addMixin('gmd:metadata');
				
				var name = node.getName();
				name = name.substring(0,name.lastIndexOf("."));
				
				var arr = java.lang.reflect.Array.newInstance(java.lang.String, 1);
				arr[0] = name + ".pgw";
				outputProperties.put(MetadataProperty.NLS_RELATED, arr);
				
				getPropertiesFromPath(pattern,node.path,mappers,outputProperties);
				outputProperties.put(MetadataProperty.GMD_FILEIDENTIFIER,fileIdentifier);
				outputProperties.put(MetadataProperty.NLS_DATASET,datasetName);
			}
	};
	
	return handler;
		
}()));
