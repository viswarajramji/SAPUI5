sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "sap/f/library",
  "../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/m/Dialog",
	"sap/m/StandardListItem",
  "sap/m/List",
	"sap/m/Button",
  "sap/ui/core/Core",
	"sap/ui/core/Message",
  "sap/m/MessageToast"
], function(
	Controller,
	MessageBox,
	library,
	formatter,
	JSONModel,
	Fragment,
	Dialog,
	StandardListItem,
	List,
	Button,
	Core,
	Message,
	MessageToast
) {
	"use strict";

  var urlHelper=library.urlHelper;
	return Controller.extend("country.controller.Details", {
        /**
         * @override
         */
         oDataInitial: {
          // Static data
          Items: [
            {
              columnKey: "productId",
              text: "Product ID"
            }, {
              columnKey: "name",
              text: "Name"
            }, {
              columnKey: "category",
              text: "Category"
            }, {
              columnKey: "supplierName",
              text: "Supplier Name"
            }, {
              columnKey: "description",
              text: "Description"
            }, {
              columnKey: "weightMeasure",
              text: "Weight Measure"
            }, {
              columnKey: "weightUnit",
              text: "WeightUnit"
            }, {
              columnKey: "price",
              text: "Price"
            }, {
              columnKey: "currencyCode",
              text: "Currency Code"
            }, {
              columnKey: "status",
              text: "Status"
            }, {
              columnKey: "quantity",
              text: "Quantity"
            }, {
              columnKey: "uom",
              text: "UoM"
            }, {
              columnKey: "width",
              text: "Width"
            }, {
              columnKey: "depth",
              text: "Depth"
            }, {
              columnKey: "height",
              text: "Height"
            }, {
              columnKey: "dimUnit",
              text: "DimUnit"
            }, {
              columnKey: "productPicUrl",
              text: "ProductPicUrl"
            }
          ],
          // Runtime data
          ColumnsItems: [
            {
              columnKey: "name",
              visible: true,
              index: 0
            }, {
              columnKey: "category",
              visible: true,
              index: 1
            }, {
              columnKey: "productId",
              visible: false
            }, {
              columnKey: "supplierName",
              visible: false
            }, {
              columnKey: "description",
              visible: false
            }, {
              columnKey: "weightMeasure",
              visible: false
            }, {
              columnKey: "weightUnit",
              visible: false
            }, {
              columnKey: "price",
              visible: false
            }, {
              columnKey: "currencyCode",
              visible: false
            }, {
              columnKey: "status",
              visible: false
            }, {
              columnKey: "quantity",
              visible: false
            }, {
              columnKey: "uom",
              visible: false
            }, {
              columnKey: "width",
              visible: false
            }, {
              columnKey: "depth",
              visible: false
            }, {
              columnKey: "height",
              visible: false
            }, {
              columnKey: "dimUnit",
              visible: false
            }, {
              columnKey: "productPicUrl",
              visible: false
            }
          ],
          ShowResetEnabled: false
        },
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

            
            this.oJSONModel = new JSONModel(this.oDataInitial);

  
            this.getView().setModel(this.oJSONModel,"dataModel");


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
      },

      loadFragmentLight:function(){
        var busyDailog=this.getView().byId("busyDailog");
        busyDailog.open();
        setTimeout(function(){
          busyDailog.close()
        },3000);
      },
      dailogPress:function(){
        if(!this._oDailog){
          this._oDailog=Fragment.load({
            name:"country.fragment.DialogBox",
            controller:this
          }).then(function(oDependent){
            this.getView().addDependent(oDependent);
            return oDependent;
          }.bind(this))
        }
        this._oDailog.then(function(oDependent){
          oDependent.open();
        })
      },

      submit:function(){
        this._oDailog.then(function(oDependent){
           var  values=Core.byId("comments").getValue();
           console.log(values);
           MessageBox.show(values)
           oDependent.close();
           
        }.bind(this))
      },

      cancel:function(){
        this._oDailog.then(function(oDependent){
          oDependent.close();
        })
      },

      enableSubmit:function(oValue){
        var value=oValue.getSource().getValue();
        Core.byId("coreSubmit").setEnabled(value.length>0?true:false);
      },

      MessageBox1:function(){
        var json="<H1>hello world</H1>"
        MessageBox.information("test",{
          details:json,
          styleClass: "sapUiResponsivePadding--header sapUiResponsivePadding--content sapUiResponsivePadding--footer",
          actions: ["OK","CANCEL","HERO",MessageBox.Action.RETRY],
          initialFocus:MessageBox.Action.RETRY,
          SuccessAction: "OK",
          onClose:function(sAction){
            if(sAction==MessageBox.Action.RETRY){
              MessageBox.alert("you have pressed ok ")
            }
          }
        })
      },

      toggle:function(oEvent){
        this.getView().byId("messagepop").toggle(oEvent.getSource())
      },

      MessageToast:function(){
        MessageToast.show("hello world");
      },

      p13ndailog:function(){
        if(!this._p13Dailog){
          this._p13Dailog=Fragment.load({
            name:"country.fragment.PP3Dialog",
            controller:this
          }).then(function(oDependents){
              this.getView().addDependent(oDependents);
              return oDependents;
          }.bind(this));
        }
        this._p13Dailog.then(function(oDependent){
          oDependent.open();
        });
      },
      
      popover:function(oEvent){
        var oButton = oEvent.getSource();
        if(!this._popover){
          this._popover=Fragment.load({
            id:this.getView().getId(),
            name:"country.fragment.Popover",
            controller:this
          }).then(function(oDependent){
              this.getView().addDependent(oDependent);
              return oDependent;
          }.bind(this));
        }

        this._popover.then(function(oDependent){
          oDependent.openBy(oButton);
        })
      },

      quickview:function(oEvent){
        var oView=this.getView();
        var oSource=oEvent.getSource();

        if(!this._quickView){
          this._quickView=Fragment.load({
            id:oView.getId(),
            name:"country.fragment.QuickView",
            controller:this
          }).then(function(dependent){
            oView.addDependent(dependent);
            return dependent;
          }.bind(this));  
        }

        this._quickView.then(function(oquick){
          oquick.openBy(oSource);
        })
      },

      selectDailog:function(oEvent){
        var oView=this.getView();
        var oButton=oEvent.getSource();
        if(!this._selectDialog){
          this._selectDialog=Fragment.load({
            name:"country.fragment.SelectDailog",
            controller:this
          }).then(function(oDailog){
            oView.addDependent(oDailog);
            return oDailog;
          }.bind(this))
        }

        this._selectDialog.then(function(oDailog){
          this._setConfigData(oDailog,oButton)
          oDailog.open();
        }.bind(this))
      },

      _setConfigData:function(oDailog,oButton){
        var title= oButton.data("title");
        var multiSelect= oButton.data("multiSelect");
        var noDataText= oButton.data("noDataText");
        var rememberSelections= oButton.data("rememberSelections");
        
        console.log(title);

        oDailog.setTitle(title);
        oDailog.setMultiSelect(multiSelect=="true"?true:false);
        oDailog.setNoDataText(noDataText);
        oDailog.setRememberSelections(rememberSelections=="true"?true:false);

      }
      
	});
});

