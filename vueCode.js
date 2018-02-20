var btypear = [];
var bcostar = [];
var ttypear = [];
var tcostar = [];
var displaymenu = false;
var total = 0;
             
 Vue.use(VueMaterial);
var app=new Vue({
                
                
				el:  '#app',
                mounted:function(){
                    this.getdata();
                },
                
                
                data: {
                    // Variables for Vue
					
                    batterDisplay:  [], toppingDisplay: [],
                    orders: [],         toppinglist: [],
                    
                    battertype: '', amount: '', toppingsstr: '',
                    
                    battercost: 0,      toppingscost: 0,
                    perdonutcost: 0,    donutamount: 0,
                    overallcost: 0,     fullordercost: 0,

                    checkedtoppings: [],
                    ordtoppingsindex: [], 
                    ordtopcostindex: [], 
                    
                    orderarray:[],
                    allordersar: [],
                    
                    tableresults: [],
                    
                    donutordertotal: 1,
                    totalcost: 0.00
                    
                    
                },
                
	methods: {
                    
                    /**
                        getdata
                        Retrieves the data from the json donut information file and commits it to
                        the form display and data 
                    **/
                        getdata: function()
					{
						var self=this;
						//var file2Fetch = "data1.json";
                        var file2Fetch = "donuts.json";
						$.get(file2Fetch, function(resp)
						{   
							self.batterDisplay=resp.batters;
                            for (i = 0; i < self.batterDisplay.length; i++) { 
                                btypear[i] = self.batterDisplay[i].type;
                                bcostar[i] = self.batterDisplay[i].cost;
                            }
                            
                            self.toppingDisplay=resp.topping;
                            for (i = 0; i < self.toppingDisplay.length; i++) { 
                                ttypear[i] = self.toppingDisplay[i].type;
                                tcostar[i] = self.toppingDisplay[i].cost;
                                
                            }
						})
					},
                    
                    
                    
                    /**
                        getreciept
                        Adds information for the printing of the reciept
                    **/    
                    getreciept: function(){
                        this.dis4();
                        this.tableresults.push("_______________________");
                        this.addtable();
                        this.tableresults.push("_______________________");
                        

                

                        this.tableresults.push("---TOTAL ORDER COST: $" + this.totalcost.toFixed(2) + "---");
                        
                    
                    },
                    
                    /**
                        addtable
                        THis function renders the order summery for the user
                    **/
                    addtable: function(){
                           
                        var temptablerows = '';
                        console.log(this.allordersar.length);
                        for (i = 0; i < this.allordersar.length; i++){
                                
                            var toppings = this.allordersar[i][3].replace(/,\s*$/, "");
                            var topcost = this.allordersar[i][4].replace(/,\s*$/, "");     
                            
                            var topar = toppings.split(',');
                            var costar = topcost.split(',');
                            var topcostamt = 0.00;
                            
                            for (k = 0; k < costar.length; k++) {
                                topcostamt = parseFloat(topcostamt) + parseFloat(costar[k]);    
                            }
                            
                            topcostamt = topcostamt + parseFloat(this.allordersar[i][2]);
                            
                            var topcombined = "";

                            for (k = 0; k < topar.length; k++) {
                                topcombined = topcombined + topar[k] + " $" + costar[k] + " | " ;   
                            }
                            
                            topcostamt = topcostamt.toFixed(2);
                            
                            var donutotal = topcostamt * this.allordersar[i][0];
                            donutotal = donutotal.toFixed(2);
                            
                            this.tableresults.push("---Donut Order Total: $" + donutotal + "---");
                            this.tableresults.push("Donuts Ordered: " + this.allordersar[i][0] + " | Batter Type: " 
                                                   + this.allordersar[i][1] + " | Batter Cost : $" + this.allordersar[i][2] + " | Cost Per Donut: $" + topcostamt);
                            this.tableresults.push("__Toppings:" + topcombined);
                            this.totalcost = parseFloat(this.totalcost) + parseFloat(donutotal);
                        };                        
                    },
                    
                    
        // Display changing Functions //                   
                    
                    /** 
                        dis1 and dis2
                        Short for display; These methods toggle between the order form and 
                        the donut menu
                    **/
                    dis1: function(){
                        
                            document.getElementById('Menudis').style.display = 'block';
                            document.getElementById('toppingdis').style.display = 'none';
                            document.getElementById('orderbutton').style.display = 'block';
                            document.getElementById('menubutton').style.display = 'none';
                        
                    },
                    
                    dis2: function(){
                        
                            document.getElementById('Menudis').style.display = 'none';
                            document.getElementById('toppingdis').style.display = 'block';
                            document.getElementById('orderbutton').style.display = 'none';
                            document.getElementById('menubutton').style.display = 'block';
                        
                    },
                    
                    /** 
                        dis3
                        toggles from the Amount order to the batter and toppings information
                    **/
                    dis3: function(){
                        
                            document.getElementById('amtform').style.display = 'none';
                            document.getElementById('odrform').style.display = 'block';
                        
                    },
                    
                    /** 
                        dis3
                        toggles from the Amount order to the batter and toppings information
                    **/
                    dis4: function(){
                        
                            document.getElementById('orderspg').style.display = 'none';
                            document.getElementById('recieptpg').style.display = 'block';
                        
                    },
                    
        // End Display changing Functions //  
                                        
                    /**
                        checkcheckboxes
                        This function reviews if a topping choice is present
                        if not than the user is informed that no choice
                        was made by alert menu
                    
                    **/
                    checkcheckboxes: function(toppingString, batterString){
                        var results =  true;
                                                
                        if (batterString == "") {
                            alert("There is no batter type choosen");
                            results =  false;  
                        } 
                        
                        if (toppingString == "") {
                            alert("There are no Toppings choosen");
                            results =  false;  
                        } 
                        
                        return results;
                           
                    },
                    
                    
                    /**
                        checkfornone
                        To keep the amount of element to a minimum, many of the forms
                        have much of their information as attributes of the tag. 
                        Unfortunatly, doing so does not allow for a checkbox value
                        to uncheck all the other boxes if choosen. This method does so
                        if the choice of None for toppings is made. This is done because
                        choosing no toppings forgoes logically means foregoing other 
                        choices.  
                    **/
                    checkfornone: function(toppingString, coststring){
                        
                        var datarray = [];

                        expr = /None/;  
                        if (expr.test(toppingString) == true) {
                            if(toppingString != "None,"){
                                alert("The topping choice you have made contains the 'None' topping choice");       
                            } 
                            toppingString = "None,";
                            coststring = "1,"
                        } 
                        
                        datarray.push(toppingString);
                        datarray.push(coststring);
                        
                        return datarray;    
                    },
                    
                    /** 
                        adddonut
                        This function processes the function of retrieving the data from the 
                        donut order form and processing the needed calculations
                    **/
                    adddonut: function(){ 
                            
                            // Adds topping information to arrays for processing
                            for (i = 0; i < this.checkedtoppings.length; i++) {  
                                for (k = 0; k < this.toppingDisplay.length; k++){
                                        if(this.checkedtoppings[i] == this.toppingDisplay[k].type){
                                            this.ordtoppingsindex.push(this.toppingDisplay[k].type);
                                            this.ordtopcostindex.push(this.toppingDisplay[k].cost);
                                                    }
                                        } 
                                }
                        
                            // Gathers the cost of the Batter
                            this.amount = document.getElementById("batterid");
                            this.battercost = this.amount.options[this.amount.selectedIndex].id;
                        
                            // Gathers the type and Cost of the toppings for lists
                            for (i = 0; i < this.ordtoppingsindex.length; i++){
                                this.toppingscost = this.toppingscost + parseFloat(this.ordtopcostindex[i]) + ",";
                                this.toppingsstr = this.toppingsstr + this.ordtoppingsindex[i] + ",";
                                }
                            
                            // Gathers the cost for a donut
                            this.amount = document.getElementById("amtid");
                            this.donutamount = this.amount.options[this.amount.selectedIndex].id;
                        
                            // Gathers the type of batter
                            this.amount = document.getElementById("batterid");
                            this.battertype = this.amount.options[this.amount.selectedIndex].text;
                        
                            // Calls a function to check if the checkboxes are pmty
                            var isnotempty = this.checkcheckboxes(this.toppingsstr, this.battertype);
                        
                            if(isnotempty == true)    {
                                    
                                    // Checks if the topping choice is "None".
                                    var checkedtop = this.checkfornone(this.toppingsstr, this.toppingscost);
                    
                                    // Adds all gathered values into an array object for final order print out
                                    this.orderarray = [this.donutamount , this.battertype, this.battercost, checkedtop[0], checkedtop[1]];
                                    this.allordersar.push(this.orderarray);

                                    // Variable initialization          ----
                                    this.ordtoppingsindex = []; this.ordtopcostindex = [];

                                    this.orderarray = [];       this.toppingsstr = "";
                                    // END Variable initialization      ----  
                                    
                                
                                    // Note: This BLock of code calculates final costs        
                                        this.amount = document.getElementById("amtid");
                                        this.donutamount = this.amount.options[this.amount.selectedIndex].id;

                                        this.amount = document.getElementById("batterid");
                                        this.battercost = parseFloat(this.amount.options[this.amount.selectedIndex].id);
                                        this.perdonutcost = parseFloat(this.battercost) + parseFloat(this.toppingscost);
                                        this.overallcost = this.perdonutcost.toFixed(2) * this.donutamount;
                                        this.fullordercost = this.fullordercost + (this.perdonutcost.toFixed(2) * this.donutamount);

                                    //Initialize the cost of toppings
                                    this.toppingscost = 0;
                                
                                    // Restore order details for next donut order
                                    this.addrest();
                                
                                    // alerts that the donut order was placed
                        
                                    alert("Donut Amount: " + this.donutamount + " Battertype: " + this.battertype + " Toppings " 
                                          + rtrim(checkedtop[0], ',') );
                                
                                                    }
                            },
                    
                        addrest: function(){                            
                            document.getElementById('amtform').style.display = 'block';
                            document.getElementById('odrform').style.display = 'none';
                            
                            $('input:checkbox').removeAttr('checked');
                            
                            document.getElementById("1.00").selected = "true";
                            document.getElementById("1").selected = "true";
                        }
                    }  
});