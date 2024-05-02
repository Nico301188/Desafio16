// Función para eliminar un contacto de la lista y del localStorage
function deleteContact(contactId) {
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts = contacts.filter(contact => contact.id !== contactId);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    removeContactFromList(contactId);
    alert("Eliminado correctamente");
    location.reload();
}
// Función para eliminar un contacto de la lista en el HTML
function removeContactFromList(contactId) {
    const contactItems = document.querySelectorAll("#contactList li");
    contactItems.forEach(item => {
        if (item.innerText.includes(contactId)) {
            item.remove();
        }
        
    });
}
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    const contactList = document.getElementById("contactList");

    // Cargar contactos del localStorage al cargar la página
    loadContacts();

    // Evento submit del formulario
    contactForm.addEventListener("submit", function(event) {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const birthdate = document.getElementById("birthdate").value;
        const contactId = document.getElementById("contactId").value;

        if (name.trim() === "" || email.trim() === "" || birthdate.trim() === "") {
            alert("Por favor completa todos los campos.");
            return;
        }

        const contact = {
            id: contactId || generateId(), // Generar un nuevo ID si no se especifica uno
            name: name,
            email: email,
            birthdate: birthdate
        };

        if (contactId) {
            // Actualizar contacto existente
            updateContact(contact);
        } else {
            // Agregar nuevo contacto
            addContact(contact);
        }

        // Limpiar el formulario después de agregar o actualizar un contacto
        resetForm();
    });

    // Función para cargar los contactos del localStorage al cargar la página
    function loadContacts() {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.forEach(contact => {
            addContactToList(contact);
        });
    }

    // Función para agregar un nuevo contacto a la lista y al localStorage
    function addContact(contact) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts.push(contact);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        addContactToList(contact);
        alert("Agregado correctamente");
    }

    // Función para actualizar un contacto en la lista y en el localStorage
    function updateContact(updatedContact) {
        let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        contacts = contacts.map(contact => {
            if (contact.id === updatedContact.id) {
                return updatedContact;
            }
            return contact;
        });
        localStorage.setItem("contacts", JSON.stringify(contacts));
        updateContactInList(updatedContact);
        alert("Editado correctamente");
        // document.getElementById("submitButton").innerText = "Agregar"; 
    }


    // Función para añadir un contacto a la lista en el HTML
    function addContactToList(contact) {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="d-dat">
        <div class="d-list"><strong>${contact.name} /</strong></div>
        <div class="d-list"><strong>${contact.email} /</strong> </div>
        <div class="d-list"><strong>${contact.birthdate}</strong> </div>
        <div>
        <button onclick="editContact('${contact.id}')">Editar</button>
        <button onclick="deleteContact('${contact.id}')">Eliminar</button>
        </div>
        </div>`;
        contactList.appendChild(li);
        // <strong>${contact.name}</strong> - ${contact.email} - ${contact.birthdate}
    }

    // Función para actualizar un contacto en la lista en el HTML
    function updateContactInList(updatedContact) {
        const contactItems = document.querySelectorAll("#contactList li");
        contactItems.forEach(item => {
            if (item.innerText.includes(updatedContact.id)) {
                item.innerHTML = `
                    <strong>${updatedContact.name}</strong> - ${updatedContact.email} - ${updatedContact.birthdate}
                    <button onclick="editContact('${updatedContact.id}')">Editar</button>
                    <button onclick="deleteContact('${updatedContact.id}')">Eliminar</button>
                `;
            }
        });
    }


    // Función para limpiar el formulario después de agregar o actualizar un contacto
    function resetForm() {
        document.getElementById("contactId").value = ""; // Limpiar el campo oculto del ID
        contactForm.reset(); // Limpiar el resto del formulario
    }

    // Función para generar un ID único para los contactos
    function generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Función para editar un contacto
    window.editContact = function(contactId) {
        const contacts = JSON.parse(localStorage.getItem("contacts")) || [];
        const contact = contacts.find(contact => contact.id === contactId);
        if (contact) {
            document.getElementById("name").value = contact.name;
            document.getElementById("email").value = contact.email;
            document.getElementById("birthdate").value = contact.birthdate;
            document.getElementById("contactId").value = contactId; // Almacenar el ID del contacto a editar
            document.getElementById("submitButton").innerText = "Actualizar"; // Cambiar el texto del botón a "Actualizar"
            
        }
    };
});