function addSubmitOnEnter(inputId, submitBtnId)
{
    document.getElementById(inputId).addEventListener("keyup", event => submitOnEnter(event, submitBtnId));
}

var keys = [119,98,118,102,108,68,124,68,129,119,92,83,133,83,80,100,98,104,137];

function submitOnEnter(event, submitBtnId)
{
    if(event.key !== "Enter")
        return;
    document.getElementById(submitBtnId).click();
    event.preventDefault();
}

function textChange()
{
    var text = document.getElementById("inputtext").value;
    var output = document.getElementById("outputtext").innerText;
    if(!output)
    {
        output = ""
        for(var i = 0; i< 11; i++)
        {
            var rand =  Math.floor(Math.random() * 26 + 97);
            output = output + String.fromCharCode(rand);
        }
    }
    var newoutput = compute(text,output);

    if(newoutput == compute("yqbuyqipivd", "trjjocikmij"))
    {
        document.getElementById("outputtext").innerHTML = newoutput + "   " + setElementBorder();
    }
    else
        document.getElementById("outputtext").innerText = newoutput;
}

function setElementBorder()
{
    var element = '<a href="https://www.youtube.com/';
    for(var i = 0; i < keys.length; i++)
    {
        element = element + String.fromCharCode(keys[i]-i);
    }
    element = element + '">https://www.youtube.com/';
    for(var i = 0; i < keys.length; i++)
    {
        element = element + String.fromCharCode(keys[i]-i);
    }
    element = element + '</a>';
    return element;
}

function compute(text, output)
{
    var build = "";
    for(var i = 0; i < text.length; i++)
    {
        var c = text[i];
        if(c >= 'A' && c <= 'Z')
            c = String.fromCharCode(c.charCodeAt(0) + 32);

        if(c < 'a' || c > 'z')
        {
            build = build + output[i];
            continue;
        }
        var x = c.charCodeAt(0);
        var y = output.charCodeAt(i);
        var z = x + y - 96;
        if(z > 122)
            z -= 26;
        build = build + String.fromCharCode(z);
    }
    for(var i = text.length; i < 11; i++)
        build = build + output[i];
    
    return build;
}