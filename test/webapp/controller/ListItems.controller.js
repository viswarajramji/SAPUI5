sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "test/controller/formatter"
], function(
	Controller,
	JSONModel,
	formatter
) {
	"use strict";

	return Controller.extend("test.controller.ListItems", {
        formatter:formatter,
        /**
         * @override
         */
        onInit: function() {
         var currencyModel=new JSONModel({
             "name":"EUR"
         });
        this.getView().setModel(currencyModel,"currency");
        },

		liveChange: function(oEvent) {
            var searchValue=oEvent.getSource().getProperty("value");
            if(searchValue){
                console.log("test");
            }
		}
	});
});