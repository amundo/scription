scription2json
==============

License:  http://www.wtfpl.net/ 

Read the content in a textarea composed in a simple plain-text format (which we’re calling
“scription” for no particular reason) and convert that content to JSON.

JSON is a nice format for persisting notes because things like Unicode escapes and whitespace are handled predictably.

Suppose you are doing a quick and dirty transcription from Quichua
to Spanish. As a super simple example, you just want two fields per “entry”.

The input format that looks like this (thanks to 
[Jesse Stewart](http://jessestewart.net) for the example data):

    transcription
    translation

    Shayhushka kani.
    Estoy cansado.
    
    Puñunayahuni.
    Quiero dormir.

For the sake of convenience

That input would convert to JSON that looks like this:

    [
      {
        "transcription": "shayhushka kani",
        "translation": "estoy cansado"
      },
      {
        "transcription": "puñunayahuni",
        "translation": "quiero dormir"
      }
    ]


Notice that the first “stanza” describes the fields. This particular  is very 


How to Try This Little App
--------------------------

The simplest way to try this out is to download the zipfile by clicking the 
“Download ZIP” button in the lower right corner of this page. Unzip the folder
somewhere on your hard drive, and then go into your web browser and click
“File > Open” in the browser’s menu. Select `scription.html` and your browser should
render a simple interface.

Type (or cut and paste) your transcription/translation pairs in the top window
(with a blank line between each pair), and then click `Convert`.

JSON will be output in the lower box.



Credits
-------

* Pat Hall
* Danny Hieber http://danielhieber.com
* Marianne Huijsmans
* Jesse Stewart http://jessestewart.net 
