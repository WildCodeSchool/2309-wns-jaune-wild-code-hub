const fakeFile = [
    {
        project: { id: 1},
        name: "file 1",
        extension: "html",
        type: "file",
        content: `
<div id="app">
<p class="blue">Hello, world!</p>
</div>
        `,
        language: "html",
    },
    {
        project: { id: 1},
        name: "file 2",
        extension: "css",
        type: "file",
        content: `#app { background: red; }`,
        language: "css",
    },
    {
        project: { id: 1},
        name: "file 3",
        extension: "js",
        type: "file",
        content: `document.getElementById('app').innerText = "Hello, JavaScript!";
        console.log("toto"); console.log({ a: 1, b: 2 }); console.log([1, 2, 3]);
        console.log("toto", [1, 2, 3]); console.log({ a: 1, b: 2 }, [1, 2, 3]);
        console.log("tototttttttt")
        console.log('arg1',[1,2,30], "arg2" ,{1:"toto",2:"ttt",3:"dddd"})`,
        language: "javascript",
    },
];

export default fakeFile;
