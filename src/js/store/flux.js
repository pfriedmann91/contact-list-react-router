const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
	
			contacts: []
			
		},
		actions: {
			
			createAgenda: async () => {
                try {
                    let getResponse = await fetch("https://playground.4geeks.com/contact/agendas/pablofriedmann", { method: "GET" });
            
                    if (getResponse.ok) {
                        console.log("agenda ya creada");
                        return;
                    }
            
                    let response = await fetch("https://playground.4geeks.com/contact/agendas/pablofriedmann", { method: "POST" });
            
                    if (!response.ok) {
                        console.log(`error: ${response.status}`);
                        return;
                    }
            
                    let data = await response.json();
                    console.log("agenda creada :", data);
                } catch (error) {
                    console.log("error:", error);
                }
            },
            

			getContacts: async() => {

					try { let response = await fetch ('https://playground.4geeks.com/contact/agendas/pablofriedmann/contacts', {method:"GET"})
						let data = await response.json()
						setStore({contacts:data.contacts});
						return true
						
						
					} catch (error) {
						console.log(error);
						return false
						
					
					}
			},

			createContact: async (contact) => {
                try {
                    let response = await fetch("https://playground.4geeks.com/contact/agendas/pablofriedmann/contacts", {
                        method: "POST",
                        body: JSON.stringify(contact),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        console.log(`Error: ${response.status}`);
                        return false;
                    }

                    let data = await response.json();
                    console.log(data);

                    const store = getStore();
                    setStore({ contacts: [...store.contacts, data] });

                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            },

			deleteContact: async (contactId) => {
                try {
                    let response = await fetch(`https://playground.4geeks.com/contact/agendas/pablofriedmann/contacts/${contactId}`, {
                        method: "DELETE",
                    });

                    if (!response.ok) {
                        console.log(`error: ${response.status}`);
                        return;
                    }
                    console.log("contacto eliminado");
                    
                    const store = getStore();
                    const updatedContacts = store.contacts.filter(contact => contact.id !== contactId);

                    setStore({ contacts: updatedContacts });
                } catch (error) {
                    console.log("error:", error);
                }
            },

			
			updateContact: async (contactId, updatedContact) => {
				try {
					let response = await fetch(`https://playground.4geeks.com/contact/agendas/pablofriedmann/contacts/${contactId}`, {
						method: "PUT",
						body: JSON.stringify(updatedContact),
						headers: {
							"Content-Type": "application/json",
						},
					});
			
					if (!response.ok) {
						console.log(`Error updating contact: ${response.status}`);
						return false;
					}
			
					let data = await response.json();
					console.log(data);
			
					const store = getStore();
					const updatedContacts = store.contacts.map(contact =>
						contact.id === contactId ? data : contact
					);
			
					setStore({ contacts: updatedContacts });
					return true;
				} catch (error) {
					console.log(error);
					return false;
				}
			},
			
			
			
			resetContacts: () => {
                setStore({ contacts: [] });
            }
        }
    };
};

export default getState;
