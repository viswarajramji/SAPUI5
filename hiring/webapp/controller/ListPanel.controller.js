sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/m/StringFilterOperator",
	"sap/ui/model/FilterOperator"
], function(
	Controller,
	Filter,
	StringFilterOperator,
	FilterOperator
) {
	"use strict";

	return Controller.extend("hiring.controller.ListPanel", {

        search:function(oEvent){
            var value=oEvent.getSource().getValue();
            var listItems= this.getView().byId("listItems").getBinding("items");
            var filter=[];
            if(!value){
                listItems.filter(new Filter());
                return;
            }
            filter.push(new Filter("UserName",FilterOperator.Contains, value));
            filter.push(new Filter("Gender",FilterOperator.Contains,value));
            filter.push(new Filter("Country",FilterOperator.Contains,value));
            var filters=new Filter({
                filters: filter,
                and: false,
              });
              listItems.filter(filters);
        }
	});
});