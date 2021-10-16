sap.ui.define([
	"sap/ui/core/mvc/Controller",
        "sap/ui/core/routing/History"
], function(
	Controller,
	History
) {
	"use strict";

	return Controller.extend("test.controller.Detail", {
        /**
         * @override
         */
        onInit: function() {
                this.getOwnerComponent().getRouter().attachRoutePatternMatched(this._attachPatternMatched,this);
        
        },

        _attachPatternMatched:function(oEvent){
          var id=window.decodeURIComponent(oEvent.getParameter("arguments").id);
          this.getView().bindElement({
              path:id,
              model:"invoice"
          });
        },

        goBack:function(){
                        var oHistory = History.getInstance();
                        var sPreviousHash = oHistory.getPreviousHash();
                
                        if (sPreviousHash !== undefined) {
                                window.history.go(-1);
                        } else {
                                var oRouter = this.getOwnerComponent().getRouter();
                                oRouter.navTo("overview", {}, true);
                        }
                }
	});
});

