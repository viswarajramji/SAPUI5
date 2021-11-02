sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "sap/f/library",
  "../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment"
], function(
	Controller,
	MessageBox,
	library,
	formatter,
	JSONModel,
	Fragment
) {
	"use strict";

  var urlHelper=library.urlHelper;
	return Controller.extend("country.controller.Details", {
        /**
         * @override
         */

        formatter:formatter,
        onInit: function() {
            this._oRouter=this.getOwnerComponent().getRouter();
            // this._oRouter.getRoute("detail").attachPatternMatched(this._attachRoutePatterMatched,this);
            this._treeModel=this.getView().byId("TreeTableBasic");

            this._oRouter.attachRoutePatternMatched(function(){
              console.log("details page")
            })

            this._oRouter.getRoute("detail").attachPatternMatched(function(){
              console.log("details - pattern page")
            })
            


        },
        _attachRoutePatterMatched:function(oEvent){
          this.layout= oEvent.getParameter("arguments").layout;
          this.productId=oEvent.getParameter("arguments").productId || this.productId || "0";
          this.getView().bindElement({
              path:"/countryList/"+this.productId,
              model:"country"
          });

          this.getView().getModel("country").setProperty("/date", new Date());

          var dateText="01/31/2021"

          this.getView().getModel("country").setProperty("/datetext",dateText);

          var dateTime=new Date();

          this.getView().getModel("country").setProperty("/datetime",dateTime);

          var fileSize=100000000;

          this.getView().getModel("country").setProperty("/filesize", fileSize);

          var floatValue=10.500;

          this.getView().getModel("country").setProperty("/floatValue", floatValue);

          var integerValue=100;

          this.getView().getModel("country").setProperty("/integerValue", integerValue)

          var timeDate=new Date();

          this.getView().getModel("country").setProperty("/timedata", timeDate);
        
        },

        closeDetails:function(){
          this._oRouter.navTo("master",{
              layout: fioriLibrary.LayoutType.OneColumn
          });
        },

        alert:function(parms){
          var value= parms.getSource().getHref();
          urlHelper.redirect(value,true);
        },

        alertClose:function(oEvent){
          var source=oEvent.getSource();
          MessageBox.show("hello");
        },

        expand:function(){
         var sideNavigation= this.getView().byId("sideNavigation")
         sideNavigation.setExpanded(!sideNavigation.getExpanded());

        },

        onCollapseAll:function(){
          this._treeModel.collapseAll()
        },


        onCollapseSelection:function(){
          this._treeModel.collapse(this._treeModel.getSelectedIndices());
        },
        onExpandFirstLevel:function(){
          this._treeModel.expandToLevel(1);
        },
        onExpandSelection:function(){
          this._treeModel.expand(this._treeModel.getSelectedIndices())
        }

      ,
      loadFragment:function(){
          if(!this._oDailog){
            this._oDailog=Fragment.load({
              name:"country.fragment.BusyDialog",
              controller:this
            }).then(function(oDependent){
                this.getView().addDependent(oDependent);
                return oDependent;
            }.bind(this)); 
          }
          this._oDailog.then(function(oDependent){
            oDependent.open();
            //this._simulateCall();
          }.bind(this))
      },

      _simulateCall:function(){
        setTimeout(function(){
          this._oDailog.then(function(oDependent){
            oDependent.close();
          })
        }.bind(this),3000)
      },


      closeDailog:function(){
        this._oDailog.then(function(oDependent){
          oDependent.close();
        });
      }
	});
});