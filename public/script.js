// public/script.js

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

    var convertTextAreaToMarkdown = function() {
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    var didChangeOccur = function() {
        if(previousMarkdownValue != pad.value) {
            return true;
        }
        return false;
    };

    setInterval(function(){
        if(didChangeOccur()){
            convertTextAreaToMarkdown();
        }
    }, 1000);

    pad.addEventListener('input', convertTextAreaToMarkdown);

    // open a sharejs connection to 'home' then attach the textarea to the object returned by this connection
    // keeps our textarea in sync with everyone else's textarea
    // TODO: A's markdownarea won't be updated when B makes a change
    sharejs.open('home', 'text', function(error, doc) {
        doc.attach_textarea(pad);
    })
}