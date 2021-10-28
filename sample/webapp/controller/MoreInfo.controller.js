sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/f/library"
], function(
	Controller,
    fioriLibrary
) {
	"use strict";

	return Controller.extend("sample.controller.MoreInfo", {

        /**
         * @override
         */
        onInit: function() {
            this.oRouter= this.getOwnerComponent().getRouter();
        },

        handleAboutPress:function(){
           this.oRouter.navTo("newPage",{layout: fioriLibrary.LayoutType.EndColumnFullScreen});
        }
	});
});