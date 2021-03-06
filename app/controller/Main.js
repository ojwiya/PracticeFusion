/**
 * This Controller will execute actions based on events over the Main view
 */
Ext.define('MyApp.controller.Main', {
	extend: 'Ext.app.Controller',
	
	config : {

	    stores: ['Employees', 'Companies'],

	    refs: {
            //this is the selectfield that contains the property we want to filter by.
	    	searchOption: 'main titlebar selectfield[name=where]',
            coolTabPanel: 'cooltabpanel'
	    },

		control: {
			//when main view is displayed, load the employees store.
			'main': {
				'activate': 'loadEmployees'
			},
			'main button[action=foo]': {
				tap: 'doSomething'
			},
			//when user taps on the button then make the search field focused.
			'main button[action=focussearch]': {
				'tap': 'focusSearchInput'
			},
			'main dataitem button[action=bar]': {
				'tap': 'doSomethingOnButtonItem'
			},
			//when user types into the search textfield then filter employees list.
			'main titlebar textfield[name=filter]': {
				'keyup': 'filterEmployeeList'
			},
            'cooltabpanel': {
                'activate': 'populateTabPanel'
            }
		}
	},

	/**
	 * Read the value from the textfield and filter the list based on the search term over the property 
	 * selected on the searchOption ref, in this case a select field with Employee's model properties.
	 */
	filterEmployeeList: function(textfield, event, eOpts){
		var me = this,
			what = textfield.getValue(),
			where = me.getSearchOption().getValue(),
			store = Ext.getStore('Employees');

		if(what){
			if('company' === where){
				store.filterBy(function(employee, id){
					var whatExp = new RegExp('^'+what+'+','i'),
						company = employee.getCompany().get('name');
					return company.match(whatExp);
				});
			}else{
				store.filter(where, what, true, false);
			}
		}else{
			store.clearFilter();
		}

	},


	/**
	 * Load te employees store using the store proxy configuration
	 */
	loadEmployees: function(){
		Ext.getStore('Employees').load();
	},

	/**
	 * Grab the textfield for search and make focus on it so tablet will display the keyboard.
	 */
	focusSearchInput: function(btn, e, eOpts){
		//we can go up and down from the btn reference or we can create a new ref for the textfield.
		var searchField = btn.up('titlebar').down('textfield[name=filter]');

		searchField.focus();
	},


	doSomething: function(){
		var employees = Ext.getStore('Employees'),
			employee = employees.getAt(0),
			company = employee.getCompany();

		console.log('First employee record', employee);
		console.log('Employee first name', employee.get('first'));
		console.log('Employee last name', employee.get('last'));

		console.log('Employee company record', company);
		console.log('Employee company name', company.get('name'));

	},

	doSomethingOnButtonItem: function(btn, e, eOpts){
		//getting the record of a given list item
		var employee = btn.up('dataitem').getRecord();
		console.log('button tap for record', employee);
		console.log('name for employee', employee.get('first'));

	},

    populateTabPanel: function() {
        var ctp = this.getCoolTabPanel();
        var firstTab = Ext.create('Ext.Container', {cls: 'generalContainer', title: 'sup'});
        var secondTab= Ext.create('Ext.Container', {cls: 'generalContainer', title: 'yo'});

        var secondTextArea = Ext.create('MyApp.view.Textarea', {value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            maxRows: 4, width: 500, cls:'hello'});

        var firstTextArea = Ext.create('MyApp.view.Textarea', {value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' +
            'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' ,
       maxRows: 4, width: 500, cls:'hello'});

        firstTab.add(secondTextArea);
        secondTab.add(firstTextArea);

        ctp.add(firstTab);
        ctp.add(secondTab);
    }

});