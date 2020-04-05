function addSubmitOnEnter(inputId, submitBtnId)
{
    document.getElementById(inputId).addEventListener("keyup", event => submitOnEnter(event, submitBtnId));
}

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
        document.getElementById("outputtext").innerText = newoutput + "    Placeholder for next puzzle";
    }
    else
        document.getElementById("outputtext").innerText = newoutput;
}

function compute(text, output)
{
    var build = "";
    for(var i = 0; i < text.length; i++)
    {
        var c = text[i];
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