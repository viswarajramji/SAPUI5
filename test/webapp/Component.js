sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"test/model/models",
	"sap/ui/model/resource/ResourceModel"
], function (UIComponent,
	Device,
	models,
	ResourceModel) {
	"use strict";

	return UIComponent.extend("test.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);


			var resource=new ResourceModel({
				bundleName:"test.i18n.i18n"
			});

			
			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(resource, "i18n");
		}
	});
});
