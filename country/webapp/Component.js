sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"country/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/f/library",
], function (UIComponent,
	Device,
	models,
	JSONModel,
	fioriLibrary) {
	"use strict";

	return UIComponent.extend("country.Component", {

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

			this.setModel(new JSONModel())

			this.getRouter().attachBeforeRouteMatched(this._setAppLayout,this);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		},
		_setAppLayout:function(oEvent){
			var layout=oEvent.getParameter("arguments").layout;
			if(!layout){
				layout=fioriLibrary.LayoutType.MidColumnFullScreen;
			}
			this.getModel().setProperty("/layout", layout);
		}	
	});
});
