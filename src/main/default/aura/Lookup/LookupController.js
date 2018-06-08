({
    search : function(component, event, helper) {
        const action = event.getParam('arguments').serverAction;
        
        action.setParams({
            searchTerm : component.get('v.searchTerm'),
            selectedIds : helper.getSelectedIds(component)
        });

        action.setCallback(this, (response) => {
            const state = response.getState();
            if (state === 'SUCCESS') {
                // Process server success response
                const returnValue = response.getReturnValue();
                component.set('v.searchResults', returnValue);
            }
            else if (state === 'ERROR') {
                // Retrieve the error message sent by the server
                const errors = response.getError();
                let message = 'Unknown error'; // Default error message
                if (errors && Array.isArray(errors) && errors.length > 0) {
                    const error = errors[0];
                    if (typeof error.message != 'undefined') {
                        message = error.message;
                    } else if (typeof error.pageErrors != 'undefined' && Array.isArray(error.pageErrors) && error.pageErrors.length > 0) {
                        const pageError = error.pageErrors[0];
                        if (typeof pageError.message != 'undefined') {
                            message = pageError.message;
                        }
                    }
                }
                // Display error in console
                console.error('Error: '+ message);
                console.error(JSON.stringify(errors));
                // Fire error toast if available (LEX only)
                const toastEvent = $A.get('e.force:showToast');
                if (typeof toastEvent !== 'undefined') {
                    toastEvent.setParams({
                        title : 'Server Error',
                        message : message,
                        type : 'error',
                        mode: 'sticky'
                    });
                    toastEvent.fire();
                }
            }
        });

        action.setStorable(); // Enables client-side cache & makes action abortable
        $A.enqueueAction(action);
    },

    onInput : function(component, event, helper) {
        // Prevent action if selection is not allowed
        if (!helper.isSelectionAllowed(component)) {
            return;
        }
        const newSearchTerm = event.target.value;
        helper.updateSearchTerm(component, newSearchTerm);
    },

    onResultClick : function(component, event, helper) {
        const recordId = event.currentTarget.id;
        helper.selectResult(component, recordId);
    },

    onComboboxClick : function(component, event, helper) {
        // Hide combobox immediatly
        const blurTimeout = component.get('v.blurTimeout');
        if (blurTimeout) {
            clearTimeout(blurTimeout);
        }
        component.set('v.hasFocus', false);
    },

    onFocus : function(component, event, helper) {
        // Prevent action if selection is not allowed
        if (!helper.isSelectionAllowed(component)) {
            return;
        }
        component.set('v.hasFocus', true);
    },

    onBlur : function(component, event, helper) {
        // Prevent action if selection is not allowed
        if (!helper.isSelectionAllowed(component)) {
            return;
        }        
        // Delay hiding combobox so that we can capture selected result
        const blurTimeout = window.setTimeout(
            $A.getCallback(() => {
                component.set('v.hasFocus', false);
                component.set('v.blurTimeout', null);
            }),
            300
        );
        component.set('v.blurTimeout', blurTimeout);
    },

    onRemoveSelectedItem : function(component, event, helper) {
        const itemId = event.getSource().get('v.name');
        helper.removeSelectedItem(component, itemId);
    },

    onClearSelection : function(component, event, helper) {
        helper.clearSelection(component);
    }
})
