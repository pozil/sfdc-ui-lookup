({
    updateSearchTerm : function(component, searchTerm) {
        // Cleanup new search term
        const updatedSearchTerm = searchTerm.trim().replace(/\*/g);
        
        // Compare clean new search term with current one and abort if identical
        const curSearchTerm = component.get('v.searchTerm');
        if (curSearchTerm === updatedSearchTerm) {
            return;
        }

        // Update search term
        component.set('v.searchTerm', updatedSearchTerm);
        
        // Ignore search terms that are too small
        if (updatedSearchTerm.length < 2) {
            component.set('v.searchResults', []);
            return;
        }
        
        // Send search event
        const searchEvent = component.getEvent('onSearch');
        searchEvent.fire();
    },

    selectResult : function(component, recordId) {
        // Save selection
        const searchResults = component.get('v.searchResults');
        const selectedResult = searchResults.filter(result => result.id === recordId);
        if (selectedResult.length > 0) {
            const selection = component.get('v.selection');
            selection.push(selectedResult[0]);
            component.set('v.selection', selection);
        }
        // Reset search
        const searchInput = component.find('searchInput');
        searchInput.getElement().value = '';
        component.set('v.searchTerm', '');
        component.set('v.searchResults', []);
    },

    getSelectedIds : function(component) {
        const selection = component.get('v.selection');
        return selection.map(element => element.id);
    },

    removeSelectedItem : function(component, removedItemId) {
        const selection = component.get('v.selection');
        const updatedSelection = selection.filter(item => item.id !== removedItemId);
        component.set('v.selection', updatedSelection);
    },

    clearSelection : function(component, itemId) {
        component.set('v.selection', []);
    },

    isSelectionAllowed : function(component) {
        return component.get('v.isMultiEntry') || component.get('v.selection').length === 0;
    }
})
