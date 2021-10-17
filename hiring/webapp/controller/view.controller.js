sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,
	JSONModel) {
		"use strict";

		return Controller.extend("hiring.controller.view", {
			onInit: function () {

			  var defaultItem=new sap.ui.core.defaultItem({
				  key:"CAN",
				  value:"Canada"
			  });

			 

			  var userModel=new JSONModel({
				  "name":"",
				  "gender":false,
				  "country":defaultItem
			  });
			  this.getView().setModel(userModel,"oUserModel");
			},

			save:function(){
				var userModel=this.getView().getModel("oUserModel");
				var userJSONModel=this.getView().getModel("userModel")
				var jsonObject=JSON.parse(userJSONModel.getJSON());
				jsonObject.UsersList.push(
					{
						"UserName": userModel.getProperty("/name"),
						"Gender":  userModel.getProperty("/gender")===false ? "Male" : "Female",
						"Country": userModel.getProperty("/country")
				    }
				);
				this.getView().setModel(new JSONModel(jsonObject),"userModel");
			}

			
		});
	});
