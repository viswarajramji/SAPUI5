sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageBox",
    "sap/ui/model/Sorter"
],
	
	function (Controller,
	Filter,
	FilterOperator,
	MessageBox,
	Sorter) {
		"use strict";

		return Controller.extend("sample.controller.Master", {
			onInit: function () {
                this._bDescendingSort=false;
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
            }

		});
	});
