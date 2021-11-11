sap.ui.define([
	"sap/ui/core/mvc/Controller",
  "sap/m/MessageBox",
  "../model/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/m/Dialog",
	"sap/m/StandardListItem",
  "sap/m/List",
	"sap/m/Button",
  "sap/ui/core/Core",
	"sap/ui/core/Message",
  "sap/m/MessageToast",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/ViewSettingsFilterItem",
	"sap/m/ViewSettingsItem",
  "sap/ui/core/CustomData",
  "sap/m/NotificationListItem",
  "sap/ui/table/library",
  "sap/ui/unified/DateRange",
  "sap/m/ColorPalettePopover"

], function(
	Controller,
	MessageBox,
	formatter,
	JSONModel,
	Fragment,
	Dialog,
	StandardListItem,
	List,
	Button,
	Core,
	Message,
	MessageToast,
	Filter,
	FilterOperator,
	ViewSettingsFilterItem,
	ViewSettingsItem,
	CustomData,
	NotificationListItem,
	library,
	DateRange,
	ColorPalettePopover,
	
) {
	"use strict";

  // var urlHelper=library.urlHelper;
  // var SortOrder=sortLibrary.SortOrder;
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

            this.getView().setModel(new JSONModel(),"checkbox");
            this.getView().setModel(this.oJSONModel,"dataModel");


            var pageLayout=this.getView().byId("pageLayout");
            var pageSection=this.getView().byId("Actions")
            pageLayout.setSelectedSection(pageSection);      
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
        var name=oButton.data("name");
        
        console.log(title);
        console.log(name);
        oDailog.setTitle(title);
        oDailog.setMultiSelect(multiSelect=="true"?true:false);
        oDailog.setNoDataText(noDataText);
        oDailog.setRememberSelections(rememberSelections=="true"?true:false);

      },

      tableDialog:function(oEvent){
        var oSource=oEvent.getSource();
        if(!this._tableDialog){
          this._tableDialog=Fragment.load({
            name:"country.fragment.tableDialog",
            controller:this
          }).then(function(oTableDialog){
            this.getView().addDependent(oTableDialog);
            return oTableDialog;
          }.bind(this))
        };
        this._tableDialog.then(function(oDailog){
          this._setTableConfig(oDailog,oSource)
          oDailog.open();
        }.bind(this));
      },

      _setTableConfig:function(oDailog,oSource){
        var remember=oSource.data("remember");
        var multi=oSource.data("mutli");
        var draggable=oSource.data("draggable");
        var resizable=oSource.data("resizable");
        oDailog.setRememberSelections(remember=="true"?true:false);
        oDailog.setMultiSelect(multi=="true"?true:false);
        oDailog.setDraggable(draggable=="true"?true:false);
        oDailog.setResizable(resizable=="true"?true:false);
      },

      onsearchtable:function(oEvent){
       var value= oEvent.getParameter("value");
       var afilters=[];
       if(value){
        afilters.push(new Filter("countryCode",FilterOperator.Contains,value));
       }
       var items=Core.byId("tableDailog").getBinding("items");
       items.filter(afilters);
      },

      viewsettings:function(oEvent){
       this._presetValue(oEvent,"sort")
      },

      _presetValue:function(oEvent,page){
        if(!this._tableDialog){
          this._tableDialog=Fragment.load({
            name:"country.fragment.viewSettings",
            controller:this
          }).then(function(oTableDialog){
            this.getView().addDependent(oTableDialog);
            return oTableDialog;
          }.bind(this))
        };
        this._tableDialog.then(function(oDailog){
          this._presetFilter(oDailog);
          oDailog.open(page);
        }.bind(this));
      },

      _presetFilter:function(oDialog){
        var filter1=[
          new Filter("limit", FilterOperator.BT, 10, 100),
          new Filter("name", FilterOperator.Contains, "o"),
          new Filter("status", FilterOperator.EQ, "D")
        ];
        oDialog.addPresetFilterItem(new ViewSettingsItem({
            key:"test",
            value:"test",
            customData:new CustomData({
              key:"filter",
              value:filter1
            })
        }));
        
      },

      displayInfo:function(oEvent){
        var detailTable=this.getView().byId("idDetailTable");
        var showToolbar=oEvent.getSource().getPressed();
        detailTable.getInfoToolbar().setVisible(!showToolbar);
      }
,

		actionPressed: function(oEvent) {
			console.log("object pressed");
		}	,
  
    createPost:function(oEvent){
      var value=oEvent.getParameter("value");
      console.log(value);
    },

    detailsPressGrid:function(){
      alert("detailsPRess");
    },

    pressGrid:function(){
      alert("pressGrid")
    },

    loadactionsheet:function(oEvent){
        var oSource=oEvent.getSource();
        this._actionsheet=Fragment.load({
          name:"country.fragment.Actionsheet",
          controller:this
        }).then(function(oDailog){
            this.getView().addDependent(oDailog);
            return oDailog;
        }.bind(this));  

        this._actionsheet.then(function(oModel){
          oModel.openBy(oSource);
        });
    },

    showselected:function(){
          var girdTables=this.getView().byId("myGridTable");
          var selectedIndex=girdTables.getSelectedIndices();
          if(selectedIndex<0){
            MessageToast.show("no data selected");
            return;
          }
          selectedIndex.forEach(function(index){
            var content= girdTables.getContextByIndex(index);
            console.log(content)
          });
         
    },

    
    showByIndex:function(){

    },

    clearselection:function(){

    },

    clearsort:function(){
        var gridTable=this.getView().byId("myGridTable");
        var bindingDetails=gridTable.getBinding();
        bindingDetails.sort(null);
        this.clearAllTheColumns();

    },

    clearAllTheColumns:function(){
      var gridTable=this.getView().byId("myGridTable");
      gridTable.getColumns().forEach(function(oColumn){
        oColumn.setSorted(false);
        oColumn.setFiltered(null)
      });
      gridTable.getBinding().filter(null);
    },

    DeafaultSortByNameAndId:function(){
      var productName=this.getView().byId("ProductName");
      var productId=this.getView().byId("ProductId");
      var oTable=this.getView().byId("myGridTable");
      this.clearAllTheColumns();
      oTable.sort(productName,SortOrder.Ascending, false);
      oTable.sort(productId,SortOrder.Ascending, true);
      productName.setSortOrder(SortOrder.Ascending);
      productId.setSortOrder(SortOrder.Ascending);
    },

    processdata:function(oEvent){
      var text=oEvent.getSource().getText();
      MessageBox.information(text);
    },

    onToggleCollapse:function(oEvent){
      var notificationGroup=oEvent.getSource();
      var notificationListItem=new NotificationListItem({
								    description:"Lorem ipsum dol",
                    authorPicture:"sap-icon://add",
                    title:"New Order",
                    priority:"High",
                    authorPicture:"sap-icon://add",	
                    datetime:"1 hour",
                    authorAvatarColor:"Accent8"
      });
      
      var oButton=new Button({
        text:"click me",
        press:function(){
          MessageBox.information("test") 
        }
      });

      notificationListItem.addButton(oButton);
      notificationGroup.addItem(notificationListItem);
    }

    ,

    collapseAll:function(){
      var tressApp=this.getView().byId("treeApp");
      tressApp.collapseAll();
    },

    collapseSelected:function(oEvent){
      var tressApp=this.getView().byId("treeApp");
      var selectedIndices=tressApp.getSelectedIndices();
      tressApp.collapse(selectedIndices)
    },

    expandLevel:function(oEvent){
      var tressApp=this.getView().byId("treeApp");
      tressApp.expandToLevel(2);
    },

    expandAll:function(){
      var tressApp=this.getView().byId("treeApp");
      var selectedIndices=tressApp.getSelectedIndices();
      tressApp.expand(selectedIndices)

    },

    computetoday:function(){
         var calenderInterval=this.getView().byId("CalenderIntervalId");
         calenderInterval.removeAllSelectedDates();

        var dateRange=new DateRange({
          startDate:new  Date()
        })
         calenderInterval.addSelectedDate(dateRange);
         this.displayCurrentDate(dateRange);

    },

    displayCurrentDate:function(dateRange){
     var txtObject= this.getView().byId("txtField");
     txtObject.setText(dateRange.getStartDate());
    },

    changeDateToSelected:function(oEvent){
      var calenderInterval=oEvent.getSource();
      var dateRange=calenderInterval.getSelectedDates()[0];
      this.displayCurrentDate(dateRange);

    },


    onSelect:function(oEvent){
      var selected=oEvent.getParameter("selected");
      this.getView().getModel("checkbox").setData({
              c1:selected,
              c2:selected,
              c3:selected,
      });
    },

    loadColorPalltee:function(oEvent){
      var oButton=oEvent.getSource();
      if(!this.colorPalette){
      this.colorPalette=new ColorPalettePopover("colorPalletteId",{
        defaultColor:"black",
        showDefaultColorButton:true,
        colorSelect:this.showColor.bind(this)
      });
    }

      this.colorPalette.openBy(oButton);
    },

    showColor:function(oselected){
      MessageBox.show(oselected.getParameter("value"))
    }

  



  });
    
	// <m:NotificationListItem 
	// 								authorPicture="sap-icon://add"
	// 								title="New Order" unread="true"
	// 							    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc. Mauris non elementum orci, ut sollicitudin ligula. Vestibulum in ligula imperdiet, posuere tortor id, dictum nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc. Mauris non elementum orci, ut sollicitudin ligula. Vestibulum in ligula imperdiet, posuere tortor id, dictum nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc. Mauris non elementum orci, ut sollicitudin ligula. Vestibulum in ligula imperdiet, posuere tortor id, dictum nunc.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc. Mauris non elementum orci, ut sollicitudin ligula. Vestibulum in ligula imperdiet, posuere tortor id, dictum nunc."
	// 								datetime="1 hour"
	// 								authorAvatarColor="Accent8" 
	// 								showCloseButton="true"
	// 								priority="High"
	// 								>
	// 									<m:buttons>
	// 										<m:Button text="accept" press=".processdata"></m:Button>
	// 										<m:Button text="delete" press=".processdata"></m:Button>
	// 									</m:buttons>
	// 									<m:processingMessage>
	// 										<m:MessageStrip text="message strip"></m:MessageStrip>
	// 									</m:processingMessage>
	// 								</m:NotificationListItem>
	
   


});

