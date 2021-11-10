sap.ui.define([], function() {
	                "use strict";

                    return {

                        selectTagColor:function(countryCode,countryName){
                            switch(countryCode){
                                case "USA":
                                    return 8;
                                case "CAN":
                                    return 9;
                                case "GBR":
                                    return 6
                                default:
                                    return 2;
                                
                            }
                        },

                        setStatus:function(quantity){
                                if(quantity>0){
                                    return "Present";
                                }
                                return "Not Present";
                        },

                        standardItemInfo:function(oQuantity){
                            if(oQuantity>0){
                                return "Present";
                            }
                            return "Not Present";
                        },

                        standardItemInfoState:function(oQuantity){
                            if(oQuantity>0){
                                return "Success";
                            }
                            return "Error";
                        },

                        displayHighlight:function(oQuantity){
                            if(oQuantity>0){
                                return "Success";
                            }
                            return "Error";
                        }


                    };
                });
