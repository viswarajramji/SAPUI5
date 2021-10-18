sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/f/library"
], function(
	Controller,
	Filter,
	FilterOperator,
    fioriLibrary
) {
	"use strict";

	return Controller.extend("country.controller.Master", {

        filter:function(oEvent){
            var oSource=oEvent.getSource();
            var search= oSource.getProperty("value");
            var filter=[];
            if(search){
                filter.push(new Filter("Name",FilterOperator.Contains,search))
            }

           var tableList=this.getView().byId("tableList");
           var items= tableList.getBinding("items");
           items.filter(filter);
        },
        navigate:function(){
            var oFCL = this.oView.getParent().getParent();
			oFCL.setLayout(fioriLibrary.LayoutType.TwoColumnsMidExpanded);
        }
	});
});