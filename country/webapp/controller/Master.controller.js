sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/f/library",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"sap/f/library",
], function(
	Controller,
	Filter,
	FilterOperator,
	library,
	Sorter,
	MessageBox,
	fioriLibrary
) {
	"use strict";

	return Controller.extend("country.controller.Master", {

		/**
		 * @override
		 */
		onInit: function() {
		
			this._oRouter=this.getOwnerComponent().getRouter();
			this._descendingSort=false;

		},
		//TODO : and / or operator in this list
		search:function(oEvent){
		 var searchText=oEvent.getSource().getValue();
		 var filters=[];
		 if(searchText){
			filters.push(new Filter("countryName",FilterOperator.Contains,searchText));
		 }

		  var table= this.getView().byId("masterTable");
		  var oItems= table.getBinding("items");
		  oItems.filter(filters);
		},

		countryDetails:function(oEvent){
			var id=oEvent.getSource().getBindingContextPath().split("/")[2]
			this._oRouter.navTo("detail",{ 
				layout: fioriLibrary.LayoutType.TwoColumnsMidExpanded,
				productId:id
			});
		},

		sortCountry:function(){
			this._descendingSort=!this._descendingSort;
			var oSorter=new Sorter("countryName",this._descendingSort);
			var oTable=this.getView().byId("masterTable");
			var oItems=oTable.getBinding("items");
			oItems.sort(oSorter)
		},

		addCountry:function(){
			MessageBox.information("Country cannot be added ",{
				title: "Oh ho!!"
			});
		}
	});
});