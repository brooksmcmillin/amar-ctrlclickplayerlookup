// ==UserScript==
// @name         Player Lookup
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Lookup player on Ctrl-Click of their name in chat
// @author       Kateus
// @match        http://amar.bornofsnails.net/*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

Chat.whisperOriginal = Chat.whisper;
Chat.onGetChatOriginal = Chat.onGetChat;

Chat.whisper = function(e, name)
{
    if(e.ctrlKey) 
    {
		var url = "http://amar.bornofsnails.net/man/players/" + name;
        window.open(url,'_blank');
	}
    else
    {
        Chat.whisperOriginal(name);
    }
}

Chat.onGetChat = function(data)
{
    var i;
    for(i = 0; i < data.length; i++)
    {
        var startString = "Chat.whisper(";
        var whisperStart = data[i].indexOf(startString);  
        
        if(whisperStart > -1)
            data[i] = data[i].substring(0, whisperStart + startString.length) + "event, " + data[i].substring(whisperStart + startString.length);
    }
    
    Chat.onGetChatOriginal(data);
}
