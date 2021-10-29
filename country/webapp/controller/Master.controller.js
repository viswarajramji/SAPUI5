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

		/**
		 * @override
		 */
		onInit: function() {
		
			this._oRouter=this.getOwnerComponent().getRouter();

		},
		//TODO : and / or operator in this list
		search:function(oEvent){
		 var searchText=oEvent.getSource().getValue();
		 var filters=[];
		 if(searchText){
			filters.push(new Filter("countryCode",FilterOperator.Contains,searchText));
		 }

		  var table= this.getView().byId("masterTable");
		  var oItems= table.getBinding("items");
		  oItems.filter(filters);
		},

		countryDetails:function(oEvent){

			this._oRouter.navTo("detail",{ 
				layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded
			});
		}
	});
});