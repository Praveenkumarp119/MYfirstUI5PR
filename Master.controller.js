sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("nav.Practice.controller.Master", {
		onInit: function () {
			debugger;
        var router = sap.ui.core.UIComponent.getRouterFor(this);
		router.attachRoutePatternMatched(this._handleRouteMatched,this);
		},
			onCreate: function(){
			var router = sap.ui.core.UIComponent.getRouterFor(this);
         	router.navTo("Create",true);
		},
		_handleRouteMatched : function(oevnt)
	{
		if(oevnt.getParameter("name") === "master-target"){
			var busyDialog = new sap.m.BusyDialog();
			
			var that = this;
			debugger;
			this.getOwnerComponent().getModel().read("/prdataSet", {
				async : false,
				success : function(oData, oResponse) {
					debugger;
					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					that.getView().byId("ID_LIST_MASTER").setModel(formmodel,"MasterModel");
					var i="0";
					var router = sap.ui.core.UIComponent.getRouterFor(that);
				router.navTo("detail",{cpath:i},true);
				},
				error:function(error){
					debugger;
					//busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			

		}
	},
	onEmpListPress : function(evt) {
		console.log(evt);
		var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
		var empIndex=evt.getParameters().listItem.getBindingContext("MasterModel").getObject().Prn;
		oRouter.navTo("detail",{cpath:empIndex},true);
	
	}
	});
});
