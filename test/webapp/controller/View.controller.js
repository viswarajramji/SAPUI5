sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("test.controller.View", {
			onInit: function () {

			},

			press:function(){
				alert("hello dude");
			}
		});
	});
