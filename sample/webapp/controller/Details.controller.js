sap.ui.define([
	"sap/ui/core/mvc/Controller",
    'sap/f/library'
], function(
	Controller,
    fioriLibrary
) {
	"use strict";

	return Controller.extend("sample.controller.Details", {
        /**
         * @override
         */
        onInit: function() {
         
           this._oRouter=this.getOwnerComponent().getRouter();
           this._oRouter.attachRoutePatternMatched(this._attachRouteMatched,this);
        },

        _attachRouteMatched:function(oEvent){
           var layout=oEvent.getParameter("arguments").layout;
           var productId=oEvent.getParameter("arguments").productId;
           this.getView().bindElement({
               path:"/ProductCollection/" + productId,
               model:"products"
           });
           console.log("print log");
        },
        moreinfo:function(oEvent){
          var path=  oEvent.getSource().getBindingContext("products").getPath();
          this._oRouter.navTo("moreinfo",{
                layout:fioriLibrary.LayoutType.ThreeColumnsEndExpanded
          });
        },
        showFooter:function(){
            var footVisible= this.getView().byId("objectPageLayout").getShowFooter();
            this.getView().byId("objectPageLayout").setShowFooter(!footVisible)
        }

	});
});