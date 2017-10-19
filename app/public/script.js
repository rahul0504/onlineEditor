/* public/script.js */

window.onload = function() {
    var converter = new showdown.Converter();
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');

      var previousMarkdownValue;

    // convert text area to markdown html
    var convertAndSave = function(){
        var markdownText = pad.value;
        previousMarkdownValue = markdownText;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
        sharejs.open("home", 'text', function(error, doc) {
            console.log("-vfvd",pad,error,doc)
            doc.attach_textarea(pad);
            //convertAndSave();
        });
    };

    var didChangeOccur = function(){
        if(previousMarkdownValue != pad.value){
            return true;
        }
        return false;
    };

    // check every second if the text area has changed
    setInterval(function(){
        if(didChangeOccur()){
            convertAndSave();
        }
    }, 1000);

    // convert textarea on input change
    pad.addEventListener('input', convertAndSave);

    // ignore if on home page
    console.log("--xsc",document.location)
    // convert on page load
    convertAndSave();

};