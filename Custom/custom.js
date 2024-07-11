// SELECTORS
const root = document.querySelector('#root');

// JSX SYNTEX
const ReactElem = {
    type: 'h1',
    props: {
        content: 'Custom making of React Elem'
    }
}

function customRender(ReactElem, root) {
    const elem = document.createElement(ReactElem.type);
    elem.textContent = ReactElem.props.content

    root.appendChild(elem)
}

customRender(ReactElem, root)