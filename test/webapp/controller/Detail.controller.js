sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(
	Controller
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
        }
	});
});