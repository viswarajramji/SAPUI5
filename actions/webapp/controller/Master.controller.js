sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("actions.controller.Master", {
			onInit: function () {

			},

			changePage:function(oEvent){
			 var oButton=oEvent.getSource();
			 var targetPage= oButton.data("target");
			 var nav=this.getView().byId("navContainer");
			 nav.to(this.getView().byId(targetPage),"fade");
			}
		});
	});
