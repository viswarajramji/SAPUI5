sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
) {
	"use strict";

	return Controller.extend("country.controller.Details", {
        /**
         * @override
         */
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
        }
	});
});