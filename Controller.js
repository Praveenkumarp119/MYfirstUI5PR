sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("nav.Practice.controller.Create", {
		onInit: function () {
			debugger;
			this.EmpDetails = [];
			// alert("onInit function called");

		},

		onClick: function () {
			this.getView().byId("panelreport").setExpanded(!this.getView().byId("panelreport").getExpanded());
		},
		handleValueHelp: function (oEvent) {
			debugger;

			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.project",
					this
				);
				this.getView().addDependent(this._valueHelpDialog);
			}

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this._valueHelpDialog.open(sInputValue);
		},
		onAdd: function (oEvent) {

			debugger;
			var form_data = { //here using form values
				"ino": "",
				"met": "",
				"txt": "",
				"qty": "",
				"reqr": "",
				"date": ""
			};

			//var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this._valueDialog) {
				this._valueDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.add",
					this
				);
				this.getView().addDependent(this._valueDialog);
			}

			var formModel = new sap.ui.model.json.JSONModel(form_data);
			sap.ui.getCore().byId("emp2").setModel(formModel);
			// this.EmpDetails.push(form_data);

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this._valueDialog.open();

			var sino = sap.ui.getCore().byId("ino").setValue("");
			var smaterial = sap.ui.getCore().byId("mateial").setValue(""); //this code shows blank
			//	var stext = sap.ui.getCore().byId("text").setValue("");
			var sqty = sap.ui.getCore().byId("qty").setValue("");
			var sreq = sap.ui.getCore().byId("req").setValue("");
			var sDP1 = sap.ui.getCore().byId("DP1").setValue("");
			var stext = sap.ui.getCore().byId("text").setValue("");
			var sacc = sap.ui.getCore().byId("acc").setValue("");
			var sacc = sap.ui.getCore().byId("acc").setValue("");
			var sacc = sap.ui.getCore().byId("acc").setValue("");
	    	var sacc = sap.ui.getCore().byId("acc").setValue("");

		},

		onEdit: function (oEvent) {
			debugger;
			var eindex = oEvent.getSource().getParent().getId().substr(-1);
			var abta = this.EmpDetails[eindex];
			this.editIndicator = eindex;

			var formModel = new sap.ui.model.json.JSONModel(abta);

			if (!this._valueDialog) {
				this._valueDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.add",
					this
				);
				this.getView().addDependent(this._valueDialog);
			}
			sap.ui.getCore().byId("emp2").setModel(formModel);
			this._valueDialog.open();

			//var sInputValue = oEvent.getSource().getValue();

			//this.inputId = oEvent.getSource().getId();
			// create value help dialog
			/*	if (!this._valueDialog) {
					this._valueDialog = sap.ui.xmlfragment(
						"nav.Practice.fragments.",
						this
					);
					this.getView().addDependent(this._valueDialog);
				}*/
			//var myModel = this.getOwnerComponent().getModel("JSON");

			//	sap.ui.getCore().setModel(myModel);
			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value

		},

		onDelete: function (evt) {
			console.log(evt);
			var eindex = parseInt(evt.mParameters.id.substr(-1));
			delete this.EmpDetails[eindex];

			this.EmpDetails = this.EmpDetails.filter(function (element) {
				return element !== undefined;
			});

			var abta = {
				results: this.EmpDetails
			};
			var tabmodel = new sap.ui.model.json.JSONModel(abta);
			this.getView().byId("table1").setModel(tabmodel);
			this.editIndicator = undefined;
		},

		onSave: function (event) {

                 debugger;
			
				
				
			var sino = sap.ui.getCore().byId("ino").getValue();
			var smaterial = sap.ui.getCore().byId("mateial").getValue();
			var splant = sap.ui.getCore().byId("plant").getValue();
			var sqty = sap.ui.getCore().byId("qty").getValue();
			//var sreq = sap.ui.getCore().byId("req").getValue();
			var sDP1 = sap.ui.getCore().byId("DP1").getValue();
			var sacc = sap.ui.getCore().byId("acc").getValue();
			
         if(sino!="" &&  smaterial!=""  &&   splant!=""  &&   sqty!="" &&    sDP1!=""  &&  sacc!="" ){

			var Emp = {
				//property name = binding name
				"Ino": sino,
				"met": smaterial,
				"plantt": splant,
				"qty": sqty,
				//"reqr": sreq,
				"date": sDP1,
				"acc" : sacc,
				"accassign": {}
				
			};
		
			if (this.editIndicator) {
				this.EmpDetails[this.editIndicator] = Emp;
			} else {
				this.EmpDetails.push(Emp);
			}

			var ata = {
				results: this.EmpDetails
			};

			var tabmodel = new sap.ui.model.json.JSONModel(ata);
			this.getView().byId("table1").setModel(tabmodel);
			this.editIndicator = undefined;
			this._valueDialog.close();

				
				
				}
				else if (!sino) {
					sap.ui.getCore().byId("ino").setValueState("Error");
					sap.m.MessageToast.show("Enter the Item no!");
								
			if(!smaterial){ 
					sap.ui.getCore().byId("mateial").setValueState("Error");
				sap.m.MessageToast.show("Enter the Material No!");
			}
			if(!splant){
				sap.ui.getCore().byId("plant").setValueState("Error");
				sap.m.MessageToast.show("Enter the valid text!");
			}
			if(!sqty){
					sap.ui.getCore().byId("qty").setValueState("Error");
				sap.m.MessageToast.show("Enter the Quantity!");
			}
		
				if(!sDP1){
				sap.ui.getCore().byId("DP1").setValueState("Error");
				sap.m.MessageToast.show("Enter the Plant!");
			}
			if(!sacc){
				sap.ui.getCore().byId("acc").setValueState("Error");
				sap.m.MessageToast.show("Enter the valid input!");
			}
			
			

		}
		
		},
		
		

		onExpand: function (evt) {

			debugger;
			this.eindex = parseInt(evt.mParameters.id.substr(-1));
			this.getView().byId("panelreport").setExpanded(true);
			var itemjson = this.EmpDetails[this.eindex];
			var oitemmodel = new sap.ui.model.json.JSONModel(itemjson);
			this.getView().byId("SimpleFormDisplay480_12120Dual").setModel(oitemmodel, "accmodel");

		},
		onAccept: function (oEvent) {
			debugger;
			var accassign = {

				"qt": this.getView().byId("qat").getValue(),
				"dt": this.getView().byId("rdt").getValue()
			};
			this.empDetails[this.eindex].accassign = accassign;
		},

		onExit: function () {
			this._valueDialog.close();
		},
		onBack: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.navTo("master-target", true);
		},
		matValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.mvalueHelpDialog) {
				this.mvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.material",
					this
				);
				this.getView().addDependent(this.mvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhMnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("mat1").setModel(formmodel);
					//	sap.ui.getCore().byId("mat1").getModel("form").refresh(true);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this.mvalueHelpDialog.open(sInputValue);
		},
		matValueHelpClose: function (oEvent) {

			// reset the filter
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([]);

			var aContexts = oEvent.getParameter("selectedContexts");
			var i = parseInt(aContexts[0].sPath.substr(-1));

			if (aContexts && aContexts.length) {

				var matno = sap.ui.getCore().byId("mateial");
				var text = sap.ui.getCore().byId("text");
				var unit = sap.ui.getCore().byId("unit");
				var gp = sap.ui.getCore().byId("gp");
				var pg = sap.ui.getCore().byId("pg");

				var smatno = oBinding.oList[i].ZzmNo;
				var stext = oBinding.oList[i].ZzmDescription;
				var sunit = oBinding.oList[i].Zzunit;
				var sgp = oBinding.oList[i].ZzmGroup;
				var spg = oBinding.oList[i].ZzpurchasingG;

				matno.setValue(smatno);
				text.setValue(stext);
				unit.setValue(sunit);
				gp.setValue(sgp);
				pg.setValue(spg);

			}
		},

		plantValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.pvalueHelpDialog) {
				this.pvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.plant",
					this
				);
				this.getView().addDependent(this.pvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhPlnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("plant1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this.pvalueHelpDialog.open(sInputValue);
		},
		plantValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("plant"),
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		storageValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.svalueHelpDialog) {
				this.svalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.storage",
					this
				);
				this.getView().addDependent(this.svalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhSlSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("storage1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});

			// create a filter for the binding
			// this._valueHelpDialog.getBinding("items").filter([new Filter(
			// 	"Name",
			// 	sap.ui.model.FilterOperator.Contains, sInputValue
			// )]);

			// open value help dialog filtered by the input value
			this.svalueHelpDialog.open(sInputValue);
		},
		storageValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("storage"),
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		vendorValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.vvalueHelpDialog) {
				this.vvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.vendor",
					this
				);
				this.getView().addDependent(this.vvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhVnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("vendor1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.vvalueHelpDialog.open(sInputValue);
		},
		vendorValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("vendor"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
				sDescription =oSelectedItem.getDescription();
				oText.setValue(sDescription);
			}
		},

		itemcValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.ivalueHelpDialog) {
				this.ivalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.item",
					this
				);
				this.getView().addDependent(this.ivalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhIcSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("itemc1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.ivalueHelpDialog.open(sInputValue);
		},
		itemcValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("item3"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		accValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.acvalueHelpDialog) {
				this.acvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.acc",
					this
				);
				this.getView().addDependent(this.acvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhAaSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("acc1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.acvalueHelpDialog.open(sInputValue);
		},
		accValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = sap.ui.getCore().byId("acc"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		costValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.covalueHelpDialog) {
				this.covalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.cost",
					this
				);
				this.getView().addDependent(this.covalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhCcSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("cost1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.covalueHelpDialog.open(sInputValue);
		},

		costValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = this.getView().byId("costc"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},

		glaccValueHelp: function (oEvent) {
			var sInputValue = oEvent.getSource().getValue();

			this.inputId = oEvent.getSource().getId();
			// create value help dialog
			if (!this.glvalueHelpDialog) {
				this.glvalueHelpDialog = sap.ui.xmlfragment(
					"nav.Practice.fragments.glacc",
					this
				);
				this.getView().addDependent(this.glvalueHelpDialog);
			}
			var that = this;
			var busyDialog = new sap.m.BusyDialog();
			busyDialog.open();
			this.getOwnerComponent().getModel().read("/ZSrhGlnSet", {
				async: false,
				success: function (oData, oResponse) {

					busyDialog.close();
					var formmodel = new sap.ui.model.json.JSONModel(oData);
					sap.ui.getCore().byId("glacc1").setModel(formmodel);
				},
				error: function (error) {
					busyDialog.close();
					var errorMsg = JSON.parse(error.response.body);
					errorMsg = errorMsg.error.message.value;
					that.errMsg(errorMsg);
				}
			});
			this.glvalueHelpDialog.open(sInputValue);
		},

		glaccValueHelpClose: function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			debugger;
			if (oSelectedItem) {
				var oText = this.getView().byId("gl"), //add fragment id
					sTitle = oSelectedItem.getTitle();
				oText.setValue(sTitle);
			}
		},
		onEnter: function () {
			var that = this;
			var obj = {
				"Prn": this.getView().byId("").getValue(),
				"Inpr": this.getView().byId("ino").getValue(),
				"ZzmNo": this.getView().byId("mateial").getValue(),
				"Srtxt": this.getView().byId("text").getValue(),
				"Zzplant": this.getView().byId("plant").getValue(),
				"Logrt": this.getView().byId("storage").getValue(),
				"Matkl": this.getView().byId("gp").getValue(),
				"Msehi": this.getView().byId("unit").getValue(),
				"Itdd": this.getView().byId("DP1").getValue(),
				"VendorNumber": this.getView().byId("vendor").getValue(),
				"Ekgrp": this.getView().byId("pg").getValue(),
				"Pstyp": this.getView().byId("item3").getValue(),
				"Quant": this.getView().byId("qty").getValue(),
				"Knttp": this.getView().byId("acc").getValue(),
			   	"Runr": this.getView().byId("req").getValue(),
				"RDate": this.getView().byId("oid").getValue(),
				"VPrice": this.getView().byId("oid").getValue(),
				"PrStatus": this.getView().byId("oid").getValue(),

				"DateOfExamination": "2001-01-01T00:00:00",
				"LabNumber": ""
			};
			that.getOwnerComponent().getModel().create("/prdataSet", obj, {
				success: function (oData, OResponse) {
					debugger;
				},
				error: function (err, oResponse) {
					debugger;
				}
			});
		}

	});
});
