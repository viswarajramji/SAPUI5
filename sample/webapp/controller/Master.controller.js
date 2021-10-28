sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter",
    'sap/f/library'
],
	
	function (Controller,
	Filter,
	FilterOperator,
	MessageBox,
	Sorter,
    fioriLibrary) {
		"use strict";

		return Controller.extend("sample.controller.Master", {
			onInit: function () {
                this._bDescendingSort=false;
                this.router=this.getOwnerComponent().getRouter();
			},
            onSearch:function(oEvent){
               var value= oEvent.getSource().getValue();
               var filters=[];
               if(value){
                  filters.push(new Filter("Name",FilterOperator.Contains,value));
               }
               var masterTable=this.getView().byId("masterTable");
               var items=masterTable.getBinding("items");
               items.filter(filters)
            },
            addElement:function(){
                MessageBox.information("this functionality is not yet ready ",{title:"Aw swap"})
            },

            sortElement:function(){
               this._bDescendingSort=!this._bDescendingSort;
               var masterTable=this.getView().byId("masterTable");
               var items=masterTable.getBinding("items");
               items.sort(new Sorter("Name",this._bDescendingSort));
            },
            showDetails:function(oEvent){
                var opath=oEvent.getSource().getBindingContext("products").getPath().split("/").slice(-1).pop();
                this.router.navTo("details",{
                    layout:fioriLibrary.LayoutType.TwoColumnsMidExpanded,
                    productId:opath
                });
            },

         

		});
	});
