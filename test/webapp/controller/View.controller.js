sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,JSONModel) {
		"use strict";

		return Controller.extend("test.controller.View", {
			onInit: function () {
				var oData={
					"user":{
						"name":"shan"
					}
				};

				var jsonModel=new JSONModel(oData);
				this.getView().setModel(jsonModel);
			}
		});
	});
