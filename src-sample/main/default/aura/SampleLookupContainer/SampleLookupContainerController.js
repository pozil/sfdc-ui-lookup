({
    lookupSearch : function(component, event, helper) {
        // Get the SampleLookupController.search server side action
        const serverSearchAction = component.get('c.search');
        // Passes the action to the Lookup component by calling the search method
        component.find('lookup').search(serverSearchAction);
    },

    onSubmit: function(component, e, helper) {
        const selection = component.get('v.selection');

        if (!selection.length) {
            component.set('v.errors', [
                { message: 'You must make a selection before submitting!' },
                { message: 'Please make a selection and try again.' }
            ]);
        } else {
            alert('Success! The form was submitted.');
        }
    },

    clearErrorsOnChange: function(component, e, helper) {
        const selection = component.get('v.selection');
        const errors = component.get('v.errors');

        if (selection.length && errors.length) {
            component.set('v.errors', []);
        }
    }
})
