({
    lookupSearch : function(component, event, helper) {
        const serverSearchAction = component.get('c.search');
        component.find('lookup').search(serverSearchAction);
    }
})
