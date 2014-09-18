/* 
 * Maastokarttarasteri 250k
 */
importClass(Packages.fi.nls.fileservice.jcr.MetadataProperty);

handlerRegistry.registerDatasetHandler((function () {

	var fileIdentifier = '924a68ba-665f-4ea0-a830-26e80112b5dc';
	var datasetName = 'maastokarttarasteri_250k';
	var pattern = /\/tuotteet\/maastokarttarasteri_250k\/(\S*)\/(\S*)\/(\S*)\/[A-Z][0-9]\/U([a-zA-Z][0-9]*[LR])_RVK.tif/i; 
				   
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
				
				var arr = java.lang.reflect.Array.newInstance(java.lang.String, 2);
				arr[0] = name + ".tab";
				arr[1] = name + ".tfw";
				
				outputProperties.put(MetadataProperty.NLS_RELATED, arr);
				
			}
	};
	
	return handler;
		
}()));