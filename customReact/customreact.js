function customRender(reactElement, container) {
    // Create a DOM element based on the reactElement type
    const domElement = document.createElement(reactElement.type);

    // Set properties for the DOM element
    for (const [key, value] of Object.entries(reactElement.props)) {
        if (key === 'children') {
            // If children is an array, recursively render each child
            if (Array.isArray(value)) {
                value.forEach(child => {
                    if (typeof child === 'string') {
                        // If the child is a string, create a text node
                        domElement.appendChild(document.createTextNode(child));
                    } else {
                        // Recursively render the child element
                        customRender(child, domElement);
                    }
                });
            } else if (typeof value === 'string') {
                // If children is a string, create a text node
                domElement.appendChild(document.createTextNode(value));
            } else {
                // Recursively render the single child element
                customRender(value, domElement);
            }
        } else {
            // Set other properties directly
            domElement[key] = value;
        }
    }

    // Append the created DOM element to the container
    container.appendChild(domElement);
}

const reactElement={
    type: 'div',
    props: {
        children: [
        {
            type: 'h1',
            props: {
            children: 'Hello World'
            }
        },
        {
            type: 'p',
            props: {
            children: 'This is a custom React app'
            }
        }
        ]
    }
}

const mainContainer = document.getElementById('root');

customRender(reactElement, mainContainer);