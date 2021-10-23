sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"country/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/f/library"
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
			var oModel,oRouter;
			UIComponent.prototype.init.apply(this, arguments);

			oModel = new JSONModel();
			this.setModel(oModel);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			oRouter = this.getRouter();
			oRouter.attachBeforeRouteMatched(this._onBeforeRouteMatched, this);
			oRouter.initialize();
		},

		_onBeforeRouteMatched:function(oEvent){
			var oModel = this.getModel(),
			sLayout = oEvent.getParameter("layout")
			if (!sLayout) {
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}
			oModel.setProperty("/layout", sLayout);
		}
	});
});
