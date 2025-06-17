


btn = document.getElementById("bbbtn1")
const Http = new XMLHttpRequest();
var request = new XMLHttpRequest();
request.open("GET", "./down/reason.json", false);
request.send(null);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const domain = "https://www.gruleiru.de"

$(function () {
    'use strict';


    $('.form-control').on('input', function () {
        var $field = $(this).closest('.form-group');
        if (this.value) {
            $field.addClass('field--not-empty');
        } else {
            $field.removeClass('field--not-empty');
        }
    });

});