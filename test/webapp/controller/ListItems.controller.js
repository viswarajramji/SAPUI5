sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "test/controller/formatter",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(
	Controller,
	JSONModel,
	formatter,
	MessageToast,
	Filter,
	FilterOperator
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
		},

        search:function(oEvent){
           var value=oEvent.getSource().getProperty("value");
           var filter=[];
           if(value){
            filter.push(new Filter("ProductName",FilterOperator.EQ,value));
           }
          
           var listItems= this.getView().byId("listItem").getBinding("items")
           listItems.filter(filter);

        }
	});
});