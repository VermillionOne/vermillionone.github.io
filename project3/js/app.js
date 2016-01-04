/*jslint unparam: true*/

// Invoke strict mode
"use strict";

var formData;

formData = [];

function pageLoad() {
  $('[data-role="profileTab"]').addClass('active');
  $('[data-role="second"]').hide();
  $('[data-role="third"]').hide();
}

function profileTab() {
  $('[data-role="first"]').show(250);
  $('[data-role="second"]').hide(250);
  $('[data-role="third"]').hide(250);
  $('ul li').removeClass('active');
  $('[data-role="profileTab"]').addClass('active');
  console.log("test 1");
}

function employmentTab() {
  $('[data-role="first"]').hide(250);
  $('[data-role="second"]').show(250);
  $('[data-role="third"]').hide(250);
  $('ul li').removeClass('active');
  $('[data-role="employmentTab"]').addClass('active');
  console.log("test 2");
}

function summaryTab() {
  $('[data-role="first"]').hide(250);
  $('[data-role="second"]').hide(250);
  $('[data-role="third"]').show(250);
  $('ul li').removeClass('active');
  $(this).addClass('active');
  $('[data-role="summaryTab"]').addClass('active');
  console.log("test 3");

}

pageLoad();


