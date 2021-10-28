sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sample/model/models",
	"sap/f/library",
	"sap/ui/model/json/JSONModel"
], function (UIComponent,
	Device,
	models,
	fioriLibrary,
	JSONModel) {
	"use strict";

	return UIComponent.extend("sample.Component", {

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
			// set the device model
			this.setModel(models.createDeviceModel(), "device");


		
			// enable routing
			
			this.getRouter().attachBeforeRouteMatched(this._attachRouteMatcher,this);
			this.getRouter().initialize();
		},
		_attachRouteMatcher:function(oEvent){
			var oModel=this.getModel();
			var sLayout=oEvent.getParameter("arguments").layout;
			if(!sLayout){
				sLayout = fioriLibrary.LayoutType.OneColumn;
			}
			oModel.setProperty("/layout",sLayout);
		}

	});
});
