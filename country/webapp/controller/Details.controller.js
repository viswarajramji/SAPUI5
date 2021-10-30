sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "sap/f/library",
  "../model/formatter"
], function(
	Controller,
	MessageBox,
	library,
	formatter
) {
	"use strict";

	return Controller.extend("country.controller.Details", {
        /**
         * @override
         */

        formatter:formatter,
        onInit: function() {
            this._oRouter=this.getOwnerComponent().getRouter();
            this._oRouter.getRoute("detail").attachPatternMatched(this._attachRoutePatterMatched,this);
        },
        _attachRoutePatterMatched:function(oEvent){
          this.layout= oEvent.getParameter("arguments").layout;
          this.productId=oEvent.getParameter("arguments").productId || this.productId || "0";
          this.getView().bindElement({
              path:"/countryList/"+this.productId,
              model:"country"
          });
        },

        closeDetails:function(){
          this._oRouter.navTo("master",{
              layout: fioriLibrary.LayoutType.OneColumn
          });
        },

        alert:function(parms){
          console.log(parms)
          MessageBox.show("hello");
        }
	});
});