sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment"
], function(
	Controller,
	JSONModel,
	Fragment
) {
	"use strict";

	return Controller.extend("test.controller.Secondary", {

            onInit: function() {
        
            },


			press:function(){
                var oBundle=this.getView().getModel("i18n").getResourceBundle();
                var userName=this.getView().byId("username").getValue();
                var valueBinding=this.getView().getModel().getProperty("/user/name");
				var text=oBundle.getText("username",[userName]);
				console.log(valueBinding);
                console.log(text);
                this._reset()
                this._displayFragement();


			},

            _reset:function(){
              this.getView().setModel(new JSONModel({
                  "user":{
                      "name":"guru"
                  }
              }));
            },

            _displayFragement:function(){
                var oView=this.getView();
                if(!this._fragementId){
                    this._fragementId= Fragment.load({
                        id: this.getView().getId(),
                        name:"test.view.Hello",
                        controller:this
                    }).then(function(oFragment){
                        oView.addDependent(oFragment);
                        return oFragment;
                    });
                }
                this._fragementId.then(function(oDailog){
                    oDailog.open();
                })
            },

            fragementClose:function(){
                this._fragementId.then(function(oDailog){
                    oDailog.close()
                })
            }

	});
});